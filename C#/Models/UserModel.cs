using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TaskManagerApp.Database;

namespace TaskManagerApp.Models
{
    [Table("users")]
    public class Users
    {
        [Key]
        [Column("username")]
        [Required]
        public string? Username { get; set; }

        [Column("password")]
        [Required]
        public string? Password { get; set; }

        [Column("name")]
        public string? Name { get; set; }
    }


    public class UserModel
    {
        public static bool UserLogin(string username, string password, AppDbContext? context)
        {
            Users? result = context.Users.SingleOrDefault(e => e.Username == username && e.Password == password);

            if (result != null)
            {
                return true;
            }
            else
            {
                // Handle the case where no match is found (e.g., log an error, show a message to the user, etc.)
                return false;
            }
        }

        public static bool UserExistance(string username, AppDbContext? context)
        {
            Users? result = context.Users.SingleOrDefault(e => e.Username == username);

            if (result != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public static bool Register(string username, string password, string name, AppDbContext context)
        {
            try
            {
                var user = new Users
                {
                    Username = username,
                    Password = password,
                    Name = name
                };

                context.Add(user);
                context.SaveChanges();
                return true;
            }
            catch (System.Exception)
            {
                return false;
            }
        }
    }
}