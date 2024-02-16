import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface RobotDescriptionProps {
  name: string;
}

export default class RobotDescription extends ValueObject<RobotDescriptionProps> {
  get value(): string {
    return this.props.name;
  }

  private constructor(props: RobotDescriptionProps) {
    super(props);
  }

  public static create(name: string): Result<RobotDescription> {
    const guardResult = Guard.againstNullOrUndefined(name, 'robotDescription');

    if (!guardResult.succeeded) {
      return Result.fail<RobotDescription>('Robot Description name should not be null or undefined.');
    } else if (name.length > 50) {
      return Result.fail<RobotDescription>('Robot Description name should not exceed 50 characters.');
    }

    return Result.ok<RobotDescription>(new RobotDescription({ name }));
  }
}
