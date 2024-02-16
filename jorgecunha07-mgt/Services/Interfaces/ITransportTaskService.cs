using System.Threading.Tasks;
using MGT.DTO;
using MGT.Entities;

namespace MGT.Services.Interfaces;

public interface ITransportTaskService
{
    Task<(TransportTaskDto createdTask, int taskId)> Create(TransportTaskCreateDto taskDto);
    Task<TransportTask> GetById(int id);
}