import {ISignUpRequest_Model} from "../models/ISignUpRequest_Model";
import {ISignUpRequestDTO} from "../dto/ISignUpRequestDTO";

export class SignUpRequestMapper {
  static toDTO(model: ISignUpRequest_Model): ISignUpRequestDTO {
    return {
      firstName: model.firstName,
      lastName: model.lastName,
      email: model.email,
      password: model.password,
      userNif: model.userNif,
      userNumber: model.userNumber,
    };
  }

  static toModel(dto: ISignUpRequestDTO): ISignUpRequest_Model {
    return {
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      password: dto.password,
      userNif: dto.userNif,
      userNumber: dto.userNumber,
    };
  }
}
