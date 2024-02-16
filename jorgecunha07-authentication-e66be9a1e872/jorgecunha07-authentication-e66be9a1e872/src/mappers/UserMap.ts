import { Container } from 'typedi';

import {Mapper} from "../core/infra/Mapper";
import {User} from "../domain/user/user";
import {IUserDTO} from "../dto/IUserDTO";
import RoleRepo from "../repos/roleRepo";
import {UserNIF} from "../domain/user/UserNif";
import {UserPassword} from "../domain/user/userPassword";
import {UserEmail} from "../domain/user/userEmail";
import {UserNumber} from "../domain/user/UserNumber";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";
import {Result} from "../core/logic/Result";

export class UserMap extends Mapper<User> {

  public static toDTO(user: User): IUserDTO {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email.value,
      password: "", // Typically, password is not exposed in DTO
      role: user.role,
      userNif: user.userNif ? user.userNif.value : null, // Handle null values
      userNumber: user.userNumber ? user.userNumber.value : null, // Handle null values
    };
  }

  public static async toDomain(raw: any): Promise<User> {
    const userEmailOrError = UserEmail.create(raw.email);
    const userPasswordOrError = UserPassword.create({ value: raw.password, hashed: true });
    const userNumberOrError = raw.userNumber ? UserNumber.create(raw.userNumber) : Result.ok<UserNumber>(null);
    const userNifOrError = raw.userNif ? UserNIF.create(raw.userNif) : Result.ok<UserNIF>(null);

    // Check if any of the required objects have failed to be created
    if (userEmailOrError.isFailure) {
      console.error('Error in user email conversion:', userEmailOrError.error);
      return Promise.reject('Invalid email');
    }
    if (userPasswordOrError.isFailure) {
      console.error('Error in user password conversion:', userPasswordOrError.error);
      return Promise.reject('Invalid password');
    }
    if (raw.userNumber && userNumberOrError.isFailure) {
      console.error('Error in user number conversion:', userNumberOrError.error);
      return Promise.reject('Invalid user number');
    }
    if (raw.userNif && userNifOrError.isFailure) {
      console.error('Error in user NIF conversion:', userNifOrError.error);
      return Promise.reject('Invalid user NIF');
    }

    // Ensure the role is valid
    const roleRepo = Container.get(RoleRepo);
    const role = await roleRepo.findByName(raw.role);

    // Create the User object with checks for null values
    const userOrError = User.create({
      firstName: raw.firstName,
      lastName: raw.lastName,
      email: userEmailOrError.getValue().value,
      password: userPasswordOrError.getValue().value,
      role: role ? role.name : '', // Check for a valid role
      userNif: userNifOrError.isSuccess ? (userNifOrError.getValue() ? userNifOrError.getValue().value : null) : null,
      userNumber: userNumberOrError.isSuccess ? (userNumberOrError.getValue() ? userNumberOrError.getValue().value : null) : null,
    }, new UniqueEntityID(raw.domainId));

    if (userOrError.isFailure) {
      console.error('User creation failed:', userOrError.error);
      return Promise.reject(userOrError.error);
    }

    return userOrError.isSuccess ? Promise.resolve(userOrError.getValue()) : Promise.reject('Unknown error');
  }



  public static toPersistence(user: User): any {
    return {
      domainId: user.id.toString(),
      email: user.email.value,
      password: user.password.value, // Be cautious with password handling
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      userNif: user.userNif ? user.userNif.value : null, // Handle null values
      userNumber: user.userNumber ? user.userNumber.value : null, // Handle null values
    };
  }
}
