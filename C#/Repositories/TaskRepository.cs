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
        public static Tasks GetTaskByTitle(string title, string user, AppDbContext context)
        {
            Tasks taskDetail = Models.TaskModel.FetchTaskByTitle(title, user, context);
            return taskDetail;
        }

        public static bool UpdateUsersTask(string title, string description, string category, string dueDate, string status, string user, string prevTitle, AppDbContext context)
        {
            bool result = Models.TaskModel.UpdateTaskByTitle(title, description, category, dueDate, status, user, prevTitle, context);
            return result;
        }

        public static bool DeleteTaskByTitle(string title, string user, AppDbContext context)
        {
            bool result = Models.TaskModel.DeleteTaskByTitle(title, user, context);
            return result;
        }

        public static bool MarkDone(string title, string user, AppDbContext context)
        {
            bool result = Models.TaskModel.MarkDone(title, user, context);
            return result;
        }
    }
}