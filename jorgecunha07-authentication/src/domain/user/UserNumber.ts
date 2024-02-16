import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface UserNumberProps {
  userNumber: string | null; // Allow null values
}

export class UserNumber extends ValueObject<UserNumberProps> {
  private constructor(props: UserNumberProps) {
    super(props);
  }

  get value(): string | null {
    return this.props.userNumber;
  }

  private static isValidNumber(number: string): boolean {
    // Return true if number is null or matches the pattern
    return number === null || /^\+351\d{9}$/.test(number);
  }

  public static create(number: string | null): Result<UserNumber> {
    if (number !== null) {
      const guardResult = Guard.againstNullOrUndefined(number, 'number');
      if (!guardResult.succeeded) {
        return Result.fail<UserNumber>(guardResult.message);
      }

      if (!this.isValidNumber(number)) {
        return Result.fail<UserNumber>('Number is invalid. It must start with +351 and be followed by 9 numbers.');
      }
    }

    return Result.ok<UserNumber>(new UserNumber({ userNumber: number }));
  }
}
