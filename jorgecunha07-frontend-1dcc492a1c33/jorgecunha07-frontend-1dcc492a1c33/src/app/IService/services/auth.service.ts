import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {EndPointConfiguration} from "../../Constants/EndPointConfiguration";
import {IAuthService} from "../IAuthService";
import {IAuthDTO} from "../../dto/IAuthDTO";
import {IUser_Model} from "../../models/IUser_Model";
import {UserMapper} from "../../Mappers/IUserMapper";
import {IUserDTO} from "../../dto/IUserDTO";
import IRoleDTO from "../../dto/IRoleDTO";

@Injectable({ providedIn: 'root' })
export class AuthService implements IAuthService, OnDestroy {

   _token = new BehaviorSubject<string>('');
   _userInfo = new BehaviorSubject<IAuthDTO | null>(null);
   httpOptions = { headers: new HttpHeaders() };

  constructor(private httpClient: HttpClient) {
    this.initializeFromStorage();
  }

  ngOnDestroy() {
    this._token.complete();
    this._userInfo.complete();
  }
  private initializeFromStorage() {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this._token.next(token);
      this.updateHttpOptions();
    }
    const userInfo = localStorage.getItem('user_info');
    if (userInfo) {
      this._userInfo.next(JSON.parse(userInfo));
    }
  }

  private updateHttpOptions() {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this._token.value); // Directly access value
  }

  get isAuthenticated() {
    return !!this._token.value;
  }

  get token() {
    return this._token.asObservable();
  }

  get userInfo() {
    return this._userInfo.asObservable();
  }

  login(credentials: any): Observable<boolean> {
    return this.httpClient.post<any>(`${EndPointConfiguration.AUTH_ENDPOINT}/auth/signin`, credentials).pipe(
      switchMap(response => {
        if (response && response.token) {
          this.setToken(response.token);
          return this.verifyToken().pipe(
            map(userInfo => {
              this.setUserInfo(userInfo);
              return true;
            })
          );
        } else {
          this.clearAuthData();
          return of(false);
        }
      }),
      catchError(error => {
        this.clearAuthData();
        return throwError(error);
      })
    );
  }

  private setToken(value: string) {
    this._token.next(value);
    localStorage.setItem('auth_token', value);
    this.updateHttpOptions();
  }

  private setUserInfo(value: IAuthDTO) {
    this._userInfo.next(value);
    localStorage.setItem('user_info', JSON.stringify(value));
  }

  private clearAuthData() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
    this._token.next('');
    this._userInfo.next(null);
  }


  verifyToken(): Observable<IAuthDTO> {
    return this.httpClient.get<any>(`${EndPointConfiguration.AUTH_ENDPOINT}/auth/verifyToken`,this.httpOptions);
  }
  signUpRequest(userData: any): Observable<any> {
    return this.httpClient.post<any>(`${EndPointConfiguration.AUTH_ENDPOINT}/auth/request`, userData);
  }

  getAllUserRequests(): Observable<IUser_Model[]> {
    let observableDto: Observable<IUserDTO[]> = this.httpClient.get<IUserDTO[]>(`${EndPointConfiguration.AUTH_ENDPOINT}/auth/getAllRequests`);

    return observableDto.pipe(
      // Handle the case where the response might be null
      map(dtos => dtos ? dtos.map(dto => UserMapper.dtoToModel(dto)) : []),
      // Handle errors, such as a 403 response
      catchError(error => {
        // Handle the error or log it
        console.error('Error fetching user requests:', error);
        // Return an empty array or some default value as an Observable
        return of([]);
      })
    );
  }


  approveUserRequest(email: string, data: any): Observable<any> {
    return this.httpClient.put<any>(`${EndPointConfiguration.AUTH_ENDPOINT}/auth/userRequest/${email}`,data);
  }

  deleteUserRequest(email: string): Observable<any> {
    return this.httpClient.delete<any>(`${EndPointConfiguration.AUTH_ENDPOINT}/auth/userRequest/${email}`);
  }

  signUp(userData: IUser_Model): Observable<any> {
    let userDTO = UserMapper.modelToDto(userData);
    return this.httpClient.post<any>(`${EndPointConfiguration.AUTH_ENDPOINT}/auth/signup`, userDTO);
  }

  updateUserInfo(boolean: string, userModel: IUser_Model): Observable<any> {
    let userDTO = UserMapper.modelToDto(userModel);
    return this.httpClient.put<any>(`${EndPointConfiguration.AUTH_ENDPOINT}/auth/updateUserInfo/${boolean}`, userDTO);
  }



  signOut(): Observable<any> {
    return this.httpClient.post<any>(`${EndPointConfiguration.AUTH_ENDPOINT}/auth/logout`, {});
  }

  getUserInfo(email: string): Observable<IUser_Model> {
    let observableDto: Observable<IUserDTO> = this.httpClient.get<IUserDTO>(`${EndPointConfiguration.AUTH_ENDPOINT}/auth/userInfo/${email}`);
    // Transform the Observable<IUserDTO> to Observable<IUser_Model>
    return observableDto.pipe(
      map(dto => UserMapper.dtoToModel(dto))
    );
  }


  deleteUser(email: string): Observable<any> {
    return this.httpClient.delete<any>(`${EndPointConfiguration.AUTH_ENDPOINT}/auth/userInfo/${email}`);
  }

  refreshToken(data: any): Observable<any> {
    return this.httpClient.post<any>(`${EndPointConfiguration.AUTH_ENDPOINT}/auth/refreshtoken`, data);
  }
  getRolesAvailable(): Observable<Array<IRoleDTO>> {
    return this.httpClient.get<any>(`${EndPointConfiguration.AUTH_ENDPOINT}/roles`);
  }


}
