import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface UserNIFProps {
  userNif: string | null; // Allow null values
}

export class UserNIF extends ValueObject<UserNIFProps> {
  private constructor(props: UserNIFProps) {
    super(props);
  }

  get value(): string | null {
    return this.props.userNif;
  }

  private static isValidNIF(nif: string): boolean {
    // Return true if nif is null or matches the pattern
    return nif === null || /^\d{9}$/.test(nif);
  }

  public static create(nif: string | null): Result<UserNIF> {
    if (nif !== null) {
      const guardResult = Guard.againstNullOrUndefined(nif, 'nif');
      if (!guardResult.succeeded) {
        return Result.fail<UserNIF>(guardResult.message);
      }

      if (!this.isValidNIF(nif)) {
        return Result.fail<UserNIF>('NIF is invalid, it must be exactly 9 numbers.');
      }
    }

    return Result.ok<UserNIF>(new UserNIF({ userNif: nif }));
  }
}
