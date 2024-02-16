import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Result } from '../../core/logic/Result';
import { UserId } from './userId';
import { UserEmail } from './userEmail';
import { UserPassword } from './userPassword';
import { Guard } from '../../core/logic/Guard';
import {UserNumber} from "./UserNumber";
import {UserNIF} from "./UserNif";
import {IUserDTO} from "../../dto/IUserDTO";

interface UserProps {
  firstName: string;
  lastName: string;
  email: UserEmail;
  password: UserPassword;
  role: string;
  userNumber: UserNumber | null;
  userNif: UserNIF | null;
}

export class User extends AggregateRoot<UserProps> {
  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get userId(): UserId {
    return UserId.caller(this.id);
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  get role(): string {
    return this.props.role;
  }

  get userNumber(): UserNumber {
    return this.props.userNumber;
  }
  get userNif(): UserNIF {
    return this.props.userNif;
  }


  set password(value: UserPassword) {
    this.props.password =value;
  }


  set userNumber(value :UserNumber)  {
     this.props.userNumber = value;
  }
  set userNif(value: UserNIF) {
     this.props.userNif = value;
  }
  set role(value: string) {
    this.props.role = value;
  }

  public static create(userDTO: IUserDTO, id?: UniqueEntityID): Result<User> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: userDTO.firstName, argumentName: 'firstName' },
      { argument: userDTO.lastName, argumentName: 'lastName' },
      { argument: userDTO.email, argumentName: 'email' },
      { argument: userDTO.password, argumentName: 'password' },
      { argument: userDTO.role, argumentName: 'role' },
      // Do not check userNif and userNumber here if they can be null
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<User>(guardResult.message);
    }

    const emailOrError = UserEmail.create(userDTO.email);
    const passwordOrError = UserPassword.create({ value: userDTO.password, hashed: true });
    const userNumberOrError = userDTO.userNumber ? UserNumber.create(userDTO.userNumber) : Result.ok<UserNumber>(null);
    const userNifOrError = userDTO.userNif ? UserNIF.create(userDTO.userNif) : Result.ok<UserNIF>(null);

    if (emailOrError.isFailure || passwordOrError.isFailure) {
      return Result.fail<User>('Invalid email or password');
    }

    // Add checks for the success of userNumberOrError and userNifOrError
    if (userNumberOrError.isFailure) {
      return Result.fail<User>(userNumberOrError.errorValue());
    }

    if (userNifOrError.isFailure) {
      return Result.fail<User>(userNifOrError.errorValue());
    }

    const props: UserProps = {
      firstName: userDTO.firstName,
      lastName: userDTO.lastName,
      email: emailOrError.getValue(),
      password: passwordOrError.getValue(),
      role: userDTO.role,
      userNif: userNifOrError.isSuccess ? userNifOrError.getValue() : null, // Check for null
      userNumber: userNumberOrError.isSuccess ? userNumberOrError.getValue() : null, // Check for null
    };

    const newUser = new User(props, id);
    return Result.ok<User>(newUser);
  }

}
