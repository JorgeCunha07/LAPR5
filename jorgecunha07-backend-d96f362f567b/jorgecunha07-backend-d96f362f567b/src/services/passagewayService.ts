import { Service, Inject, Container } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import IPassagewayDTO from '../dto/IPassagewayDTO';
import IPassagewayService from './IServices/IPassagewayService';
import { Passageway } from '../domain/passageway/passageway';
import BuildingRepo from '../repos/buildingRepo';
import { PassagewayMap } from '../mappers/PassagewayMap';
import IPassagewayRepo from '../repos/IRepos/IPassagewayRepo';
import BuildingCode from '../domain/building/BuildingCode';
import FloorNumber from '../domain/floor/FloorNumber';
import { Location } from '../domain/passageway/location';
import IFloorService from './IServices/IFloorService';
import { Floor } from '../domain/floor/Floor';

@Service()
export default class PassagewayService implements IPassagewayService {
  constructor(
    @Inject(config.repos.passageway.name) private passagewayRepo: IPassagewayRepo,
    @Inject(config.repos.building.name) private buildingRepo: BuildingRepo,
  ) {}

  public async createPassageway(passagewayDTO: IPassagewayDTO): Promise<Result<IPassagewayDTO>> {
    try {
      const buildingA = await this.buildingRepo.findByCode(passagewayDTO.buildingACode);
      const buildingB = await this.buildingRepo.findByCode(passagewayDTO.buildingBCode);

      if (!buildingA || !buildingB) {
        return Result.fail<IPassagewayDTO>('One or both buildings not found.');
      }

      const floorA = await this.findFloor(passagewayDTO.buildingACode, passagewayDTO.floorA);
      const floorB = await this.findFloor(passagewayDTO.buildingBCode, passagewayDTO.floorB);

      if (!floorA || !floorB) {
        return Result.fail<IPassagewayDTO>('One or both Floors not found.');
      }

      // For buildingA:
      if (
        passagewayDTO.locationA.x > buildingA.buildingSize.width ||
        passagewayDTO.locationA.y > buildingA.buildingSize.length
      ) {
        return Result.fail<IPassagewayDTO>('Coordinates for Building A are outside of its boundaries.');
      }

      // For buildingB:
      if (
        passagewayDTO.locationB.x > buildingB.buildingSize.width ||
        passagewayDTO.locationB.y > buildingB.buildingSize.length
      ) {
        return Result.fail<IPassagewayDTO>('Coordinates for Building B are outside of its boundaries.');
      }
      const passagewayOrError = await Passageway.create(passagewayDTO);

      if (passagewayOrError.isFailure) {
        return Result.fail<IPassagewayDTO>(passagewayOrError.errorValue());
      }

      const passagewayResult = passagewayOrError.getValue();
      await this.passagewayRepo.save(passagewayResult);

      const passagewayDTOResult = PassagewayMap.toDTO(passagewayResult) as IPassagewayDTO;
      return Result.ok<IPassagewayDTO>(passagewayDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async getAllPassagewaysBetweenBuildings(
    buildingACode: string,
    buildingBCode: string,
  ): Promise<Result<Array<IPassagewayDTO>>> {
    return await this.passagewayRepo.getAllPassagewaysBetweenBuildings(buildingACode, buildingBCode);
  }

  public async updatePassageway(passagewayDTO: IPassagewayDTO): Promise<Result<IPassagewayDTO>> {
    try {
      // Make sure the buildings exist
      const buildingA = await this.buildingRepo.findByCode(passagewayDTO.buildingACode);
      const buildingB = await this.buildingRepo.findByCode(passagewayDTO.buildingBCode);

      if (!buildingA || !buildingB) {
        return Result.fail<IPassagewayDTO>('One or both buildings not found.');
      }

      const floorA = await this.findFloor(passagewayDTO.buildingACode, passagewayDTO.floorA);
      const floorB = await this.findFloor(passagewayDTO.buildingBCode, passagewayDTO.floorB);

      if (!floorA || !floorB) {
        return Result.fail<IPassagewayDTO>('One or both Floors not found.');
      }
      // Check if coordinates are inside the building
      if (
        passagewayDTO.locationA.x > buildingA.buildingSize.width ||
        passagewayDTO.locationA.y > buildingA.buildingSize.length
      ) {
        return Result.fail<IPassagewayDTO>('Coordinates for Building A are outside of its boundaries.');
      }

      if (
        passagewayDTO.locationB.x > buildingB.buildingSize.width ||
        passagewayDTO.locationB.y > buildingB.buildingSize.length
      ) {
        return Result.fail<IPassagewayDTO>('Coordinates for Building B are outside of its boundaries.');
      }

      // Check if passageway already exists
      const existingPassageway = await this.passagewayRepo.findByBuildingCodes(
        passagewayDTO.buildingACode,
        passagewayDTO.buildingBCode,
      );

      if (!existingPassageway) {
        return Result.fail<IPassagewayDTO>('Passageway not found');
      } else {
        const buildingACodeOrError = BuildingCode.create(passagewayDTO.buildingACode);
        const buildingBCodeOrError = BuildingCode.create(passagewayDTO.buildingBCode);
        const floorAOrError = FloorNumber.create(passagewayDTO.floorA);
        const floorBOrError = FloorNumber.create(passagewayDTO.floorB);
        const locationAOrError = Location.create(passagewayDTO.locationA.x, passagewayDTO.locationA.y);
        const locationBOrError = Location.create(passagewayDTO.locationB.x, passagewayDTO.locationB.y);

        if (buildingACodeOrError.isFailure || buildingBCodeOrError.isFailure) {
          return Result.fail<IPassagewayDTO>('Invalid building code(s)');
        }

        if (floorAOrError.isFailure || floorBOrError.isFailure) {
          return Result.fail<IPassagewayDTO>('Invalid floor number(s)');
        }

        existingPassageway.updateBuildingACode(buildingACodeOrError.getValue());
        existingPassageway.updateBuildingBCode(buildingBCodeOrError.getValue());
        existingPassageway.updateFloorA(floorAOrError.getValue());
        existingPassageway.updateFloorB(floorBOrError.getValue());
        existingPassageway.updateLocationA(locationAOrError.getValue());
        existingPassageway.updateLocationB(locationBOrError.getValue());
      }

      // Save passageway using repo
      await this.passagewayRepo.update(existingPassageway);

      const updatedPassagewayDTO = PassagewayMap.toDTO(existingPassageway) as IPassagewayDTO;
      return Result.ok<IPassagewayDTO>(updatedPassagewayDTO);
    } catch (e) {
      throw e;
    }
  }

  public async getPassagewayById(id: string): Promise<Result<IPassagewayDTO>> {
    const passageway = await this.passagewayRepo.findById(id);
    if (!passageway) {
      return Result.fail<IPassagewayDTO>('Passageway not found');
    }

    const passagewayDTO = PassagewayMap.toDTO(passageway);
    return Result.ok<IPassagewayDTO>(passagewayDTO);
  }

  public async getFloorsFromBuildingWithPassageway(buildingCode: string): Promise<Result<Array<IPassagewayDTO>>> {
    try {
      const building = await this.buildingRepo.findByCode(buildingCode);

      if (!building) {
        throw new Error('Building not found');
      }

      const passageways = await this.passagewayRepo.getFloorsFromBuildingWithPassageway(buildingCode);
      return Result.ok<Array<IPassagewayDTO>>(passageways);
    } catch (e) {
      throw e;
    }
  }

  public async findFloor(buildingId: string, piso: number): Promise<Floor> {
    try {
      const floorService: IFloorService = Container.get(config.services.floor.name);
      return await floorService.findFloorByBuildingCodeFloorNumber(buildingId, piso);
    } catch (e) {
      throw e;
    }
  }
}
