import {Router} from 'express';
import {celebrate, Joi} from 'celebrate';

import {Container} from 'typedi';
import IElevatorController from '../../controllers/IControllers/IElevatorController';
import {Constants} from "../../Constants/Constants";
import config from '../../../config';
import axios from 'axios';
import {IAuthDTO} from "../../dto/IAuthDTO";

const verifyToken = async (req): Promise<IAuthDTO> => {
  const token = req.headers.authorization;

  try {
    const response = await axios.get(Constants.MODULE_AUTH, {
      headers: {
        'Authorization': token
      }
    });
    return response.data; // This should be the IAuthDTO
  } catch (error) {
    console.error('Token verification failed:', error.response?.data);
    return {isAuthenticated: false, email: '', role: ''}; // Return a default IAuthDTO with isAuthenticated set to false
  }
};
const route = Router();

export default (app: Router) => {
  app.use('/elevators', route);

  const ctrl = Container.get(config.controllers.elevator.name) as IElevatorController;

  route.post(
    '',
    celebrate({
      body: Joi.object({
        buildingFinderId: Joi.string().required(),
        floors: Joi.array()
          .items(Joi.string())
          .required(),
        location: Joi.object({
          x: Joi.number().required(),
          y: Joi.number().required(),
        }).required(),
      }),
    }),
    async (req, res, next) => {
      const authDTO: IAuthDTO = await verifyToken(req);
      if (!authDTO || !authDTO.isAuthenticated || (authDTO.role !== "Admin" && authDTO.role !== "Campus_Manager")) {
        return res.status(401).json({message: 'Unauthorized - Admin or Campus Manager access required'});
      }

      // Proceed with your controller logic
      ctrl.createElevator(req, res, next);
    }
  );

  route.patch(
    '',
    celebrate({
      body: Joi.object({
        buildingFinderId: Joi.string().required(),
        floors: Joi.array()
          .items(Joi.string())
          .required(),
      }),
    }),
    async (req, res, next) => {
      const authDTO: IAuthDTO = await verifyToken(req);
      if (!authDTO || !authDTO.isAuthenticated || (authDTO.role !== "Admin" && authDTO.role !== "Campus_Manager")) {
        return res.status(401).json({message: 'Unauthorized - Admin or Campus Manager access required'});
      }

      // Proceed with your controller logic
      ctrl.updateElevator(req, res, next);
    }
  );

  route.get(
    '/all',
    celebrate({
      body: Joi.object({}),
    }),
    async (req, res, next) => {
      const authDTO: IAuthDTO = await verifyToken(req);
      if (!authDTO || !authDTO.isAuthenticated || (authDTO.role !== "Admin" && authDTO.role !== "Campus_Manager" && authDTO.role !== "Task_Manager " && authDTO.role !== "Utente")) {
        return res.status(401).json({message: 'Unauthorized - access required'});
      }

      // Proceed with your controller logic
      ctrl.getAllElevators(req, res, next);
    }
  );

  route.get(
    '/buildingFinderId=:param1',
    celebrate({
      body: Joi.object({}),
    }),
    async (req, res, next) => {
      const authDTO: IAuthDTO = await verifyToken(req);
      if (!authDTO || !authDTO.isAuthenticated || (authDTO.role !== "Admin" && authDTO.role !== "Campus_Manager" && authDTO.role !== "Task_Manager " && authDTO.role !== "Utente")) {
        return res.status(401).json({message: 'Unauthorized - access required'});
      }
      const {param1} = req.params;
      // Passing the parameters to ctrl.getElevatorsByBuilding
      ctrl.getElevatorsByBuilding(param1, req, res, next);
    }
  );
};
