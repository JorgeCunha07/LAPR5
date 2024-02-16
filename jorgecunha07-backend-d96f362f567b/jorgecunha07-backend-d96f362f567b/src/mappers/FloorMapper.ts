import { Mapper } from '../core/infra/Mapper';
import { Document, Model } from 'mongoose';
import { IFloorPersistence } from '../dataschema/IFloorPersistence';
import IFloorDTO from '../dto/IFloorDTO';
import { Floor } from '../domain/floor/Floor';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import IFloorMapDTO from '../dto/IFloorMapDTO';

export class FloorMapper extends Mapper<Floor> {
  public static toDTO(floor: Floor): IFloorDTO {
    return {
      buildingFinderId: floor.buildingFinderId,
      floorNumber: floor.floorNumber.value,
      floorDescription: floor.floorDescription.value,
      floorMap: floor.floorMap ? this.floorMapToDTO(floor.floorMap.value) : null,
      floorMaxDimensions: {
        width: floor.floorMaxDimensions.width,
        length: floor.floorMaxDimensions.length,
      },
    }  as IFloorDTO;
  }

  private static floorMapToDTO(floorMap: IFloorMapDTO): IFloorMapDTO {

    return {
      maze: floorMap.maze,
      ground: floorMap.ground,
      wall: floorMap.wall,
      passageway:floorMap.passageway,
      elevator: floorMap.elevator,
      door: floorMap.door,
      player: floorMap.player,
      elevatorFloors:floorMap.elevatorFloors,
      passageways:floorMap.passageways,
    };
  }

  public static toDomain(floor: any | Model<IFloorPersistence & Document>): Floor {
    const floorOrError = Floor.create(floor, new UniqueEntityID(floor.domainId));

    floorOrError.isFailure ? console.log(floorOrError.error) : '';

    return floorOrError.isSuccess ? floorOrError.getValue() : null;
  }

  public static toPersistence(floor: Floor): any {
    return {
      id: floor.id.toString(),
      buildingFinderId: floor.buildingFinderId,
      floorNumber: floor.floorNumber.value,
      floorDescription: floor.floorDescription.value,
      floorMap: floor.floorMap ? this.floorMapToPersistence(floor.floorMap.value) : null,
      floorMaxDimensions: {
        width: floor.floorMaxDimensions.width,
        length: floor.floorMaxDimensions.length,
      },
    };
  }

  private static floorMapToPersistence(floorMap: IFloorMapDTO): any {
    return {
      maze: floorMap.maze,
      ground: floorMap.ground,
      wall: floorMap.wall,
      passageway:floorMap.passageway,
      elevator: floorMap.elevator,
      door: floorMap.door,
      player: floorMap.player,
      elevatorFloors:floorMap.elevatorFloors,
      passageways:floorMap.passageways,
    };
  }
}
