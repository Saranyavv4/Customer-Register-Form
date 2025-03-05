using Microsoft.EntityFrameworkCore;

namespace CRUD_Project.Entities
{
    public class CustomerContext : DbContext
    {
        public CustomerContext(DbContextOptions<CustomerContext> dbContextOptions)
        : base(dbContextOptions){ }
        public DbSet<Customer> Customers { get; set; }
    }
}
