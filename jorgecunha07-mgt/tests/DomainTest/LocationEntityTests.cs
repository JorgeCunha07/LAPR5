using System;
using System.Linq;
using MGT.Entities;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace MGT.Tests.DomainTest
{
    public class LocationEntityTests : IDisposable
    {
        private readonly DBContext _dbContext;

        public LocationEntityTests()
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

        private Location CreateSampleLocation()
        {
            return new Location
            {
                Building = "A01", // StringLength is limited to 3
                Room = 101,
                X = 10,
                Y = 20
            };
        }
    }
}
