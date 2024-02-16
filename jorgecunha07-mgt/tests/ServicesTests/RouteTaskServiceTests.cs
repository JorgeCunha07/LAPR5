using Xunit;
using Moq;
using MGT.Services;
using MGT.DTO;
using System.Net.Http;
using System.Threading.Tasks;
using System.Net;
using System.Threading;
using System.Text;
using Moq.Protected;

namespace MGT.tests
{
    public class RouteTaskServiceTests
    {
        private readonly Mock<IHttpClientFactory> _mockHttpClientFactory;
        private readonly Mock<HttpMessageHandler> _mockHttpMessageHandler;
        private readonly RouteTaskService _service;

        public RouteTaskServiceTests()
        {
            _mockHttpClientFactory = new Mock<IHttpClientFactory>();
            _mockHttpMessageHandler = new Mock<HttpMessageHandler>();
            _service = new RouteTaskService(_mockHttpClientFactory.Object);

            var httpClient = new HttpClient(_mockHttpMessageHandler.Object);
            _mockHttpClientFactory.Setup(x => x.CreateClient(It.IsAny<string>())).Returns(httpClient);
        }

        private void SetupResponse(HttpStatusCode statusCode, string content = "")
        {
            _mockHttpMessageHandler.Protected()
                .Setup<Task<HttpResponseMessage>>(
                    "SendAsync",
                    ItExpr.IsAny<HttpRequestMessage>(),
                    ItExpr.IsAny<CancellationToken>()
                )
                .ReturnsAsync(new HttpResponseMessage
                {
                    StatusCode = statusCode,
                    Content = new StringContent(content, Encoding.UTF8, "application/json")
                })
                .Verifiable();
        }

        [Fact]
        public async Task ProcessTransportTasks_SuccessfulResponse_ReturnsResultDto()
        {
            // Arrange
            SetupResponse(HttpStatusCode.OK, "{\"someKey\": \"someValue\"}");
            TaskDto[] testTasks = new TaskDto[] { /* Populate with test data */ };

            // Act
            var result = await _service.ProcessTransportTasks(testTasks);

            // Assert
            Assert.NotNull(result);
            _mockHttpMessageHandler.Verify();
        }

        [Fact]
        public async Task ProcessTransportTasks_UnsuccessfulResponse_ReturnsNull()
        {
            // Arrange
            SetupResponse(HttpStatusCode.BadRequest);
            TaskDto[] testTasks = new TaskDto[] { /* Populate with test data */ };

            // Act
            var result = await _service.ProcessTransportTasks(testTasks);

            // Assert
            Assert.Null(result);
            _mockHttpMessageHandler.Verify();
        }

    }
}
