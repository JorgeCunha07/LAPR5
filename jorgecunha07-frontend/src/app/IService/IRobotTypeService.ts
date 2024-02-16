import { Observable } from "rxjs";
import RobotTypeDTO from "../dto/RobotTypeDTO";


export interface IRobotTypeService {
  createRobotType(robotTypeDTO: RobotTypeDTO): Observable<RobotTypeDTO>;
}
