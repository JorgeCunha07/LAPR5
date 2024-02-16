import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  const userSchema = {
    name: 'userSchema',
    schema: '../persistence/schemas/userSchema',
  };

  const roleSchema = {
    name: 'roleSchema',
    schema: '../persistence/schemas/roleSchema',
  };

  const signUpRequestSchema = {
    name: 'signUpRequestSchema',
    schema: '../persistence/schemas/signUpRequestSchema',
  }

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path,
  };

  const userController = {
    name: config.controllers.user.name,
    path: config.controllers.user.path
  }


  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path,
  };

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path,
  };

  const signUpRequestRepo = {
    name: config.repos.signUpRequest.name,
    path: config.repos.signUpRequest.path
  }

  const userService = {
    name: config.services.user.name,
    path: config.services.user.path
  }



  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path,
  };


  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      signUpRequestSchema
    ],
    controllers: [
      roleController,
      userController
    ],
    repos: [
      roleRepo,
      userRepo,
      signUpRequestRepo
    ],
    services: [
      roleService,
      userService
   ],
  });
  Logger.info('✌️ Authentication loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ API Comunication loaded');
};
