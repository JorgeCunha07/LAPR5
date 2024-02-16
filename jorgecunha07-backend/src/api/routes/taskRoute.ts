import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import {Constants} from "../../Constants/Constants";
import config from '../../../config';
import ITaskController from '../../controllers/IControllers/ITaskController';
import axios from 'axios';
import { IAuthDTO } from "../../dto/IAuthDTO";

const verifyToken = async (req): Promise<IAuthDTO> => {
  const token = req.headers.authorization;

  try {
    const response = await axios.get('http://localhost:4500/authentication/auth/verifyToken', {
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
  app.use('/task', route);

  const ctrl = Container.get(config.controllers.task.name) as ITaskController;

  route.post(
    '/transport-task',
    celebrate({
      body: Joi.object({
        taskState: Joi.string().required(),
        description: Joi.string().required(),
        // Include properties from TransportTask
        pickupRoom: Joi.string().required(),
        deliveryRoom: Joi.string().required(),
        contactStart: Joi.string(),
        contactEnd: Joi.string(),
        confirmationCode: Joi.string().required(),
        transportTaskDescription: Joi.string().required(),
      }),
    }),
    async (req, res, next) => {
      const authDTO: IAuthDTO = await verifyToken(req);
      if (!authDTO || !authDTO.isAuthenticated || (authDTO.role !== "Admin" && authDTO.role !== "Campus_Manager" && authDTO.role !== "Task_Manager")) {
        return res.status(401).json({message: 'Unauthorized - Admin or Campus Manager or Task Manager access required'});
      }

      // Passing the parameters to ctrl.createTransportTask
      ctrl.createTransportTask(req, res, next);
    }
  );

  route.post(
    '/surveillance-task',
    celebrate({
      body: Joi.object({
        taskState: Joi.string().required(),
        description: Joi.string().required(),
        // Include properties from SurveillanceTask
        targetBuilding: Joi.string().required(),
        targetFloor: Joi.string().required(),
        contactInfo: Joi.string().required(),
      }),
    }),
    async (req, res, next) => {
      const authDTO: IAuthDTO = await verifyToken(req);
      if (!authDTO || !authDTO.isAuthenticated || (authDTO.role !== "Admin" && authDTO.role !== "Campus_Manager" && authDTO.role !== "Task_Manager")) {
        return res.status(401).json({message: 'Unauthorized - Admin or Campus Manager or Task Manager access required'});
      }
      const {param1} = req.params;
      // Passing the parameters to ctrl.createSurveillanceTask
      ctrl.createSurveillanceTask(req, res, next);
    }
  );

};
