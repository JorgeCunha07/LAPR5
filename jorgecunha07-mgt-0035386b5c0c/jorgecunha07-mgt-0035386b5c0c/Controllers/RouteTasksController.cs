using System;
using System.Net.Http;
using System.Threading.Tasks;
using MGT.Constants;
using Microsoft.AspNetCore.Mvc;
using MGT.DTO;
using MGT.Services.Interfaces;
using Newtonsoft.Json;

namespace MGT.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RouteTasksController : ControllerBase
    {
        private readonly IRouteTaskService _routeTaskService;
        private readonly IHttpClientFactory _httpClientFactory;

        public RouteTasksController(IRouteTaskService routeTaskService, IHttpClientFactory httpClientFactory)
        {
            _routeTaskService = routeTaskService;
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
            client.DefaultRequestHeaders.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

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

        [HttpPost("createTasksAndBestSequenceTask")]
        public async Task<IActionResult> ProcessTransportTasks([FromBody] TaskDto[] taskDto)
        {
            if (taskDto == null || taskDto.Length == 0)
            {
                return BadRequest("No tasks provided");
            }

            var authDto = await VerifyTokenAsync();

            if (!authDto.IsAuthenticated)
            {
                return Unauthorized("User is not authenticated");
            }
            Console.WriteLine(authDto.Role);
            if (authDto.Role != "Admin" && authDto.Role != "Task_Manager" && authDto.Role != "Campus_Manager" &&
                authDto.Role != "Utente")
            {
                return Unauthorized("User does not have permission to perform this action");
            }

            var result = await _routeTaskService.ProcessTransportTasks(taskDto);
            return Ok(result);
        }
    }
}