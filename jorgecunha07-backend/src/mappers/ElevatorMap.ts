import { Mapper } from '../core/infra/Mapper';
import { Document, Model } from 'mongoose';
import { IElevatorPersistence } from '../dataschema/IElevatorPersistence';
import { Elevator } from '../domain/elevator/Elevator';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import IElevatorDTO from '../dto/IElevatorDTO';

export class ElevatorMap extends Mapper<Elevator> {
  public static toDTO(elevator: Elevator): IElevatorDTO {
    return {
      id: elevator.id.toString(),
      buildingFinderId: elevator.buildingFinderId.value,
      floors: elevator.floorsList.value,
      location: {
        x: elevator.location.x,
        y: elevator.location.y,
      },
    } as IElevatorDTO;
  }

  public static toDomain(elevator: any | Model<IElevatorPersistence & Document>): Elevator {
    const elevatorOrError = Elevator.create(elevator, new UniqueEntityID(elevator.domainId));

    elevatorOrError.isFailure ? console.log(elevatorOrError.error) : '';

    return elevatorOrError.isSuccess ? elevatorOrError.getValue() : null;
  }

  public static toPersistence(elevator: Elevator): any {
    return {
      id: elevator.id.toString(),
      buildingFinderId: elevator.buildingFinderId.value,
      floors: elevator.floorsList.value,
      location: {
        x: elevator.location.x,
        y: elevator.location.y,
      },
    };
  }
}
