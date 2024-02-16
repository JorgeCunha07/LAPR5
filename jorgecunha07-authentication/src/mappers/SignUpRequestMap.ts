import {Mapper} from "../core/infra/Mapper";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";
import {ISignUpRequestDTO} from "../dto/ISignUpRequestDTO";
import {SignUpRequest} from "../domain/userActions/signUpRequest";

export class SignUpRequestMap extends Mapper<SignUpRequest> {

  public static toDTO(request: SignUpRequest): ISignUpRequestDTO {
    return {
      //id: user.id.toString(),
      firstName: request.firstName,
      lastName: request.lastName,
      email: request.email,
      password: request.password,
      userNif: request.userNif.value,
      userNumber: request.userNumber.value,
    } as ISignUpRequestDTO;
  }

  public static async toDomain(raw: any): Promise<SignUpRequest> {
    const userOrError = SignUpRequest.create(
      {
        domainId: raw.signUpRequestDomainId,
        firstName: raw.signUpRequestFirstName,
        lastName: raw.signUpRequestLastName,
        email: raw.signUpRequestEmail,
        password: raw.signUpRequestPassword,
        userNif: raw.userNif,
        userNumber:raw.userNumber,
      },
      new UniqueEntityID(raw.domainId)
    );

    userOrError.isFailure ? console.log(userOrError.error) : '';

    return userOrError.isSuccess ? userOrError.getValue() : null;
  }

  public static toPersistence(user: SignUpRequest): any {
    return {
      signUpRequestDomainId: user.id.toString(),
      signUpRequestEmail: user.email,
      signUpRequestPassword: user.password,
      signUpRequestFirstName: user.firstName,
      signUpRequestLastName: user.lastName,
      userNif: user.userNif.value,
      userNumber: user.userNumber.value,
    };
  }
}
