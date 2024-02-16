import PassagewayDTO from "../dto/PassagewayDTO";
import Passageway_Model from "../models/Passageway_Model";

export class PassagewayMapper {
  static dtoToModel(dto: PassagewayDTO): Passageway_Model {
    return {
      buildingACode: dto.buildingACode,
      buildingBCode: dto.buildingBCode,
      floorA: dto.floorA,
      floorB: dto.floorB,
      locationA: { ...dto.locationA },
      locationB: { ...dto.locationB },
    };
  }

  static modelToDto(model: Passageway_Model): PassagewayDTO {
    return {
      buildingACode: model.buildingACode,
      buildingBCode: model.buildingBCode,
      floorA: model.floorA,
      floorB: model.floorB,
      locationA: { ...model.locationA },
      locationB: { ...model.locationB },
    };
  }
}
