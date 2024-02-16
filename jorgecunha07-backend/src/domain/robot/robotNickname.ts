import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface RobotNicknameProps {
  name: string;
}

export default class RobotNickname extends ValueObject<RobotNicknameProps> {
  get value(): string {
    return this.props.name;
  }

  private constructor(props: RobotNicknameProps) {
    super(props);
  }

  public static create(name: string): Result<RobotNickname> {
    const guardResult = Guard.againstNullOrUndefined(name, 'robotNickname');

    if (!guardResult.succeeded) {
      return Result.fail<RobotNickname>('Robot Nickname name should not be null or undefined.');
    } else if (name.length > 100) {
      return Result.fail<RobotNickname>('Robot Nickname name should not exceed 100 characters.');
    }

    return Result.ok<RobotNickname>(new RobotNickname({ name }));
  }
}
