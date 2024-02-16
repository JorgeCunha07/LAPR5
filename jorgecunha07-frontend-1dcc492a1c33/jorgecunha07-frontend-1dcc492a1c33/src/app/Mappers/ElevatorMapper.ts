import Elevator_Model from "../models/Elevator_Model";
import ElevatorDTO from "../dto/ElevatorDTO";

export class ElevatorMapper {
  static toDTO(model: Elevator_Model): ElevatorDTO {
    return {
      buildingFinderId: model.buildingFinderId,
      floors: model.floors,
      location: model.location,
    };
  }

  static toModel(dto: ElevatorDTO): Elevator_Model {
    return {
      buildingFinderId: dto.buildingFinderId,
      floors: dto.floors,
      location: dto.location,
    };
  }
}
