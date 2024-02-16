import { Request, Response, NextFunction } from 'express';

export default interface ITaskController {
  createSurveillanceTask(req: Request, res: Response, next: NextFunction);
  createTransportTask(req: Request, res: Response, next: NextFunction);
}
