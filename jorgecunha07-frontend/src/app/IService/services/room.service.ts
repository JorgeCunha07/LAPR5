import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {catchError, map, Observable, Subscription, throwError} from "rxjs";
import RoomDTO from "../../dto/RoomDTO";
import {EndPointConfiguration} from "../../Constants/EndPointConfiguration";
import {IRoomService} from "../IRoomService";

@Injectable({
  providedIn: 'root',
})
export class RoomService implements IRoomService {

  private tokenSubscription: Subscription;
  private httpOptions = {
    headers: new HttpHeaders()
  };

  constructor(private authService: AuthService, private httpClient: HttpClient) {
    this.tokenSubscription = this.authService.token.subscribe(token => {
      this.updateHttpOptions(token);
    });
  }

  private updateHttpOptions(token: string) {
    this.httpOptions.headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  createRoom(roomDTO: RoomDTO): Observable<RoomDTO> {
    return this.httpClient.post<RoomDTO>(`${EndPointConfiguration.MASTER_DATA_ENDPOINT}/rooms`, roomDTO, this.httpOptions);
  }

}
