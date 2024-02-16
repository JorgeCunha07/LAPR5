import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface BuildingDescriptionProps {
  description: string;
}

export default class BuildingDescription extends ValueObject<BuildingDescriptionProps> {
  get value(): string {
    return this.props.description;
  }

  private constructor(props: BuildingDescriptionProps) {
    super(props);
  }

  public static create(description: string): Result<BuildingDescription> {
    const guardResult = Guard.againstNullOrUndefined(description, 'buildingDescription');

    if (!guardResult.succeeded) {
      return Result.fail<BuildingDescription>('Building description should not be over 250.');
    } else {
      const isvalidateDescription = this.validateDescription(description);
      if (!isvalidateDescription) {
        return Result.fail<BuildingDescription>('Esta descrição é inválida.');
      }
      return Result.ok<BuildingDescription>(new BuildingDescription({ description: description }));
    }
  }

  private static validateDescription(code: string): boolean {
    const regex = /^[a-zA-Z0-9 ]{0,255}$/;
    return regex.test(code);
  }
}
