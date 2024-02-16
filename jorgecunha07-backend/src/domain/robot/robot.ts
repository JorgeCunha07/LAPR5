import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Result } from '../../core/logic/Result';
import IRobotDTO from '../../dto/IRobotDTO';
import RobotCode from './robotCode';
import RobotDescription from './robotDescription';
import RobotNickname from './robotNickname';
import RobotSerialNumber from './robotSerialNumber';

interface IRobotProps {
  robotCode: RobotCode;
  robotDescription: RobotDescription | null;
  robotNickname: RobotNickname;
  robotSerialNumber: RobotSerialNumber;
  robotTypeName: string;
  enabled: boolean;
}

class Robot extends AggregateRoot<IRobotProps> {
  constructor(props: IRobotProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(dto: IRobotDTO, id?: UniqueEntityID): Result<Robot> {
    if (!dto.robotCode || dto.robotCode.length === 0) {
      return Result.fail<Robot>('Robot code is required.');
    }

    if (!dto.robotNickname || dto.robotNickname.length === 0) {
      return Result.fail<Robot>('Robot nickname is required.');
    }

    if (!dto.robotTypeName || dto.robotTypeName.length === 0) {
      return Result.fail<Robot>('Robot type name is required.');
    }

    if (!dto.robotSerialNumber || dto.robotSerialNumber.length === 0) {
      return Result.fail<Robot>('Robot serial number is required.');
    }

    const robotProps: IRobotProps = {
      robotCode: RobotCode.create(dto.robotCode).getValue(),
      robotDescription: RobotDescription.create(dto.robotDescription).getValue(),
      robotNickname: RobotNickname.create(dto.robotNickname).getValue(),
      robotSerialNumber: RobotNickname.create(dto.robotSerialNumber).getValue(),
      robotTypeName: dto.robotTypeName,
      enabled: dto.enabled,
    };

    return Result.ok<Robot>(new Robot(robotProps, id));
  }

  public changeState(): void {
    this.props.enabled = !this.props.enabled;
  }

  get robotCode(): RobotCode {
    return this.props.robotCode;
  }

  get robotDescription(): RobotDescription | null {
    return this.props.robotDescription;
  }

  get robotNickname(): RobotNickname {
    return this.props.robotNickname;
  }

  get robotSerialNumber(): RobotSerialNumber {
    return this.props.robotSerialNumber;
  }

  get robotTypeName(): string {
    return this.props.robotTypeName;
  }

  get isEnabled(): boolean {
    return this.props.enabled;
  }
}

export default Robot;
