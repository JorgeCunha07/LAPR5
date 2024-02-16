import { Service, Inject } from 'typedi';
import IBuildingRepo from './IRepos/IBuildingRepo';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { BuildingMap } from '../mappers/BuildingMap';
import { Document, FilterQuery, Model } from 'mongoose';
import { IBuildingPersistence } from '../dataschema/IBuildingPersistence';
import { Result } from '../core/logic/Result';
import { Building } from "../domain/building/Building";



@Service()
export default class BuildingRepo implements IBuildingRepo {
  private models: any;

  constructor(@Inject("buildingSchema") private buildingSchema: Model<IBuildingPersistence & Document>) {
  }



  public async findByCode(BuildingCode: string): Promise<Building> {
    try {
      const query = { buildingCode: BuildingCode }; // Use the passed `code` variable
      const buildingRecord = await this.buildingSchema.findOne(query as FilterQuery<IBuildingPersistence & Document>);
      if (buildingRecord != null) {
        return BuildingMap.toDomain(buildingRecord);
      }
      return null;
    } catch (error) {
      console.error(`Error occurred while finding Building by code: ${error}`);
      throw error; // Or handle it accordingly
    }
  }

  public async exists(building: Building): Promise<boolean> {
    const idX = building.id instanceof UniqueEntityID ? building.id.toValue() : building.id;
    const query = { domainId: idX };
    const buildingDocument = await this.buildingSchema.findOne(query as FilterQuery<IBuildingPersistence & Document>);
    return !!buildingDocument === true;
  }

  public async save(building: Building): Promise<Building> {
    const query = { domainId: building.id.toString() };
    const buildingDocument = await this.buildingSchema.findOne(query);

    try {
      if (buildingDocument === null) {
        const rawBuilding: any = BuildingMap.toPersistence(building);
        const buildingCreated = await this.buildingSchema.create(rawBuilding);
        return BuildingMap.toDomain(buildingCreated);
      } else {
        buildingDocument.buildingDescription = building.props.buildingDescription.value;
        buildingDocument.buildingName = building.props.buildingName.value;
        buildingDocument.buildingSize = {
          width: building.props.buildingSize.width, // assuming the BuildingSize class has a width property
          length: building.props.buildingSize.length // assuming the BuildingSize class has a length property
        };
        await buildingDocument.save();
        return building;
      }
    } catch (err) {
      throw err;
    }
  }

  public async getAllBuilding(): Promise<Result<Building[]>> {
    // eslint-disable-next-line prettier/prettier
    var lista = new Array<Building>;

    (await this.buildingSchema.find({})).forEach(
      cam => lista.push(BuildingMap.toDomain(cam))
    );

    if (lista != null) {
      return Result.ok(lista);
    } else {
      return null;
    }
  }


  public async findByDomainId(buildingId: UniqueEntityID | string): Promise<Building> {
    const query = { domainId: buildingId };
    const buildingRecord = await this.buildingSchema.findOne(query as FilterQuery<IBuildingPersistence & Document>);
    if (buildingRecord != null) {
      return BuildingMap.toDomain(buildingRecord);
    } else return null;
  }

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }



  public async update(building: Building): Promise<Result<Building>> {
    console.log('Starting the update process...');

    const query = { domainId: building.id.toString() }; // Changed from buildingId to domainId
    const buildingDocument = await this.buildingSchema.findOne(query as FilterQuery<IBuildingPersistence & Document>);

    if (!buildingDocument) {
      console.log('No existing building document found. Creating a new one...');

      const rawBuilding = BuildingMap.toPersistence(building);
      console.log('Transformed to persistence format:', rawBuilding);

      const buildingCreated = await this.buildingSchema.create(rawBuilding);
      console.log('New building created:', buildingCreated);

      return Result.ok(BuildingMap.toDomain(buildingCreated));
    }


    // Corrected the property names and assumed that buildingCode, buildingName, etc. have methods to retrieve their inner values
    buildingDocument.buildingCode = building.props.buildingCode.value;
    buildingDocument.buildingDescription = building.props.buildingDescription.value;
    buildingDocument.buildingName = building.props.buildingName.value;
    buildingDocument.buildingSize = {
      width: building.props.buildingSize.width, // assuming the BuildingSize class has a width property
      length: building.props.buildingSize.length // assuming the BuildingSize class has a length property
    };




    try {
      await buildingDocument.save();
      return Result.ok(building);
    } catch (err) {
      console.error('Error occurred during update:', err);
      throw err;
    }
  }


}
