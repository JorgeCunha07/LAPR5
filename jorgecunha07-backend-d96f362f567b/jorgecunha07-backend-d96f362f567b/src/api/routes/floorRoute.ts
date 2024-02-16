import {Router} from 'express';
import {celebrate, Joi} from 'celebrate';
import {Container} from 'typedi';

import IFloorController from '../../controllers/IControllers/IFloorController';
import {Constants} from "../../Constants/Constants";
import config from '../../../config';
import axios from 'axios';
import {IAuthDTO} from "../../dto/IAuthDTO";

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
  app.use('/floors', route);


  const ElevatorFloorsSchema = Joi.object({
    floors: Joi.array().items(Joi.string()).required(),
    positionWhenLeavingElevator: Joi.array().length(2).items(Joi.number()).required()
  }).required();

// Passageway validation
  const PassagewaySchema = Joi.object({
    floor: Joi.array().items(Joi.string()).required(),
    location: Joi.array().length(2).items(Joi.number()).required(),
    locationOnExit: Joi.array().length(2).items(Joi.number()).required()
  }).required();

// Validation for scale
  const ScaleSchema = Joi.object({
    x: Joi.number().required(),
    y: Joi.number().required(),
  }).required();

// Specific validation for textures
  const ColorTextureSchema = Joi.object({
    url: Joi.string().required(),
    intensity: Joi.number().optional(), // Add this line if intensity is required
  }).required();


  const AoTextureSchema = Joi.object({
    url: Joi.string().required(),
    intensity: Joi.number().required(),
  }).required();

  const DisplacementTextureSchema = Joi.object({
    url: Joi.string().required(),
    scale: Joi.number().required(),
    bias: Joi.number().required(),
  }).required();

  const NormalTextureSchema = Joi.object({
    url: Joi.string().required(),
    type: Joi.number().required(),
    scale: ScaleSchema,
  }).required();

  const BumpTextureSchema = Joi.object({
    url: Joi.string().required(),
    scale: Joi.number().required(),
  }).required();

  const RoughnessTextureSchema = Joi.object({
    url: Joi.string().required(),
    rough: Joi.number().required(),
  }).required();

// Maps validation
  const MapsSchema = Joi.object({
    color: ColorTextureSchema,
    ao: AoTextureSchema,
    displacement: DisplacementTextureSchema,
    normal: NormalTextureSchema,
    bump: BumpTextureSchema,
    roughness: RoughnessTextureSchema,
  }).required();

// Common structure validation
  const SizeSchema = Joi.object({
    width: Joi.number().required(),
    height: Joi.number().required(), // If height is part of the size
    depth: Joi.number().required(),
  }).required();

  function structureValidationGround() {
    return Joi.object({
      size: SizeSchema, // Including size validation
      segments: Joi.object({
        width: Joi.number().required(),
        height: Joi.number().required(),
        depth: Joi.number().required(),
      }).required(),
      primaryColor: Joi.string().required(),
      maps: MapsSchema,
      wrapS: Joi.number().required(),
      wrapT: Joi.number().required(),
      repeat: Joi.object({
        u: Joi.number().required(),
        v: Joi.number().required(),
      }).required(),
      magFilter: Joi.number().required(),
      minFilter: Joi.number().required(),
      secondaryColor: Joi.string().required(),
    }).required();
  }

  function structureValidation() {
    return Joi.object({
      segments: Joi.object({
        width: Joi.number().required(),
        height: Joi.number().required()
      }).required(),
      primaryColor: Joi.string().required(),
      maps: MapsSchema,
      wrapS: Joi.number().required(),
      wrapT: Joi.number().required(),
      repeat: Joi.object({
        u: Joi.number().required(),
        v: Joi.number().required(),
      }).required(),
      magFilter: Joi.number().required(),
      minFilter: Joi.number().required(),
      secondaryColor: Joi.string().required(),
    }).required();
  }

// Route definition
  const ctrl = Container.get(config.controllers.floor.name) as IFloorController;
  route.post(
    '',
    celebrate({
      body: Joi.object({
        buildingFinderId: Joi.string().required(),
        floorNumber: Joi.number().required(),
        floorDescription: Joi.string().optional(),
        floorMap: Joi.object({
          maze: Joi.object({
            size: Joi.object({
              width: Joi.number().required(),
              depth: Joi.number().required(),
            }).required(),
            map: Joi.array().items(Joi.array().items(Joi.number())).required(),
            exitLocation: Joi.array().ordered(Joi.number(), Joi.number()).required(),
          }).required(),
          ground: structureValidationGround(),
          wall: structureValidation(),
          passageway: structureValidation(),
          elevator: structureValidation(),
          door: structureValidation(),
          player: Joi.object({
            initialPosition: Joi.array().ordered(Joi.number(), Joi.number()).required(),
            initialDirection: Joi.number().required(),
          }).required(),
          elevatorFloors: ElevatorFloorsSchema,  // Add Elevator Floors validation
          passageways: Joi.array().items(PassagewaySchema) // Add Passageway validation
        }).optional(),
        floorMaxDimensions: Joi.object({
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
      ctrl.createFloor(req, res, next);
    }
  );


  route.put(
    '',
    celebrate({
      body: Joi.object({
        buildingFinderId: Joi.string().required(),
        floorNumber: Joi.number().required(),
        floorDescription: Joi.string().optional(),
        floorMap: Joi.object({
          maze: Joi.object({
            size: Joi.object({
              width: Joi.number().required(),
              depth: Joi.number().required(),
            }).required(),
            map: Joi.array().items(Joi.array().items(Joi.number())).required(),
            exitLocation: Joi.array().ordered(Joi.number(), Joi.number()).required(),
          }).required(),
          ground: structureValidationGround(),
          wall: structureValidation(),
          passageway: structureValidation(),
          elevator: structureValidation(),
          door: structureValidation(),
          player: Joi.object({
            initialPosition: Joi.array().ordered(Joi.number(), Joi.number()).required(),
            initialDirection: Joi.number().required(),
          }).required(),
          elevatorFloors: ElevatorFloorsSchema,  // Add Elevator Floors validation
          passageways: Joi.array().items(PassagewaySchema) // Add Passageway validation
        }).optional(),
        floorMaxDimensions: Joi.object({
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
      ctrl.updateFloor(req, res, next);
    }
  );

  route.patch(
    '/FloorMap/:buildingFinderId/:floorNumber',
    celebrate({
      params: Joi.object({
        buildingFinderId: Joi.string().required(),
        floorNumber: Joi.number().required(),
      }),
      body: Joi.object({

        maze: Joi.object({
          size: Joi.object({
            width: Joi.number().required(),
            depth: Joi.number().required(),
          }).required(),
          map: Joi.array().items(Joi.array().items(Joi.number())).required(),
          exitLocation: Joi.array().ordered(Joi.number(), Joi.number()).required(),
        }).required(),
        ground: structureValidationGround(),
        wall: structureValidation(),
        passageway: structureValidation(),
        elevator: structureValidation(),
        door: structureValidation(),
        player: Joi.object({
          initialPosition: Joi.array().ordered(Joi.number(), Joi.number()).required(),
          initialDirection: Joi.number().required(),
        }).required(),
        elevatorFloors: ElevatorFloorsSchema,  // Add Elevator Floors validation
        passageways: Joi.array().items(PassagewaySchema) // Add Passageway validation
      }),
    }),
    async (req, res, next) => {
      const authDTO: IAuthDTO = await verifyToken(req);
      if (!authDTO || !authDTO.isAuthenticated || (authDTO.role !== "Admin" && authDTO.role !== "Campus_Manager")) {
        return res.status(401).json({message: 'Unauthorized - Admin or Campus Manager access required'});
      }

      // Proceed with your controller logic
      ctrl.updateFloorMap(req, res, next);
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
      ctrl.getAllFloor(req, res, next);
    }
  );

  route.get(
    '/buildingFinderId=:param1',
    celebrate({
      body: Joi.object({}),
    }),
    async (req, res, next) => {
      const authDTO: IAuthDTO = await verifyToken(req);
      if (!authDTO || !authDTO.isAuthenticated || (authDTO.role !== "Admin" && authDTO.role !== "Campus_Manager" && authDTO.role !== "Task_Manager " && authDTO.role !== "Utente")) {
        return res.status(401).json({message: 'Unauthorized - access required'});
      }

      // Proceed with your controller logic
      const {param1} = req.params;

      // Passing the parameters to ctrl.getAllFloor
      ctrl.getFloorsByBuildingFinderId(param1, req, res, next);
    }
  );
};
