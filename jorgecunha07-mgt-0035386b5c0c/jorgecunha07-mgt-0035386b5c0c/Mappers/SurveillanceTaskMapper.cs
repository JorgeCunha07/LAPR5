using MGT.DTO;
using MGT.Entities;
using MGT.Enums;

namespace MGT.Mappers;

public static class SurveillanceTaskMapper
{
    public static SurveillanceTaskDto ToDto(SurveillanceTask surveillanceTask)
    {
        return new SurveillanceTaskDto
        {
            TaskStatus = surveillanceTask.TaskStatus,
            Description = surveillanceTask.Description ?? string.Empty,
            FromLocation = LocationMapper.ToDto(surveillanceTask.FromLocation),
            ToLocation = LocationMapper.ToDto(surveillanceTask.ToLocation),
            ContactInfo = surveillanceTask.ContactInfo,
            User = surveillanceTask.User,
            RobotId = surveillanceTask.RobotId,
            RobotType = surveillanceTask.RobotType,
            Name = surveillanceTask.Name,
        };
    }

    public static SurveillanceTask ToEntity(SurveillanceTaskCreateDto taskDto)
    {
        return new SurveillanceTask
        {
            TaskStatus = TaskStatusEnum.Submitted,
            Description = taskDto.Description,
            FromLocation = LocationMapper.ToEntity(taskDto.FromLocation),
            ToLocation = LocationMapper.ToEntity(taskDto.ToLocation),
            ContactInfo = taskDto.ContactInfo,
            User = taskDto.User,
            RobotId = taskDto.RobotId,
            RobotType = taskDto.RobotType,
            TaskType = TaskTypeEnum.SurveillanceTask,
            Name = taskDto.Name,
        };
    }
}