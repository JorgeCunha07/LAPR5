using System;
using System.Net.Http;
using System.Threading.Tasks;
using MGT.Constants;
using Microsoft.AspNetCore.Mvc;
using MGT.DTO;
using MGT.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace MGT.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransportTaskController : ControllerBase
    {
        private readonly ITransportTaskService _transportTaskService;
        private readonly IHttpClientFactory _httpClientFactory;

        public TransportTaskController(ITransportTaskService transportTaskService, IHttpClientFactory httpClientFactory)
        {
            _transportTaskService = transportTaskService;
            _httpClientFactory = httpClientFactory;
        }

        private async Task<AuthDTO> VerifyTokenAsync()
        {
            var authorizationHeader = Request.Headers["Authorization"].ToString();
            if (string.IsNullOrEmpty(authorizationHeader) || !authorizationHeader.StartsWith("Bearer "))
            {
                throw new UnauthorizedAccessException("Bearer token not found");
            }

            var token = authorizationHeader.Substring("Bearer ".Length).Trim();
            
            var client = _httpClientFactory.CreateClient();
            client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

            var response = await client.GetAsync(Endpoints.AuthEndpoint + "/auth/verifyToken");
            Console.WriteLine($"Status Code: {response.StatusCode}");
            Console.WriteLine($"Response Headers: {response.Headers}");

            var content = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"Response Content: {content}");
            try
            {
                var authDto = JsonConvert.DeserializeObject<AuthDTO>(content);

                return authDto;
            }
            catch (System.Text.Json.JsonException ex)
            {
                Console.WriteLine($"JSON Deserialization error: {ex.InnerException}");
                return null;
            }

            
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateTransportTask([FromBody] TransportTaskCreateDto taskDto)
        {
            try
            {
                var authDto = await VerifyTokenAsync();
                if (!authDto.IsAuthenticated || (authDto.Role != "Admin" && authDto.Role != "Task_Manager" && authDto.Role != "Campus_Manager" && authDto.Role != "Utente"))
                {
                    return StatusCode(403, "User does not have permission to perform this action");
                }

                var (createdTask, taskId) = await _transportTaskService.Create(taskDto);
                return CreatedAtAction(nameof(GetTransportTask), new { id = taskId }, createdTask);
            }
            catch (UnauthorizedAccessException ex)
            {
                return StatusCode(404,ex.Message);
            }
            catch (DbUpdateException ex)
            {
                Exception innerException = ex;
                while (innerException.InnerException != null)
                {
                    innerException = innerException.InnerException;
                }

                if (innerException is not Npgsql.PostgresException postgresException)
                    return StatusCode(500, "Internal Server Error " + ex);
                if (postgresException.SqlState == "23505" && postgresException.ConstraintName == "IX_Tasks_Name")
                {
                    return StatusCode(400, "Duplicate task name. Please choose a different name.");
                }

                return StatusCode(500, "Internal Server Error " + ex);
            }
            catch (Exception ex)
            { 
                return StatusCode(500, "Internal Server Error " + ex);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTransportTask(int id)
        {
            try
            {
                var authDto = await VerifyTokenAsync();
                if (!authDto.IsAuthenticated || (authDto.Role != "Admin" && authDto.Role != "Task_Manager" && authDto.Role != "Campus_Manager" && authDto.Role != "Utente"))
                {
                    return Forbid("User does not have permission to perform this action");
                }

                var transportTask = await _transportTaskService.GetById(id);
                if (transportTask == null)
                {
                    return NotFound();
                }

                return Ok(transportTask);
            }
            catch (UnauthorizedAccessException ex)
            {
                return StatusCode(400,ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error " +ex.InnerException);
            }
        }
    }
}
