import { NextFunction, Request, Response } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';

import IRobotController from './IControllers/IRobotController';
import { Result } from '../core/logic/Result';
import IRobotDTO from '../dto/IRobotDTO';
import IRobotService from '../services/IServices/IRobotService';
import {TaskTypeEnum} from "../domain/taskType/taskTypeEnum";

@Service()
export default class RobotController implements IRobotController {
  constructor(@Inject(config.services.robot.name) private robotServiceInstance: IRobotService) {}

  public async createRobot(req: Request, res: Response, next: NextFunction) {
    try {
      const robotResult = (await this.robotServiceInstance.createRobot(req.body as IRobotDTO)) as Result<IRobotDTO>;

      if (robotResult.isFailure) {
        return res
          .status(400)
          .json(robotResult.error)
          .send();
      }

      const robotDTO = robotResult.getValue();
      return res.json(robotDTO).status(201);
    } catch (e) {
      console.error('Error in createRobot:', e);
      return next(e);
    }
  }

  public async enableOrDisableRobot(req: Request, res: Response, next: NextFunction, enable: boolean) {
    try {
      const robotResult = await this.robotServiceInstance.enableOrDisableRobot(req.params.robotCode, enable);

      if (robotResult.isFailure) {
        return res.status(400).json({ error: robotResult.error });
      }

      const robotDTO = robotResult.getValue();
      return res.status(200).json(robotDTO);
    } catch (e) {
      console.error(`Error in ${enable ? 'enableRobot' : 'disableRobot'}:`, e);
      return next(e);
    }
  }

  public async getAllRobots(req: Request, res: Response, next: NextFunction) {
    try {
      const robotResult = await this.robotServiceInstance.getAllRobots();

      if (robotResult.isFailure) {
        return res.status(400).json({ error: robotResult.error });
      }

      const robots = robotResult.getValue();

      if (robots.length === 0) {
        return res.status(404).json({ error: 'No Robots were found.' });
      }

      return res.status(200).json(robots);
    } catch (e) {
      return next(e);
    }
  }

  public async getEnabledRobots(req: Request, res: Response, next: NextFunction) {
    try {
      const robotResult = await this.robotServiceInstance.getEnabledRobots();

      if (robotResult.isFailure) {
        return res.status(400).json({ error: robotResult.error });
      }

      const enabledRobots = robotResult.getValue();

      if (enabledRobots.length === 0) {
        return res.status(404).json({ error: 'No enabled robots were found.' });
      }

      return res.status(200).json(enabledRobots);
    } catch (e) {
      return next(e);
    }
  }

  public async getEnabledRobotsWithTaskType(req: Request, res: Response, next: NextFunction, taskType: string) {
    try {
      const robotResult = await this.robotServiceInstance.getEnabledRobotsWithTaskType(taskType);

      if (robotResult.isFailure) {
        return res.status(400).json({ error: robotResult.error });
      }

      const enabledRobotsWithTaskType = robotResult.getValue();

      if (enabledRobotsWithTaskType.length === 0) {
        return res.status(404).json({ error: 'No enabled robots were found with that task type.' });
      }

      return res.status(200).json(enabledRobotsWithTaskType);
    } catch (e) {
      return next(e);
    }
  }
}
