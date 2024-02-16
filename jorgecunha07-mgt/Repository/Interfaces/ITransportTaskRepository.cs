using System.Threading.Tasks;
using MGT.Entities;

namespace MGT.Repository.Interfaces;

public interface ITransportTaskRepository
{
    Task<TransportTask> Create(TransportTask transportTask);
    Task<TransportTask> GetById(int id);
}