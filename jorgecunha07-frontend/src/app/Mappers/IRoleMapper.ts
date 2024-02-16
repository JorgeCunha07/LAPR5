import IRole_Model from "../models/IRole_Model";
import IRoleDTO from "../dto/IRoleDTO";

export class RoleMapper {
  static toDTO(model: IRole_Model): IRoleDTO {
    return {
      id: model.id,
      name: model.name,
    };
  }

  static toModel(dto: IRoleDTO): IRole_Model {
    return {
      id: dto.id,
      name: dto.name,
    };
  }
}
