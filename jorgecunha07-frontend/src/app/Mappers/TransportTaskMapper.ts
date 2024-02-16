// Assuming the Location interface and TransportTaskDTO, TransportTask_Model are imported or defined here

import TransportTask_Model from "../models/TransportTask_Model";
import TransportTaskDTO from "../dto/TransportTaskDTO";

export class TransportTaskMapper {
  public static toTransportTaskDTO(model: TransportTask_Model): TransportTaskDTO {
    return {
      Description: model.Description,
      FromLocation: { ...model.FromLocation },
      ToLocation: { ...model.ToLocation },
      ContactStart: model.ContactStart,
      ContactEnd: model.ContactEnd,
      User: model.User,
      RobotId: model.RobotId,
      RobotType: model.RobotType,
      name: model.name
    };
  }

  public static toTransportTaskModel(dto: TransportTaskDTO): TransportTask_Model {
    return {
      Description: dto.Description,
      FromLocation: {
        Building: dto.FromLocation.Building,
        Room: dto.FromLocation.Room,
        X: dto.FromLocation.X,
        Y: dto.FromLocation.Y
      },
      ToLocation: { ...dto.ToLocation },
      ContactStart: dto.ContactStart,
      ContactEnd: dto.ContactEnd,
      User: dto.User,
      RobotId: dto.RobotId,
      RobotType: dto.RobotType,
      name: dto.name
    };
  }
}
