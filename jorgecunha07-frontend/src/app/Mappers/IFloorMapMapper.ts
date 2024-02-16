import IFloorMap_Model from "../models/IFloorMap_Model";
import IFloorMapDTO from "../dto/IFloorMapDTO";

export class FloorMapMapper {
  static toDTO(model: IFloorMap_Model): IFloorMapDTO {
    return {
      maze: model.maze,
      ground: model.ground,
      wall: model.wall,
      passageway:model.passageway,
      elevator: model.elevator,
      door: model.door,
      player: model.player,
      elevatorFloors:model.elevatorFloors,
      passageways:model.passageways,
    };
  }

  static toModel(dto: IFloorMapDTO): IFloorMap_Model {
    return {
      maze: dto.maze,
      ground: dto.ground,
      wall: dto.wall,
      passageway:dto.passageway,
      elevator: dto.elevator,
      door: dto.door,
      player: dto.player,
      elevatorFloors:dto.elevatorFloors,
      passageways:dto.passageways,
    };
  }
}
