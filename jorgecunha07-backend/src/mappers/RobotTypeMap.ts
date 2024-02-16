import { Mapper } from '../core/infra/Mapper';
import { Document, Model } from 'mongoose';
import { IRobotTypePersistence } from '../dataschema/IRobotTypePersistence';
import IRobotTypeDTO from '../dto/IRobotTypeDTO';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import RobotType from '../domain/robotType/robotType';

export class RobotTypeMap extends Mapper<RobotType> {
  public static toDTO(robotType: RobotType): IRobotTypeDTO {
    return {
      robotTypeName: robotType.robotTypeName.value,
      robotBrand: robotType.robotBrand.value,
      robotModel: robotType.robotModel.value,
      description: robotType.description,
      supportedTaskTypes: robotType.supportedTaskTypes.map(taskType => taskType.name),
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static toDomain(robotType: any | Model<IRobotTypePersistence & Document>): RobotType {
    const robotTypeOrError = RobotType.create(robotType, new UniqueEntityID(robotType.domainId));

    robotTypeOrError.isFailure ? console.log(robotTypeOrError.error) : '';

    return robotTypeOrError.isSuccess ? robotTypeOrError.getValue() : null;
  }

  public static toPersistence(robotType: RobotType): IRobotTypePersistence {
    return {
      robotTypeName: robotType.robotTypeName.value,
      robotBrand: robotType.robotBrand.value,
      robotModel: robotType.robotModel.value,
      description: robotType.description,
      supportedTaskTypes: robotType.supportedTaskTypes,
    };
  }
}
