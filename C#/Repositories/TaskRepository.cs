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

        public static bool AddNewTask(string title, string description, string category, string dueDate, string status, string user, AppDbContext context)
        {
            bool result = Models.TaskModel.AddNewTask(title, description, category, dueDate, status, user, context);
            return result;
        }
    }
}