import { Observable } from "rxjs";
import BuildingDTO from "../dto/BuildingDTO";
import Building_FloorsDTO from "../dto/Building_FloorsDTO";


export interface IBuildingService {
  getList(): Observable<BuildingDTO[]>;
  createBuilding(buildingDTO: BuildingDTO): Observable<BuildingDTO>;
  getBuildingByCode(code: string): Observable<BuildingDTO>;
  updateBuilding(building: BuildingDTO): Observable<BuildingDTO>;
  getListByParameters(min: number, max: number): Observable<Building_FloorsDTO[]>;
}
