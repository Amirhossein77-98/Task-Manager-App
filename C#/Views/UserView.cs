using System;

namespace TaskManagerApp.Views
{
    public class UserView
    {
        public static void Successes(string message)
        {
            Console.WriteLine(message);
        }

        public static void Fail(string message)
        {
            Console.WriteLine(message);
        }
    }
}