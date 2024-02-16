import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface FloorMaxDimensionsProps {
  maxwidth: number;
  maxlength: number;
}

export class FloorMaxDimensions extends ValueObject<FloorMaxDimensionsProps> {
  private constructor(props: FloorMaxDimensionsProps) {
    super(props);
  }

  get width(): number {
    return this.props.maxwidth; // Access the props from the parent class directly.
  }

  get length(): number {
    return this.props.maxlength; // Access the props from the parent class directly.
  }

  set width(width: number) {
    if (width > 0) {
      this.props.maxwidth = width;
    } else {
      throw new Error('Width should be a positive value');
    }
  }

  set length(length: number) {
    if (length > 0) {
      this.props.maxlength = length;
    } else {
      throw new Error('Length should be a positive value');
    }
  }

  public static create(width: number, length: number): Result<FloorMaxDimensions> {
    if (width <= 0 || length <= 0) {
      return Result.fail<FloorMaxDimensions>('Width and Length should be positive values.');
    }
    return Result.ok<FloorMaxDimensions>(new FloorMaxDimensions({ maxwidth: width, maxlength: length }));
  }
}
