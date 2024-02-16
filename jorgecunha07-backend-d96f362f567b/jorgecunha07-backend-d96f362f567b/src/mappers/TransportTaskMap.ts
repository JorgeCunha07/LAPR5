import { Document, Model } from 'mongoose';
import { Mapper } from '../core/infra/Mapper';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import ITransportTaskDTO from '../dto/ITransportTaskDTO';
import { TransportTask } from '../domain/taskType/transportTask';
import { ITransportTaskPersistence } from '../dataschema/ITransportTaskPersistence';

export class TransportTaskMap extends Mapper<TransportTaskMap> {
  public static toDTO(transportTask: TransportTask): ITransportTaskDTO {
    return {
      pickupRoom: transportTask.pickupRoom,
      deliveryRoom: transportTask.deliveryRoom,
      contactStart: transportTask.contactStart.value,
      contactEnd: transportTask.contactEnd.value,
      confirmationCode: transportTask.confirmationCode,
      transportTaskDescription: transportTask.transportTaskDescription,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static toDomain(transportTask: any | Model<ITransportTaskPersistence & Document>): TransportTask {
    const transportTaskOrError = TransportTask.create(
      {
        pickupRoom: transportTask.pickupRoom,
        deliveryRoom: transportTask.deliveryRoom,
        contactStart: transportTask.contactStart,
        contactEnd: transportTask.contactEnd,
        confirmationCode: transportTask.confirmationCode,
        transportTaskDescription: transportTask.transportTaskDescription,
      },
      new UniqueEntityID(transportTask.domainId),
    );

    transportTaskOrError.isFailure ? console.log(transportTaskOrError.error) : '';

    return transportTaskOrError.isSuccess ? transportTaskOrError.getValue() : null;
  }

  public static toPersistence(transportTask: TransportTask): ITransportTaskPersistence {
    return {
      domainId: transportTask.id.toString(),
      pickupRoom: transportTask.pickupRoom,
      deliveryRoom: transportTask.deliveryRoom,
      contactStart: transportTask.contactStart.value,
      contactEnd: transportTask.contactEnd.value,
      confirmationCode: transportTask.confirmationCode,
      transportTaskDescription: transportTask.transportTaskDescription,
    };
  }
}
