#nullable enable

namespace MGT.DTO;

public class TransportTaskDto : TaskDto
{
    public required string ContactStart { get; set; }

    public required string ContactEnd { get; set; } 

    public required int ConfirmationCode { get; set; }
}