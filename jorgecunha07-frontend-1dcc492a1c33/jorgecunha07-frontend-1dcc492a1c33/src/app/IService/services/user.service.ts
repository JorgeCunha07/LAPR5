import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ISignUpRequestDTO} from "../../dto/ISignUpRequestDTO";
import {EndPointConfiguration} from "../../Constants/EndPointConfiguration";
import {IUserService} from "../IUserService";

@Injectable({
  providedIn: 'root',
})
export class UserService implements IUserService{


  constructor(private authService: AuthService, private httpClient: HttpClient) {}


  signUpRequest(userDTO: ISignUpRequestDTO): Observable<any> {
    return this.httpClient.post<any>(`${EndPointConfiguration.AUTH_ENDPOINT}/auth/request`, userDTO);
  }
}
