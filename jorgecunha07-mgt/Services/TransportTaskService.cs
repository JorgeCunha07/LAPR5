using System;
using System.Threading.Tasks;
using MGT.DTO;
using MGT.Entities;
using MGT.Enums;
using MGT.Mappers;
using MGT.Repository.Interfaces;
using MGT.Services.Interfaces;

namespace MGT.Services
{
    public class TransportTaskService : ITransportTaskService
    {
        private readonly ITransportTaskRepository _transportTaskRepository;

        public TransportTaskService(ITransportTaskRepository transportTaskRepository)
        {
            _transportTaskRepository = transportTaskRepository;
        }

        public async Task<(TransportTaskDto createdTask, int taskId)> Create(TransportTaskCreateDto taskDto)
        {
            if (string.IsNullOrWhiteSpace(taskDto.Name))
            {
                throw new ArgumentException("Name cannot contain white spaces.");
            }
            
            taskDto.ContactStart = Utils.RemoveWhiteSpaces(taskDto.ContactStart);
            
            if (!Utils.IsValidPhoneNumber(taskDto.ContactStart))
            {
                throw new ArgumentException("Contact Start is not a valid phone number.");
            }
            
            taskDto.ContactEnd = Utils.RemoveWhiteSpaces(taskDto.ContactEnd);
            
            if (!Utils.IsValidPhoneNumber(taskDto.ContactEnd))
            {
                throw new ArgumentException("Contact End is not a valid phone number.");
            }
            
            var transportTask = TransportTaskMapper.ToEntity(taskDto);
            
            var createdTask = await _transportTaskRepository.Create(transportTask);
            return (TransportTaskMapper.ToDto(createdTask), createdTask.Id);
        }

        public async Task<TransportTask> GetById(int id)
        {
            return await _transportTaskRepository.GetById(id);
        }
    }
}