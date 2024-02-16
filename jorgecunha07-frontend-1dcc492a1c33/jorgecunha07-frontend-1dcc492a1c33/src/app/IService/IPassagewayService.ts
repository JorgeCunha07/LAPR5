import { Observable } from "rxjs";
import PassagewayDTO from "../dto/PassagewayDTO";

export interface IPassagewayService {
  createPassageway(passagewayDTO: PassagewayDTO): Observable<PassagewayDTO>;
  updatePassageway(passageway: PassagewayDTO): Observable<PassagewayDTO>;
  getAllPassagewaysBetweenBuildings(buildingACode: string, buildingBCode: string): Observable<PassagewayDTO[]>;
  getFloorsFromBuildingWithPassageway(buildingCode: string): Observable<PassagewayDTO[]>;
}
