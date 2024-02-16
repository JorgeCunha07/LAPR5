import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import IPassagewayDTO from '../../dto/IPassagewayDTO';
import { Result } from '../../core/logic/Result';
import BuildingCode from '../building/BuildingCode';
import FloorNumber from '../floor/FloorNumber';
import { Location } from './location';

interface IPassagewayProps {
  buildingACode: BuildingCode;
  buildingBCode: BuildingCode;
  floorA: FloorNumber;
  floorB: FloorNumber;
  locationA: Location;
  locationB: Location;
}

export class Passageway extends AggregateRoot<IPassagewayProps> {
  private constructor(props: IPassagewayProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(dto: IPassagewayDTO, id?: UniqueEntityID): Result<Passageway> {
    // Validation for buildingACode e buildingBCode
    const buildingACodeResult = BuildingCode.create(dto.buildingACode);
    const buildingBCodeResult = BuildingCode.create(dto.buildingBCode);

    // Validation for floorA e floorB
    const floorAResult = FloorNumber.create(dto.floorA);
    const floorBResult = FloorNumber.create(dto.floorB);

    const locationA_Result = dto.locationA
      ? Location.create(dto.locationA.x, dto.locationA.y)
      : Result.fail<Location>('locationA missing');

    const locationB_Result = dto.locationB
      ? Location.create(dto.locationB.x, dto.locationB.y)
      : Result.fail<Location>('locationB missing');

    if (buildingACodeResult.isFailure || buildingBCodeResult.isFailure) {
      return Result.fail<Passageway>('Invalid building code(s)');
    }

    if (floorAResult.isFailure || floorBResult.isFailure) {
      return Result.fail<Passageway>('Invalid floor number(s)');
    }

    if (locationA_Result.isFailure || locationB_Result.isFailure) {
      return Result.fail<Passageway>('Invalid or missing coordinates');
    }

    // Building passageway properties
    const passagewayProps: IPassagewayProps = {
      buildingACode: buildingACodeResult.getValue(),
      buildingBCode: buildingBCodeResult.getValue(),
      floorA: floorAResult.getValue(),
      floorB: floorBResult.getValue(),
      locationA: locationA_Result.getValue(),
      locationB: locationB_Result.getValue(),
    };

    return Result.ok<Passageway>(new Passageway(passagewayProps, id));
  }

  public updateBuildingACode(newBuildingACode: BuildingCode): void {
    this.props.buildingACode = newBuildingACode;
  }

  public updateBuildingBCode(newBuildingBCode: BuildingCode): void {
    this.props.buildingBCode = newBuildingBCode;
  }

  public updateFloorA(newFloorANumber: FloorNumber): void {
    this.props.floorA = newFloorANumber;
  }

  public updateFloorB(newFloorBNumber: FloorNumber): void {
    this.props.floorB = newFloorBNumber;
  }

  public updateLocationA(newLocationA: Location): void {
    this.props.locationA = newLocationA;
  }

  public updateLocationB(newLocationB: Location): void {
    this.props.locationB = newLocationB;
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get buildingACode(): BuildingCode {
    return this.props.buildingACode;
  }

  get buildingBCode(): BuildingCode {
    return this.props.buildingBCode;
  }

  get floorA(): FloorNumber {
    return this.props.floorA;
  }

  get floorB(): FloorNumber {
    return this.props.floorB;
  }

  get locationA(): Location {
    return this.props.locationA;
  }

  get locationB(): Location {
    return this.props.locationB;
  }
}
