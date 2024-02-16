import { TaskStatusEnum } from "../Constants/TastStatusEnum";
import { TaskTypeEnum } from "../Constants/TaskTypeEnum";
import {Task_Model} from "../models/Task_Model";
import {TaskDTO} from "../dto/TaskDTO";

// Assuming Task_Model and TaskDTO are already imported or defined here

export class TaskMapper {
  public static toTaskDTO(taskModel: Task_Model): TaskDTO {
    return {
      id: taskModel.id,
      taskStatus: taskModel.taskStatus,
      description: taskModel.description,
      taskType: taskModel.taskType,
      user: taskModel.user,
      robotId: taskModel.robotId,
      robotType: taskModel.robotType,
      name: taskModel.name,
    };
  }

  public static toTaskModel(taskDTO: TaskDTO): Task_Model {
    return {
      id: taskDTO.id,
      taskStatus: taskDTO.taskStatus,
      description: taskDTO.description,
      taskType: taskDTO.taskType,
      user: taskDTO.user,
      robotId: taskDTO.robotId,
      robotType: taskDTO.robotType,
      name: taskDTO.name,
    };
  }
}
