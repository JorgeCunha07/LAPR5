import { Observable } from "rxjs";
import ElevatorDTO from "../dto/ElevatorDTO";


export interface IElevatorService {
  createElevator(elevatorDTO: ElevatorDTO): Observable<ElevatorDTO>;
  getElevatorsByBuilding(selectedBuilding: string): Observable<ElevatorDTO[]>;
  updateElevator(elevator: ElevatorDTO): Observable<ElevatorDTO>;
}
