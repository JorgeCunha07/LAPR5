using System.ComponentModel.DataAnnotations;
namespace MGT.Entities;
public class Location
{
    [Key]
    public int Id { get; init; }
    [StringLength(3)]
    public required string Building { get; set; }
    public required int Room { get; set; }
    public required int X { get; set; }
    public required int Y { get; set; }
}