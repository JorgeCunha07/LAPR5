import { Request, Response, NextFunction } from 'express';

export default interface IBuildingController {
  createBuilding(req: Request, res: Response, next: NextFunction);

  updateBuilding(req: Request, res: Response, next: NextFunction);

  getAllBuilding(req: Request, res: Response, next: NextFunction);

  getFloorsByParameters(param1: string, param2: string, req: Request, res: Response, next: NextFunction);
}
