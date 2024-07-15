using System;
using TaskManagerApp.Database;

namespace TaskManagerApp.Controllers
{
    public class UserController
    {
        public static bool UserLogin(string username, string password, AppDbContext? context)
        {
            bool result = Repositories.UserRepository.UserLogin(username, password, context);
            return result;
        }

        public static bool CheckIfTheUserExists(string username, AppDbContext context)
        {
            bool result = Repositories.UserRepository.UsernameExists(username, context);
            return result;
        }

        public static bool RegisterNewUser(string username, string password, string name, AppDbContext context)
        {
            bool result = Repositories.UserRepository.NewUserRegister(username, password, name, context);

            if (result)
            {
                Views.UserView.Successes("User register successfull");
            }
            else
            {
                Views.UserView.Fail("User register failed!");
            }
            return result;
        }
    }
}