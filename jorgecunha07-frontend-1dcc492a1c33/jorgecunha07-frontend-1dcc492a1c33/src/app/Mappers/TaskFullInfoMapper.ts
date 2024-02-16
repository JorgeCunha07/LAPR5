import { TaskStatusEnum } from "../Constants/TastStatusEnum";
import { TaskTypeEnum } from "../Constants/TaskTypeEnum";
import {Task_Full_Info_Model} from "../models/Task_Full_Info_Model";
import {Task_Full_InfoDTO} from "../dto/Task_Full_InfoDTO";

// LocationDto and Task_Full_InfoDTO, Task_Full_Info_Model are assumed to be imported or defined here

export class TaskFullInfoMapper {
  public static toTaskFullInfoDTO(model: Task_Full_Info_Model): Task_Full_InfoDTO {
    return {
      taskStatus: model.taskStatus as TaskStatusEnum,
      taskType: model.taskType as TaskTypeEnum,
      description: model.description,
      user: model.user,
      robotId: model.robotId,
      robotType: model.robotType,
      name: model.name,
      fromLocation: {
        building: model.fromLocation.building,
        room: model.fromLocation.room,
        x: model.fromLocation.x,
        y: model.fromLocation.y
      },
      toLocation: {
        building: model.toLocation.building,
        room: model.toLocation.room,
        x: model.toLocation.x,
        y: model.toLocation.y
      }
    };
  }

  public static toTaskFullInfoModel(dto: Task_Full_InfoDTO): Task_Full_Info_Model {
    return {
      taskStatus: dto.taskStatus,
      taskType: dto.taskType,
      description: dto.description,
      user: dto.user,
      robotId: dto.robotId,
      robotType: dto.robotType,
      name: dto.name,
      fromLocation: {
        building: dto.fromLocation.building,
        room: dto.fromLocation.room,
        x: dto.fromLocation.x,
        y: dto.fromLocation.y
      },
      toLocation: {
        building: dto.toLocation.building,
        room: dto.toLocation.room,
        x: dto.toLocation.x,
        y: dto.toLocation.y
      }
    };
  }
}
