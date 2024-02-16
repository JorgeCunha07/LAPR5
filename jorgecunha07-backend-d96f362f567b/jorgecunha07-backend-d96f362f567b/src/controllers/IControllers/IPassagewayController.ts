import { Request, Response, NextFunction } from 'express';

export default interface IPassagewayController {
  createPassageway(req: Request, res: Response, next: NextFunction);

  updatePassageway(req: Request, res: Response, next: NextFunction);

  getAllPassagewaysBetweenBuildings(req: Request, res: Response, next: NextFunction);

  getFloorsFromBuildingWithPassageway(req: Request, res: Response, next: NextFunction);
}
