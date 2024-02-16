import {Inject, Service} from "typedi";
import config from "../../config";
import IUserController from "./IControllers/IUserController";
import IUserService from "../services/IServices/IUserService";
import e, {NextFunction, Request, Response} from "express";
import {IUserDTO} from "../dto/IUserDTO";
import {Result} from "../core/logic/Result";
import {ISignUpRequestDTO} from "../dto/ISignUpRequestDTO";
import RoleCheckMiddleware from "../api/middlewares/roleCheckMiddleware";
import {IAuthDTO} from "../dto/IAuthDTO";

@Service()
export default class UserController implements IUserController  {

  jwt = require('jsonwebtoken');

  constructor(
    @Inject(config.services.user.name) private userServiceInstance: IUserService
  ) {
  }

  public async getAllUserRequests(req: Request, res: Response, next: NextFunction) {
    try {
      const userRequestsOrError = await this.userServiceInstance.getAllUserRequests() as Result<ISignUpRequestDTO[]>;
      if (userRequestsOrError.isFailure) {
        return res.status(403).json(userRequestsOrError.errorValue());
      }
      return res.status(201).json(userRequestsOrError.getValue());
    } catch (e) {
      return next(e);
    }
  }

  public async tokenInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const roleCheckMiddleware = RoleCheckMiddleware.getInstance();
      roleCheckMiddleware.isAuthenticated();

      return res.status(201).json("Valor");
    } catch (e) {
      return next(e);
    }
  }

  public async signUpRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const userOrError = await this.userServiceInstance.SignUpRequest(req.body as ISignUpRequestDTO) as Result<ISignUpRequestDTO>;
      if (userOrError.isFailure) {
        return res.status(403).json(userOrError.errorValue());
      }

      const userDTO = userOrError.getValue();
      return res.status(201).json(userDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const userOrError = await this.userServiceInstance.SignUp(req.body) ;
      if (userOrError.isFailure) {
        return res.status(403).json(userOrError.errorValue());
      }
      const { userDTO, token } = userOrError.getValue();
      return res.status(201).json({userDTO: userDTO, token});
    } catch (e) {

      return next(e);
    }
  }


  public async updateUserInfo(req: Request, res: Response, next: NextFunction) {

    try {

      let flag = req.params.someBooleanValue;

      const userOrError = await this.userServiceInstance.updateUserInfo(req.body,flag);
      if (userOrError.isFailure) {
        return res.status(403).json(userOrError.errorValue());
      }
      const {userDTO, token} = userOrError.getValue();
      return res.status(201).json({userDTO: userDTO, token});
    } catch (e) {

      return next(e);
    }
  }
  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const params = {
        email: req.body.email,
        password: req.body.password
      };

      const userOrError = await this.userServiceInstance.SignIn(params.email, params.password) ;
      if (userOrError.isFailure) {
        return res.status(403).json(userOrError.errorValue());
      }
      const { userDTO, token } = userOrError.getValue();

      return res.status(201).json({userDTO: userDTO, token});
    } catch (e) {
      return next(e);
    }
  }

  public async isSignedIn(req: Request, res: Response, next: NextFunction) {
    try {
      const userOrError = await this.userServiceInstance.IsSignedIn();
      if (userOrError == null) {
        return res.status(403).json({message: "User is not signed in!"});
      } else {
        return res.status(201).json(userOrError);
      }
    } catch (e) {
      return next(e);
    }
  }

  public async signOut(req: Request, res: Response, next: NextFunction) {
    try {
      await this.userServiceInstance.Logout();
      return res.status(201).json({message: "User signed out!"});
    } catch (e) {
      return next(e);
    }
  }

  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.params.email;
      console.log(email);
      const sucOrError = await this.userServiceInstance.deleteUser(email);
      if (sucOrError.isFailure) {
        return res.status(403).json(sucOrError.errorValue());
      }
      return res.status(201).json({message: "User deleted!"});
    } catch (e) {
      return next(e);
    }
  }

  public async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.params.email;
      const userOrError = await this.userServiceInstance.getUserByEmail(email) as Result<IUserDTO>;
      if (userOrError.isFailure) {
        return res.status(403).json(userOrError.errorValue());
      }
      return res.status(201).json(userOrError.getValue());
    } catch (e) {
      return next(e);
    }
  }

  public async deleteUserRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.params.email;
      const sucOrError = await this.userServiceInstance.deleteUserRequest(email);
      if (sucOrError.isFailure) {
        return res.status(403).json(sucOrError.errorValue());
      }
      return res.status(201).json({message: "User request deleted!"});
    } catch (e) {
      return next(e);
    }
  }

  public async approveUserRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.params.email;
      const userOrError = await this.userServiceInstance.approveUserRequest(email);
      if (userOrError.isFailure) {
        return res.status(403).json(userOrError.errorValue());
      }
      const { userDTO, token } = userOrError.getValue();

      return res.status(201).json({userDTO: userDTO, token});
    } catch (e) {
      return next(e);
    }
  }

  public async refreshtoken(req: Request, res: Response, next: NextFunction) {
    try {
      // Extract the old token. Assuming it's sent in the Authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
      }

      const oldToken = authHeader.split(' ')[1]; // Assuming the format is "Bearer [token]"
      if (!oldToken) {
        return res.status(401).json({ message: 'Malformed token' });
      }

      // Call the refreshToken service method
      const result = await this.userServiceInstance.refreshToken(oldToken);
      if (result.isFailure) {
        return res.status(403).json({ message: result.errorValue() });
      }

      // Return the new token
      const { token } = result.getValue();
      return res.status(200).json({ token });
    } catch (error) {
      return next(error);
    }
  }

}
