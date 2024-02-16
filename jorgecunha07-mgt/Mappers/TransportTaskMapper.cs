using System;
using MGT.DTO;
using MGT.Entities;
using MGT.Enums;

namespace MGT.Mappers;

public abstract class TransportTaskMapper
{
    public static TransportTaskDto ToDto(TransportTask transportTask)
    {
        return new TransportTaskDto
        {
            TaskStatus = transportTask.TaskStatus,
            Description = transportTask.Description ?? string.Empty,
            FromLocation = LocationMapper.ToDto(transportTask.FromLocation),
            ToLocation = LocationMapper.ToDto(transportTask.ToLocation),
            ContactStart = transportTask.ContactStart,
            ContactEnd = transportTask.ContactEnd,
            User = transportTask.User,
            RobotId = transportTask.RobotId,
            RobotType = transportTask.RobotType,
            TaskType = transportTask.TaskType,
            ConfirmationCode = transportTask.ConfirmationCode,
            Name = transportTask.Name
        };
    }
    
    public static TransportTask ToEntity(TransportTaskCreateDto taskDto)
    {
        return new TransportTask
        {
            TaskStatus = TaskStatusEnum.Submitted,
            Description = taskDto.Description,
            ContactStart = taskDto.ContactStart,
            ContactEnd = taskDto.ContactEnd,
            FromLocation = LocationMapper.ToEntity(taskDto.FromLocation),
            ToLocation = LocationMapper.ToEntity(taskDto.ToLocation),
            User = taskDto.User,
            RobotId = taskDto.RobotId,
            RobotType = taskDto.RobotType,
            TaskType = TaskTypeEnum.TransportTask,
            Name = taskDto.Name,
            ConfirmationCode = new Random().Next(0000, 9999)
        };
    }
}