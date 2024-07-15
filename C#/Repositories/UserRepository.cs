using System;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore.Query;
using TaskManagerApp.Database;
using TaskManagerApp.Models;

namespace TaskManagerApp.Repositories
{
    public class UserRepository
    {
        public static bool UserLogin(string username, string password, AppDbContext? context)
        {
            bool result = Models.UserModel.UserLogin(username, password, context);
            return result;
        }

        public static bool UsernameExists(string username, AppDbContext context)
        {
            bool result = Models.UserModel.UserExistance(username, context);
            return result;
        }

        public static bool NewUserRegister(string username, string password, string name, AppDbContext context)
        {
            bool result = Models.UserModel.Register(username, password, name, context);
            return result;
        }
    }
}