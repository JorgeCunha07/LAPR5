import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface RobotCodeProps {
  name: string;
}

export default class RobotCode extends ValueObject<RobotCodeProps> {
  get value(): string {
    return this.props.name;
  }

  private constructor(props: RobotCodeProps) {
    super(props);
  }

  public static create(name: string): Result<RobotCode> {
    const guardResult = Guard.againstNullOrUndefined(name, 'robotCode');

    if (!guardResult.succeeded) {
      return Result.fail<RobotCode>('Robot Code name should not be null or undefined.');
    } else if (name.length > 100) {
      return Result.fail<RobotCode>('Robot Code name should not exceed 100 characters.');
    }

    return Result.ok<RobotCode>(new RobotCode({ name }));
  }
}
