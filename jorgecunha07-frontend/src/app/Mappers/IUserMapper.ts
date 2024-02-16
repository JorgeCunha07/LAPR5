import {IUser_Model} from "../models/IUser_Model";
import {IUserDTO} from "../dto/IUserDTO";

export class UserMapper {
  static dtoToModel(dto: IUserDTO): IUser_Model {
    // Create a UserModel from the DTO
    return {
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      password: dto.password,
      role: dto.role,
      userNif: dto.userNif || null,  // Set to null if undefined in DTO
      userNumber: dto.userNumber || null,  // Set to null if undefined in DTO
    };
  }

  static modelToDto(model: IUser_Model): IUserDTO {
    // Create a DTO from the UserModel
    return {
      firstName: model.firstName,
      lastName: model.lastName,
      email: model.email,
      password: model.password,
      role: model.role,
      userNif: model.userNif || null,  // Set to null if undefined in UserModel
      userNumber: model.userNumber || null,  // Set to null if undefined in UserModel
    };
  }
}
