import { Document, Model } from 'mongoose';
import { Mapper } from '../core/infra/Mapper';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import ISurveillanceTaskDTO from '../dto/ISurveillanceTaskDTO';
import { SurveillanceTask } from '../domain/taskType/surveillanceTask';
import { ISurveillanceTaskPersistence } from '../dataschema/ISurveillancePersistence';

export class SurveillanceTaskMap extends Mapper<SurveillanceTaskMap> {
  public static toDTO(surveillanceTask: SurveillanceTask): ISurveillanceTaskDTO {
    return {
      targetBuilding: surveillanceTask.targetBuilding.value,
      targetFloor: surveillanceTask.targetFloor.value,
      contactInfo: surveillanceTask.contactInfo.value,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static toDomain(surveillanceTask: any | Model<ISurveillanceTaskPersistence & Document>): SurveillanceTask {
    const surveillanceTaskOrError = SurveillanceTask.create(
      {
        targetBuilding: surveillanceTask.targetBuilding,
        targetFloor: surveillanceTask.targetFloor,
        contactInfo: surveillanceTask.contactInfo,
      },
      new UniqueEntityID(surveillanceTask.domainId),
    );

    surveillanceTaskOrError.isFailure ? console.log(surveillanceTaskOrError.error) : '';

    return surveillanceTaskOrError.isSuccess ? surveillanceTaskOrError.getValue() : null;
  }

  public static toPersistence(surveillanceTask: SurveillanceTask): ISurveillanceTaskPersistence {
    return {
      domainId: surveillanceTask.id.toString(),
      targetBuilding: surveillanceTask.targetBuilding.value,
      targetFloor: surveillanceTask.targetFloor.value,
      contactInfo: surveillanceTask.contactInfo.value,
    };
  }
}
