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
   * Your favorite port : optional change to 4500 by JRT
   */
  port: parseInt(process.env.PORT, 10) || 4500,

  /**
   * That long string from mlab
   */
  databaseURL:
   process.env.MONGODB_URI || 'mongodb://mongoadmin:0ba7af6ef8e5870720f23a37@vsgate-s1.dei.isep.ipp.pt:11308',
 // databaseURL: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/authentication',

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
    prefix: '/authentication',
  },

  controllers: {
    role: {
      name: 'RoleController',
      path: '../controllers/roleController',
    },
    user: {
      name: "UserController",
      path: "../controllers/userController"
    }
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
    signUpRequest: {
      name: "SignUpRequestRepo",
      path: "../repos/signUpRequestRepo"
    },
  },



  services: {
    role: {
      name: 'RoleService',
      path: '../services/roleService',
    },
    user: {
      name: "UserService",
      path: "../services/userService"
    }
  },

};
