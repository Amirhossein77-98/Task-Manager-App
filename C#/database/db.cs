using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using TaskManagerApp.Models;

namespace TaskManagerApp.Database
{
    public class AppDbContext(IConfiguration configuration) : DbContext
    {
        private readonly IConfiguration _configuration = configuration;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = _configuration.GetConnectionString("TaskManagerDatabase");
            optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
        }

        public DbSet<Users> Users { get; set; }
        public DbSet<Tasks> Tasks { get; set; }
    }
}

namespace TaskManagerApp.Database
{
    public class DbContextSingleton
    {
        private static AppDbContext? _instance;
        private static readonly object _lock = new object();

        private DbContextSingleton() { }

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
