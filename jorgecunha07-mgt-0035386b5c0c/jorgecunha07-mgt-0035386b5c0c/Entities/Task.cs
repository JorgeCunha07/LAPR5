#nullable enable

using System.ComponentModel.DataAnnotations;
using System.Data;
using MGT.Enums;
using Microsoft.EntityFrameworkCore;

namespace MGT.Entities
{
    public class Task
    {
        [Key]
        public int Id { get; init; }
        
        public required TaskStatusEnum TaskStatus { get; set; }
        
        [StringLength(255)]
        public string? Description { get; set; }
        
        public required TaskTypeEnum TaskType { get; set; }
        
        [EmailAddress]
        [StringLength(50)]
        public required string User { get; set; } = string.Empty;

        [StringLength(50)]
        public string? RobotId { get; set; }

        [StringLength(50)]
        public string? RobotType { get; set; }
        
        [StringLength(50)]
        public required string Name { get; set; }
        
        public required Location FromLocation { get; set; }
        
        public required Location ToLocation { get; set; }
    }
}