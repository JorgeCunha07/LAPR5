import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subscription} from "rxjs";
import RobotTypeDTO from '../../dto/RobotTypeDTO';
import {EndPointConfiguration} from "../../Constants/EndPointConfiguration";
import {IRobotTypeService} from "../IRobotTypeService";

@Injectable({
  providedIn: 'root',
})
export class RobotTypeService implements IRobotTypeService{

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

  createRobotType(robotTypeDTO: RobotTypeDTO): Observable<RobotTypeDTO> {
    return this.httpClient.post<any>(`${EndPointConfiguration.MASTER_DATA_ENDPOINT}/robot-types`, robotTypeDTO, this.httpOptions);
  }

}
