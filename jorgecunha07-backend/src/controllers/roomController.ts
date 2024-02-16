import { NextFunction, Request, Response } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';
import IRoomController from './IControllers/IRoomController';
import IRoomService from '../services/IServices/IRoomService';

import { Result } from '../core/logic/Result';
import IRoomDTO from '../dto/IRoomDTO';

@Service()
export default class RoomController implements IRoomController {
  constructor(@Inject(config.services.room.name) private roomServiceInstance: IRoomService) {}

  public async createRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const roomOrError = (await this.roomServiceInstance.createRoom(req.body as IRoomDTO)) as Result<IRoomDTO>;

      if (roomOrError.isFailure) {
        return res
          .status(400)
          .json(roomOrError.error)
          .send();
      }

      const roomDTO = roomOrError.getValue();
      return res.json(roomDTO).status(201);
    } catch (e) {
      console.error('Error in createRoom:', e);
      return next(e);
    }
  }

  public async updateRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const roomOrError = (await this.roomServiceInstance.updateRoom(req.body as IRoomDTO)) as Result<IRoomDTO>;

      if (roomOrError.isFailure) {
        return res
          .status(400)
          .json(roomOrError.error)
          .send();
      }

      const roomDTO = roomOrError.getValue();
      return res.status(200).json(roomDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getAllRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const roomOrError = await this.roomServiceInstance.getAllRooms();

      if (roomOrError.isFailure) {
        return res
          .status(400)
          .json(roomOrError.error)
          .send();
      }

      if (roomOrError.getValue().length == 0) {
        return res
          .status(404)
          .json('No Room was found!')
          .send();
      }
      const roomDTO = roomOrError.getValue();
      return res.json(roomDTO).status(200);
    } catch (e) {
      return next(e);
    }
  }
}
