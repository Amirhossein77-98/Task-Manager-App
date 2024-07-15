using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TaskManagerApp.Database;

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

    public class TaskModel
    {
        public static ICollection<Tasks> FetchTasks(string username, AppDbContext context)
        {
            try
            {
                ICollection<Tasks> usersTasks = [.. context.Tasks.Where(e => e.User == username)];
                return usersTasks;
            }
            catch (System.Exception)
            {

                throw;
            }
        }
    }
}