import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface BuildingSizeProps {
  width: number;
  length: number;
}

export class BuildingSize extends ValueObject<BuildingSizeProps> {
  private constructor(props: BuildingSizeProps) {
    super(props);
  }

  get width(): number {
    return this.props.width; // Access the props from the parent class directly.
  }

  get length(): number {
    return this.props.length; // Access the props from the parent class directly.
  }

  set width(width: number) {
    if (width > 0) {
      this.props.width = width;
    } else {
      throw new Error('Width should be a positive value');
    }
  }

  set length(length: number) {
    if (length > 0) {
      this.props.length = length;
    } else {
      throw new Error('Length should be a positive value');
    }
  }

  public static create(width: number, length: number): Result<BuildingSize> {
    if (width <= 0 || length <= 0) {
      return Result.fail<BuildingSize>('Width and Length should be positive values.');
    }
    return Result.ok<BuildingSize>(new BuildingSize({ width, length }));
  }
}
