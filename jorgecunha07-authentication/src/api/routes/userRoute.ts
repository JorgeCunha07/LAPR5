import {Router, Request, Response, NextFunction} from 'express';
import {Container} from 'typedi';

import middlewares from '../middlewares';
import {celebrate, Joi} from 'celebrate';
import winston = require('winston');
import config from "../../../config";
import IUserController from "../../controllers/IControllers/IUserController";
import RoleCheckMiddleware from "../middlewares/roleCheckMiddleware";
import {IAuthDTO} from "../../dto/IAuthDTO";


const route = Router();

export default (app: Router) => {

  const ctrl = Container.get(config.controllers.user.name) as IUserController;
  const roleCheckMiddleware = RoleCheckMiddleware.getInstance();
  app.use('/auth', route);


  route.post('/request',celebrate({
      body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        userNif: Joi.string().required(),
        userNumber: Joi.string().required()
      }),
    }), async (req: Request, res: Response, next: NextFunction) => {
      console.log("Creating a User Request!");
      ctrl.signUpRequest(req, res, next);
    }
  );




  route.get('/getAllRequests', async (req: Request, res: Response, next: NextFunction) => {
      console.log("Getting all User Requests!");
      ctrl.getAllUserRequests(req, res, next);
    }
  );

  route.put('/userRequest/:email', async (req: Request, res: Response, next: NextFunction) => {
      console.log("Approve a User Request!");
      ctrl.approveUserRequest(req, res, next);
    }
  );

  route.delete('/userRequest/:email', async (req: Request, res: Response, next: NextFunction) => {
      console.log("Deleting a User Request!");
      ctrl.deleteUserRequest(req, res, next);
    }
  );

  route.post(
    '/signup',
    celebrate({
      body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string().required(),
        userNif: Joi.string().allow(null).optional(), // Allow null but still required
        userNumber: Joi.string().allow(null).required() // Allow null but still required
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      console.log("Creating a User!");
      ctrl.signUp(req, res, next);
    }
  );



  route.put(
    '/updateUserInfo/:someBooleanValue',
    celebrate({
      body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string().required(),
        userNif: Joi.string().required(),
        userNumber: Joi.string().required()
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      console.log("update a User!");
      ctrl.updateUserInfo(req, res, next);
    }
  );






  route.post(
    '/signin',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      console.log("Signing in a User!");
      ctrl.signIn(req, res, next);
    },
  );


  route.post(
    '/logout',
    async (req: Request, res: Response, next: NextFunction) => {
      console.log("Signing out a User!");
      ctrl.signOut(req, res, next);
    }
  );





  route.get('/userInfo/:email', async (req: Request, res: Response, next: NextFunction) => {
    console.log("Getting a User!");
    ctrl.getUser(req, res, next);
  });



  route.delete('/userInfo/:email', async (req: Request, res: Response, next: NextFunction) => {
    console.log("Deleting a User!");
    ctrl.deleteUser(req, res, next);
  });


  route.post('/refreshtoken', async (req, res, next) => {
    ctrl.refreshtoken(req, res, next);
  });


  route.get('/verifyToken', roleCheckMiddleware.isAuthenticated(), (req: Request, res: Response, next: NextFunction) => {
    try {
      // Assuming the JWT middleware correctly populates req.auth
      if (req.auth) {
        const authDTO: IAuthDTO = {
          isAuthenticated: true,
          email: req.auth.email,
          role: req.auth.role
        };
        res.json(authDTO);
      } else {
        // Handle the case where authentication failed
        const errorDTO: IAuthDTO = {
          isAuthenticated: false,
          email: '',
          role: ''
        };
        res.status(401).json(errorDTO);
      }
    } catch (error) {
      // Handle any other errors
      const errorDTO: IAuthDTO = {
        isAuthenticated: false,
        email: '',
        role: ''
      };
      res.status(500).json(errorDTO);
    }
  });
};
