import { Request, Response, NextFunction } from 'express';
import { expressjwt as jwt } from "express-jwt";
import config from '../../../config';

declare global {
  namespace Express {
    interface Request {
      auth?: { [key: string]: any }; // Add the auth property
    }
  }
}

class RoleCheckMiddleware {
  private static instance: RoleCheckMiddleware;

  static getInstance(): RoleCheckMiddleware {
    if (!RoleCheckMiddleware.instance) {
      RoleCheckMiddleware.instance = new RoleCheckMiddleware();
    }
    return RoleCheckMiddleware.instance;
  }

  isAuth = jwt({
    secret: config.jwtSecret, // The secret to sign the JWTs
    algorithms: ["HS256"],  // Specify the algorithm
    getToken: this.getTokenFromHeader as any, // How to extract the JWT from the request
  });

  checkRole(requiredRole: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      this.isAuth(req, res, async (err) => {
        if (err) return next(err);
        if (req.auth && req.auth.role === requiredRole) {
          return next();
        }
        return res.status(403).send("Access denied: Insufficient permissions");
      });
    };
  }

  isAuthenticated() {
    return (req: Request, res: Response, next: NextFunction) => {
      this.isAuth(req, res, (err) => {
        if (err) {
          console.error("Authentication error:", err);
          return next(err);
        }
        next();
      });
    };
  }

  private getTokenFromHeader(req: Request): string | null {
    if (
      (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
      (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
    ) {
      return req.headers.authorization.split(' ')[1];
    }
    return null;
  }
}

export default RoleCheckMiddleware;
