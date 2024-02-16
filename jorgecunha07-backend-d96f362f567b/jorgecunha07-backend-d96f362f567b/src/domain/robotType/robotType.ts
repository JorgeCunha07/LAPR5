import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Result } from '../../core/logic/Result';
import IRobotTypeDTO from '../../dto/IRobotTypeDTO';
import { ValidTaskType } from '../taskType/validTaskType';
import RobotBrand from './robotBrand';
import RobotModel from './robotModel';
import RobotTypeName from './robotTypeName';

interface IRobotTypeProps {
  robotTypeName: RobotTypeName;
  robotBrand: RobotBrand;
  robotModel: RobotModel;
  description?: string;
  supportedTaskTypes?: string[];
}

class RobotType extends AggregateRoot<IRobotTypeProps> {
  constructor(props: IRobotTypeProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(dto: IRobotTypeDTO, id?: UniqueEntityID): Result<RobotType> {
    if (!dto.robotTypeName || dto.robotTypeName.length === 0) {
      return Result.fail<RobotType>('RobotType name is required.');
    }

    if (!dto.robotModel || dto.robotModel.length === 0) {
      return Result.fail<RobotType>('RobotType model is required.');
    }

    if (!dto.robotBrand || dto.robotBrand.length === 0) {
      return Result.fail<RobotType>('RobotType brand is required.');
    }

    const supportedTaskTypes: ValidTaskType[] = [];
    if (dto.supportedTaskTypes) {
      for (const taskTypeName of dto.supportedTaskTypes) {
        if (Object.values(ValidTaskType).includes(taskTypeName as ValidTaskType)) {
          supportedTaskTypes.push(taskTypeName as ValidTaskType);
        } else {
          return Result.fail<RobotType>(`Invalid or unsupported TaskType: ${taskTypeName}`);
        }
      }
    }

    const robotTypeProps: IRobotTypeProps = {
      robotTypeName: RobotTypeName.create(dto.robotTypeName).getValue(),
      robotModel: RobotModel.create(dto.robotModel).getValue(),
      robotBrand: RobotBrand.create(dto.robotBrand).getValue(),
      description: dto.description,
      supportedTaskTypes,
    };

    return Result.ok<RobotType>(new RobotType(robotTypeProps, id));
  }

  get robotTypeName(): RobotTypeName {
    return this.props.robotTypeName;
  }

  get robotBrand(): RobotBrand {
    return this.props.robotBrand;
  }

  get robotModel(): RobotModel {
    return this.props.robotModel;
  }

  get description(): string {
    return this.props.description;
  }

  get supportedTaskTypes(): string[] {
    return this.props.supportedTaskTypes;
  }
}

export default RobotType;
