using System;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using MGT.Constants;
using MGT.DTO;
using MGT.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace MGT.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SurveillanceTaskController : ControllerBase
    {
        private readonly ISurveillanceTaskService _surveillanceTaskService;
        private readonly IHttpClientFactory _httpClientFactory;

        public SurveillanceTaskController(ISurveillanceTaskService surveillanceTaskService,IHttpClientFactory httpClientFactory)
        {
            _surveillanceTaskService = surveillanceTaskService;
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
                Console.WriteLine($"JSON Deserialization error: {ex.Message}");
                return null;
            }

            
        }
        
        [HttpPost("create")]
        public async Task<IActionResult> CreateSurveillanceTask(SurveillanceTaskCreateDto taskDto)
        {            try
            {
                var authDto = await VerifyTokenAsync();
                if (!authDto.IsAuthenticated || (authDto.Role != "Admin" && authDto.Role != "Task_Manager" && authDto.Role != "Campus_Manager" && authDto.Role != "Utente"))
                {
                    return StatusCode(403, "User does not have permission to perform this action");
                }
                var (createdTask, taskId) = await _surveillanceTaskService.Create(taskDto);

                return CreatedAtAction(nameof(GetSurveillanceTask), new { id = taskId }, createdTask);
            }             catch (UnauthorizedAccessException ex)
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
        public async Task<IActionResult> GetSurveillanceTask(int id)
        {   try
            {
                var authDto = await VerifyTokenAsync();
                if (!authDto.IsAuthenticated || (authDto.Role != "Admin" && authDto.Role != "Task_Manager" && authDto.Role != "Campus_Manager" && authDto.Role != "Utente"))
                {
                    return StatusCode(403, "User does not have permission to perform this action");
                }
                var surveillanceTask = await _surveillanceTaskService.GetById(id);
            
                if (surveillanceTask == null)
                {
                    return NotFound();
                }
            
                return Ok(surveillanceTask);
            } catch (UnauthorizedAccessException ex)
            {
                return StatusCode(404,ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}