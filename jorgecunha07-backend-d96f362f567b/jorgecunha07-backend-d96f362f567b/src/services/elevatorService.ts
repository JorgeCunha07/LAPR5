import { Service, Inject, Container } from 'typedi';
import config from '../../config';
import IElevatorDTO from '../dto/IElevatorDTO';
import { Elevator } from '../domain/elevator/Elevator';
import IElevatorRepo from '../repos/IRepos/IElevatorRepo';
import IElevatorService from './IServices/IElevatorService';
import { Result } from '../core/logic/Result';
import { ElevatorMap } from '../mappers/ElevatorMap';
import { Building } from '../domain/building/Building';
import { BuildingSize } from '../domain/building/BuildingSize';
import IBuildingService from './IServices/IBuildingService';
import IFloorService from './IServices/IFloorService';
import IFloorDTO from '../dto/IFloorDTO';

@Service()
export default class ElevatorService implements IElevatorService {
  constructor(@Inject(config.repos.elevator.name) private elevatorRepo: IElevatorRepo) {
  }

  public async getAllElevators(): Promise<Result<Array<IElevatorDTO>>> {
    const elevators = await this.elevatorRepo.getAllElevators();
    const IElevatorDTO = elevators.getValue().map(elv => ElevatorMap.toDTO(elv));
    return Result.ok(IElevatorDTO);
  }

  public async getElevator(elevatorId: string): Promise<Result<IElevatorDTO>> {
    try {
      const elevator = await this.elevatorRepo.findByDomainId(elevatorId);

      if (elevator === null) {
        return Result.fail<IElevatorDTO>('Elevator not found');
      } else {
        const elevatorDTOResult = ElevatorMap.toDTO(elevator) as IElevatorDTO;
        return Result.ok<IElevatorDTO>(elevatorDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async createElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
    try {
      const elevatorOrError = await Elevator.create(elevatorDTO);
      const buildingCode = elevatorDTO.buildingFinderId;

      if (elevatorOrError.isFailure) {
        return Result.fail<IElevatorDTO>(elevatorOrError.errorValue());
      }

      const buildingDoesExit = await this.findBuilding(elevatorDTO.buildingFinderId);

      if (buildingDoesExit == null) {
        throw new Error('Building not found');
      }

      const dimensions: BuildingSize = buildingDoesExit.buildingSize;
      if (
        elevatorDTO.location.x < 0 ||
        elevatorDTO.location.x >= dimensions.width ||
        elevatorDTO.location.y < 0 ||
        elevatorDTO.location.y >= dimensions.length
      ) {
        return Result.fail<IElevatorDTO>('Elevator location is outside the building');
      }

      const buildingFloors = await this.findFloorsForBuilding(buildingCode);
      const floors = elevatorDTO.floors;
      for (const floor of floors) {
        if (!buildingFloors.some(existingFloor => existingFloor.floorNumber.toString() == floor)) {
          return Result.fail<IElevatorDTO>(`Floor ${floor} does not exist in the building`);
        }
      }

      const elevatorResult = elevatorOrError.getValue();
      await this.elevatorRepo.save(elevatorResult);
      const elevatorDTOResult = ElevatorMap.toDTO(elevatorResult) as IElevatorDTO;
      return Result.ok<IElevatorDTO>(elevatorDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async updateElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
    try {
      const elevator = await this.elevatorRepo.findByCode(elevatorDTO.buildingFinderId);

      if (elevator === null) {
        return Result.fail<IElevatorDTO>('Elevator not found');
      } else {
        if (Array.isArray(elevatorDTO.floors)) {
          const { floors } = elevator.props.floorsList.props;
          while (floors.length > 0) {
            floors.pop();
          }
          elevatorDTO.floors.forEach(floor => {
            floors.push(floor);
          });
        }
        await this.elevatorRepo.update(elevator);

        const elevatorDTOResult = ElevatorMap.toDTO(elevator) as IElevatorDTO;
        return Result.ok<IElevatorDTO>(elevatorDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async findBuilding(buildingId: string): Promise<Building> {
    try {
      const buildingService: IBuildingService = Container.get(config.services.building.name);
      const building = await buildingService.findByCode(buildingId);
      return building;
    } catch (e) {
      throw e;
    }
  }

  public async findFloorsForBuilding(buildingId: string): Promise<IFloorDTO[]> {
    try {
      const floorService: IFloorService = Container.get(config.services.floor.name);
      const floors = await floorService.getFloorsByBuildingFinderId(buildingId);

      return floors;
    } catch (e) {
      throw e;
    }
  }
  public async getElevatorsByBuilding(param1: string): Promise<Array<IElevatorDTO>> {
    try {
      const elevators = await this.elevatorRepo.findElevatorsObjectByBuilding(param1);
      if (elevators === null) {
        throw new Error('Floors of building:' + param1 + ' not found.');
      } else {
        return elevators;
      }
    } catch (e) {
      throw e;
    }
  }
}
