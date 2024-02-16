import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {catchError, Observable, Subscription, throwError} from "rxjs";
import PassagewayDTO from "../../dto/PassagewayDTO";
import {EndPointConfiguration} from "../../Constants/EndPointConfiguration";
import {IPassagewayService} from "../IPassagewayService";

@Injectable({
  providedIn: 'root',
})
export class PassagewayService implements IPassagewayService{

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

  createPassageway(passagewayDTO: PassagewayDTO): Observable<PassagewayDTO> {
    return this.httpClient.post<any>(`${EndPointConfiguration.MASTER_DATA_ENDPOINT}/passageway`, passagewayDTO, this.httpOptions);
  }

  updatePassageway(passageway: PassagewayDTO): Observable<PassagewayDTO> {
    return this.httpClient.put<PassagewayDTO>(`${EndPointConfiguration.MASTER_DATA_ENDPOINT}/passageway`, passageway, this.httpOptions);
  }

  getAllPassagewaysBetweenBuildings(buildingACode: string, buildingBCode: string): Observable<PassagewayDTO[]> {
    const params = {
      buildingACode: buildingACode,
      buildingBCode: buildingBCode,
    };

    return this.httpClient.get<PassagewayDTO[]>(`${EndPointConfiguration.MASTER_DATA_ENDPOINT}/passageway`, {
      headers: this.httpOptions.headers,
      params: params,
    }).pipe(
      catchError(this.handleError)
    );
  }

  getFloorsFromBuildingWithPassageway(buildingCode: string): Observable<PassagewayDTO[]> {
    return this.httpClient.get<PassagewayDTO[]>(`${EndPointConfiguration.MASTER_DATA_ENDPOINT}/passageway/floors/${buildingCode}`, {
      headers: this.httpOptions.headers,
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError('Something went wrong, please try again later.');
  }

}
