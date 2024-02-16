import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';
import properties from "../../../properties.config";

interface UserEmailProps {
  value: string;
}

export class UserEmail extends ValueObject<UserEmailProps> {
  private constructor(props: UserEmailProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  private static isEmailValid(email: string): boolean {
    const emailDomain = email.split('@')[1];
    return emailDomain === properties.config.emailDomain;
  }

  public static create(email: string): Result<UserEmail> {
    const guardResult = Guard.againstNullOrUndefined(email, 'email');
    if (!guardResult.succeeded) {
      return Result.fail<UserEmail>(guardResult.message);
    }

    if (!this.isEmailValid(email)) {
      return Result.fail<UserEmail>('Invalid email domain. Expected domain: ' + properties.config.emailDomain);
    }

    return Result.ok<UserEmail>(new UserEmail({ value: email }));
  }

}
