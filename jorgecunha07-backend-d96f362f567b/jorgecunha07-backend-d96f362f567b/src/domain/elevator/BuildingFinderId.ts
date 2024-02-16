import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface BuildingFinderIdProps {
  code: string;
}

export default class BuildingFinderId extends ValueObject<BuildingFinderIdProps> {
  get value(): string {
    return this.props.code;
  }

  private constructor(props: BuildingFinderIdProps) {
    super(props);
  }

  public static create(code: string): Result<BuildingFinderId> {
    return Result.ok<BuildingFinderId>(new BuildingFinderId({ code: code }));
  }
}
