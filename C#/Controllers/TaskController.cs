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
    }
}