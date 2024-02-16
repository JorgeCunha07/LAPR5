using System.Threading.Tasks;
using MGT.DTO;
using MGT.Entities;
using MGT.Repository.Interfaces;

namespace MGT.Repository;

public class SurveillanceTaskRepository : ISurveillanceTaskRepository
{
    private readonly DBContext _context;

    public SurveillanceTaskRepository(DBContext context)
    {
        _context = context;
    }

    public async Task<SurveillanceTask> Create(SurveillanceTask surveillanceTask)
    {
        _context.SurveillanceTasks.Add(surveillanceTask);
        await _context.SaveChangesAsync();
        return surveillanceTask;
    }

    public async Task<SurveillanceTask> GetById(int id)
    {
        return await _context.SurveillanceTasks.FindAsync(id);
    }
}