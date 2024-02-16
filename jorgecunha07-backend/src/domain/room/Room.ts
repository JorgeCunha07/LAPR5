import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { RoomType } from './RoomType';
import { Result } from '../../core/logic/Result';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import RoomName from './RoomName';
import RoomDescription from './RoomDescription';
import IRoomDTO from '../../dto/IRoomDTO';
import { Location } from '../passageway/location';

export interface RoomProps {
  name: RoomName;
  type: RoomType;
  description: RoomDescription;
  buildingFinderId: string;
  floorNumber: number;
  location: Location;
}

export class Room extends AggregateRoot<RoomProps> {
  private constructor(props: RoomProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(dto: IRoomDTO, id?: UniqueEntityID): Result<Room> {
    if (!dto.name || dto.name.length === 0) {
      return Result.fail<Room>('Room name is required.');
    }

    if (!dto.type || dto.type.length === 0) {
      return Result.fail<Room>('Room type is required.');
    }

    if (!dto.description || dto.description.length === 0) {
      return Result.fail<Room>('Room description is required.');
    }
    const locationResult = Location.create(dto.location.x, dto.location.y);
    if (locationResult.isFailure) {
      return Result.fail<Room>(locationResult.errorValue());
    }
    const roomProps: RoomProps = {
      name: RoomName.create(dto.name).getValue(),
      type: dto.type as RoomType,
      description: RoomDescription.create(dto.description).getValue(),
      buildingFinderId: dto.buildingFinderId.toString(),
      floorNumber: dto.floorNumber,
      location: locationResult.getValue(),
    };

    return Result.ok<Room>(new Room(roomProps, id));
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get name(): RoomName {
    return this.props.name;
  }

  get type(): RoomType {
    return this.props.type;
  }

  get description(): RoomDescription {
    return this.props.description;
  }

  get buildingFinderId(): string {
    return this.props.buildingFinderId;
  }

  get floorNumber(): number {
    return this.props.floorNumber;
  }
  get location(): Location {
    return this.props.location;
  }
}
