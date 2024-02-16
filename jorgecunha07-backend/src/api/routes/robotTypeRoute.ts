import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IRobotTypeController from '../../controllers/IControllers/IRobotTypeController';
import { Constants } from '../../Constants/Constants';
import config from '../../../config';
import axios from 'axios';
import { IAuthDTO } from '../../dto/IAuthDTO';

const verifyToken = async (req): Promise<IAuthDTO> => {
  const token = req.headers.authorization;

  try {
    const response = await axios.get(Constants.MODULE_AUTH, {
      headers: {
        Authorization: token,
      },
    });
    return response.data; // This should be the IAuthDTO
  } catch (error) {
    console.error('Token verification failed:', error.response?.data);
    return { isAuthenticated: false, email: '', role: '' }; // Return a default IAuthDTO with isAuthenticated set to false
  }
};

const route = Router();

export default (app: Router) => {
  app.use('/robot-types', route);

  const ctrl = Container.get(config.controllers.robotType.name) as IRobotTypeController;
  route.post(
    '',
    celebrate({
      body: Joi.object({
        robotTypeName: Joi.string().required(),
        description: Joi.string().optional(),
        robotBrand: Joi.string().required(),
        robotModel: Joi.string().required(),
        supportedTaskTypes: Joi.array()
          .items(Joi.string())
          .optional(),
      }),
    }),
    async (req, res, next) => {
      const authDTO: IAuthDTO = await verifyToken(req);
      if (
        !authDTO ||
        !authDTO.isAuthenticated ||
        (authDTO.role !== 'Admin' && authDTO.role !== 'Campus_Manager' && authDTO.role !== 'Task_Manager')
      ) {
        return res
          .status(401)
          .json({ message: 'Unauthorized - Admin or Campus Manager or Task Manager access required' });
      }

      ctrl.createRobotType(req, res, next);
    },
  );

  route.get(
    '/:robotTypeName/supported-tasks',
    celebrate({
      params: Joi.object({
        robotTypeName: Joi.string().required(),
      }),
    }),
    async (req, res, next) => {
      try {
        const authDTO: IAuthDTO = await verifyToken(req);
        if (
          !authDTO ||
          !authDTO.isAuthenticated ||
          (authDTO.role !== 'Admin' && authDTO.role !== 'Campus_Manager' && authDTO.role !== 'Task_Manager')
        ) {
          return res
            .status(401)
            .json({ message: 'Unauthorized - Admin or Campus Manager or Task Manager access required' });
        }
        const supportedTaskTypes = await ctrl.getSupportedTaskTypesByRobotTypeName(req.params.robotTypeName);
        if (Array.isArray(supportedTaskTypes)) {
          return res.status(200).json({ supportedTaskTypes });
        } else {
          return next(supportedTaskTypes);
        }
      } catch (error) {
        if (error === 'Robot type not found.') {
          const robotType = req.params.robotTypeName;
          return res.status(400).json({ message: `Robot type ${robotType} not found.` });
        } else {
          console.error('Error in route handler:', error);
          return res.status(500).json({ message: 'Internal server error.' });
        }
      }
    },
  );
};
