import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface RobotModelProps {
  model: string;
}

export default class RobotModel extends ValueObject<RobotModelProps> {
  get value(): string {
    return this.props.model;
  }

  private constructor(props: RobotModelProps) {
    super(props);
  }

  public static create(model: string): Result<RobotModel> {
    const guardResult = Guard.againstNullOrUndefined(model, 'robotModel');

    if (!guardResult.succeeded) {
      return Result.fail<RobotModel>('Robot model name should not be null or undefined.');
    } else if (model.length > 100) {
      return Result.fail<RobotModel>('Robot model name should not exceed 100 characters.');
    }
    return Result.ok<RobotModel>(new RobotModel({ model }));
  }
}
