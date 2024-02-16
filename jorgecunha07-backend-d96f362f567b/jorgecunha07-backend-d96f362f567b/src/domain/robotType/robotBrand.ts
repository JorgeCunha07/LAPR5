import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface RobotBrandProps {
  name: string;
}

export default class RobotBrand extends ValueObject<RobotBrandProps> {
  get value(): string {
    return this.props.name;
  }

  private constructor(props: RobotBrandProps) {
    super(props);
  }

  public static create(name: string): Result<RobotBrand> {
    const guardResult = Guard.againstNullOrUndefined(name, 'robotBrand');

    if (!guardResult.succeeded) {
      return Result.fail<RobotBrand>('Robot brand name should not be null or undefined.');
    } else if (name.length > 50) {
      return Result.fail<RobotBrand>('Robot brand name should not exceed 50 characters.');
    }

    return Result.ok<RobotBrand>(new RobotBrand({ name }));
  }
}
