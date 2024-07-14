using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManagerApp.Models
{
    [Table("tasks")]
    public class Tasks
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("title")]
        [Required]
        public string? Title { get; set; }

        [Column("description")]
        public string? Description { get; set; }

        [Column("due_date")]
        public DateTime DueDate { get; set; }

        [Column("user")]
        public string? User { get; set; }

        [Column("status")]
        public int? Status { get; set; }
    }
}