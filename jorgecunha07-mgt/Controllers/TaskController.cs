#nullable enable
using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using MGT.Constants;
using MGT.DTO;
using MGT.Enums;
using MGT.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace MGT.Controllers{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;
        private readonly IHttpClientFactory _httpClientFactory;

        public TaskController(ITaskService taskService, IHttpClientFactory httpClientFactory)
        {
            _taskService = taskService;
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
                Console.WriteLine($"JSON Deserialization error: {ex}");
                return null;
            }
            
        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTask(int id)
        {
            try
            {
                var authDto = await VerifyTokenAsync();
                if (!authDto.IsAuthenticated || (authDto.Role != "Admin" && authDto.Role != "Task_Manager" && authDto.Role != "Campus_Manager" && authDto.Role != "Utente"))
                {
                    return StatusCode(403, "User does not have permission to perform this action");
                }
                var task = await _taskService.GetById(id);
                
                if (task == null)
                {
                    return NotFound();
                }
                
                return Ok(task);
            }
            catch (UnauthorizedAccessException ex)
            {
                return StatusCode(404,ex);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error" + ex);
            }
        }
        
        [HttpPost("{name}/{newStatus}")]
        public async Task<IActionResult> ChangeTaskStatus(string name, string newStatus)
        {
            try
            {
                var authDto = await VerifyTokenAsync();
                if (!authDto.IsAuthenticated || (authDto.Role != "Admin" && authDto.Role != "Task_Manager" && authDto.Role != "Campus_Manager" && authDto.Role != "Utente"))
                {
                    return StatusCode(403, "User does not have permission to perform this action");
                }
                var responseTask = await _taskService.ChangeStatus(name, newStatus);

                if (responseTask == null)
                {
                    return NotFound($"Task with name {name} not found.");
                }

                return Ok(responseTask);
            }
            catch (UnauthorizedAccessException ex)
            {
                return StatusCode(404,ex);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error" + ex);
            }
        }
        
        [HttpGet("submitted")]
        public async Task<IActionResult> GetSubmittedTasks()
        {
            try
            {
                var authDto = await VerifyTokenAsync();
                if (!authDto.IsAuthenticated || (authDto.Role != "Admin" && authDto.Role != "Task_Manager" && authDto.Role != "Campus_Manager" && authDto.Role != "Utente"))
                {
                    return StatusCode(403, "User does not have permission to perform this action");
                }

                var submittedTasks = await _taskService.GetTasksByStatus(TaskStatusEnum.Submitted);

                if (submittedTasks == null || !submittedTasks.Any())
                {
                    return NotFound("No tasks in SUBMITTED status found.");
                }

                return Ok(submittedTasks);
            }
            catch (UnauthorizedAccessException ex)
            {
                return StatusCode(404,ex);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error" + ex);
            }
        }
        
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilteredTasks([FromQuery] string? robotType, [FromQuery] string? userEmail, [FromQuery] TaskStatusEnum? status)
        {
            try
            {
                var authDto = await VerifyTokenAsync();
                if (!authDto.IsAuthenticated || (authDto.Role != "Admin" && authDto.Role != "Task_Manager" && authDto.Role != "Campus_Manager" && authDto.Role != "Utente"))
                {
                    return StatusCode(403, "User does not have permission to perform this action");
                }

                var tasks = await _taskService.GetFilteredTasks(robotType, userEmail, status);

                if (tasks == null || !tasks.Any())
                {
                    return NotFound("No tasks found for the given filter criteria.");
                }

                return Ok(tasks);
            }
            catch (UnauthorizedAccessException ex)
            {
                return StatusCode(400,ex);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error" + ex);
            }
        }
        
        [HttpPut("{name}/{robot}/{robotType}")]
        public async Task<IActionResult> AttributeRobotToTask(string name, string robot, string robotType)
        {
            try
            {
                var authDto = await VerifyTokenAsync();
                if (!authDto.IsAuthenticated || (authDto.Role != "Admin" && authDto.Role != "Task_Manager" && authDto.Role != "Campus_Manager"))
                {
                    return StatusCode(403, "User does not have permission to perform this action");
                }
                var responseTask = await _taskService.AttributeRobotToTask(name, robot, robotType);

                if (responseTask == null)
                {
                    return NotFound($"Task with name {name} not found.");
                }

                return Ok(responseTask);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error" + ex);
            }
        }
    }
}

