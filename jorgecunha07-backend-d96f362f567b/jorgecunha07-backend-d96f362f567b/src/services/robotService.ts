import { Service, Inject } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import IRobotDTO from '../dto/IRobotDTO';
import IRobotService from './IServices/IRobotService';
import IRobotRepo from '../repos/IRepos/IRobotRepo';
import Robot from '../domain/robot/robot';
import { RobotMap } from '../mappers/RobotMap';
import RobotTypeService from './robotTypeService';

@Service()
export default class RobotService implements IRobotService {
  constructor(
    @Inject(config.repos.robot.name) private robotRepo: IRobotRepo,
    @Inject(() => RobotTypeService) private robotTypeService: RobotTypeService,
  ) {}

  public async createRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>> {
    try {
      const existingRobotCode = await this.robotRepo.findByRobotCode(robotDTO.robotCode);

      if (existingRobotCode) {
        return Result.fail<IRobotDTO>('Robot code is already in use.');
      }

      const existingRobotNickname = await this.robotRepo.findByNickname(robotDTO.robotNickname);

      if (existingRobotNickname) {
        return Result.fail<IRobotDTO>('Robot nickname is already in use.');
      }

      const robotOrError = await Robot.create(robotDTO);

      if (robotOrError.isFailure) {
        return Result.fail<IRobotDTO>(robotOrError.errorValue());
      }

      const RobotTypeExists = await this.robotTypeService.findRobotTypeByName(robotDTO.robotTypeName.toString());

      if (RobotTypeExists == null) {
        return Result.fail<IRobotDTO>('Robot type not found');
      }

      // Check if a robot with the same serial number and robot type name exists
      const existingRobot = await this.robotRepo.findBySerialNumberAndType(
        robotDTO.robotSerialNumber,
        robotDTO.robotTypeName,
      );

      if (existingRobot) {
        return Result.fail<IRobotDTO>('Robot serial number is not unique for this robot type.');
      }

      const robotResult = robotOrError.getValue();

      await this.robotRepo.save(robotResult);

      const robotDTOResult = RobotMap.toDTO(robotResult) as IRobotDTO;
      return Result.ok<IRobotDTO>(robotDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async enableOrDisableRobot(robotCode: string, enable: boolean): Promise<Result<IRobotDTO>> {
    try {
      const robot = await this.robotRepo.findByRobotCode(robotCode);

      if (!robot) {
        return Result.fail<IRobotDTO>('Robot not found');
      }

      if ((robot.isEnabled && enable) || (!robot.isEnabled && !enable)) {
        return Result.fail<IRobotDTO>('Robot is already in the desired state');
      }

      robot.changeState();
      await this.robotRepo.save(robot);

      const robotDTOResult = RobotMap.toDTO(robot) as IRobotDTO;
      return Result.ok<IRobotDTO>(robotDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async getAllRobots(): Promise<Result<IRobotDTO[]>> {
    try {
      const robots = await this.robotRepo.getAllRobots();

      const robotDTOs = robots.map(robot => RobotMap.toDTO(robot) as IRobotDTO);
      return Result.ok(robotDTOs);
    } catch (e) {
      return Result.fail(e);
    }
  }

  public async getEnabledRobots(): Promise<Result<IRobotDTO[]>> {
    try {
      const enabledRobots = await this.robotRepo.getEnabledRobots();

      const enabledRobotsDto = enabledRobots.map(robot => RobotMap.toDTO(robot) as IRobotDTO);
      return Result.ok(enabledRobotsDto);
    } catch (e) {
      return Result.fail(e);
    }
  }

  public async getEnabledRobotsWithTaskType(taskType: string): Promise<Result<IRobotDTO[]>> {
    try {
      const enabledRobotsFiltered: IRobotDTO[] = [];

      const enabledRobots = await this.robotRepo.getEnabledRobots();

      for (let i = 0; i < enabledRobots.length; i++) {
        const supportedTasksResult = await this.robotTypeService.getSupportedTaskTypesByRobotTypeName(
          enabledRobots[i].robotTypeName,
        );

        if (supportedTasksResult.isSuccess) {
          const supportedTasks = supportedTasksResult.getValue();

          if (supportedTasks.includes(taskType)) {
            enabledRobotsFiltered.push(RobotMap.toDTO(enabledRobots[i]));
          }
        } else {
          return Result.fail(supportedTasksResult.error);
        }
      }

      return Result.ok(enabledRobotsFiltered);
    } catch (e) {
      return Result.fail(e);
    }
  }
}
