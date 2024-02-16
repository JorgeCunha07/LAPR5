import { NextFunction, Request, Response } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';

import IRobotTypeController from './IControllers/IRobotTypeController';
import IRobotTypeDTO from '../dto/IRobotTypeDTO';
import IRobotTypeService from '../services/IServices/IRobotTypeService';
import { Result } from '../core/logic/Result';

@Service()
export default class RobotTypeController implements IRobotTypeController {
  constructor(@Inject(config.services.robotType.name) private robotTypeServiceInstance: IRobotTypeService) {}

  public async createRobotType(req: Request, res: Response, next: NextFunction) {
    try {
      const robotTypeOrError = (await this.robotTypeServiceInstance.createRobotType(
        req.body as IRobotTypeDTO,
      )) as Result<IRobotTypeDTO>;

      if (robotTypeOrError.isFailure) {
        return res
          .status(400)
          .json(robotTypeOrError.error)
          .send();
      }

      const robotTypeDTO = robotTypeOrError.getValue();
      return res.json(robotTypeDTO).status(201);
    } catch (e) {
      console.error('Error in createRobotType:', e);
      return next(e);
    }
  }

  public async getSupportedTaskTypesByRobotTypeName(robotTypeName: string): Promise<string[]> {
    try {
      const result = await this.robotTypeServiceInstance.getSupportedTaskTypesByRobotTypeName(robotTypeName);

      if (result.isFailure) {
        throw result.error;
      }

      return result.getValue();
    } catch (error) {
      console.error('Error in getSupportedTaskTypesByRobotTypeName:', error);
      throw error;
    }
  }
}
