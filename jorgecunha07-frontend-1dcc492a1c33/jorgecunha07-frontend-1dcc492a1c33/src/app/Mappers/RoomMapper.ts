import RoomDTO from "../dto/RoomDTO";
import Room_Model from "../models/Room_Model";

export class RoomMapper {
  static dtoToModel(dto: RoomDTO): Room_Model {
    return {
      name: dto.name,
      type: dto.type,
      description: dto.description,
      buildingFinderId: dto.buildingFinderId,
      floorNumber: dto.floorNumber,
      location: {
        x: dto.location.x,
        y: dto.location.y,
      },
    };
  }

  static modelToDto(model: Room_Model): RoomDTO {
    return {
      name: model.name,
      type: model.type,
      description: model.description,
      buildingFinderId: model.buildingFinderId,
      floorNumber: model.floorNumber,
      location: {
        x: model.location.x,
        y: model.location.y,
      },
    };
  }
}
