import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Result } from '../../core/logic/Result';
import ISurveillanceTaskDTO from '../../dto/ISurveillanceTaskDTO';
import BuildingCode from '../building/BuildingCode';
import FloorNumber from '../floor/FloorNumber';
import ContactInfo from './contactInfo';

export interface ISurveillanceTaskProps {
  targetBuilding: BuildingCode;
  targetFloor: FloorNumber;
  contactInfo: ContactInfo;
}

export class SurveillanceTask extends AggregateRoot<ISurveillanceTaskProps> {
  constructor(props: ISurveillanceTaskProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(dto: ISurveillanceTaskDTO, id?: UniqueEntityID): Result<SurveillanceTask> {
    if (!dto.targetBuilding) {
      return Result.fail<SurveillanceTask>('Target building is required.');
    }

    if (!dto.targetFloor) {
      return Result.fail<SurveillanceTask>('Target floor is required.');
    }

    if (!dto.contactInfo) {
      return Result.fail<SurveillanceTask>('Contact info is required.');
    }

    const surveillanceTaskProps: ISurveillanceTaskProps = {
      targetBuilding: BuildingCode.create(dto.targetBuilding).getValue(),
      targetFloor: FloorNumber.create(dto.targetFloor).getValue(),
      contactInfo: ContactInfo.create(dto.contactInfo).getValue(),
    };

    return Result.ok<SurveillanceTask>(new SurveillanceTask(surveillanceTaskProps, id));
  }

  get targetBuilding(): BuildingCode {
    return this.props.targetBuilding;
  }

  get targetFloor(): FloorNumber {
    return this.props.targetFloor;
  }

  get contactInfo(): ContactInfo {
    return this.props.contactInfo;
  }
}
