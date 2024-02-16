import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface LocationProps {
  x: number;
  y: number;
}

export class Location extends ValueObject<LocationProps> {
  private constructor(props: LocationProps) {
    super(props);
  }

  get x(): number {
    return this.props.x;
  }

  get y(): number {
    return this.props.y;
  }

  public static create(x: number, y: number): Result<Location> {
    if (typeof x !== 'number' || typeof y !== 'number') {
      return Result.fail<Location>('X and Y should be numbers.');
    }

    return Result.ok<Location>(new Location({ x, y }));
  }
}
