using MGT.DTO;
using MGT.Entities;
using MGT.Enums;

namespace MGT.Mappers;

public static class TaskMapper
{
    public static TaskDto ToDto(Task task)
    {
        return new TaskDto
        {
            TaskStatus = task.TaskStatus,
            Description = task.Description ?? string.Empty,
            User = task.User,
            RobotId = task.RobotId ?? string.Empty,
            RobotType = task.RobotType ?? string.Empty,
            Name = task.Name,
            TaskType = task.TaskType,
            FromLocation = LocationMapper.ToDto(task.FromLocation),
            ToLocation = LocationMapper.ToDto(task.ToLocation)
        };
    }

    public static Task ToEntity(TaskDto taskDto)
    {
        return new Task
        {
            TaskStatus = TaskStatusEnum.Submitted,
            Description = taskDto.Description,
            User = taskDto.User,
            RobotId = taskDto.RobotId,
            RobotType = taskDto.RobotType,
            TaskType = taskDto.TaskType,
            Name = taskDto.Name,
            FromLocation = LocationMapper.ToEntity(taskDto.FromLocation),
            ToLocation = LocationMapper.ToEntity(taskDto.ToLocation)
        };
    }
                                                                                    
}