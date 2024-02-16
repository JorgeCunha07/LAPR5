using System;
using Xunit;
using Moq;
using MGT.DTO;
using MGT.Entities;
using MGT.Enums;
using MGT.Repository.Interfaces;
using MGT.Services;
using System.Threading.Tasks;

namespace MGT.Tests
{
    public class TransportTaskServiceTests
    { // Doc
        private readonly Mock<ITransportTaskRepository> _mockTransportTaskRepository;
        private readonly TransportTaskService _transportTaskService;

        public TransportTaskServiceTests()
        {
            _mockTransportTaskRepository = new Mock<ITransportTaskRepository>();
            _transportTaskService = new TransportTaskService(_mockTransportTaskRepository.Object);
        }

        
        [Fact]
        public async void Create_WithInvalidData_ThrowsArgumentException()
        {
            // Arrange
            var taskDto = new TransportTaskCreateDto
            {
                ContactStart = "InvalidPhone",
                ContactEnd = "InvalidPhone",
                Description = "Invalid Task",
                User = "InvalidUser",
                Name = "InvalidName",
                TaskStatus = TaskStatusEnum.Submitted,
                TaskType = TaskTypeEnum.TransportTask,
                FromLocation = new LocationDto { Building = "InvalidBuilding", Room = -1, X = -1, Y = -1 },
                ToLocation = new LocationDto { Building = "InvalidBuilding", Room = -1 , X = -2, Y = -2 }
            };

            // Act & Assert
            await Assert.ThrowsAsync<ArgumentException>(() => _transportTaskService.Create(taskDto));
        }

        [Fact]
        public async void GetById_ExistingId_ReturnsTask()
        {
            // Arrange
            int taskId = 1;
            var expectedTransportTask = new TransportTask
            {
                Id = 1,
                ContactStart = "+351123456789",
                ContactEnd = "+351098765431",
                ConfirmationCode = 12345,
                Description = "Deliver Package",
                User = "JohnDoe",
                Name = "DeliveryTask",
                TaskStatus = TaskStatusEnum.Submitted,
                TaskType = TaskTypeEnum.TransportTask,
                FromLocation = null,
                ToLocation = null
            };
            _mockTransportTaskRepository.Setup(repo => repo.GetById(taskId))
                .ReturnsAsync(expectedTransportTask);

            // Act
            var result = await _transportTaskService.GetById(taskId);

            // Assert
            Assert.Equal(expectedTransportTask, result);
            _mockTransportTaskRepository.Verify(repo => repo.GetById(taskId), Times.Once);
        }
    }
}
