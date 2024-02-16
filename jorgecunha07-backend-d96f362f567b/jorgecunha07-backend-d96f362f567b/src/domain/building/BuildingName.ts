import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface BuildingNameProps {
  name: string;
}

export default class BuildingName extends ValueObject<BuildingNameProps> {
  get value(): string {
    return this.props.name;
  }

  private constructor(props: BuildingNameProps) {
    super(props);
  }

  public static create(name: string): Result<BuildingName> {
    const guardResult = Guard.againstNullOrUndefined(name, 'buildingName');

    if (!guardResult.succeeded) {
      return Result.fail<BuildingName>('Building name should not be null or undefined.');
    } else {
      const isvalidateName = this.validateName(name);
      if (!isvalidateName) {
        return Result.fail<BuildingName>('Este Nome é inválido');
      }
      return Result.ok<BuildingName>(new BuildingName({ name: name }));
    }
  }

  private static validateName(code: string): boolean {
    const regex = /^[a-zA-Z0-9 ]{1,50}$/;
    return regex.test(code);
  }
}
