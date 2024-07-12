using System;
using System.ComponentModel.DataAnnotations;

namespace TaskManagerApp.Models
{
    public class Users
    {
        [Key]
        public required string username { get; set; }
        public required string password { get; set; }
        public string? name { get; set; }
    }
}