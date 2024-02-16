import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { Result } from '../../core/logic/Result';
import FloorNumber from './FloorNumber';
import FloorDescription from './FloorDescription';
import { FloorMaxDimensions } from './FloorMaxDimensions';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import IFloorDTO from '../../dto/IFloorDTO';
import FloorMap from './FloorMap';

interface IFloorProps {
  buildingFinderId: string;
  floorNumber: FloorNumber;
  floorDescription: FloorDescription;
  floorMap: FloorMap;
  floorMaxDimensions: FloorMaxDimensions;
}

export class Floor extends AggregateRoot<IFloorProps> {
  private constructor(props: IFloorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(dto: IFloorDTO, id?: UniqueEntityID): Result<Floor> {
    const floorMapResult = FloorMap.create(dto.floorMap);
    if (floorMapResult.isFailure) {
      return Result.fail<Floor>(floorMapResult.error);
    }

    const floorMaxDimensionsResult = FloorMaxDimensions.create(
      dto.floorMaxDimensions.width,
      dto.floorMaxDimensions.length,
    );
    if (floorMaxDimensionsResult.isFailure) {
      return Result.fail<Floor>(floorMaxDimensionsResult.error);
    }

    const floorMap = floorMapResult.getValue();
    const floorMaxDimensions = floorMaxDimensionsResult.getValue();

    const floorProps: IFloorProps = {
      buildingFinderId: dto.buildingFinderId.toString(),
      floorNumber: FloorNumber.create(dto.floorNumber).getValue(),
      floorDescription: FloorDescription.create(dto.floorDescription).getValue(),
      floorMap: floorMap,
      floorMaxDimensions: floorMaxDimensions,
    };

    return Result.ok<Floor>(new Floor(floorProps, id));
  }

  public updateFloorDescription(description: string): void {
    this.props.floorDescription = FloorDescription.create(description).getValue();
  }

  public updateFloorMap(map: any): void {
    const floorMapResult = FloorMap.create(map);
    if (floorMapResult.isSuccess) {
      this.props.floorMap = floorMapResult.getValue();
    }
  }

  public updateFloorMaxDimensions(width: number, length: number): void {
    const floorMaxDimensionsResult = FloorMaxDimensions.create(width, length);
    if (floorMaxDimensionsResult.isSuccess) {
      this.props.floorMaxDimensions = floorMaxDimensionsResult.getValue();
    }
  }

  public updateFloorNumber(floorNumber: number): void {
    this.props.floorNumber = FloorNumber.create(floorNumber).getValue();
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get buildingFinderId(): string {
    return this.props.buildingFinderId;
  }
  get floorNumber(): FloorNumber {
    return this.props.floorNumber;
  }

  get floorDescription(): FloorDescription {
    return this.props.floorDescription;
  }

  get floorMap(): FloorMap {
    return this.props.floorMap;
  }

  get floorMaxDimensions(): FloorMaxDimensions {
    return this.props.floorMaxDimensions;
  }
}
