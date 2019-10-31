using Microsoft.EntityFrameworkCore;
using Knowurteam.API.Models;

namespace Knowurteam.API.Data{
    public class DataContext : DbContext 
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}
        public DbSet<Value> Values {get; set;}//La clase de Models que le corresponde
        public DbSet<User> Users { get; set; }

    }
}