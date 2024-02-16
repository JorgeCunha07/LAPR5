import { Observable } from "rxjs";
import {ISignUpRequestDTO} from "../dto/ISignUpRequestDTO";


export interface IUserService {
  signUpRequest(userDTO: ISignUpRequestDTO): Observable<any>;
}
