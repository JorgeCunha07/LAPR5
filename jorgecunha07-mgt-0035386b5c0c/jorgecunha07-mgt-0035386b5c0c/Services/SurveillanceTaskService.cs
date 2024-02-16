using System;
using System.Threading.Tasks;
using MGT.DTO;
using MGT.Entities;
using MGT.Mappers;
using MGT.Repository.Interfaces;
using MGT.Services.Interfaces;

namespace MGT.Services
{
    public class SurveillanceTaskService : ISurveillanceTaskService
    {
        private readonly ISurveillanceTaskRepository _surveillanceTaskRepository;

        public SurveillanceTaskService(ISurveillanceTaskRepository surveillanceTaskRepository)
        {
            _surveillanceTaskRepository = surveillanceTaskRepository;
        }

        public async Task<(SurveillanceTaskDto, int taskId)> Create(SurveillanceTaskCreateDto taskDto)
        {
            if (string.IsNullOrWhiteSpace(taskDto.Name))
            {
                throw new ArgumentException("Name cannot contain white spaces.");
            }
            
            taskDto.ContactInfo = Utils.RemoveWhiteSpaces(taskDto.ContactInfo);
            
            if (!Utils.IsValidPhoneNumber(taskDto.ContactInfo))
            {
                throw new ArgumentException("Contact info is not a valid phone number.");
            }
            
            if (!string.Equals(taskDto.FromLocation.Building, taskDto.ToLocation.Building, StringComparison.CurrentCultureIgnoreCase) || taskDto.FromLocation.Room != taskDto.ToLocation.Room)
            {
                throw new ArgumentException("From Location and ToLocation must have the same Building and Room.");
            }
            
            var surveillanceTask = SurveillanceTaskMapper.ToEntity(taskDto);
    
            var createdTask = await _surveillanceTaskRepository.Create(surveillanceTask);
            return (SurveillanceTaskMapper.ToDto(createdTask), createdTask.Id);
        }

        public async Task<SurveillanceTask> GetById(int id)
        {
            return await _surveillanceTaskRepository.GetById(id);
        }
    }
}