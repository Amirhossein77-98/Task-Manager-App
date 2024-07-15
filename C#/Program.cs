using System;
using Microsoft.Extensions.Configuration;
using TaskManagerApp.Database;
using TaskManagerApp.Models;

namespace TaskManagerApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            string user = "";

            // Build configuration
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("G:/Codes/Summer Time/Task Manager/C#/appsettings.json", optional: false, reloadOnChange: true);

            IConfiguration configuration = builder.Build();

            // Initialize DbContext
            using var context = DbContextSingleton.GetInstance(configuration);

            // Login Function
            static string Login(AppDbContext context)
            {
                while (true)
                {

                    string username = "";
                    while (true)
                    {
                        Console.WriteLine("Please enter your username: ");
                        string inputUsername = Console.ReadLine()!;
                        if (inputUsername == "")
                        {
                            Console.WriteLine("You should enter a username. Try again.");
                            continue;
                        }
                        else
                        {
                            username = inputUsername;
                            break;
                        }
                    }

                    string password = "";
                    while (true)
                    {
                        Console.WriteLine("Please enter your password: ");
                        string inputPassword = Console.ReadLine()!;
                        if (inputPassword == "")
                        {
                            Console.WriteLine("You should enter a password. Try again.");
                            continue;
                        }
                        else
                        {
                            password = inputPassword;
                            break;
                        }
                    }

                    bool result = Controllers.UserController.UserLogin(username, password, context);

                    if (result)
                    {
                        return username;
                    }
                    else
                    {
                        Console.WriteLine("User not found!");
                        continue;
                    }
                }
            }

            // Register Login
            static string Register(AppDbContext context)
            {
                string username = "";
                while (true)
                {
                    Console.WriteLine("Please choose a username: ");
                    string newUsername = Console.ReadLine()!;

                    if (newUsername == "")
                    {
                        Console.WriteLine("Please enter a username!");
                        continue;
                    }

                    bool isUsernameExist = Controllers.UserController.CheckIfTheUserExists(newUsername, context);
                    if (isUsernameExist)
                    {
                        Console.WriteLine("Username already exists. Choose another one.");
                        continue;
                    }
                    else
                    {
                        username = newUsername;
                        break;
                    }
                }


                string password = "";
                while (true)
                {
                    Console.WriteLine("Please enter a password: ");
                    string newPassword = Console.ReadLine()!;

                    if (newPassword == "")
                    {
                        Console.WriteLine("Please enter a password!");
                        continue;
                    }

                    Console.WriteLine("Please confirm your password: ");
                    string passConfirm = Console.ReadLine()!;

                    if (newPassword == passConfirm)
                    {
                        password = newPassword;
                        break;
                    }
                    else
                    {
                        Console.WriteLine("Confirmation Password doesn't match the chosen password! Try again.");
                        continue;
                    }
                }

                Console.WriteLine("Please enter your name: ");
                string name = Console.ReadLine()!;

                bool result = Controllers.UserController.RegisterNewUser(username, password, name, context);

                if (result)
                {
                    return username;
                }
                else
                {
                    return "";
                }
            }

            static string Menu(AppDbContext context)
            {
                while (true)
                {

                    Console.WriteLine(@"📃 Main Menu:
1. New Task
2. View Task Detail
3. Update Task
4. Delete Task
5. Mark as Done
6. Logout
7. Exit
Choose the operation you want:");
                    string option = Console.ReadLine()!;
                    if (option == "")
                    {
                        Console.WriteLine("Please choose an option.");
                        continue;
                    }
                    else
                    {
                        return option;
                    }
                }
            }

            while (user == "")
            {

                Console.WriteLine(@"Hi. In order to use the app you should register or login to your account first.
Choose what you want to do:
1. Login, If you already have an account
2. Register, If you are a new user
: ");
                string? userChoice = Console.ReadLine();

                if (userChoice == "1")
                {
                    user = Login(context);
                }
                else if (userChoice == "2")
                {
                    user = Register(context);
                }
                else
                {
                    Console.WriteLine("Wrong option. Please choose either 1 or 2.");
                }
            }

            while (true)
            {
                ICollection<Tasks> tasks = Controllers.TaskController.FetchUsersTasksByUsername(user, context);
                foreach (var task in tasks)
                {
                    Console.WriteLine(task.Title);
                }
                Menu(context);
            }

        }
    }
}