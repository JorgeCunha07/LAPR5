#nullable enable


namespace MGT.DTO;

public class TransportTaskCreateDto : TaskDto
{
    
    public required string ContactStart { get; set; }
    
    public required string ContactEnd { get; set; }
    
}