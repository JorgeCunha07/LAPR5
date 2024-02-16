import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import IRoomController from '../../controllers/IControllers/IRoomController';
import config from '../../../config';
import axios from 'axios';
import { IAuthDTO } from "../../dto/IAuthDTO";
import {Constants} from "../../Constants/Constants";

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
    return { isAuthenticated: false, email: '', role: '' }; // Return a default IAuthDTO with isAuthenticated set to false
  }
};

const route = Router();

export default (app: Router) => {
  app.use('/rooms', route);

  const ctrl = Container.get(config.controllers.room.name) as IRoomController;

  // Create a room
  route.post(
    '',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        type: Joi.string().required(), // Assuming room type is a string, adjust if necessary
        description: Joi.string().optional(),
        buildingFinderId: Joi.string().required(),
        floorNumber: Joi.number().required(),
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

      // Passing the parameters to ctrl.getElevatorsByBuilding
      ctrl.createRoom(req, res, next);
    }
  );

  // Update a room
  route.put(
    '',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        type: Joi.string().required(), // Assuming room type is a string, adjust if necessary
        description: Joi.string().optional(),
        buildingFinderId: Joi.string().required(),
        floorNumber: Joi.number().required(),
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
      // Passing the parameters to ctrl.updateRoom
      ctrl.updateRoom(req, res, next);
    }
  );

  // Get all rooms
  route.get(
    '/all',
    celebrate({
      body: Joi.object({}), // Generally, GET requests don't have bodies. You might want to consider removing this validation.
    }),
    async (req, res, next) => {
      const authDTO: IAuthDTO = await verifyToken(req);
      if (!authDTO || !authDTO.isAuthenticated || (authDTO.role !== "Admin" && authDTO.role !== "Campus_Manager" && authDTO.role !== "Task_Manager " && authDTO.role !== "Utente")) {
        return res.status(401).json({message: 'Unauthorized - access required'});
      }

      // Passing the parameters to ctrl.getAllRoom
      ctrl.getAllRoom(req, res, next);
    }
  );
};
