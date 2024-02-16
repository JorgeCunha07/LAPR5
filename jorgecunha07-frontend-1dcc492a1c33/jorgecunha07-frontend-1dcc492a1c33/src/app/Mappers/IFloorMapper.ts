import {FloorMapMapper} from "./IFloorMapMapper";
import IFloor_Model from "../models/IFloor_Model";
import IFloorDTO from "../dto/IFloorDTO";

export class FloorMapper {
  static toDTO(model: IFloor_Model): IFloorDTO {
    return {
      buildingFinderId: model.buildingFinderId,
      floorNumber: model.floorNumber,
      floorDescription: model.floorDescription,
      floorMap: model.floorMap ? FloorMapMapper.toDTO(model.floorMap) : undefined,
      floorMaxDimensions: {
        width: model.floorMaxDimensions.width,
        length: model.floorMaxDimensions.length,
      },
    };
  }

  static toModel(dto: IFloorDTO): IFloor_Model {
    return {
      buildingFinderId: dto.buildingFinderId,
      floorNumber: dto.floorNumber,
      floorDescription: dto.floorDescription,
      floorMap: dto.floorMap ? FloorMapMapper.toModel(dto.floorMap) : undefined,
      floorMaxDimensions: {
        width: dto.floorMaxDimensions.width,
        length: dto.floorMaxDimensions.length,
      },
    };
  }
}
