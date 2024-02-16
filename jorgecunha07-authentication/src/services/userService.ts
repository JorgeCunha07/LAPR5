import {Inject, Service} from 'typedi';
import jwt from 'jsonwebtoken';
import config from '../../config';
import argon2 from 'argon2';
import IUserService from '../services/IServices/IUserService';
import {UserMap} from "../mappers/UserMap";
import {IUserDTO} from '../dto/IUserDTO';

import {Result} from "../core/logic/Result";
import * as crypto from "crypto";
import {randomBytes} from "crypto";
import {ISignUpRequestDTO} from '../dto/ISignUpRequestDTO';
import {SignUpRequestMap} from "../mappers/SignUpRequestMap";
import {Role} from "../domain/role/role";
import IUserRepo from "../repos/IRepos/IUserRepo";
import IRoleRepo from "../repos/IRepos/IRoleRepo";
import ISignUpRequestRepo from "../repos/IRepos/ISignUpRequestRepo";
import {User} from "../domain/user/user";
import {UserPassword} from "../domain/user/userPassword";
import {UserEmail} from "../domain/user/userEmail";
import {SignUpRequest} from "../domain/userActions/signUpRequest";
import {UserNumber} from "../domain/user/UserNumber";
import {UserNIF} from "../domain/user/UserNif";

@Service()
export default class UserService implements IUserService {
  constructor(
    @Inject(config.repos.user.name) private userRepo: IUserRepo,
    @Inject(config.repos.role.name) private roleRepo: IRoleRepo,
    @Inject(config.repos.signUpRequest.name) private signUpRequestRepo: ISignUpRequestRepo,
    @Inject('logger') private logger,
  ) {
  }

  public async approveUserRequest(email: string): Promise<Result<{ userDTO: IUserDTO; token: string }>> {
    try {
      const user = await this.signUpRequestRepo.findByEmail(email);

      if (user == null) {
        return Result.fail<{ userDTO: IUserDTO; token: string }>("User does not exist");
      }

      await this.signUpRequestRepo.delete(user);

     const dtoUser : IUserDTO   = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: "Utente",
        password: user.password,
        userNif: user.userNif.value,
        userNumber: user.userNumber.value,
      }

      return await this.signUpUserRequest(dtoUser);
    } catch (e) {
      throw e;
    }
  }

  public async signUpUserRequest(userDTO: IUserDTO): Promise<Result<{ userDTO: IUserDTO; token: string }>> {
    try {
      const userDocument = await this.userRepo.findByEmail(userDTO.email);
      const found = !!userDocument;

      if (found) {
        return Result.fail<{ userDTO: IUserDTO; token: string }>('User already exists with email =' + userDTO.email);
      }


      if (await this.userRepo.existsByUserNif(userDTO.userNif)) {
        return Result.fail<{ userDTO: IUserDTO; token: string }>('User already exists with userNif = ' + userDTO.userNif);
      }

      if (await this.userRepo.existsByUserNumber(userDTO.userNumber)) {
        return Result.fail<{ userDTO: IUserDTO; token: string }>('User already exists with userNumber = ' + userDTO.userNumber);
      }
      const password = await UserPassword.create({ value: userDTO.password, hashed: true }).getValue();

      const email = await UserEmail.create(userDTO.email).getValue();
      let role: Role;

      const roleOrError = await this.getRole(userDTO.role);
      if (roleOrError.isFailure) {
        return Result.fail<{ userDTO: IUserDTO; token: string }>(roleOrError.error);
      } else {
        role = roleOrError.getValue();
      }

      const userOrError = await User.create({
        firstName: userDTO.firstName,
        lastName: userDTO.lastName,
        email: email.value,
        role: role.name,
        password: password.value,
        userNif: userDTO.userNif,
        userNumber: userDTO.userNumber,
      });

      if (userOrError.isFailure) {
        throw Result.fail<IUserDTO>(userOrError.errorValue());
      }

      const userResult = userOrError.getValue();


      //console.log('Generating JWT');
      const token = this.generateToken(userResult);

      //console.log('Sending welcome email');
      await this.userRepo.save(userResult);
      const userDTOResult = UserMap.toDTO(userResult) as IUserDTO;
      return Result.ok<{ userDTO: IUserDTO; token: string }>({ userDTO: userDTOResult, token: token });
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async deleteUserRequest(email: string): Promise<Result<boolean>> {
    try {
      const user = await this.signUpRequestRepo.findByEmail(email);

      if (user == null) {
        return Result.fail<boolean>("User does not exist");
      }

      await this.signUpRequestRepo.delete(user);

      return Result.ok<boolean>(true);
    } catch (e) {
      throw e;
    }
  }


  /**
   * Represents a user object with user information.
   *
   *
   * @typedef {Object} IUserDTO
   * @property {string} username - The username of the user.
   * @property {string} email - The email of the user.
   */
  user: IUserDTO = null;

  public async getAllUserRequests(): Promise<Result<ISignUpRequestDTO[]>> {
    try {
      const requests = await this.signUpRequestRepo.getAll();
      if (requests == null || requests.length == 0) {
        return Result.fail<ISignUpRequestDTO[]>("No requests found");
      }
      const requestDTOs = requests.map(request => SignUpRequestMap.toDTO(request) as ISignUpRequestDTO);
      return Result.ok<ISignUpRequestDTO[]>(requestDTOs);
    } catch (e) {
      throw e;
    }
  }

  public async SignUp(userDTO: IUserDTO): Promise<Result<{ userDTO: IUserDTO; token: string }>> {
    try {

      const userDocument = await this.userRepo.findByEmail(userDTO.email);
      if (userDocument) {
        return Result.fail<{ userDTO: IUserDTO; token: string }>('User already exists with email=' + userDTO.email);
      }

      // Check if userNif is unique if not null
      if (userDTO.userNif && await this.userRepo.existsByUserNif(userDTO.userNif)) {
        return Result.fail<{ userDTO: IUserDTO; token: string }>('User already exists with userNif= ' + userDTO.userNif);
      }

      // Check if userNumber is unique if not null
      if (userDTO.userNumber && await this.userRepo.existsByUserNumber(userDTO.userNumber)) {
        return Result.fail<{ userDTO: IUserDTO; token: string }>('User already exists with userNumber = ' + userDTO.userNumber);
      }

      const salt = randomBytes(32);
      const hashedPassword = await argon2.hash(userDTO.password, { salt });
      const passwordOrError = UserPassword.create({ value: hashedPassword, hashed: true });

      if (passwordOrError.isFailure) {
        return Result.fail<{ userDTO: IUserDTO; token: string }>(passwordOrError.errorValue());
      }

      const emailOrError = UserEmail.create(userDTO.email);

      if (emailOrError.isFailure) {
        return Result.fail<{ userDTO: IUserDTO; token: string }>(emailOrError.errorValue());
      }

      let userNifOrError = userDTO.userNif !== null && userDTO.userNif !== undefined
        ? UserNIF.create(userDTO.userNif)
        : Result.ok<UserNIF>(null);

      let userNumberOrError = userDTO.userNumber !== null && userDTO.userNumber !== undefined
        ? UserNumber.create(userDTO.userNumber)
        : Result.ok<UserNumber>(null);
      // Check for any failure in creating UserNIF or UserNumber
      if (userNifOrError.isFailure) {
        return Result.fail<{ userDTO: IUserDTO; token: string }>(userNifOrError.errorValue());
      }

      if (userNumberOrError.isFailure) {
        return Result.fail<{ userDTO: IUserDTO; token: string }>(userNumberOrError.errorValue());
      }
      let role: Role;
      const roleOrError = await this.getRole(userDTO.role);
      if (roleOrError.isFailure) {
        return Result.fail<{ userDTO: IUserDTO; token: string }>(roleOrError.errorValue());
      } else {
        role = roleOrError.getValue();
      }

      const userOrError = User.create({
        firstName: userDTO.firstName,
        lastName: userDTO.lastName,
        email: emailOrError.getValue().value,
        password: passwordOrError.getValue().value,
        role: role.name,
        userNif: userNifOrError.isSuccess && userNifOrError.getValue() !== null ? userNifOrError.getValue().value : null,
        userNumber: userNumberOrError.isSuccess && userNumberOrError.getValue() !== null ? userNumberOrError.getValue().value : null,
      });
      if (userOrError.isFailure) {
        return Result.fail<{ userDTO: IUserDTO; token: string }>(userOrError.errorValue());
      }

      const userResult = userOrError.getValue();
      const token = this.generateToken(userResult);

      await this.userRepo.save(userResult);
      const userDTOResult = UserMap.toDTO(userResult) as IUserDTO;
      return Result.ok<{ userDTO: IUserDTO; token: string }>({ userDTO: userDTOResult, token: token });
    } catch (e) {
      this.logger.error(e);
      return Result.fail<{ userDTO: IUserDTO; token: string }>(e.message);
    }
  }




  public async updateUserInfo(userDTO: IUserDTO,flag: string): Promise<Result<{ userDTO: IUserDTO; token: string }>> {
    try {
      const userDocument : User = await this.userRepo.findByEmail(userDTO.email);
      const found = !!userDocument;

      if (!found) {
        return Result.fail<{ userDTO: IUserDTO; token: string }>('User does not exists with email=' + userDTO.email);
      }
      let password: UserPassword = null;
      if (flag == "true"){
      const salt = randomBytes(32);
      const hashedPassword = await argon2.hash(userDTO.password, { salt });
      password = await UserPassword.create({ value: hashedPassword, hashed: true }).getValue();

      }

      const email = await UserEmail.create(userDTO.email).getValue();
      let role: Role;

      if (password == null){
        password = userDocument.password;
      }

      const roleOrError = await this.getRole(userDTO.role);
      if (roleOrError.isFailure) {
        return Result.fail<{ userDTO: IUserDTO; token: string }>(roleOrError.error);
      } else {
        role = roleOrError.getValue();
      }

      const userOrError = await User.create({
        firstName: userDTO.firstName,
        lastName: userDTO.lastName,
        email: email.value,
        role: role.name,
        password: password.props.value,
        userNif: userDTO.userNif,
        userNumber: userDTO.userNumber,
      });

      if (userOrError.isFailure) {
        throw Result.fail<IUserDTO>(userOrError.errorValue());
      }

      const userResult = userOrError.getValue();


      //console.log('Generating JWT');
      const token = this.generateToken(userResult);


      userDocument.userNif = userResult.userNif;
      userDocument.userNumber = userResult.userNumber;
      userDocument.password = userResult.password;


      await this.userRepo.save(userDocument);
      const userDTOResult = UserMap.toDTO(userResult) as IUserDTO;
      return Result.ok<{ userDTO: IUserDTO; token: string }>({ userDTO: userDTOResult, token: token });
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }























  public async SignIn(email: string, password: string): Promise<Result<{ userDTO: IUserDTO; token: string }>> {

    const user = await this.userRepo.findByEmail(email);
    console.log(user);
    if (!user) {
      throw new Error('User not registered');
    }

    /**
     * We use verify from argon2 to prevent 'timing based' attacks
     */

    const validPassword = await argon2.verify(user.password.value, password);
    if (validPassword) {
      this.logger.silly('Password is valid!');
      this.logger.silly('Generating JWT');
      const token = this.generateToken(user) ;

      const userDTO = UserMap.toDTO(user) as IUserDTO;
      return Result.ok<{ userDTO: IUserDTO; token: string }>({ userDTO: userDTO, token: token });
    } else {
      throw new Error('Invalid Password');
    }
  }

  private async getRole(roleId: string): Promise<Result<Role>> {
    const role = await this.roleRepo.findByName(roleId);
    const found = !!role;

    if (found) {
      return Result.ok<Role>(role);
    } else {
      return Result.fail<Role>("Couldn't find role by id=" + roleId);
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return crypto.createHmac('sha256', '10').update(password).digest('hex');
  }

  private async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    const hashedAttempt = await this.hashPassword(password);
    return hashedAttempt === hashedPassword;
  }

  public async IsSignedIn(): Promise<IUserDTO> {
    return this.user;
  }

  public async deleteUser(email: string): Promise<Result<boolean>> {
    try {
      const user = await this.userRepo.findByEmail(email);

      if (user == null) {
        return Result.fail<boolean>("User does not exist");
      }
      const x = await this.userRepo.delete(user);
      return Result.ok<boolean>(x);
    } catch (e) {
      throw e;
    }
  }

  public async getUserByEmail(email: string): Promise<Result<IUserDTO>> {
    try {
      const user = await this.userRepo.findByEmail(email);

      if (user == null) {
        return Result.fail<IUserDTO>("User does not exist");
      }

      const userDTO = UserMap.toDTO(user) as IUserDTO;

      return Result.ok<IUserDTO>(userDTO);
    } catch (e) {
      throw e;
    }
  }

  public async SignUpRequest(request: ISignUpRequestDTO): Promise<Result<ISignUpRequestDTO>> {
    try {
      const requestOrError = await SignUpRequest.create(request);

      if (requestOrError.isFailure) {
        return Result.fail<ISignUpRequestDTO>(requestOrError.errorValue());
      }

      const user = requestOrError.getValue();

      const salt = randomBytes(32);
      //hash password
      user.password = await argon2.hash(user.password, {salt});

      const save = await this.signUpRequestRepo.save(user);
      if (save == null) {
        return Result.fail<ISignUpRequestDTO>("Request already exists");
      }
      const requestDTO = SignUpRequestMap.toDTO(save) as ISignUpRequestDTO;
      return Result.ok<ISignUpRequestDTO>(requestDTO);
    } catch (e) {
      throw e;
    }
  }


  private generateToken(user: User) {
    const today = new Date();
    const exp = new Date(today);
    exp.setMinutes(today.getMinutes() + 120); // Set the expiration to 20 minutes from now

    const id = user.id.toString();
    const email = user.email;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const role = user.role;

    return jwt.sign(
      {
        id: id,
        email: email.props.value,
        role: role,
        firstName: firstName,
        lastName: lastName,
        exp: Math.floor(exp.getTime() / 1000), // Convert to seconds
      },
      config.jwtSecret,
    );
  }
  public async Logout(): Promise<Result<void>> {
    // Since JWTs are stateless, there's no server-side token to invalidate.
    // Inform the client to remove the token.
    return Result.ok<void>();
  }


  public async refreshToken(oldToken: string): Promise<Result<{ token: string }>> {
    try {
      // Verify the old token. Note: You might need to customize jwt.verify to allow expired tokens.
      let decoded;
      try {
        decoded = jwt.verify(oldToken, config.jwtSecret);
      } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
          // Allow refresh for expired tokens within a certain time frame
          decoded = jwt.decode(oldToken);
        } else {
          // For other errors, fail the request
          return Result.fail<{ token: string }>('Invalid token');
        }
      }

      if (!decoded) {
        return Result.fail<{ token: string }>('Invalid token');
      }

      // Fetch user details from the database
      const user = await this.userRepo.findByEmail(decoded.email);
      if (!user) {
        return Result.fail<{ token: string }>('User not found');
      }

      // Generate a new token
      const newToken = this.generateToken(user);

      return Result.ok<{ token: string }>({ token: newToken });
    } catch (error) {
      this.logger.error(error);
      return Result.fail<{ token: string }>('Error refreshing token');
    }
  }

}
