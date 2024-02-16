using System;
using System.Linq;
using MGT.Entities;
using MGT.Enums;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace MGT.Tests.DomainTest
{
    public class TaskEntityTests : IDisposable
    {
        private readonly DBContext _dbContext;

        public TaskEntityTests()
        {
            var options = new DbContextOptionsBuilder<DBContext>()
                .UseNpgsql("YourTestDatabaseConnectionString") // Replace with your test DB connection string
                .Options;

            _dbContext = new DBContext(options);
            _dbContext.Database.EnsureCreated();
        }

        public void Dispose()
        {
            _dbContext.Database.EnsureDeleted();
            _dbContext.Dispose();
        }

        private Task CreateSampleTask()
        {
            return new Task
            {
                TaskStatus = TaskStatusEnum.Submitted,
                TaskType = TaskTypeEnum.TransportTask,
                User = "user@example.com",
                Name = "SamplettTask",
                FromLocation = new Location { Building = "A01", Room = 101, X = 10, Y = 20 },
                ToLocation = new Location { Building = "B02", Room = 102, X = 15, Y = 25 },
                // Other optional properties can be set here
            };
        }

        [Fact]
        public void AddTask_ShouldAddTaskToDatabase()
        {
            var task = CreateSampleTask();

            _dbContext.Tasks.Add(task);
            _dbContext.SaveChanges();

            var retrievedTask = _dbContext.Tasks.FirstOrDefault(t => t.Id == task.Id);
            Assert.NotNull(retrievedTask);
            Assert.Equal(task.Name, retrievedTask.Name);
            // More assertions can be added to verify other properties
        }

        [Fact]
        public void UpdateTask_ShouldUpdateInDatabase()
        {
            var task = CreateSampleTask();
            _dbContext.Tasks.Add(task);
            _dbContext.SaveChanges();

            task.Name = "Updated Task Name";
            _dbContext.Tasks.Update(task);
            _dbContext.SaveChanges();

            var updatedTask = _dbContext.Tasks.FirstOrDefault(t => t.Id == task.Id);
            Assert.NotNull(updatedTask);
            Assert.Equal("Updated Task Name", updatedTask.Name);
        }

        [Fact]
        public void DeleteTask_ShouldRemoveFromDatabase()
        {
            var task = CreateSampleTask();
            _dbContext.Tasks.Add(task);
            _dbContext.SaveChanges();

            _dbContext.Tasks.Remove(task);
            _dbContext.SaveChanges();

            var retrievedTask = _dbContext.Tasks.FirstOrDefault(t => t.Id == task.Id);
            Assert.Null(retrievedTask);
        }

        [Fact]
        public void GetTask_ShouldRetrieveFromDatabase()
        {
            var task = CreateSampleTask();
            _dbContext.Tasks.Add(task);
            _dbContext.SaveChanges();

            var retrievedTask = _dbContext.Tasks.FirstOrDefault(t => t.Id == task.Id);
            Assert.NotNull(retrievedTask);
            Assert.Equal(task.Name, retrievedTask.Name);
        }

    }
}
