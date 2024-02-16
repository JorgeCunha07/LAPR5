import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, Subscription, throwError} from "rxjs";
import BuildingDTO from "../../dto/BuildingDTO";
import Building_FloorsDTO from "../../dto/Building_FloorsDTO";
import {EndPointConfiguration} from "../../Constants/EndPointConfiguration";
import {IBuildingService} from "../IBuildingService";

@Injectable({
  providedIn: 'root',
})
export class BuildingService implements IBuildingService{

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

  getList(): Observable<BuildingDTO[]> {
    return this.httpClient.get<any>(`${EndPointConfiguration.MASTER_DATA_ENDPOINT}/buildings/all`, this.httpOptions);
  }

  createBuilding(buildingDTO: BuildingDTO): Observable<BuildingDTO> {
    return this.httpClient.post<any>(`${EndPointConfiguration.MASTER_DATA_ENDPOINT}/buildings`, buildingDTO, this.httpOptions);
  }

  getBuildingByCode(code: string): Observable<BuildingDTO> {
    return this.httpClient.get<BuildingDTO[]>(`${EndPointConfiguration.MASTER_DATA_ENDPOINT}/buildings/all`, this.httpOptions)
      .pipe(
        map((buildings: BuildingDTO[]) => {
          const building = buildings.find(building => building.buildingCode === code);
          if (!building) {
            throw new Error('Building not found');
          }
          return building;
        }),
        catchError((error: any) => {
          console.error(error);
          return throwError(() => new Error('Building not found'));
        })
      );
  }


  updateBuilding(building: BuildingDTO): Observable<BuildingDTO> {
    console.log(building);
    let buildingDTO : BuildingDTO = {
      buildingCode: building.buildingCode,
      buildingName: building.buildingName,
      buildingDescription: building.buildingDescription,
      buildingSize: {
        width: building.buildingSize.width,
        length: building.buildingSize.length,
      },
    };
    return this.httpClient.put<BuildingDTO>(`${EndPointConfiguration.MASTER_DATA_ENDPOINT}/buildings`, buildingDTO, this.httpOptions);
  }


  getListByParameters(min: number, max: number): Observable<Building_FloorsDTO[]> {
    const url = `${EndPointConfiguration.MASTER_DATA_ENDPOINT}/buildings/min=${min}/max=${max}`;
    return this.httpClient.get<Building_FloorsDTO[]>(url, this.httpOptions);
  }


}
