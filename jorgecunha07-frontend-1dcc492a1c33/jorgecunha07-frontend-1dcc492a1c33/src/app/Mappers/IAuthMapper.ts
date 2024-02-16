import {IAuth_Model} from "../models/IAuth_Model";
import {IAuthDTO} from "../dto/IAuthDTO";

export class AuthMapper {
  static toDTO(model: IAuth_Model): IAuthDTO {
    return {
      email: model.email,
      isAuthenticated: model.isAuthenticated,
      role: model.role,
    };
  }

  static toModel(dto: IAuthDTO): IAuth_Model {
    return {
      email: dto.email,
      isAuthenticated: dto.isAuthenticated,
      role: dto.role,
    };
  }
}
