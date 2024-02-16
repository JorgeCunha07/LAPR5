import { Observable } from "rxjs";
import {IAuthDTO} from "../dto/IAuthDTO";
import {IUserDTO} from "../dto/IUserDTO";
import IRoleDTO from "../dto/IRoleDTO";

export interface IAuthService {
  login(credentials: any): Observable<boolean>;
  verifyToken(): Observable<IAuthDTO>;
  signUpRequest(userData: any): Observable<any>;
  getAllUserRequests(): Observable<IUserDTO[]>;
  approveUserRequest(email: string, data: any): Observable<any>;
  deleteUserRequest(email: string): Observable<any>;
  signUp(userData: any): Observable<any>;
  updateUserInfo(alteredPassword: string, userDTO: IUserDTO): Observable<any>;
  signOut(): Observable<any>;
  getUserInfo(email: string): Observable<IUserDTO>;
  deleteUser(email: string): Observable<any>;
  refreshToken(data: any): Observable<any>;
  getRolesAvailable(): Observable<Array<IRoleDTO>>;
}
