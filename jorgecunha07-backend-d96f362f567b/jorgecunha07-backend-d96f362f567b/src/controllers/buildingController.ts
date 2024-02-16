import e, { NextFunction, Request, Response } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';

import IBuildingController from './IControllers/IBuildingController';
import IBuildingService from '../services/IServices/IBuildingService';
import IBuildingDTO from '../dto/IBuildingDTO';

import { Result } from '../core/logic/Result';

@Service()
export default class BuildingController implements IBuildingController {
  constructor(@Inject(config.services.building.name) private buildingServiceInstance: IBuildingService
  ) {}

  public async createBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingOrError = (await this.buildingServiceInstance.createBuilding(req.body as IBuildingDTO)) as Result<
        IBuildingDTO
      >;

      if (buildingOrError.isFailure) {
        return res
          .status(400)
          .json(buildingOrError.error)
          .send();
      }

      const buildingDTO = buildingOrError.getValue();
      return res.json(buildingDTO).status(201);
    } catch (e) {
      console.error('Error in createBuilding:', e);
      return next(e);
    }
  }

  public async updateBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingOrError = (await this.buildingServiceInstance.updateBuilding(req.body as IBuildingDTO)) as Result<
        IBuildingDTO
      >;

      if (buildingOrError.isFailure) {
        return res
          .status(400)
          .json(buildingOrError.error)
          .send();
      }

      const buildingDTO = buildingOrError.getValue();
      return res.status(200).json(buildingDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getAllBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingOrError = await this.buildingServiceInstance.getAllBuilding();

      if (buildingOrError.isFailure) {
        return res
          .json(buildingOrError.error)
          .status(400)
          .send();
      }

      if (buildingOrError.getValue().length == 0) {
        return res
          .json('No Building was found!')
          .status(404)
          .send();
      }
      const buildingDTO = buildingOrError.getValue();
      return res.json(buildingDTO).status(200);
    } catch (e) {
      return next(e);
    }
  }

  public async getFloorsByParameters(
    param1: string,
    param2: string,
    req: e.Request,
    res: e.Response,
    next: e.NextFunction,
  ) {
    try {
      const buildingOrError = await this.buildingServiceInstance.getFloorsByParameters(param1, param2);

      if (buildingOrError.isFailure) {
        return res
          .status(400)
          .json(buildingOrError.error)
          .send();
      }

      if (buildingOrError.getValue().length == 0) {
        return res
          .status(404)
          .json('No floors was found!')
          .send();
      }
      const building_floordtos = buildingOrError.getValue();
      return res.status(200).json(building_floordtos); // Swapped order of status and json methods
    } catch (e) {
      return next(e);
    }
  }
}
