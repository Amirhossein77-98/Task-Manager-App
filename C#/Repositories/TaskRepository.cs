using System;
using TaskManagerApp.Database;
using TaskManagerApp.Models;


namespace TaskManagerApp.Repositories
{
    public class TaskRepository
    {
        public static ICollection<Tasks> FetchUsersTasks(string username, AppDbContext context)
        {
            ICollection<Tasks> result = Models.TaskModel.FetchTasks(username, context);
            return result;
        }
    }
}