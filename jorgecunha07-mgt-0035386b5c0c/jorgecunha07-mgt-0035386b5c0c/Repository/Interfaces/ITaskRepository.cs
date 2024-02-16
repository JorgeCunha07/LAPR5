using System.Collections.Generic;
using System.Threading.Tasks;
using MGT.Enums;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;

namespace MGT.Repository.Interfaces;

public interface ITaskRepository
{
    Task<Entities.Task> GetById(int id);
    Task<Entities.Task> GetByName(string name);
    Task<int> Update(Entities.Task task);
    Task<IEnumerable<Entities.Task>> GetTasksByStatus(TaskStatusEnum status);
    Task<IEnumerable<Entities.Task>> GetAllTasks();
}