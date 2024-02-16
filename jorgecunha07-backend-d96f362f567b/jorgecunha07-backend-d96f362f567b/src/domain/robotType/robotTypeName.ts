import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface RobotTypeNameProps {
  name: string;
}

export default class RobotTypeName extends ValueObject<RobotTypeNameProps> {
  get value(): string {
    return this.props.name;
  }

  private constructor(props: RobotTypeNameProps) {
    super(props);
  }

  public static create(name: string): Result<RobotTypeName> {
    const guardResult = Guard.againstNullOrUndefined(name, 'robotTypeName');

    if (!guardResult.succeeded) {
      return Result.fail<RobotTypeName>('Robot type name should not be null or undefined.');
    } else {
      const isValidateName = this.validateName(name);
      if (!isValidateName) {
        return Result.fail<RobotTypeName>(
          'Invalid name for the robot type. It should be alphanumeric and have between 1 and 25 characters.',
        );
      }
      return Result.ok<RobotTypeName>(new RobotTypeName({ name: name }));
    }
  }

  private static validateName(name: string): boolean {
    const regex = /^[a-zA-Z0-9 ]{1,25}$/;
    return regex.test(name);
  }
}
