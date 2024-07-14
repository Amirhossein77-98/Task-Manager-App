using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManagerApp.Models
{
    [Table("users")]
    public class Users
    {
        [Key]
        [Column("username")]
        [Required]
        public string? Username { get; set; }

        [Column("password")]
        [Required]
        public string? Password { get; set; }

        [Column("name")]
        public string? Name { get; set; }
    }
}