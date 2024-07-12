using System;

namespace TaskManagerApp.Models
{
    public class Tasks
    {
        public int id { get; set; }
        public required string title { get; set; }
        public string? description { get; set; }
        public DateTime due_date { get; set; }
        public required string user { get; set; }
        public required int status { get; set; }
    }
}