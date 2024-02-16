import { Request, Response, NextFunction } from 'express';

export default interface IFloorController {
  createFloor(req: Request, res: Response, next: NextFunction);

  updateFloor(req: Request, res: Response, next: NextFunction);

  updateFloorMap(req: Request, res: Response, next: NextFunction);

  getAllFloor(req: Request, res: Response, next: NextFunction);

  getFloorsByBuildingFinderId(param1: string, req: Request, res: Response, next: NextFunction);
}
