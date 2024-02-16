import { Service, Inject } from 'typedi';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { Result } from '../core/logic/Result';
import IFloorRepo from './IRepos/IFloorRepo';
import { Floor } from '../domain/floor/Floor';
import { Document, Model, FilterQuery } from 'mongoose';
import { IFloorPersistence } from '../dataschema/IFloorPersistence';
import { FloorMapper } from '../mappers/FloorMapper';
import IFloorDTO from '../dto/IFloorDTO';
@Service()
export default class FloorRepo implements IFloorRepo {
  private models: any;

  constructor(@Inject('floorSchema') private floorSchema: Model<IFloorPersistence & Document>) {}


  public async exists(floor: Floor): Promise<boolean> {
    const idX = floor.id instanceof UniqueEntityID ? floor.id.toValue() : floor.id;
    const query = { domainId: idX };
    const floorDocument = await this.floorSchema.findOne(query as FilterQuery<IFloorPersistence & Document>);
    return !!floorDocument === true;
  }

  public async save(floor: Floor): Promise<Floor> {
    const query = { domainId: floor.id.toString() };
    const floorDocument = await this.floorSchema.findOne(query);

    try {
      if (!floorDocument) {
        const rawFloor: any = FloorMapper.toPersistence(floor);
        const floorCreated = await this.floorSchema.create(rawFloor);
        return FloorMapper.toDomain(floorCreated);
      } else {
        floorDocument.buildingFinderId = floor.buildingFinderId;
        floorDocument.floorMap = floor.floorMap.value;
        floorDocument.floorDescription = floor.floorDescription.value;
        floorDocument.floorMaxDimensions.length = floor.floorMaxDimensions.length;
        floorDocument.floorMaxDimensions.width = floor.floorMaxDimensions.width;

        await floorDocument.save();
        return floor;
      }
    } catch (err) {
      throw err;
    }
  }




  public async getAllFloor(): Promise<Result<Array<Floor>>> {
    const list = new Array<Floor>();
    (await this.floorSchema.find({})).forEach(floor => list.push(FloorMapper.toDomain(floor)));
    return list ? Result.ok(list) : null;
  }

  public async findByDomainId(floorId: UniqueEntityID | string): Promise<Floor> {
    const query = { domainId: floorId };
    const floorRecord = await this.floorSchema.findOne(query as FilterQuery<IFloorPersistence & Document>);
    return floorRecord ? FloorMapper.toDomain(floorRecord) : null;
  }

  public async update(floor: Floor): Promise<Result<Floor>> {
    const query = { domainId: floor.id.toString() };
    const floorDocument = await this.floorSchema.findOne(query as FilterQuery<IFloorPersistence & Document>);

    if (!floorDocument) {
      const rawFloor = FloorMapper.toPersistence(floor);
      const floorCreated = await this.floorSchema.create(rawFloor);
      return Result.ok(FloorMapper.toDomain(floorCreated));
    }

    if (floorDocument.buildingFinderId !== floor.buildingFinderId) {
      return Result.fail<Floor>('Cannot change the building id of a floor.');
    }

    floorDocument.floorMap = floor.floorMap.value;
    floorDocument.floorDescription = floor.floorDescription.value;
    floorDocument.floorMaxDimensions.length = floor.floorMaxDimensions.length;
    floorDocument.floorMaxDimensions.width = floor.floorMaxDimensions.width;

    try {
      await floorDocument.save();
      return Result.ok(floor);
    } catch (err) {
      console.error('Error occurred during update:', err);
      throw err;
    }
  }

  public async findFloorByBuildingCodeFloorNumber(buildingCode: string, floorNumber: number): Promise<Floor> {
    const query = {
      buildingFinderId: buildingCode,
      floorNumber: floorNumber,
    };
    const floorRecord = await this.floorSchema.findOne(query as FilterQuery<IFloorPersistence & Document>);
    return floorRecord ? FloorMapper.toDomain(floorRecord) : null;
  }

  public async findFloorsByBuilding(buildingCode: string): Promise<number> {
    try {
      const query = { buildingFinderId: buildingCode };
      const floorRecords = await this.floorSchema.find(query as FilterQuery<IFloorPersistence & Document>);
      const floors = floorRecords.map(floorRecord => FloorMapper.toDomain(floorRecord));
      return floors.length;
    } catch (error) {
      console.error('Error finding floors by building:', error);
      throw error; // Rethrow the error after logging it
    }
  }

  public async findFloorsObjectByBuilding(buildingCode: string): Promise<Array<IFloorDTO>> {
    try {
      const query = { buildingFinderId: buildingCode };
      const floorRecords = await this.floorSchema.find(query as FilterQuery<IFloorPersistence & Document>);
      const floorsDTO = floorRecords
        .map(floorRecord => {
          const floorDomain = FloorMapper.toDomain(floorRecord);
          return floorDomain ? FloorMapper.toDTO(floorDomain) : null;
        })
        .filter(floorDTO => floorDTO !== null); // Remove null values if any

      return floorsDTO;
    } catch (error) {
      console.error('Error finding floors by building:', error);
      throw error; // Rethrow the error after logging it
    }
  }
}
