import { Container, Inject, Service } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import IFloorDTO from '../dto/IFloorDTO';
import { Floor } from '../domain/floor/Floor';
import IFloorRepo from '../repos/IRepos/IFloorRepo';
import IFloorService from './IServices/IFloorService';
import { FloorMapper } from '../mappers/FloorMapper';
import { Building } from '../domain/building/Building';
import { BuildingSize } from '../domain/building/BuildingSize';
import IBuildingService from './IServices/IBuildingService';
import IFloorMapDTO from '../dto/IFloorMapDTO';
import { NextFunction, Response } from 'express';

@Service()
export default class FloorService implements IFloorService {
  constructor(@Inject(config.repos.floor.name) private floorRepo: IFloorRepo) {}

  public async findFloorsByBuilding(buildingCode: string): Promise<number> {
    return this.floorRepo.findFloorsByBuilding(buildingCode);
  }

  public async getAllFloor(): Promise<Result<Array<IFloorDTO>>> {
    const floors = await this.floorRepo.getAllFloor();

    const IFloorDTO = floors.getValue().map(floor => FloorMapper.toDTO(floor));
    return Result.ok(IFloorDTO);
  }

  public async createFloor(floorDTO: IFloorDTO, res: Response, next: NextFunction): Promise<Result<IFloorDTO>> {
    try {
      const floorOrError = await Floor.create(floorDTO);
      if (floorOrError.isFailure) {
        return Result.fail<IFloorDTO>(floorOrError.errorValue());
      }
      const buildingDoesExit = await this.findBuilding(floorDTO.buildingFinderId);
      if (buildingDoesExit == null) {
        throw new Error('Building not found');
      }
      const floorDoesExit = await this.findFloorByBuildingCodeFloorNumber(
        floorDTO.buildingFinderId,
        floorDTO.floorNumber,
      );

      if (floorDoesExit != null) {
        throw new Error('Floor Number already exists.');
      }
      const dimensoes: BuildingSize = buildingDoesExit.buildingSize;

      if (
        dimensoes.length <= floorDTO.floorMaxDimensions.length ||
        dimensoes.width <= floorDTO.floorMaxDimensions.width
      ) {
        console.log(dimensoes.length);
        console.log(floorDTO.floorMaxDimensions.length);
        console.log(dimensoes.width);
        console.log(floorDTO.floorMaxDimensions.width);
        throw new Error('Floor Dimensions are superior to the Building Size.');
      }

      // New check to ensure floorMap dimensions match floorMaxDimensions

      const floorResult = floorOrError.getValue();

      await this.floorRepo.save(floorResult);

      const floorDTOResult = FloorMapper.toDTO(floorResult) as IFloorDTO;
      return Result.ok<IFloorDTO>(floorDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async findBuilding(buildingId: string): Promise<Building> {
    try {
      const buildingService: IBuildingService = Container.get(config.services.building.name);
      return await buildingService.findByCode(buildingId);
    } catch (e) {
      throw e;
    }
  }
  public async findFloorByBuildingCodeFloorNumber(buildingCode: string, floorNumber: number): Promise<Floor> {
    try {
      const floor = await this.floorRepo.findFloorByBuildingCodeFloorNumber(buildingCode, floorNumber);
      return floor;
    } catch (e) {
      throw e;
    }
  }

  public async updateFloorMap(
    buildingFinderId: string,
    number: number,
    floorMap: IFloorMapDTO,
  ): Promise<Result<IFloorDTO>> {
    try {
      const existingFloor = await this.floorRepo.findFloorByBuildingCodeFloorNumber(buildingFinderId, number);

      if (!existingFloor) {
        return Result.fail<IFloorDTO>('Floor with provided floorNumber does not exist for the given buildingFinderId.');
      }


      existingFloor.updateFloorMap(floorMap);

      await this.floorRepo.save(existingFloor); // Persist the changes to the database

      const floorDTOResult = FloorMapper.toDTO(existingFloor) as IFloorDTO;
      return Result.ok<IFloorDTO>(floorDTOResult);
    } catch (e) {
      console.error('Error during floor update:', e.message);
      throw e;
    }
  }

  public async updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
    try {
      const existingFloor = await this.floorRepo.findFloorByBuildingCodeFloorNumber(
        floorDTO.buildingFinderId,
        floorDTO.floorNumber,
      );

      if (!existingFloor) {
        return Result.fail<IFloorDTO>('Floor with provided floorNumber does not exist for the given buildingFinderId.');
      }

      const building = await this.findBuilding(floorDTO.buildingFinderId);
      if (!building) {
        return Result.fail<IFloorDTO>('Building not found');
      }

      const dimensoes: BuildingSize = building.buildingSize;
      if (
        dimensoes.length < floorDTO.floorMaxDimensions.length ||
        dimensoes.width < floorDTO.floorMaxDimensions.width
      ) {
        return Result.fail<IFloorDTO>('Floor Dimensions are superior to the Building Size.');
      }


      existingFloor.updateFloorNumber(floorDTO.floorNumber);
      existingFloor.updateFloorDescription(floorDTO.floorDescription);
      existingFloor.updateFloorMap(floorDTO.floorMap);
      existingFloor.updateFloorMaxDimensions(floorDTO.floorMaxDimensions.width, floorDTO.floorMaxDimensions.length);

      await this.floorRepo.save(existingFloor); // Persist the changes to the database

      const floorDTOResult = FloorMapper.toDTO(existingFloor) as IFloorDTO;
      return Result.ok<IFloorDTO>(floorDTOResult);
    } catch (e) {
      console.error('Error during floor update:', e.message);
      throw e;
    }
  }

  public async getFloorsByBuildingFinderId(param1: string): Promise<Array<IFloorDTO>> {
    try {
      const floors = await this.floorRepo.findFloorsObjectByBuilding(param1);

      if (floors === null) {
        throw new Error('Floors of building:' + param1 + ' not found.');
      } else {
        return floors;
      }
    } catch (e) {
      throw e;
    }
  }
}
