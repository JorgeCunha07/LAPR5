import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, Subscription, throwError} from "rxjs";
import FloorDTO from "../../dto/IFloorDTO";
import IFloorMapDTO from "../../dto/IFloorMapDTO";
import {EndPointConfiguration} from "../../Constants/EndPointConfiguration";
import {IFloorService} from "../IFloorService";

@Injectable({
  providedIn: 'root',
})
export class FloorService implements IFloorService{

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

  createFloor(floorDTO: FloorDTO): Observable<FloorDTO> {
    return this.httpClient.post<any>(`${EndPointConfiguration.MASTER_DATA_ENDPOINT}/floors`, floorDTO, this.httpOptions);
  }

  updateFloor(floorDTO: FloorDTO): Observable<FloorDTO> {
    let floor : FloorDTO ={
      buildingFinderId: floorDTO.buildingFinderId,
      floorNumber: floorDTO.floorNumber,
      floorDescription: floorDTO.floorDescription,
      floorMap: floorDTO.floorMap,
      floorMaxDimensions: {
        width: floorDTO.floorMaxDimensions.width,
        length: floorDTO.floorMaxDimensions.length,
      },
    }
    return this.httpClient.put<any>(`${EndPointConfiguration.MASTER_DATA_ENDPOINT}/floors`, floor, this.httpOptions);
  }
  updateFloorMap(floorDTO: FloorDTO): Observable<FloorDTO> {
    let buildingCode = floorDTO.buildingFinderId;
    let floorNumber = floorDTO.floorNumber;
    let floorMapDTO : IFloorMapDTO | null ;
    if (floorDTO.floorMap != null) {
      floorMapDTO  = floorDTO.floorMap;
    }else {floorMapDTO = null}

    // Construct the URL with the building code and floor number
    let url = `${EndPointConfiguration.MASTER_DATA_ENDPOINT}/floors/FloorMap/${buildingCode}/${floorNumber.toString()}`;

    // Perform the PATCH request
    return this.httpClient.patch<any>(url, floorMapDTO, this.httpOptions);
  }

  getFloorsList(): Observable<FloorDTO[]> {
    return this.httpClient.get<any>(`${EndPointConfiguration.MASTER_DATA_ENDPOINT}/floors/all`, this.httpOptions);
  }


  getFloorsByBuilding(selectedBuilding: string) {
    return this.httpClient.get<any>(`${EndPointConfiguration.MASTER_DATA_ENDPOINT}/floors/buildingFinderId=${selectedBuilding}`, this.httpOptions);
  }
}
