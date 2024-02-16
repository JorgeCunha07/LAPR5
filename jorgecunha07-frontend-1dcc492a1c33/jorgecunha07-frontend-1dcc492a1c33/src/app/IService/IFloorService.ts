import { Observable } from "rxjs";
import IFloorDTO from "../dto/IFloorDTO";

export interface IFloorService {
  createFloor(floorDTO: IFloorDTO): Observable<IFloorDTO>;
  updateFloor(floorDTO: IFloorDTO): Observable<IFloorDTO>;
  updateFloorMap(floorDTO: IFloorDTO): Observable<IFloorDTO>;
  getFloorsList(): Observable<IFloorDTO[]>;
  getFloorsByBuilding(selectedBuilding: string): Observable<IFloorDTO[]>;
}
