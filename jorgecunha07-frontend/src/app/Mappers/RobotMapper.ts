import RobotDTO from "../dto/RobotDTO";
import Robot_Model from "../models/Robot_Model";

export class RobotMapper {
  static dtoToModel(dto: RobotDTO): Robot_Model {
    return {
      robotCode: dto.robotCode,
      robotDescription: dto.robotDescription,
      robotNickname: dto.robotNickname,
      robotSerialNumber: dto.robotSerialNumber,
      robotTypeName: dto.robotTypeName,
      enabled: dto.enabled,
    };
  }

  static modelToDto(model: Robot_Model): RobotDTO {
    return {
      robotCode: model.robotCode,
      robotDescription: model.robotDescription,
      robotNickname: model.robotNickname,
      robotSerialNumber: model.robotSerialNumber,
      robotTypeName: model.robotTypeName,
      enabled: model.enabled,
    };
  }
}
