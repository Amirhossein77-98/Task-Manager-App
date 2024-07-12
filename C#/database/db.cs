using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using TaskManagerApp.Models;

namespace TaskManagerApp.Database
{
    public class AppDbContext(IConfiguration configuration) : DbContext
    {
        protected readonly IConfiguration Configuration = configuration;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = Configuration.GetConnectionString("TaskManagerDatabase");
            optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
            base.OnConfiguring(optionsBuilder);
        }

        public DbSet<Users> users { get; set; }
        public DbSet<Tasks> tasks { get; set; }

    }
}