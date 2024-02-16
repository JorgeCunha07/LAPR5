import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port : optional change to 4000 by JRT
   */
  port: parseInt(process.env.PORT, 10) || 4000,

  /**
   * That long string from mlab
   */
  databaseURL:
   process.env.MONGODB_URI || 'mongodb://mongoadmin:fa54150af5d9d3bd118de1bc@vsgate-s1.dei.isep.ipp.pt:10819',
  //databaseURL: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/test',

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || 'my sakdfho2390asjod$%jl)!sdjas0i secret',

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controllers: {
    role: {
      name: 'RoleController',
      path: '../controllers/roleController',
    },
    building: {
      name: 'BuildingController',
      path: '../controllers/buildingController',
    },
    robotType: {
      name: 'RobotTypeController',
      path: '../controllers/robotTypeController',
    },
    floor: {
      name: 'FloorController',
      path: '../controllers/floorController',
    },
    robot: {
      name: 'RobotController',
      path: '../controllers/robotController',
    },
    elevator: {
      name: 'ElevatorController',
      path: '../controllers/elevatorController',
    },
    passageway: {
      name: 'PassagewayController',
      path: '../controllers/passagewayController',
    },
    room: {
      name: 'RoomController',
      path: '../controllers/roomController',
    },
    task: {
      name: 'TaskController',
      path: '../controllers/taskController',
    },
  },

  repos: {
    role: {
      name: 'RoleRepo',
      path: '../repos/roleRepo',
    },
    user: {
      name: 'UserRepo',
      path: '../repos/userRepo',
    },
    building: {
      name: 'BuildingRepo',
      path: '../repos/buildingRepo',
    },
    robotType: {
      name: 'RobotTypeRepo',
      path: '../repos/robotTypeRepo',
    },
    floor: {
      name: 'FloorRepo',
      path: '../repos/floorRepo',
    },
    robot: {
      name: 'RobotRepo',
      path: '../repos/robotRepo',
    },
    elevator: {
      name: 'ElevatorRepo',
      path: '../repos/elevatorRepo',
    },
    passageway: {
      name: 'PassagewayRepo',
      path: '../repos/passagewayRepo',
    },
    room: {
      name: 'RoomRepo',
      path: '../repos/roomRepo',
    },
    task: {
      name: 'TaskRepo',
      path: '../repos/taskRepo',
    },
    transportTask: {
      name: 'TransportTaskRepo',
      path: '../repos/transportTaskRepo',
    },
    surveillanceTask: {
      name: 'SurveillanceTaskRepo',
      path: '../repos/surveillanceTaskRepo',
    },
  },

  services: {
    role: {
      name: 'RoleService',
      path: '../services/roleService',
    },
    building: {
      name: 'BuildingService',
      path: '../services/buildingService',
    },
    robotType: {
      name: 'RobotTypeService',
      path: '../services/robotTypeService',
    },
    floor: {
      name: 'FloorService',
      path: '../services/floorService',
    },
    robot: {
      name: 'RobotService',
      path: '../services/robotService',
    },
    elevator: {
      name: 'ElevatorService',
      path: '../services/elevatorService',
    },
    passageway: {
      name: 'PassagewayService',
      path: '../services/passagewayService',
    },
    room: {
      name: 'RoomService',
      path: '../services/roomService',
    },
    task: {
      name: 'TaskService',
      path: '../services/taskService',
    },
  },
};
