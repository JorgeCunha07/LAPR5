using System.Threading.Tasks;
using MGT.DTO;

namespace MGT.Services.Interfaces;

public interface IRouteTaskService
{
    Task<TaskProcessingResultDto> ProcessTransportTasks(TaskDto[] taskDto);
}