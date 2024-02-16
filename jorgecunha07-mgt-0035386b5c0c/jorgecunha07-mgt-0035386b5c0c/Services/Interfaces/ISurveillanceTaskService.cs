using System.Threading.Tasks;
using MGT.DTO;
using MGT.Entities;

namespace MGT.Services.Interfaces;

public interface ISurveillanceTaskService
{
    Task<(SurveillanceTaskDto, int taskId)> Create(SurveillanceTaskCreateDto taskDto);
    Task<SurveillanceTask> GetById(int id);
}