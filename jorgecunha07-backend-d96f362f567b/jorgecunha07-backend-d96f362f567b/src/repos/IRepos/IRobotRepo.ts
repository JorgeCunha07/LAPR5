import { Repo } from '../../core/infra/Repo';
import Robot from '../../domain/robot/robot';

export default interface IRobotRepo extends Repo<Robot> {
  save(robot: Robot): Promise<Robot>;
  findByRobotCode(robotCode: string): Promise<Robot>;
  findByNickname(nickname: string): Promise<Robot>;
  findBySerialNumberAndType(robotSerialNumber: string, robotTypeName: string): Promise<Robot>;
  getAllRobots(): Promise<Robot[]>;
  getEnabledRobots(): Promise<Robot[]>;
}
