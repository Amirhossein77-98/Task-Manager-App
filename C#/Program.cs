using System;
using System.ComponentModel;
using System.Net;
using Microsoft.Extensions.Configuration;
using Microsoft.VisualBasic;
using TaskManagerApp.Database;
using TaskManagerApp.Models;

namespace TaskManagerApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            string? user = null;

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

                    Console.WriteLine(@"Main Menu:
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

            while (user == null)
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
                Console.WriteLine();
                Console.WriteLine("Here are your tasks: ");
                ICollection<Tasks> tasks = Controllers.TaskController.FetchUsersTasksByUsername(user!, context);
                if (tasks.Count == 0)
                {
                    Console.WriteLine("- You have no tasks yet.");
                }
                else
                {
                    int index = 1;
                    foreach (var task in tasks)
                    {
                        string taskStatus = "Undone";
                        if (task.Status == 1)
                        {
                            taskStatus = "Done";
                        }
                        Console.WriteLine(index + ". " + task.Title + ": " + taskStatus);
                        index++;
                    }
                }
                string userChoice = Menu(context);

                if (userChoice == "1")
                {
                    Console.WriteLine("Let's create a new task!");

                    string title = "";
                    while (true)
                    {
                        Console.WriteLine("Enter the title: ");
                        string? newTitle = Console.ReadLine();
                        if (newTitle == "")
                        {
                            Console.WriteLine("You should enter a title!");
                            continue;
                        }
                        else
                        {
                            title = newTitle!;
                            break;
                        }

                    }

                    Console.WriteLine("Enter the description: ");
                    string? description = Console.ReadLine();

                    Console.WriteLine(@"Enter the category number you want
                    1. Urgent
                    2. Important
                    :");
                    string? category = Console.ReadLine();
                    if (category == "")
                    {
                        category = "1";
                    }

                    string dueDate = "";
                    while (true)
                    {
                        Console.WriteLine("Please enter a date (YYYY-MM-dd): ");
                        string newDueDate = Console.ReadLine()!;
                        if (newDueDate == "")
                        {
                            dueDate = DateTime.Today.ToString();
                        }
                        else
                        {
                            try
                            {
                                DateTime.Parse(newDueDate);
                                dueDate = newDueDate;
                                break;
                            }
                            catch (System.Exception)
                            {
                                Console.WriteLine("Not a valid format!");
                            }
                        }
                    }

                    string status = "0";
                    Controllers.TaskController.AddNewTaskForTheUser(title, description!, category!, dueDate, status, user!, context);

                }
                else if (userChoice == "2")
                {
                    while (true)
                    {
                        Console.WriteLine();
                        Console.WriteLine("Please enter the task title you want: ");
                        string? taskTitle = Console.ReadLine();
                        Tasks? taskDetails = null;
                        foreach (var task in tasks)
                        {
                            if (taskTitle == task.Title)
                            {
                                taskDetails = Controllers.TaskController.RequestTaskDetailsByTitle(taskTitle!, user!, context);
                            }
                        }

                        if (taskDetails != null)
                        {
                            Console.WriteLine("Here is your task's details: ");
                            Console.WriteLine($"Title: {taskDetails.Title}");
                            Console.WriteLine($"Description: {taskDetails.Description}");
                            Console.WriteLine($"Category: {(taskDetails.Category == 1 ? "Urgent" : "Important")}");
                            Console.WriteLine($"Due Date: {taskDetails.DueDate}");
                            Console.WriteLine($"Status: {(taskDetails.Status == 0 ? "Undone" : "Done")}");
                        }
                        else
                        {
                            Console.WriteLine("There is no matching title. Please consider to enter an existing title.");
                            continue;
                        }
                    }

                }
                else if (userChoice == "3")
                {
                    while (true)
                    {
                        Console.WriteLine();
                        Console.WriteLine("Please choose the task title you want to update: ");
                        string? taskTitle = Console.ReadLine();
                        Tasks? taskDetails = null;
                        foreach (var task in tasks)
                        {
                            if (taskTitle == task.Title)
                            {
                                taskDetails = Controllers.TaskController.RequestTaskDetailsByTitle(taskTitle!, user!, context);
                            }
                        }

                        if (taskDetails != null)
                        {
                            Console.WriteLine("Here is your task's details: ");
                            Console.WriteLine($"Title: {taskDetails.Title}");
                            Console.WriteLine($"Description: {taskDetails.Description}");
                            Console.WriteLine($"Category: {(taskDetails.Category == 1 ? "Urgent" : "Important")}");
                            Console.WriteLine($"Due Date: {taskDetails.DueDate}");
                            Console.WriteLine($"Status: {(taskDetails.Status == 0 ? "Undone" : "Done")}");

                            string title = "";
                            while (true)
                            {
                                Console.WriteLine("Enter the new title (Leave blank for default): ");
                                string? newTitle = Console.ReadLine();
                                if (newTitle == "")
                                {
                                    title = taskDetails.Title!;
                                    break;
                                }
                                else
                                {
                                    title = newTitle!;
                                    break;
                                }

                            }

                            Console.WriteLine("Enter the new description (Leave blank for default): ");
                            string? description = Console.ReadLine();

                            if (description == "")
                            {
                                description = taskDetails.Description;
                            }

                            Console.WriteLine(@"Enter the category number you want
1. Urgent
2. Important
:");
                            string? category = Console.ReadLine();
                            if (category == "")
                            {
                                category = taskDetails.Category.ToString();
                            }

                            string dueDate = "";
                            while (true)
                            {
                                Console.WriteLine("Please enter a date (YYYY-MM-dd): ");
                                string newDueDate = Console.ReadLine()!;
                                if (newDueDate == "")
                                {
                                    dueDate = taskDetails.DueDate.ToString();
                                }
                                else
                                {
                                    try
                                    {
                                        DateTime.Parse(newDueDate);
                                        dueDate = newDueDate;
                                        break;
                                    }
                                    catch (System.Exception)
                                    {
                                        Console.WriteLine("Not a valid format!");
                                    }
                                }
                            }

                            Console.WriteLine(@"Choose the staus (Leave blank to keep it unchanged):
                            0 = Undone
                            1 = Done:");
                            string? newStatus = Console.ReadLine();
                            if (newStatus == "")
                            {
                                newStatus = taskDetails.Status.ToString();
                            }
                            Controllers.TaskController.UpdateUsersTaskByTitle(title, description!, category!, dueDate, newStatus!, user!, taskDetails.Title!, context);
                            break;
                        }
                        else
                        {
                            Console.WriteLine("There is no matching title. Please consider to enter an existing title.");
                            continue;
                        }
                    }

                }
                else if (userChoice == "4")
                {
                    Console.WriteLine();
                    Console.WriteLine("Please enter the task title you want to delete: ");
                    string? taskTitle = Console.ReadLine();
                    Tasks? taskDetails = null;
                    foreach (var task in tasks)
                    {
                        if (taskTitle == task.Title)
                        {
                            taskDetails = Controllers.TaskController.RequestTaskDetailsByTitle(taskTitle!, user!, context);
                        }
                    }

                    if (taskDetails != null)
                    {
                        Console.WriteLine("Here is your task's details: ");
                        Console.WriteLine($"Title: {taskDetails.Title}");
                        Console.WriteLine($"Description: {taskDetails.Description}");
                        Console.WriteLine($"Category: {(taskDetails.Category == 1 ? "Urgent" : "Important")}");
                        Console.WriteLine($"Due Date: {taskDetails.DueDate}");
                        Console.WriteLine($"Status: {(taskDetails.Status == 0 ? "Undone" : "Done")}");
                        Console.WriteLine();
                        Console.WriteLine("Are you sure you want to delete this task (y/n)? ");
                        string? confirm = Console.ReadLine();

                        if (confirm!.ToLower() == "y")
                        {
                            Controllers.TaskController.DeleteTaskByTitle(taskDetails.Title!, user!, context);
                        }
                        else
                        {
                            Console.WriteLine("Ok, deletion Cancelled!");
                        }
                    }
                    else
                    {
                        Console.WriteLine("There is no matching title. Please consider to enter an existing title.");
                        continue;
                    }

                }
                else if (userChoice == "5")
                {
                    Console.WriteLine();
                    Console.WriteLine("Please enter the task title you want to delete: ");
                    string? taskTitle = Console.ReadLine();
                    Tasks? taskDetails = null;
                    foreach (var task in tasks)
                    {
                        if (taskTitle == task.Title)
                        {
                            taskDetails = Controllers.TaskController.RequestTaskDetailsByTitle(taskTitle!, user!, context);
                        }
                    }

                    if (taskDetails != null)
                    {
                        Controllers.TaskController.MarkTaskAsDoneByTitle(taskDetails.Title!, user!, context);
                    }
                    else
                    {
                        Console.WriteLine("There is no matching title. Please consider to enter an existing title.");
                        continue;
                    }
                }
                else if (userChoice == "6")
                {
                    user = null;
                }
                else if (userChoice == "7")
                {
                    break;
                }
                else
                {

                }
            }

        }
    }
}