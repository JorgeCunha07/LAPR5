using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MGT.Entities
{
    public class SurveillanceTask : Task
    {
        [StringLength(50)]
        public required string ContactInfo { get; set; }
    }
}
