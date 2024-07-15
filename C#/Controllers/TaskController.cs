using System;
using TaskManagerApp.Database;
using TaskManagerApp.Models;

namespace TaskManagerApp.Controllers
{
    class TaskController
    {
        public static ICollection<Tasks> FetchUsersTasksByUsername(string username, AppDbContext context)
        {
            ICollection<Tasks> result = Repositories.TaskRepository.FetchUsersTasks(username, context);
            return result;
        }

        public static void AddNewTaskForTheUser(string title, string description, string category, string dueDate, string status, string user, AppDbContext context)
        {
            bool result = Repositories.TaskRepository.AddNewTask(title, description, category, dueDate, status, user, context);
            if (result)
            {
                Views.TaskView.TaskOperationsResult("Task created successfully.");
            }
            else
            {
                Views.TaskView.TaskOperationsResult("Task creation failed!");
            }
        }
    }
}