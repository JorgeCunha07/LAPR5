import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {catchError, map, Observable, Subscription, throwError} from "rxjs";
import ElevatorDTO from "../../dto/ElevatorDTO";
import {EndPointConfiguration} from "../../Constants/EndPointConfiguration";
import {IElevatorService} from "../IElevatorService";

@Injectable({
  providedIn: 'root',
})
export class ElevatorService implements IElevatorService{

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

  createElevator(elevatorDTO: ElevatorDTO): Observable<ElevatorDTO> {
    return this.httpClient.post<ElevatorDTO>(`${EndPointConfiguration.MASTER_DATA_ENDPOINT}/elevators`, elevatorDTO, this.httpOptions);
  }

  getElevatorsByBuilding(selectedBuilding: string) {
    return this.httpClient.get<any>(`${EndPointConfiguration.MASTER_DATA_ENDPOINT}/elevators/buildingFinderId=${selectedBuilding}`, this.httpOptions);
  }

  updateElevator(elevator: ElevatorDTO): Observable<ElevatorDTO> {
    return this.httpClient.patch<ElevatorDTO>(`${EndPointConfiguration.MASTER_DATA_ENDPOINT}/elevators`, elevator, this.httpOptions);
  }
}
