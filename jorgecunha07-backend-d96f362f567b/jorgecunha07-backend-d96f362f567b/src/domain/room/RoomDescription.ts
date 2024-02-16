import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface RoomDescriptionProps {
  description: string;
}

export default class RoomDescription extends ValueObject<RoomDescriptionProps> {
  get value(): string {
    return this.props.description;
  }

  private constructor(props: RoomDescriptionProps) {
    super(props);
  }

  public static create(description: string): Result<RoomDescription> {
    const guardResult = Guard.againstNullOrUndefined(description, 'description');

    if (!guardResult.succeeded) {
      return Result.fail<RoomDescription>('Room description should not be over 250.');
    } else {
      const isvalidateDescription = this.validateDescription(description);
      if (!isvalidateDescription) {
        return Result.fail<RoomDescription>('Esta descrição é inválida.');
      }
      return Result.ok<RoomDescription>(new RoomDescription({ description: description }));
    }
  }

  private static validateDescription(code: string): boolean {
    const regex = /^[a-zA-Z0-9 ]{0,255}$/;
    return regex.test(code);
  }
}
