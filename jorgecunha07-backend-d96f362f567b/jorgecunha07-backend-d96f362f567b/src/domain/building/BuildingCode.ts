import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface BuildingCodeProps {
  code: string;
}

export default class BuildingCode extends ValueObject<BuildingCodeProps> {
  get value(): string {
    return this.props.code;
  }

  private constructor(props: BuildingCodeProps) {
    super(props);
  }

  public static create(code: string): Result<BuildingCode> {
    const guardResult = Guard.againstNullOrUndefined(code, 'buildingCode');

    if (!guardResult.succeeded) {
      return Result.fail<BuildingCode>('Building code should not be null, undefined or empty.');
    }

    const isValidCode = this.validateCode(code);
    if (!isValidCode) {
      return Result.fail<BuildingCode>('Este código é inválido');
    }

    return Result.ok<BuildingCode>(new BuildingCode({ code: code }));
  }

  private static validateCode(code: string): boolean {
    const regex = /^[a-zA-Z0-9 ]{1,5}$/;
    return regex.test(code);
  }
}
