import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface FloorNumberProps {
  floornumber: number;
}

export default class FloorNumber extends ValueObject<FloorNumberProps> {
  get value(): number {
    return this.props.floornumber;
  }

  private constructor(props: FloorNumberProps) {
    super(props);
  }

  public static create(code: number): Result<FloorNumber> {
    const guardResult = Guard.againstNullOrUndefined(code, 'floorNumber');

    if (!guardResult.succeeded) {
      return Result.fail<FloorNumber>('floorNumber should not be null, undefined or empty.');
    }

    return Result.ok<FloorNumber>(new FloorNumber({ floornumber: code }));
  }
}
