using System.Threading.Tasks;
using MGT.DTO;
using MGT.Entities;

namespace MGT.Repository.Interfaces;

public interface ISurveillanceTaskRepository
{
    Task<SurveillanceTask> Create(SurveillanceTask surveillanceTask);
    Task<SurveillanceTask> GetById(int id);
}