import { Request, Response, NextFunction } from 'express';

export default interface IRobotTypeController {
  createRobotType(req: Request, res: Response, next: NextFunction);
  getSupportedTaskTypesByRobotTypeName(robotTypeName: string): Promise<string[] | null>;
}
