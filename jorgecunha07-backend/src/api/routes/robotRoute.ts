import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import { Constants } from '../../Constants/Constants';
import config from '../../../config';
import IRobotController from '../../controllers/IControllers/IRobotController';
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
  app.use('/robots', route);

  const ctrl = Container.get(config.controllers.robot.name) as IRobotController;

  route.post(
    '',
    celebrate({
      body: Joi.object({
        robotCode: Joi.string().required(),
        robotDescription: Joi.string().optional(),
        robotNickname: Joi.string().required(),
        robotSerialNumber: Joi.string().required(),
        robotTypeName: Joi.string().required(),
        enabled: Joi.boolean(),
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
      // Passing the parameters to ctrl.createRobot
      ctrl.createRobot(req, res, next);
    },
  );

  route.patch(
    '/:robotCode/disable',
    celebrate({
      params: {
        robotCode: Joi.string().required(),
      },
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
      // Passing the parameters to ctrl.enableOrDisableRobot
      ctrl.enableOrDisableRobot(req, res, next, false);
    },
  );

  route.patch(
    '/:robotCode/enable',
    celebrate({
      params: {
        robotCode: Joi.string().required(),
      },
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
      // Passing the parameters to ctrl.enableOrDisableRobot
      ctrl.enableOrDisableRobot(req, res, next, true);
    },
  );

  route.get('', async (req, res, next) => {
    const authDTO: IAuthDTO = await verifyToken(req);
    if (
      !authDTO ||
      !authDTO.isAuthenticated ||
      (authDTO.role !== 'Admin' &&
        authDTO.role !== 'Campus_Manager' &&
        authDTO.role !== 'Task_Manager ' &&
        authDTO.role !== 'Utente')
    ) {
      return res.status(401).json({ message: 'Unauthorized - access required' });
    }

    // Passing the parameters to ctrl.getAllRobots
    ctrl.getAllRobots(req, res, next);
  });

  route.get('/enabled', async (req, res, next) => {
    const authDTO: IAuthDTO = await verifyToken(req);
    if (
      !authDTO ||
      !authDTO.isAuthenticated ||
      (authDTO.role !== 'Admin' &&
        authDTO.role !== 'Campus_Manager' &&
        authDTO.role !== 'Task_Manager ' &&
        authDTO.role !== 'Utente')
    ) {
      return res.status(401).json({ message: 'Unauthorized - access required' });
    }

    // Passing the parameters to ctrl.getEnabledRobots
    ctrl.getEnabledRobots(req, res, next);
  });

  route.get('/enabled/taskType/:TaskType', async (req, res, next) => {
    const authDTO: IAuthDTO = await verifyToken(req);
    if (
      !authDTO ||
      !authDTO.isAuthenticated ||
      (authDTO.role !== 'Admin' &&
        authDTO.role !== 'Campus_Manager' &&
        authDTO.role !== 'Task_Manager ' &&
        authDTO.role !== 'Utente')
    ) {
      return res.status(401).json({ message: 'Unauthorized - access required' });
    }

    const taskType = req.params.TaskType;
    ctrl.getEnabledRobotsWithTaskType(req, res, next, taskType);
  });
};
