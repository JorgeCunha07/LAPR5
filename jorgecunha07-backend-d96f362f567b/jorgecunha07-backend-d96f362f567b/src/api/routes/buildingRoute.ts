import {Router} from 'express';
import {celebrate, Joi} from 'celebrate';
import {Container} from 'typedi';
import IBuildingController from '../../controllers/IControllers/IBuildingController';
import config from '../../../config';
import axios from 'axios';
import {IAuthDTO} from "../../dto/IAuthDTO";
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
    return {isAuthenticated: false, email: '', role: ''}; // Return a default IAuthDTO with isAuthenticated set to false
  }
};

const route = Router();

export default (app: Router) => {
  app.use('/buildings', route);

  const ctrl = Container.get(config.controllers.building.name) as IBuildingController;

  route.post(
    '',
    celebrate({
      body: Joi.object({
        buildingCode: Joi.string().required(),
        buildingName: Joi.string().required(),
        buildingDescription: Joi.string().optional(),
        buildingSize: Joi.object({
          width: Joi.number().required(),
          length: Joi.number().required(),
        }).required(),
      }),
    }),
    async (req, res, next) => {
      const authDTO: IAuthDTO = await verifyToken(req);
      console.log(authDTO);
      if (!authDTO || !authDTO.isAuthenticated || (authDTO.role !== "Admin" && authDTO.role !== "Campus_Manager")) {
        return res.status(401).json({message: 'Unauthorized - Admin or Campus Manager access required'});
      }

      // Proceed with your controller logic
      ctrl.createBuilding(req, res, next);
    }
  );


  route.put(
    '',
    celebrate({
      body: Joi.object({
        buildingCode: Joi.string().required(),
        buildingName: Joi.string().required(),
        buildingDescription: Joi.string().optional(),
        buildingSize: Joi.object({
          width: Joi.number().required(),
          length: Joi.number().required(),
        }).required(),
      }),
    }),
    async (req, res, next) => {
      const authDTO: IAuthDTO = await verifyToken(req);
      if (!authDTO || !authDTO.isAuthenticated || (authDTO.role !== "Admin" && authDTO.role !== "Campus_Manager")) {
        return res.status(401).json({message: 'Unauthorized - Admin or Campus Manager access required'});
      }

      // Proceed with your controller logic
      ctrl.updateBuilding(req, res, next);
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
      ctrl.getAllBuilding(req, res, next);
    }
  );
  route.get(
    '/min=:param1/max=:param2',
    celebrate({
      body: Joi.object({}),
    }),
    async (req, res, next) => {
      const authDTO: IAuthDTO = await verifyToken(req);
      if (!authDTO || !authDTO.isAuthenticated || (authDTO.role !== "Admin" && authDTO.role !== "Campus_Manager" && authDTO.role !== "Task_Manager " && authDTO.role !== "Utente")) {
        return res.status(401).json({message: 'Unauthorized - access required'});
      }
      const {param1, param2} = req.params;

      // Passing the parameters to ctrl.getAllFloor
      ctrl.getFloorsByParameters(param1, param2, req, res, next);
    }
  );
};
