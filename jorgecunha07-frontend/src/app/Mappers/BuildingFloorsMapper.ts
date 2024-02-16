import Building_FloorsDTO from "../dto/Building_FloorsDTO";
import Building_Floors_Model from "../models/Building_Floors_Model";

export class BuildingFloorsMapper {
  static dtoToModel(dto: Building_FloorsDTO): Building_Floors_Model {
    return {
      buildingCode: dto.buildingCode,
      buildingName: dto.buildingName,
      buildingDescription: dto.buildingDescription,
      floorsNumber: dto.floorsNumber,
      buildingSize: {
        width: dto.buildingSize.width,
        length: dto.buildingSize.length,
      },
    };
  }

  static modelToDto(model: Building_Floors_Model): Building_FloorsDTO {
    return {
      buildingCode: model.buildingCode,
      buildingName: model.buildingName,
      buildingDescription: model.buildingDescription,
      floorsNumber: model.floorsNumber,
      buildingSize: {
        width: model.buildingSize.width,
        length: model.buildingSize.length,
      },
    };
  }
}
