import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface FloorDescriptionProps {
  description: string;
}

export default class FloorDescription extends ValueObject<FloorDescriptionProps> {
  get value(): string {
    return this.props.description;
  }

  private constructor(props: FloorDescriptionProps) {
    super(props);
  }

  public static create(description: string): Result<FloorDescription> {
    const guardResult = Guard.againstNullOrUndefined(description, 'floorDescription');

    if (!guardResult.succeeded) {
      return Result.fail<FloorDescription>('Floor description should not over 250.');
    } else {
      const isvalidateDescription = this.validateDescription(description);
      if (!isvalidateDescription) {
        return Result.fail<FloorDescription>('Esta descrição é inválida');
      }
      return Result.ok<FloorDescription>(new FloorDescription({ description: description }));
    }
  }

  private static validateDescription(code: string): boolean {
    const regex = /^[a-zA-Z0-9 ]{0,255}$/;
    return regex.test(code);
  }
}
