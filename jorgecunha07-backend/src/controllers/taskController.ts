import { NextFunction, Request, Response } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';

import ITaskController from './IControllers/ITaskController';
import { Result } from '../core/logic/Result';
import ITaskService from '../services/IServices/ITaskService';
import ISurveillanceTask_TaskDTO from '../dto/ISurveillanceTask_TaskDTO';
import ITransportTask_TaskDTO from '../dto/ITransportTask_TaskDTO';

@Service()
export default class TaskController implements ITaskController {
  constructor(@Inject(config.services.task.name) private taskService: ITaskService) {}

  public async createSurveillanceTask(req: Request, res: Response, next: NextFunction) {
    try {
      const surveillanceTaskResult = (await this.taskService.createSurveillanceTask(
        req.body as ISurveillanceTask_TaskDTO,
      )) as Result<ISurveillanceTask_TaskDTO>;

      if (surveillanceTaskResult.isFailure) {
        return res
          .status(400)
          .json(surveillanceTaskResult.error)
          .send();
      }

      const surveillanceTaskDTO = surveillanceTaskResult.getValue();
      return res.json(surveillanceTaskDTO).status(201);
    } catch (e) {
      console.error('Error in createSurveillanceTask:', e);
      return next(e);
    }
  }

  public async createTransportTask(req: Request, res: Response, next: NextFunction) {
    try {
      const transportTaskResult = (await this.taskService.createTransportTask(
        req.body as ITransportTask_TaskDTO,
      )) as Result<ITransportTask_TaskDTO>;

      if (transportTaskResult.isFailure) {
        return res
          .status(400)
          .json(transportTaskResult.error)
          .send();
      }

      const transportTaskDTO = transportTaskResult.getValue();
      return res.json(transportTaskDTO).status(201);
    } catch (e) {
      console.error('Error in createTransportTask:', e);
      return next(e);
    }
  }
}
