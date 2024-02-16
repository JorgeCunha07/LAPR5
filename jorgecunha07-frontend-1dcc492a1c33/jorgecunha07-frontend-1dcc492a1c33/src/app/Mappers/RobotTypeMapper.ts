import RobotTypeDTO from "../dto/RobotTypeDTO";
import RobotType_Model from "../models/RobotType_Model";


export class RobotTypeMapper {
  static dtoToModel(dto: RobotTypeDTO): RobotType_Model {
    return {
      robotTypeName: dto.robotTypeName,
      robotBrand: dto.robotBrand,
      robotModel: dto.robotModel,
      supportedTaskTypes: dto.supportedTaskTypes || null,
    };
  }

  static modelToDto(model: RobotType_Model): RobotTypeDTO {
    return {
      robotTypeName: model.robotTypeName,
      robotBrand: model.robotBrand,
      robotModel: model.robotModel,
      supportedTaskTypes: model.supportedTaskTypes || null,
    };
  }
}
