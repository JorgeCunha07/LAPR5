import { Result } from '../../core/logic/Result';
import RobotType from '../../domain/robotType/robotType';
import IRobotTypeDTO from '../../dto/IRobotTypeDTO';

export default interface IRobotTypeService {
  createRobotType(robotTypeDTO: IRobotTypeDTO): Promise<Result<IRobotTypeDTO>>;
  findRobotTypeByName(robotTypeName: string): Promise<RobotType>;
  getSupportedTaskTypesByRobotTypeName(robotTypeName: string): Promise<Result<string[]>>;
}
