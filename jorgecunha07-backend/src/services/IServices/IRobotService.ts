import { Result } from '../../core/logic/Result';
import IRobotDTO from '../../dto/IRobotDTO';
import {TaskTypeEnum} from "../../domain/taskType/taskTypeEnum";

export default interface IRobotService {
  createRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>>;
  enableOrDisableRobot(robotCode: string, enable: boolean): Promise<Result<IRobotDTO>>;
  getAllRobots(): Promise<Result<IRobotDTO[]>>;
  getEnabledRobots(): Promise<Result<IRobotDTO[]>>;
  getEnabledRobotsWithTaskType(taskType: string): Promise<Result<IRobotDTO[]>>;
}
