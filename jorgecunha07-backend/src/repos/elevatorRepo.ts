import { Service, Inject } from 'typedi';
import IElevatorRepo from './IRepos/IElevatorRepo';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { ElevatorMap } from '../mappers/ElevatorMap';
import { Document, FilterQuery, Model } from 'mongoose';
import { IElevatorPersistence } from '../dataschema/IElevatorPersistence';
import { Result } from '../core/logic/Result';
import { Elevator } from '../domain/elevator/Elevator';
import IElevatorDTO from '../dto/IElevatorDTO';

@Service()
export default class ElevatorRepo implements IElevatorRepo {
  private models: any;


  constructor(@Inject('elevatorSchema') private elevatorSchema: Model<IElevatorPersistence & Document>) {
  }

  public async findByCode(code: string): Promise<Elevator> {
    try {
      const query = {code};
      const elevatorRecord = await this.elevatorSchema.findOne(query as FilterQuery<IElevatorPersistence & Document>);
      if (elevatorRecord != null) {
        return ElevatorMap.toDomain(elevatorRecord);
      }
      return null;
    } catch (error) {
      console.error(`Error occurred while finding Elevator by code: ${error}`);
      throw error;
    }
  }

  public async exists(elevator: Elevator): Promise<boolean> {
    const idX = elevator.id instanceof UniqueEntityID ? elevator.id.toValue() : elevator.id;
    const query = {domainId: idX};
    const elevatorDocument = await this.elevatorSchema.findOne(query as FilterQuery<IElevatorPersistence & Document>);
    return !!elevatorDocument === true;
  }

  public async save(elevator: Elevator): Promise<Elevator> {
    const query = {domainId: elevator.id.toString()};
    const elevatorDocument = await this.elevatorSchema.findOne(query);

    try {
      if (elevatorDocument === null) {
        const rawElevator: any = ElevatorMap.toPersistence(elevator);
        const elevatorCreated = await this.elevatorSchema.create(rawElevator);
        return ElevatorMap.toDomain(elevatorCreated);
      } else {
        await elevatorDocument.save();
        return elevator;
      }
    } catch (err) {
      throw err;
    }
  }

  public async getAllElevators(): Promise<Result<Elevator[]>> {
    const lista = new Array<Elevator>();

    (await this.elevatorSchema.find({})).forEach(cam => lista.push(ElevatorMap.toDomain(cam)));

    if (lista != null) {
      return Result.ok(lista);
    } else {
      return null;
    }
  }

  public async findByDomainId(elevatorId: UniqueEntityID | string): Promise<Elevator> {
    const query = {domainId: elevatorId};
    const elevatorRecord = await this.elevatorSchema.findOne(query as FilterQuery<IElevatorPersistence & Document>);
    if (elevatorRecord != null) {
      return ElevatorMap.toDomain(elevatorRecord);
    } else return null;
  }

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async update(elevator: Elevator): Promise<Result<Elevator>> {
    console.log('Starting the update process...');

    const query = {domainId: elevator.id.toString()};
    const elevatorDocument = await this.elevatorSchema.findOne(query as FilterQuery<IElevatorPersistence & Document>);

    if (!elevatorDocument) {
      console.log('No existing elevator document found. Creating a new one...');

      const rawElevator = ElevatorMap.toPersistence(elevator);
      console.log('Transformed to persistence format:', rawElevator);

      const elevatorCreated = await this.elevatorSchema.create(rawElevator);
      console.log('New elevator created:', elevatorCreated);

      return Result.ok(ElevatorMap.toDomain(elevatorCreated));
    }
    try {
      await elevatorDocument.save();
      return Result.ok(elevator);
    } catch (err) {
      console.error('Error occurred during update:', err);
      throw err;
    }
  }

  public async findElevatorsByBuilding(buildingCode: string): Promise<number> {
    try {
      const query = { buildingFinderId: buildingCode };
      const elevatorRecords = await this.elevatorSchema.find(query as FilterQuery<IElevatorPersistence & Document>);
      const elevators = elevatorRecords.map(elevatorRecord => ElevatorMap.toDomain(elevatorRecord));
      return elevators.length;
    } catch (error) {
      console.error('Error finding elevators by building:', error);
      throw error; // Rethrow the error after logging it
    }
  }
  public async findElevatorsObjectByBuilding(buildingCode: string): Promise<IElevatorDTO[]> {
    try {
      const query = { buildingFinderId: buildingCode };
      const elevatorRecords = await this.elevatorSchema.find(query as FilterQuery<IElevatorPersistence & Document>);
      const elevatorsDTO = elevatorRecords
        .map(elevatorRecord => {
          const elevatorDomain = ElevatorMap.toDomain(elevatorRecord);
          return elevatorDomain ? ElevatorMap.toDTO(elevatorDomain) : null;
        })
        .filter(elevatorDTO => elevatorDTO !== null); // Remove null values if any
      return elevatorsDTO;
    } catch (error) {
      console.error('Error finding elevators by building:', error);
      throw error; // Rethrow the error after logging it
    }
  }

}
