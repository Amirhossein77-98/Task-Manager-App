using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using TaskManagerApp.Models;

namespace TaskManagerApp.Database
{
    public class AppDbContext(IConfiguration configuration) : DbContext
    {
        protected readonly IConfiguration _configuration = configuration;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = _configuration.GetConnectionString("TaskManagerDatabase");
            optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
            base.OnConfiguring(optionsBuilder);
        }

        public DbSet<Users> Users { get; set; }
        public DbSet<Tasks> Tasks { get; set; }

    }

    public class DBContextSingleton
    {
        private static AppDbContext? _instance;
        private static readonly object _lock = new object();

        private DBContextSingleton() { }

        public static AppDbContext GetInstance(IConfiguration configuration)
        {
            lock (_lock)
            {
                _instance ??= new AppDbContext(configuration);
            }
            return _instance;
        }
    }
}