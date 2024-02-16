import { NextFunction, Request, Response } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import IFloorController from './IControllers/IFloorController';
import IFloorDTO from '../dto/IFloorDTO';
import IFloorService from '../services/IServices/IFloorService';
import IFloorMapDTO from '../dto/IFloorMapDTO';

@Service()
export default class FloorController implements IFloorController {
  constructor(@Inject(config.services.floor.name) private floorServiceInstance: IFloorService) {}

  public async createFloor(req: Request, res: Response, next: NextFunction) {
    try {
      const floorOrError = (await this.floorServiceInstance.createFloor(req.body as IFloorDTO, res, next)) as Result<
        IFloorDTO
      >;
      if (floorOrError.isFailure) {
        return res
          .status(404)
          .json(floorOrError.error)
          .send();
      }
      const floorDTO = floorOrError.getValue();
      return res.json(floorDTO).status(201);
    } catch (e) {
      res.status(500).send(e.toString());
    }
  }

  public async updateFloor(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.floorServiceInstance.updateFloor(req.body as IFloorDTO);

      if (result.isFailure) {
        return res
          .status(400)
          .json({ error: result.error })
          .send();
      }

      return res
        .status(200)
        .json(result.getValue())
        .send();
    } catch (error) {
      console.error('Error during floor update:', error.message);
      return next(error);
    }
  }

  public async updateFloorMap(req: Request, res: Response, next: NextFunction) {
    const { buildingFinderId, floorNumber } = req.params;

    const number = parseInt(floorNumber);
    const floorMapDTO: IFloorMapDTO = req.body as IFloorMapDTO;
    try {
      const result = await this.floorServiceInstance.updateFloorMap(buildingFinderId, number, floorMapDTO);

      if (result.isFailure) {
        console.log(result.error);
        return res
          .status(400)
          .json({ error: result.error })
          .send();
      }

      return res
        .status(200)
        .json(result.getValue())
        .send();
    } catch (error) {
      console.error('Error during floormap update:', error.message);
      return next(error);
    }
  }

  public async getAllFloor(req: Request, res: Response, next: NextFunction) {
    try {
      const floorOrError = await this.floorServiceInstance.getAllFloor();

      if (floorOrError.isFailure) {
        return res
          .status(400)
          .json(floorOrError.error)
          .send();
      }

      if (floorOrError.getValue().length == 0) {
        return res
          .status(404)
          .json('No Floor was found!')
          .send();
      }

      const floorsDTO = floorOrError.getValue();
      return res.json(floorsDTO).status(200);
    } catch (e) {
      return next(e);
    }
  }

  public async getFloorsByBuildingFinderId(param1: string, req: Request, res: Response, next: NextFunction) {
    try {
      const floorOrError = await this.floorServiceInstance.getFloorsByBuildingFinderId(param1);
      if (floorOrError == null) {
        return res
          .status(402)
          .json('Building without Floors.')
          .send();
      }
      return res.json(floorOrError).status(201);
    } catch (e) {
      return next(e);
    }
  }
}
