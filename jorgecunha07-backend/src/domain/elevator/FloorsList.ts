import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface FloorsListProps {
  floors: string[];
}

export default class FloorsList extends ValueObject<FloorsListProps> {
  get value(): string[] {
    return this.props.floors;
  }

  private constructor(props: FloorsListProps) {
    super(props);
  }

  public static create(floors: string[]): Result<FloorsList> {
    return Result.ok<FloorsList>(new FloorsList({ floors: floors }));
  }
}
