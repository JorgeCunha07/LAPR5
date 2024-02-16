using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MGT.Entities;
using MGT.Enums;
using MGT.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MGT.Repository;

public class TaskRepository : ITaskRepository
{
    private readonly DBContext _context;

    public TaskRepository(DBContext context)
    {
        _context = context;
    }
    
    public async Task<Entities.Task> GetById(int id)
    {
        return await _context.Tasks
            .FindAsync(id);
    }
    
    public Task<int> Update(Entities.Task task)
    {
        _context.Tasks.Update(task);
        return _context.SaveChangesAsync();
    }
    
    public async Task<IEnumerable<Entities.Task>> GetTasksByStatus(TaskStatusEnum status)
    {
        return await _context.Tasks
            .Include(t => t.FromLocation)
            .Include(t => t.ToLocation)
            .Where(t => t.TaskStatus == status).ToListAsync();
    }
    
    public async Task<IEnumerable<Entities.Task>> GetAllTasks()
    {
        return await _context.Tasks
            .Include(t => t.FromLocation)
            .Include(t => t.ToLocation)
            .ToListAsync();
    }
    
    public Task<Entities.Task> GetByName(string name)
    {
        return _context.Tasks
            .Include(t => t.FromLocation)
            .Include(t => t.ToLocation)
            .FirstOrDefaultAsync(t => t.Name == name);
    }
}