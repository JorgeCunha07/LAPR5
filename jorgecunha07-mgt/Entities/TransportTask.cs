using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MGT.Entities
{
    public class TransportTask : Task
    {
        [StringLength(50)]
        public required string ContactStart { get; set; }

        [StringLength(50)]
        public required string ContactEnd { get; set; }
        
        public required int ConfirmationCode { get; set; }
    }
}
