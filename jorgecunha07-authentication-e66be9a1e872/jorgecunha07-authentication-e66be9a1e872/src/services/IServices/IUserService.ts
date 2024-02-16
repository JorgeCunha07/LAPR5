import {Result} from "../../core/logic/Result";
import {IUserDTO} from "../../dto/IUserDTO";
import {ISignUpRequestDTO} from "../../dto/ISignUpRequestDTO";

export default interface IUserService {
  SignUp(userDTO: IUserDTO): Promise<Result<{ userDTO: IUserDTO; token: string }>>;

  updateUserInfo(userDTO: IUserDTO,flag: string ): Promise<Result<{ userDTO: IUserDTO; token: string }>>;

  SignIn(email: string, password: string): Promise<Result<{ userDTO: IUserDTO; token: string }>>;

  IsSignedIn(): Promise<IUserDTO>;

  Logout(): Promise<Result<void>>;

  refreshToken(oldToken: string): Promise<Result<{ token: string }>>;

  deleteUser(email: string): Promise<Result<boolean>>;

  getUserByEmail(email: string): Promise<Result<IUserDTO>>;

  SignUpRequest(request: ISignUpRequestDTO): Promise<Result<ISignUpRequestDTO>>;

  getAllUserRequests(): Promise<Result<ISignUpRequestDTO[]>>;

  approveUserRequest(email: string): Promise<Result<{ userDTO: IUserDTO; token: string }>>;

  deleteUserRequest(email: string): Promise<Result<boolean>>;
}
