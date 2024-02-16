import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface RobotSerialNumberProps {
  name: string;
}

export default class RobotSerialNumber extends ValueObject<RobotSerialNumberProps> {
  get value(): string {
    return this.props.name;
  }

  private constructor(props: RobotSerialNumberProps) {
    super(props);
  }

  public static create(name: string): Result<RobotSerialNumber> {
    const guardResult = Guard.againstNullOrUndefined(name, 'robotSerialNumber');

    if (!guardResult.succeeded) {
      return Result.fail<RobotSerialNumber>('Robot SerialNumber name should not be null or undefined.');
    } else if (name.length > 100) {
      return Result.fail<RobotSerialNumber>('Robot SerialNumber name should not exceed 100 characters.');
    }

    return Result.ok<RobotSerialNumber>(new RobotSerialNumber({ name }));
  }
}
