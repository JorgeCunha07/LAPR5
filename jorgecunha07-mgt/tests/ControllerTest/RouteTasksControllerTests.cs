using Xunit;
using Moq;
using MGT.Controllers;
using MGT.Services.Interfaces;
using MGT.DTO;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Net.Http;

namespace MGT.Tests
{
    public class RouteTasksControllerTests
    {
        private readonly Mock<IRouteTaskService> _mockRouteTaskService;
        private readonly Mock<IHttpClientFactory> _mockHttpClientFactory;
        private readonly RouteTasksController _controller;

        public RouteTasksControllerTests()
        {
            _mockRouteTaskService = new Mock<IRouteTaskService>();
            _mockHttpClientFactory = new Mock<IHttpClientFactory>();
            _controller = new RouteTasksController(_mockRouteTaskService.Object, _mockHttpClientFactory.Object);

            // Set up a default HttpContext for the controller
            _controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext
                {
                    User = new ClaimsPrincipal(new ClaimsIdentity(new List<Claim>
                    {
                        new Claim(ClaimTypes.Name, "testuser"),
                        new Claim(ClaimTypes.Role, "Admin")
                        // Add other claims as needed
                    }))
                }
            };
        }


        [Fact]
        public async Task ProcessTransportTasks_WithNoTasks_ReturnsBadRequest()
        {
            // Arrange
            TaskDto[] testTasks = null;

            // Act
            var result = await _controller.ProcessTransportTasks(testTasks);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }
        
    }
}
