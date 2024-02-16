import { NextFunction, Request, Response } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';

import IElevatorController from './IControllers/IElevatorController';
import IElevatorService from '../services/IServices/IElevatorService';
import IElevatorDTO from '../dto/IElevatorDTO';

import { Result } from '../core/logic/Result';

@Service()
export default class ElevatorController implements IElevatorController {
  constructor(@Inject(config.services.elevator.name) private elevatorServiceInstance: IElevatorService) {}

  public async createElevator(req: Request, res: Response, next: NextFunction) {
    try {
      const elevatorOrError = (await this.elevatorServiceInstance.createElevator(req.body as IElevatorDTO)) as Result<
        IElevatorDTO
      >;

      if (elevatorOrError.isFailure) {
        return res
          .status(400)
          .json(elevatorOrError.error)
          .send();
      }

      const elevatorDTO = elevatorOrError.getValue();
      return res.json(elevatorDTO).status(201);
    } catch (e) {
      console.error('Error in createElevator:', e);
      return next(e);
    }
  }

  public async updateElevator(req: Request, res: Response, next: NextFunction) {
    try {
      const elevatorOrError = (await this.elevatorServiceInstance.updateElevator(req.body as IElevatorDTO)) as Result<
        IElevatorDTO
      >;

      if (elevatorOrError.isFailure) {
        return res
          .status(400)
          .json(elevatorOrError.error)
          .send();
      }

      const elevatorDTO = elevatorOrError.getValue();
      return res.status(200).json(elevatorDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getAllElevators(req: Request, res: Response, next: NextFunction) {
    try {
      const elevatorOrError = await this.elevatorServiceInstance.getAllElevators();

      if (elevatorOrError.isFailure) {
        return res
          .status(400)
          .json(elevatorOrError.error)
          .send();
      }

      if (elevatorOrError.getValue().length == 0) {
        return res
          .status(404)
          .json('No Elevator was found!')
          .send();
      }
      const elevatorDTO = elevatorOrError.getValue();
      return res.json(elevatorDTO).status(200);
    } catch (e) {
      return next(e);
    }
  }
  public async getElevatorsByBuilding(param1: string, req: Request, res: Response, next: NextFunction) {
    try {
      const elevatorsOrError = await this.elevatorServiceInstance.getElevatorsByBuilding(param1);
      if (elevatorsOrError == null) {
        return res
          .status(402)
          .json('Building without Elevators.')
          .send();
      }
      return res.json(elevatorsOrError).status(201);
    } catch (e) {
      return next(e);
    }
  }
}
