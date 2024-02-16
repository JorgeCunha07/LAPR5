using System;
using Microsoft.EntityFrameworkCore;

namespace MGT.Entities
{
    public partial class DBContext : DbContext
    {
        public DBContext()
        {
        }

        public DBContext(DbContextOptions<DBContext> options)
            : base(options)
        {
        }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql(Constants.Database.ConnectionString);
        
        public DbSet<Task> Tasks { get; set; }
        public DbSet<TransportTask> TransportTasks { get; set; }
        public DbSet<SurveillanceTask> SurveillanceTasks { get; set; }
        public DbSet<Location> Locations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Location>().ToTable("Locations");
            modelBuilder.Entity<TransportTask>().ToTable("TransportTasks");
            modelBuilder.Entity<SurveillanceTask>().ToTable("SurveillanceTasks");
            
            modelBuilder.Entity<Task>()
                .HasIndex(t => t.Name)
                .IsUnique();
            
            OnModelCreatingPartial(modelBuilder);
        }

        
         partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}