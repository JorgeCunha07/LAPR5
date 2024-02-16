import { Service, Inject, Container } from 'typedi';
import config from '../../config';
import IBuildingDTO from '../dto/IBuildingDTO';
import { Building } from '../domain/building/Building';
import IBuildingRepo from '../repos/IRepos/IBuildingRepo';
import IBuildingService from './IServices/IBuildingService';
import { Result } from '../core/logic/Result';
import { BuildingMap } from '../mappers/BuildingMap';
import BuildingDescription from '../domain/building/BuildingDescription';
import BuildingCode from '../domain/building/BuildingCode';
import BuildingName from '../domain/building/BuildingName';
import { BuildingSize } from '../domain/building/BuildingSize';
import IFloorService from './IServices/IFloorService';
import IBuilding_FloorsDTO from '../dto/IBuilding_FloorsDTO';

@Service()
export default class BuildingService implements IBuildingService {
  constructor(@Inject(config.repos.building.name) private buildingRepo: IBuildingRepo) {}

  public async getAllBuilding(): Promise<Result<Array<IBuildingDTO>>> {
    const buildings = await this.buildingRepo.getAllBuilding();

    const IBuildingDTO = buildings.getValue().map(cam => BuildingMap.toDTO(cam));
    return Result.ok(IBuildingDTO);
  }

  public async getBuilding(buildingId: string): Promise<Result<IBuildingDTO>> {
    try {
      const building = await this.buildingRepo.findByDomainId(buildingId);

      if (building === null) {
        return Result.fail<IBuildingDTO>('Building not found');
      } else {
        const buildingDTOResult = BuildingMap.toDTO(building) as IBuildingDTO;
        return Result.ok<IBuildingDTO>(buildingDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async getBuildingByCode(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
    try {
      const building = await this.buildingRepo.findByCode(buildingDTO.buildingCode);

      if (building === null) {
        return Result.fail<IBuildingDTO>('Building not found');
      } else {
        const buildingDTOResult = BuildingMap.toDTO(building) as IBuildingDTO;
        return Result.ok<IBuildingDTO>(buildingDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  //make by code
  public async createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
    try {
      const buildingOrError = await Building.create(buildingDTO);

      if (buildingOrError.isFailure) {
        return Result.fail<IBuildingDTO>(buildingOrError.errorValue());
      }

      const buildingResult = buildingOrError.getValue();

      await this.buildingRepo.save(buildingResult);

      const buildingDTOResult = BuildingMap.toDTO(buildingResult) as IBuildingDTO;
      return Result.ok<IBuildingDTO>(buildingDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
    try {
      const building = await this.buildingRepo.findByCode(buildingDTO.buildingCode);
      if (building == null) {
        return Result.fail<IBuildingDTO>('Building not found');
      } else {
        building.props.buildingDescription = BuildingDescription.create(buildingDTO.buildingDescription).getValue();
        building.props.buildingCode = BuildingCode.create(buildingDTO.buildingCode).getValue();
        building.props.buildingName = BuildingName.create(buildingDTO.buildingName).getValue();
        building.props.buildingSize = BuildingSize.create(
          buildingDTO.buildingSize.width,
          buildingDTO.buildingSize.length,
        ).getValue();

        await this.buildingRepo.update(building);

        const buildingDTOResult = BuildingMap.toDTO(building) as IBuildingDTO;
        return Result.ok<IBuildingDTO>(buildingDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async findByCode(buildingId: string): Promise<Building> {
    try {
      const building = await this.buildingRepo.findByCode(buildingId);
      return building;
    } catch (e) {
      throw e;
    }
  }

  public async getFloorsByParameters(param1: string, param2: string): Promise<Result<IBuilding_FloorsDTO[]>> {
    try {
      const floorServiceInstance: IFloorService = Container.get(config.services.floor.name);
      const buildingResult = await this.getAllBuilding();

      if (!buildingResult.isSuccess || !buildingResult.getValue()) {
        return Result.fail<IBuilding_FloorsDTO[]>('No buildings found');
      }

      const minFloorCount = Number(param1);
      const maxFloorCount = Number(param2);

      const buildingDTOs = buildingResult.getValue();
      const building_floordtos: IBuilding_FloorsDTO[] = [];

      for (const element of buildingDTOs) {
        const value = await floorServiceInstance.findFloorsByBuilding(element.buildingCode);

        if (value < minFloorCount || value > maxFloorCount) {
          continue;
        }

        const building_floordto: IBuilding_FloorsDTO = {
          buildingCode: element.buildingCode.toString(),
          buildingName: element.buildingName.toString(),
          buildingDescription: element.buildingDescription.toString(),
          buildingSize: {
            width: Number(element.buildingSize.width.toString()),
            length: Number(element.buildingSize.length.toString()),
          },
          floorsNumber: value,
        };

        building_floordtos.push(building_floordto);
      }

      return Result.ok(building_floordtos);
    } catch (e) {
      throw e;
    }
  }
}
