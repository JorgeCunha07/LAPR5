import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface RoomNameProps {
  name: string;
}

export default class RoomName extends ValueObject<RoomNameProps> {
  get value(): string {
    return this.props.name;
  }

  private constructor(props: RoomNameProps) {
    super(props);
  }

  public static create(name: string): Result<RoomName> {
    const guardResult = Guard.againstNullOrUndefined(name, 'name');

    if (!guardResult.succeeded) {
      return Result.fail<RoomName>('Building name should not be null or undefined.');
    } else {
      const isvalidateName = this.validateName(name);
      if (!isvalidateName) {
        return Result.fail<RoomName>('Este Nome é inválido');
      }
      return Result.ok<RoomName>(new RoomName({ name: name }));
    }
  }

  private static validateName(code: string): boolean {
    const regex = /^[a-zA-Z0-9 ]{1,50}$/;
    return regex.test(code);
  }
}
