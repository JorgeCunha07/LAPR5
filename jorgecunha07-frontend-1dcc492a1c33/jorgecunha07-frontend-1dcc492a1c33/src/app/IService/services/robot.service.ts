import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subscription} from "rxjs";
import RobotDTO from '../../dto/RobotDTO';
import {EndPointConfiguration} from "../../Constants/EndPointConfiguration";
import {IRobotService} from "../IRobotService";

@Injectable({
  providedIn: 'root',
})
export class RobotService implements IRobotService{

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

  createRobot(robotDTO: RobotDTO): Observable<RobotDTO> {
    return this.httpClient.post<any>(`${EndPointConfiguration.MASTER_DATA_ENDPOINT}/robots`, robotDTO, this.httpOptions);
  }

  getList(): Observable<RobotDTO[]> {
    return this.httpClient.get<RobotDTO[]>(`${EndPointConfiguration.MASTER_DATA_ENDPOINT}/robots`, this.httpOptions);
  }

  updateRobotState(endpoint: string): Observable<any> {
    return this.httpClient.patch<any>(`${EndPointConfiguration.MASTER_DATA_ENDPOINT}/${endpoint}`, null, this.httpOptions);
  }
}
