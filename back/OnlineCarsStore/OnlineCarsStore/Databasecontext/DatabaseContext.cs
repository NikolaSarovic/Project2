using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using OnlineCarsStore.Model;
using Microsoft.AspNetCore.Identity;
namespace OnlineCarsStore.Databasecontext

{
    public class DatabaseContext: IdentityDbContext<User> 
    {
        public DbSet<User> User { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<ModelCar> ModelCars { get; set; }
        public DbSet<BrandCar> BrandCars { get; set; }
        public DbSet<Car> Cars { get; set; }
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<IdentityRole>().HasData(
                new IdentityRole { Id = Guid.NewGuid().ToString(), Name = "User", NormalizedName = "USER" },
                new IdentityRole { Id = Guid.NewGuid().ToString(), Name = "Admin", NormalizedName = "ADMIN" }
            );
            modelBuilder.Entity<Car>().Property(x => x.BrandCarId).IsRequired(false);
            modelBuilder.Entity<Car>().Property(x => x.ModelCarId).IsRequired(false);
            modelBuilder.Entity<ModelCar>().Property(x => x.BrandId).IsRequired(false);

            modelBuilder.Entity<Car>().HasOne(x => x.ModelCar).WithMany(x => x.Cars).HasForeignKey(x => x.ModelCarId).OnDelete(DeleteBehavior.SetNull);
            modelBuilder.Entity<ModelCar>().HasOne(x => x.Brand).WithMany(x => x.ModelCars).HasForeignKey(x => x.BrandId).OnDelete(DeleteBehavior.SetNull);
           
            modelBuilder.Entity<Car>().HasMany(x=>x.Image).WithOne().OnDelete(DeleteBehavior.SetNull);
        }



    }
    
}
