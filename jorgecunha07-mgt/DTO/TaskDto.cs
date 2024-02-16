using MGT.Enums;

namespace MGT.DTO;

public class TaskDto
{
    public TaskStatusEnum TaskStatus { get; set; }
    public TaskTypeEnum TaskType { get; set; }
    public required string Description { get; set; }
    public required string User { get; set; }
    public string RobotId { get; set; }
    public string RobotType { get; set; }
    public required string Name { get; set; }
    public LocationDto FromLocation { get; set; }
    public LocationDto ToLocation { get; set; }
}
