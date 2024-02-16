import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import {AggregateRoot} from "../../core/domain/AggregateRoot";
import {SignUpRequestId} from "./signUpRequestId";
import {Result} from "../../core/logic/Result";
import {ISignUpRequestDTO} from "../../dto/ISignUpRequestDTO";
import {UserNumber} from "../user/UserNumber";
import {UserNIF} from "../user/UserNif";

interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userNumber: UserNumber;
  userNif: UserNIF;
}

export class SignUpRequest extends AggregateRoot<UserProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get signUpRequestId(): SignUpRequestId {
    return SignUpRequestId.caller(this.id)
  }

  get email(): string {
    return this.props.email;
  }

  get firstName(): string {
    return this.props.firstName
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get password(): string {
    return this.props.password;
  }

  set password(value: string) {
    this.props.password = value;
  }

  get userNif(): UserNIF {
    return this.props.userNif;
  }

  get userNumber(): UserNumber {
    return this.props.userNumber;
  }

  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: ISignUpRequestDTO, id?: UniqueEntityID): Result<SignUpRequest> {
    const firstName = props.firstName;
    const lastName = props.lastName;
    const email = props.email;
    const password = props.password;
    const userNif = props.userNif;
    const userNumber = props.userNumber;

    const user = new SignUpRequest({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      userNif: UserNIF.create(userNif).getValue(),
      userNumber:UserNumber.create(userNumber).getValue(),

    }, id);
    return Result.ok<SignUpRequest>(user);
  }

}
