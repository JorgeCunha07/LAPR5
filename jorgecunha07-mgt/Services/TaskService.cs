using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MGT.DTO;
using MGT.Entities;
using MGT.Enums;
using MGT.Mappers;
using MGT.Repository.Interfaces;
using MGT.Services.Interfaces;

namespace MGT.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;

         /// <summary>
         /// Initializes a new instance of the <see cref="TaskService"/> class.
          /// </summary>
         /// <param name="taskRepository">The repository for task data access.</param>
         public TaskService(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository ?? throw new ArgumentNullException(nameof(taskRepository));
        }

       /// <summary>
        /// Retrieves a task by its unique identifier.
        /// </summary>
        /// <param name="id">The unique identifier of the task.</param>
        /// <returns>The task entity with the specified ID.</returns>
        public Task<Entities.Task> GetById(int id)
        {
            return _taskRepository.GetById(id);
        }

        /// <summary>
        /// Changes the status of a task by name.
        /// </summary>
        /// <param name="name">The name of the task.</param>
        /// <param name="newStatus">The new status to assign to the task.</param>
        /// <returns>The updated task DTO with the new status.</returns>
        public async Task<TaskDto> ChangeStatus(string name, string newStatus)
        {
            if (string.IsNullOrWhiteSpace(newStatus))
            {
                throw new ArgumentNullException(nameof(newStatus), "New status cannot be null or empty.");
            }

            var task = await _taskRepository.GetByName(name);
            
            if (task == null)
            {
                throw new InvalidOperationException($"Task with name {name} does not exist.");
            }            
            
            if (task.TaskStatus != TaskStatusEnum.Submitted)
            {
                throw new InvalidOperationException($"Task with name {name} cannot have its status changed. Current status is {task.TaskStatus}.");
            }

            if (!Enum.TryParse<TaskStatusEnum>(newStatus, ignoreCase: true, out var parsedStatus))
            {
                throw new ArgumentException($"Invalid status: {newStatus}.", nameof(newStatus));
            }

            if (!Enum.IsDefined(typeof(TaskStatusEnum), parsedStatus))
            {
                throw new ArgumentException($"Invalid status: {newStatus}.", nameof(newStatus));
            }

            task.TaskStatus = parsedStatus;

            await _taskRepository.Update(task);

            return TaskMapper.ToDto(task);
        }

        /// <summary>
        /// Retrieves tasks with a specific status.
        /// </summary>
        /// <param name="status">The status of tasks to retrieve.</param>
        /// <returns>A collection of tasks with the specified status.</returns>
        public async Task<IEnumerable<Entities.Task>> GetTasksByStatus(TaskStatusEnum status)
        {
            return await _taskRepository.GetTasksByStatus(status);
        }
        
        public async Task<IEnumerable<Entities.Task>> GetFilteredTasks(string robotType, string userEmail, TaskStatusEnum? status)
        {
            IEnumerable<Entities.Task> tasks = await _taskRepository.GetAllTasks();

            if (!string.IsNullOrWhiteSpace(robotType))
            {
                tasks = tasks.Where(t => t.RobotType != null && t.RobotType.ToLower().Contains(robotType.ToLower()));
            }

            if (!string.IsNullOrWhiteSpace(userEmail))
            {
                tasks = tasks.Where(t => t.User.ToLower().Contains(userEmail.ToLower()));
            }

            if (status.HasValue)
            {
                tasks = tasks.Where(t => t.TaskStatus == status.Value);
            }

            return tasks;
        }

        /// <summary>
        /// Associates a robot and robot type with a task.
        /// </summary>
        /// <param name="name">The name of the task to attribute the robot to.</param>
        /// <param name="robot">The identifier of the robot.</param>
        /// <param name="robotType">The type of the robot.</param>
        /// <returns>The updated task DTO with the attributed robot information.</returns>
        public async Task<TaskDto> AttributeRobotToTask(string name, string robot, string robotType)
        {
            if (string.IsNullOrWhiteSpace(robot))
            {
                throw new ArgumentNullException(nameof(robot), "Robot cannot be null or empty.");
            }

            if (string.IsNullOrWhiteSpace(robotType))
            {
                throw new ArgumentNullException(nameof(robotType), "Robot type cannot be null or empty.");
            }

            var task = await _taskRepository.GetByName(name);
            
            if (task == null)
            {
                throw new InvalidOperationException($"Task with name {name} does not exist.");
            }            
            
            if (task.TaskStatus != TaskStatusEnum.Submitted)
            {
                throw new InvalidOperationException($"Task with name {name} cannot have a robot attributed. Current status is {task.TaskStatus}.");
            }

            task.RobotId = robot;
            task.RobotType = robotType;

            await _taskRepository.Update(task);

            return TaskMapper.ToDto(task);
        }
    }
}