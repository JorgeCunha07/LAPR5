import { Mapper } from '../core/infra/Mapper';
import { Document, Model } from 'mongoose';
import { IBuildingPersistence } from '../dataschema/IBuildingPersistence';
import IBuildingDTO from '../dto/IBuildingDTO';
import { Building } from '../domain/building/Building';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

export class BuildingMap extends Mapper<Building> {
  public static toDTO(building: Building): IBuildingDTO {
    return {
      id: building.id.toString(),
      buildingCode: building.buildingCode.value, // Assuming you have a .value on BuildingCode
      buildingName: building.buildingName.value,
      buildingDescription: building.buildingDescription.value,
      buildingSize: {
        width: building.buildingSize.width,
        length: building.buildingSize.length,
      },
    } as IBuildingDTO;
  }

  public static toDomain(building: any | Model<IBuildingPersistence & Document>): Building {
    const buildingOrError = Building.create(building, new UniqueEntityID(building.domainId));

    buildingOrError.isFailure ? console.log(buildingOrError.error) : '';

    return buildingOrError.isSuccess ? buildingOrError.getValue() : null;
  }

  public static toPersistence(building: Building): any {
    return {
      id: building.id.toString(),
      buildingCode: building.buildingCode.value, // Assuming you have a .value on BuildingCode
      buildingName: building.buildingName.value,
      buildingDescription: building.buildingDescription.value,
      buildingSize: {
        width: building.buildingSize.width,
        length: building.buildingSize.length,
      },
    };
  }
}
