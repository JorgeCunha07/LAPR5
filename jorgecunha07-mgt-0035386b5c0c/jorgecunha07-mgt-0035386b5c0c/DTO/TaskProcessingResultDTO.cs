using System.Collections.Generic;

namespace MGT.DTO;

public class TaskProcessingResultDto
{
    public string MinCost { get; set; }
    public List<string> MinSequence { get; set; }
}
