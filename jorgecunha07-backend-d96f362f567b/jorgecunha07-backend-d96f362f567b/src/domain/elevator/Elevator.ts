import { AggregateRoot } from '../../core/domain/AggregateRoot';
import BuildingFinderId from './BuildingFinderId';
import FloorsList from './FloorsList';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import IElevatorDTO from '../../dto/IElevatorDTO';
import { Result } from '../../core/logic/Result';
import { Location } from '../passageway/location';

interface IElevatorProps {
  buildingFinderId: BuildingFinderId;
  floorsList: FloorsList;
  location: Location;
}

export class Elevator extends AggregateRoot<IElevatorProps> {
  private constructor(props: IElevatorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(dto: IElevatorDTO, id?: UniqueEntityID): Result<Elevator> {
    const buildingFinderIdResult = BuildingFinderId.create(dto.buildingFinderId);
    if (buildingFinderIdResult.isFailure) {
      return Result.fail<Elevator>(buildingFinderIdResult.errorValue());
    }

    const floorsListResult = FloorsList.create(dto.floors);
    if (floorsListResult.isFailure) {
      return Result.fail<Elevator>(floorsListResult.errorValue());
    }

    const locationResult = Location.create(dto.location.x, dto.location.y);
    if (locationResult.isFailure) {
      return Result.fail<Elevator>(locationResult.errorValue());
    }
    const elevatorProps: IElevatorProps = {
      buildingFinderId: buildingFinderIdResult.getValue(),
      floorsList: floorsListResult.getValue(),
      location: locationResult.getValue(),
    };

    return Result.ok<Elevator>(new Elevator(elevatorProps, id));
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get buildingFinderId(): BuildingFinderId {
    return this.props.buildingFinderId;
  }

  get floorsList(): FloorsList {
    return this.props.floorsList;
  }
  get location(): Location {
    return this.props.location;
  }

}
