using System;
using MGT.DTO;
using MGT.Services.Interfaces;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using MGT.Constants;
using Newtonsoft.Json;

namespace MGT.Services
{    /// <summary>
     /// Service responsible for processing transport tasks and interacting with an external planning endpoint.
     /// </summary>
    public class RouteTaskService : IRouteTaskService
    {
        private readonly IHttpClientFactory _httpClientFactory;

        /// <summary>
        /// Initializes a new instance of the <see cref="RouteTaskService"/> class.
        /// </summary>
        public RouteTaskService(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        /// <summary>
        /// Processes an array of transport tasks and sends them to an external planning endpoint for further processing.
        /// </summary>
        /// <param name="taskDto">An array of task data transfer objects to process.</param>
        /// <returns>
        /// A <see cref="TaskProcessingResultDto"/> representing the result of processing the tasks.
        /// </returns>
        public async Task<TaskProcessingResultDto> ProcessTransportTasks(TaskDto[] taskDto)
        {   string tarefas = "";

            foreach (var task in taskDto)
            {
                // Concatenate task names with comma separation
                string taskName = task.Name;
                if (tarefas == "")
                {
                    tarefas += task.Name;
                }else if (tarefas != "")
                {
                    tarefas += "," + task.Name;
                }
                
                string entryLocationTask = $"cel({task.FromLocation.Building},{task.ToLocation.Building + task.FromLocation.Room.ToString()},{task.FromLocation.X},{task.FromLocation.Y})";
                string exitLocationTask = $"cel({task.ToLocation.Building},{task.ToLocation.Building + task.ToLocation.Room.ToString()},{task.ToLocation.X},{task.ToLocation.Y})";

    
                Console.WriteLine(taskName);
                Console.WriteLine(entryLocationTask.ToString());
                Console.WriteLine(exitLocationTask.ToString());

                // Construct the query string
                var queryString = $"?taskName={Uri.EscapeDataString(taskName)}&inicio={Uri.EscapeDataString(entryLocationTask)}&fim={Uri.EscapeDataString(exitLocationTask)}";

                // Send an HTTP POST request with query string
                var httpClient = _httpClientFactory.CreateClient();
                var response = await httpClient.PostAsync($"{Endpoints.PlanningEndpointAddress}/createTask{queryString}", new StringContent("", Encoding.UTF8, "application/x-www-form-urlencoded"));
                Console.WriteLine(response.Content.ToString());
                //TimeSpan timeout = TimeSpan.FromSeconds(1);
                if (!response.IsSuccessStatusCode)
                {
                    // Handle the error (e.g., log, throw an exception, etc.)
                    return null;
                }
            }
            // Create a JSON object for the POST request
            var json = JsonConvert.SerializeObject(new { lista = tarefas });
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            // Send the POST request
            var finalHttpClient = _httpClientFactory.CreateClient();
            // Send the POST request and get the response
            var responsePath = await finalHttpClient.PostAsync($"{Endpoints.PlanningEndpointAddress}/caminhotarefas", content);
            if (!responsePath.IsSuccessStatusCode)
            {
                return null; 
            }
            Console.WriteLine(tarefas);
            // Deserialize the JSON response into TaskProcessingResultDto
            string responseContent = await responsePath.Content.ReadAsStringAsync();
            var resultDto = JsonConvert.DeserializeObject<TaskProcessingResultDto>(responseContent);

            return resultDto;
        }
    }
}

