import { Mapper } from '../core/infra/Mapper';
import { Document, Model } from 'mongoose';
import { IRobotPersistence } from '../dataschema/IRobotPersistence';
import IRobotDTO from '../dto/IRobotDTO';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import Robot from '../domain/robot/robot';

export class RobotMap extends Mapper<Robot> {
  public static toDTO(robot: Robot): IRobotDTO {
    return {
      robotCode: robot.robotCode.value,
      robotDescription: robot.robotDescription.value,
      robotNickname: robot.robotNickname.value,
      robotSerialNumber: robot.robotSerialNumber.value,
      robotTypeName: robot.robotTypeName,
      enabled: robot.isEnabled,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static toDomain(robot: any | Model<IRobotPersistence & Document>): Robot {
    const robotOrError = Robot.create(
      {
        robotCode: robot.robotCode,
        robotDescription: robot.robotDescription,
        robotNickname: robot.robotNickname,
        robotSerialNumber: robot.robotSerialNumber,
        robotTypeName: robot.robotTypeName,
        enabled: robot.enabled,
      },
      new UniqueEntityID(robot.domainId),
    );

    robotOrError.isFailure ? console.log(robotOrError.error) : '';

    return robotOrError.isSuccess ? robotOrError.getValue() : null;
  }

  public static toPersistence(robot: Robot): IRobotPersistence {
    return {
      robotCode: robot.robotCode.value,
      robotDescription: robot.robotDescription.value,
      robotNickname: robot.robotNickname.value,
      robotSerialNumber: robot.robotSerialNumber.value,
      robotTypeName: robot.robotTypeName,
      enabled: robot.isEnabled,
    };
  }
}
