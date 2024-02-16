using MGT.Entities;
using MGT.Repository;
using MGT.Repository.Interfaces;
using MGT.Services;
using MGT.Services.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowAnyOrigin",
        policy =>
        {
            policy.AllowAnyOrigin() // Allows any origin
                .AllowAnyHeader() // Allows any header
                .AllowAnyMethod(); // Allows any method
            
        });
});
builder.Services.AddHttpClient();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddDbContext<DBContext>(opt =>
    opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));


// Register repositories
builder.Services.AddScoped<ITransportTaskRepository, TransportTaskRepository>();
builder.Services.AddScoped<ISurveillanceTaskRepository, SurveillanceTaskRepository>();
builder.Services.AddScoped<ITaskRepository, TaskRepository>();

// Register services

builder.Services.AddScoped<ITransportTaskService, TransportTaskService>();
builder.Services.AddScoped<ISurveillanceTaskService, SurveillanceTaskService>();
builder.Services.AddScoped<ITaskService, TaskService>();
builder.Services.AddScoped<IRouteTaskService, RouteTaskService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    //app.UseSwagger();
}

app.UseHttpsRedirection();

app.UseCors("AllowAnyOrigin"); // Apply the CORS policy globally

app.MapControllers();

app.Run();