import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IPassagewayController from '../../controllers/IControllers/IPassagewayController';
import {Constants} from "../../Constants/Constants";
import config from '../../../config';
import axios from 'axios';
import { IAuthDTO } from "../../dto/IAuthDTO";

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
  app.use('/passageway', route);

  const ctrl = Container.get(config.controllers.passageway.name) as IPassagewayController;

  route.post(
    '',
    celebrate({
      body: Joi.object({
        buildingACode: Joi.string().required(),
        buildingBCode: Joi.string().required(),
        floorA: Joi.number().required(),
        floorB: Joi.number().required(),
        locationA: Joi.object({
          x: Joi.number().required(),
          y: Joi.number().required(),
        }).required(),
        locationB: Joi.object({
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

      ctrl.createPassageway( req, res, next);
    }
  );

  route.put(
    '',
    celebrate({
      body: Joi.object({
        buildingACode: Joi.string().required(),
        buildingBCode: Joi.string().required(),
        floorA: Joi.number().required(),
        floorB: Joi.number().required(),
        locationA: Joi.object({
          x: Joi.number().required(),
          y: Joi.number().required(),
        }).required(),
        locationB: Joi.object({
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

      // Passing the parameters to ctrl.updatePassageway
      ctrl.updatePassageway(req, res, next);
    }
  );
  route.get(
    '/',
    celebrate({
      query: Joi.object({
        buildingACode: Joi.string().required(),
        buildingBCode: Joi.string().required(),
      }),
    }),
    async (req, res, next) => {
      const authDTO: IAuthDTO = await verifyToken(req);
      if (!authDTO || !authDTO.isAuthenticated || (authDTO.role !== "Admin" && authDTO.role !== "Campus_Manager" && authDTO.role !== "Task_Manager " && authDTO.role !== "Utente")) {
        return res.status(401).json({message: 'Unauthorized - access required'});
      }

      // Passing the parameters to ctrl.getAllPassagewaysBetweenBuildings
      ctrl.getAllPassagewaysBetweenBuildings(req, res, next);
    }
  );
  route.get(
    '/floors/:buildingCode',
    celebrate({
      params: Joi.object({
        buildingCode: Joi.string().required(),
      }),
    }),
    async (req, res, next) => {
      const authDTO: IAuthDTO = await verifyToken(req);
      if (!authDTO || !authDTO.isAuthenticated || (authDTO.role !== "Admin" && authDTO.role !== "Campus_Manager" && authDTO.role !== "Task_Manager " && authDTO.role !== "Utente")) {
        return res.status(401).json({message: 'Unauthorized - access required'});
      }

    // Passing the parameters to ctrl.getFloorsFromBuildingWithPassageway
    ctrl.getFloorsFromBuildingWithPassageway(req, res, next);
      }
  );
}
