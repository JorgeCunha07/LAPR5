import { Request, Response, NextFunction } from 'express';
export default interface ITaskController {
  createRobot(req: Request, res: Response, next: NextFunction);
  enableOrDisableRobot(req: Request, res: Response, next: NextFunction, enable: boolean);
  getAllRobots(req: Request, res: Response, next: NextFunction);
  getEnabledRobots(req: Request, res: Response, next: NextFunction);
  getEnabledRobotsWithTaskType(req: Request, res: Response, next: NextFunction, taskType: string);
}
