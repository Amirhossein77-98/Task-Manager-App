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

        public static Tasks RequestTaskDetailsByTitle(string title, string user, AppDbContext context)
        {
            Tasks taskDetails = Repositories.TaskRepository.GetTaskByTitle(title, user, context);
            return taskDetails;
        }

        public static void UpdateUsersTaskByTitle(string title, string description, string category, string dueDate, string status, string user, string prevTitle, AppDbContext context)
        {
            bool result = Repositories.TaskRepository.UpdateUsersTask(title, description, category, dueDate, status, user, prevTitle, context);

            if (result)
            {
                Views.TaskView.TaskOperationsResult("Task Updated Successfully!");
            }
            else
            {
                Views.TaskView.TaskOperationsResult("Task Update Failed!");
            }
        }

        public static void DeleteTaskByTitle(string title, string user, AppDbContext context)
        {
            bool result = Repositories.TaskRepository.DeleteTaskByTitle(title, user, context);

            if (result)
            {
                Views.TaskView.TaskOperationsResult("Task Deleted successfully");
            }
            else
            {
                Views.TaskView.TaskOperationsResult("Task deletion failed!");
            }
        }

        public static void MarkTaskAsDoneByTitle(string title, string user, AppDbContext context)
        {
            bool result = Repositories.TaskRepository.MarkDone(title, user, context);
            if (result)
            {
                Views.TaskView.TaskOperationsResult("Task Marked as Done Successfully.");
            }
            else
            {
                Views.TaskView.TaskOperationsResult("Failed to mark task as Done");
            }
        }
    }
}