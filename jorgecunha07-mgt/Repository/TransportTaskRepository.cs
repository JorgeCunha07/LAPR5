using System.Threading.Tasks;
using MGT.Entities;
using MGT.Repository.Interfaces;

namespace MGT.Repository;

public class TransportTaskRepository : ITransportTaskRepository
{
    private readonly DBContext _context;

    public TransportTaskRepository(DBContext context)
    {
        _context = context;
    }

    public async Task<TransportTask> Create(TransportTask transportTask)
    {
        _context.TransportTasks.Add(transportTask);
        await _context.SaveChangesAsync();
        return transportTask;
    }

    public async Task<TransportTask> GetById(int id)
    {
        return await _context.TransportTasks.FindAsync(id);
    }
}