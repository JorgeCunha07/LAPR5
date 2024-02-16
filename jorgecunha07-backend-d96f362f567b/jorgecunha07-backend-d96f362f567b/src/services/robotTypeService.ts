import { Service, Inject } from 'typedi';
import config from '../../config';
import IRobotTypeDTO from '../dto/IRobotTypeDTO';
import IRobotTypeRepo from '../repos/IRepos/IRobotTypeRepo';
import IRobotTypeService from './IServices/IRobotTypeService';
import { Result } from '../core/logic/Result';
import RobotType from '../domain/robotType/robotType';
import { RobotTypeMap } from '../mappers/RobotTypeMap';

@Service()
export default class RobotTypeService implements IRobotTypeService {
  constructor(@Inject(config.repos.robotType.name) private robotTypeRepo: IRobotTypeRepo) {}

  public async createRobotType(robotTypeDTO: IRobotTypeDTO): Promise<Result<IRobotTypeDTO>> {
    try {
      const existingRobotTypeName = await this.robotTypeRepo.findRobotTypeByName(robotTypeDTO.robotTypeName);

      if (existingRobotTypeName) {
        return Result.fail<IRobotTypeDTO>('Robot type name already exists.');
      }

      const existingRobotModel = await this.robotTypeRepo.findRobotTypeByModel(robotTypeDTO.robotModel);

      if (existingRobotModel) {
        return Result.fail<IRobotTypeDTO>('Robot model already exists.');
      }

      const robotTypeOrError = await RobotType.create(robotTypeDTO);

      if (robotTypeOrError.isFailure) {
        return Result.fail<IRobotTypeDTO>(robotTypeOrError.errorValue());
      }

      const robotTypeResult = robotTypeOrError.getValue();

      await this.robotTypeRepo.save(robotTypeResult);

      const robotTypeDTOResult = RobotTypeMap.toDTO(robotTypeResult) as IRobotTypeDTO;
      return Result.ok<IRobotTypeDTO>(robotTypeDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async findRobotTypeByName(robotTypeName: string): Promise<RobotType> {
    try {
      const robotType = await this.robotTypeRepo.findRobotTypeByName(robotTypeName);

      if (robotType === null) {
        throw new Error('Robot type with name ' + robotTypeName + ' not found.');
      } else {
        return robotType;
      }
    } catch (e) {
      throw e;
    }
  }
  public async getSupportedTaskTypesByRobotTypeName(robotTypeName: string): Promise<Result<string[]>> {
    try {
      const robotType = await this.robotTypeRepo.findRobotTypeByName(robotTypeName);

      if (!robotType) {
        return Result.fail<string[]>('Robot type not found.');
      } else {
        return Result.ok<string[]>(robotType.supportedTaskTypes);
      }
    } catch (e) {
      throw e;
    }
  }
}
