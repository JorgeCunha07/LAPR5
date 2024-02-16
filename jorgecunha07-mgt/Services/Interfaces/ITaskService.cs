using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MGT.DTO;
using MGT.Enums;

namespace MGT.Services.Interfaces;

public interface ITaskService
{
    Task<TaskDto> ChangeStatus(string name, string newStatus);
    Task<Entities.Task> GetById(int id);
    Task<IEnumerable<Entities.Task>> GetTasksByStatus(TaskStatusEnum status);
    Task<IEnumerable<Entities.Task>> GetFilteredTasks(string userEmail, string robotType, TaskStatusEnum? status);
    Task<TaskDto> AttributeRobotToTask(string name, string robot, string robotType);
}