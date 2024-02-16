import Building_Model from "../models/Building_Model";
import BuildingDTO from "../dto/BuildingDTO";

export class BuildingMapper {
  static toDTO(model: Building_Model): BuildingDTO {
    return {
      buildingCode: model.buildingCode,
      buildingName: model.buildingName,
      buildingDescription: model.buildingDescription,
      buildingSize: model.buildingSize,
    };
  }

  static toModel(dto: BuildingDTO): Building_Model {
    return {
      buildingCode: dto.buildingCode,
      buildingName: dto.buildingName,
      buildingDescription: dto.buildingDescription,
      buildingSize: dto.buildingSize,
    };
  }
}
