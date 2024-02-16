import { NextFunction, Request, Response } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';

import IPassagewayService from '../services/IServices/IPassagewayService';
import IPassagewayDTO from '../dto/IPassagewayDTO';

import { Result } from '../core/logic/Result';
import IPassagewayController from './IControllers/IPassagewayController';

@Service()
export default class PassagewayController implements IPassagewayController {
  constructor(@Inject(config.services.passageway.name) private passagewayServiceInstance: IPassagewayService) {}

  public async createPassageway(req: Request, res: Response, next: NextFunction) {
    try {
      const passagewayOrError = (await this.passagewayServiceInstance.createPassageway(
        req.body as IPassagewayDTO,
      )) as Result<IPassagewayDTO>;

      if (passagewayOrError.isFailure) {
        return res
          .status(400)
          .json(passagewayOrError.error)
          .send();
      }

      const passagewayDTO = passagewayOrError.getValue();
      return res.json(passagewayDTO).status(201);
    } catch (e) {
      console.error('Error in createPassageway:', e);
      return next(e);
    }
  }

  public async updatePassageway(req: Request, res: Response, next: NextFunction) {
    try {
      const passagewayOrError = (await this.passagewayServiceInstance.updatePassageway(
        req.body as IPassagewayDTO,
      )) as Result<IPassagewayDTO>;

      if (passagewayOrError.isFailure) {
        return res
          .status(400)
          .json(passagewayOrError.error)
          .send();
      }

      const passagewayDTO = passagewayOrError.getValue();
      return res.status(200).json(passagewayDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getAllPassagewaysBetweenBuildings(req: Request, res: Response, next: NextFunction) {
    try {
      // const { buildingACode, buildingBCode } = req.query; // Get the building codes
      const buildingACode = req.query.buildingACode as string;
      const buildingBCode = req.query.buildingBCode as string;

      const passagewayOrError = await this.passagewayServiceInstance.getAllPassagewaysBetweenBuildings(
        buildingACode,
        buildingBCode,
      );

      if (passagewayOrError.isFailure) {
        return res
          .status(400)
          .json(passagewayOrError.error)
          .send();
      }

      if (passagewayOrError.getValue().length == 0) {
        return res
          .status(404)
          .json('No Passageway was found!')
          .send();
      }
      const passagewayDTO = passagewayOrError.getValue();
      return res.json(passagewayDTO).status(200);
    } catch (e) {
      return next(e);
    }
  }

  public async getFloorsFromBuildingWithPassageway(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingCode = req.params.buildingCode;

      const passagewayOrError = await this.passagewayServiceInstance.getFloorsFromBuildingWithPassageway(buildingCode);

      if (passagewayOrError.isFailure) {
        return res
          .status(400)
          .json(passagewayOrError.error)
          .send();
      }

      if (passagewayOrError.getValue().length == 0) {
        return res
          .status(404)
          .json('No Passageway was found!')
          .send();
      }
      const passagewayDTO = passagewayOrError.getValue();
      return res.json(passagewayDTO).status(200);
    } catch (e) {
      return next(e);
    }
  }
}
