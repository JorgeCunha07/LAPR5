import { Service, Inject } from 'typedi';
import { FilterQuery, Model } from 'mongoose';
import { ITaskPersistence } from '../dataschema/ITaskPersistence';
import { TransportTask } from '../domain/taskType/transportTask';
import ITransportTaskRepo from './IRepos/ITransportTaskRepo';
import { TransportTaskMap } from '../mappers/TransportTaskMap';
import { ITransportTaskPersistence } from '../dataschema/ITransportTaskPersistence';

@Service()
export default class TransportTaskRepo implements ITransportTaskRepo {
  constructor(@Inject('transportTaskSchema') private transportTaskSchema: Model<ITransportTaskPersistence>) {}

  public async exists(transportTask: TransportTask): Promise<boolean> {
    const id = transportTask.id.toString();
    const query = { domainId: id };
    const transportTaskDocument = await this.transportTaskSchema.findOne(query as FilterQuery<ITaskPersistence>);
    return !!transportTaskDocument === true;
  }

  public async save(transportTask: TransportTask): Promise<TransportTask> {
    const query = { domainId: transportTask.id.toString() };
    const transportTaskDocument = await this.transportTaskSchema.findOne(query);

    try {
      if (transportTaskDocument === null) {
        const rawTransportTask: ITransportTaskPersistence = TransportTaskMap.toPersistence(transportTask);
        const transportTaskCreated = await this.transportTaskSchema.create(rawTransportTask);
        return TransportTaskMap.toDomain(transportTaskCreated);
      } else {
        transportTaskDocument.domainId = transportTask.id.toString();
        transportTaskDocument.pickupRoom = transportTask.pickupRoom;
        transportTaskDocument.deliveryRoom = transportTask.deliveryRoom;
        transportTaskDocument.contactStart = transportTask.contactStart.value;
        transportTaskDocument.contactEnd = transportTask.contactEnd.value;
        transportTaskDocument.confirmationCode = transportTask.confirmationCode;
        transportTaskDocument.transportTaskDescription = transportTask.transportTaskDescription;
        await transportTaskDocument.save();
        return transportTask;
      }
    } catch (err) {
      throw err;
    }
  }
}
