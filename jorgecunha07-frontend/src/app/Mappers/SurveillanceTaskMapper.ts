import { TaskStatusEnum } from "../Constants/TastStatusEnum";
import SurveillanceTask_Model from "../models/SurveillanceTask_Model";
import SurveillanceTaskDTO from "../dto/SurveillanceTaskDTO";

// Assuming LocationDto and SurveillanceTaskDTO, SurveillanceTask_Model are imported or defined here

export class SurveillanceTaskMapper {
  public static toSurveillanceTaskDTO(model: SurveillanceTask_Model): SurveillanceTaskDTO {
    return {
      TaskState: model.TaskState,
      Description: model.Description,
      FromLocation: {
        Building: model.FromLocation.Building,
        Room: model.FromLocation.Room,
        X: model.FromLocation.X,
        Y: model.FromLocation.Y
      },
      ToLocation: { ...model.ToLocation },
      ContactInfo: model.ContactInfo,
      User: model.User,
      RobotId: model.RobotId,
      RobotType: model.RobotType,
      name: model.name
    };
  }

  public static toSurveillanceTaskModel(dto: SurveillanceTaskDTO): SurveillanceTask_Model {
    return {
      TaskState: dto.TaskState,
      Description: dto.Description,
      FromLocation: {
        Building: dto.FromLocation.Building,
        Room: dto.FromLocation.Room,
        X: dto.FromLocation.X,
        Y: dto.FromLocation.Y
      },
      ToLocation: { ...dto.ToLocation },
      ContactInfo: dto.ContactInfo,
      User: dto.User,
      RobotId: dto.RobotId,
      RobotType: dto.RobotType,
      name: dto.name
    };
  }
}
