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

  const buildingSchema = {
    name: 'buildingSchema',
    schema: '../persistence/schemas/buildingSchema',
  };

  const robotTypeSchema = {
    name: 'robotTypeSchema',
    schema: '../persistence/schemas/robotTypeSchema',
  };
  const floorSchema = {
    name: 'floorSchema',
    schema: '../persistence/schemas/floorSchema',
  };
  const robotSchema = {
    name: 'robotSchema',
    schema: '../persistence/schemas/robotSchema',
  };

  const elevatorSchema = {
    name: 'elevatorSchema',
    schema: '../persistence/schemas/elevatorSchema',
  };

  const passagewaySchema = {
    name: 'passagewaySchema',
    schema: '../persistence/schemas/passagewaySchema',
  };

  const roomSchema = {
    name: 'roomSchema',
    schema: '../persistence/schemas/roomSchema',
  };

  const taskSchema = {
    name: 'taskSchema',
    schema: '../persistence/schemas/taskSchema',
  };

  const transportTaskSchema = {
    name: 'transportTaskSchema',
    schema: '../persistence/schemas/transportTaskSchema',
  };

  const surveillanceTaskSchema = {
    name: 'surveillanceTaskSchema',
    schema: '../persistence/schemas/surveillanceTaskSchema',
  };

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path,
  };

  const buildingController = {
    name: config.controllers.building.name,
    path: config.controllers.building.path,
  };

  const robotTypeController = {
    name: config.controllers.robotType.name,
    path: config.controllers.robotType.path,
  };
  const floorController = {
    name: config.controllers.floor.name,
    path: config.controllers.floor.path,
  };
  const robotController = {
    name: config.controllers.robot.name,
    path: config.controllers.robot.path,
  };
  const elevatorController = {
    name: config.controllers.elevator.name,
    path: config.controllers.elevator.path,
  };
  const passagewayController = {
    name: config.controllers.passageway.name,
    path: config.controllers.passageway.path,
  };
  const roomController = {
    name: config.controllers.room.name,
    path: config.controllers.room.path,
  };
  const taskController = {
    name: config.controllers.task.name,
    path: config.controllers.task.path,
  };

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path,
  };

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path,
  };

  const buildingRepo = {
    name: config.repos.building.name,
    path: config.repos.building.path,
  };

  const robotTypeRepo = {
    name: config.repos.robotType.name,
    path: config.repos.robotType.path,
  };

  const floorRepo = {
    name: config.repos.floor.name,
    path: config.repos.floor.path,
  };

  const robotRepo = {
    name: config.repos.robot.name,
    path: config.repos.robot.path,
  };
  const elevatorRepo = {
    name: config.repos.elevator.name,
    path: config.repos.elevator.path,
  };
  const passagewayRepo = {
    name: config.repos.passageway.name,
    path: config.repos.passageway.path,
  };
  const roomRepo = {
    name: config.repos.room.name,
    path: config.repos.room.path,
  };
  const taskRepo = {
    name: config.repos.task.name,
    path: config.repos.task.path,
  };
  const transportTaskRepo = {
    name: config.repos.transportTask.name,
    path: config.repos.transportTask.path,
  };
  const surveillanceTaskRepo = {
    name: config.repos.surveillanceTask.name,
    path: config.repos.surveillanceTask.path,
  };

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path,
  };

  const buildingService = {
    name: config.services.building.name,
    path: config.services.building.path,
  };

  const robotTypeService = {
    name: config.services.robotType.name,
    path: config.services.robotType.path,
  };

  const floorService = {
    name: config.services.floor.name,
    path: config.services.floor.path,
  };

  const robotService = {
    name: config.services.robot.name,
    path: config.services.robot.path,
  };
  const elevatorService = {
    name: config.services.elevator.name,
    path: config.services.elevator.path,
  };
  const passagewayService = {
    name: config.services.passageway.name,
    path: config.services.passageway.path,
  };
  const roomService = {
    name: config.services.room.name,
    path: config.services.room.path,
  };
  const taskService = {
    name: config.services.task.name,
    path: config.services.task.path,
  };

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      buildingSchema,
      robotTypeSchema,
      floorSchema,
      robotSchema,
      elevatorSchema,
      passagewaySchema,
      roomSchema,
      taskSchema,
      transportTaskSchema,
      surveillanceTaskSchema,
    ],
    controllers: [
      roleController,
      buildingController,
      robotTypeController,
      floorController,
      robotController,
      elevatorController,
      passagewayController,
      roomController,
      taskController,
    ],
    repos: [
      roleRepo,
      userRepo,
      buildingRepo,
      robotTypeRepo,
      floorRepo,
      robotRepo,
      elevatorRepo,
      passagewayRepo,
      roomRepo,
      taskRepo,
      transportTaskRepo,
      surveillanceTaskRepo,
    ],
    services: [
      roleService,
      buildingService,
      robotTypeService,
      floorService,
      robotService,
      elevatorService,
      passagewayService,
      roomService,
      taskService,
    ],
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
