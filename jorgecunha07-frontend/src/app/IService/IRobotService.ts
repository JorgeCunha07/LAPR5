import { Observable } from "rxjs";
import RobotDTO from '../dto/RobotDTO';

export interface IRobotService {
  createRobot(robotDTO: RobotDTO): Observable<RobotDTO>;
  getList(): Observable<RobotDTO[]>;
  updateRobotState(endpoint: string): Observable<any>;
}
