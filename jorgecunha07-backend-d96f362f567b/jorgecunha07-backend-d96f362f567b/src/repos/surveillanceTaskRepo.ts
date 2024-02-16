import { Service, Inject } from 'typedi';
import { FilterQuery, Model } from 'mongoose';
import ISurveillanceTaskRepo from './IRepos/ISurveillanceTaskRepo';
import { ISurveillanceTaskPersistence } from '../dataschema/ISurveillancePersistence';
import { SurveillanceTask } from '../domain/taskType/surveillanceTask';
import { ITaskPersistence } from '../dataschema/ITaskPersistence';
import { SurveillanceTaskMap } from '../mappers/SurveillanceTaskMap';

@Service()
export default class SurveillanceTaskRepo implements ISurveillanceTaskRepo {
  constructor(@Inject('surveillanceTaskSchema') private surveillanceTaskSchema: Model<ISurveillanceTaskPersistence>) {}

  public async exists(surveillanceTask: SurveillanceTask): Promise<boolean> {
    const id = surveillanceTask.id.toString();
    const query = { domainId: id };
    const surveillanceTaskDocument = await this.surveillanceTaskSchema.findOne(query as FilterQuery<ITaskPersistence>);
    return !!surveillanceTaskDocument === true;
  }

  public async save(surveillanceTask: SurveillanceTask): Promise<SurveillanceTask> {
    const query = { domainId: surveillanceTask.id.toString() };
    const surveillanceTaskDocument = await this.surveillanceTaskSchema.findOne(query);

    try {
      if (surveillanceTaskDocument === null) {
        const rawSurveillanceTask: ISurveillanceTaskPersistence = SurveillanceTaskMap.toPersistence(surveillanceTask);
        const surveillanceTaskCreated = await this.surveillanceTaskSchema.create(rawSurveillanceTask);
        return SurveillanceTaskMap.toDomain(surveillanceTaskCreated);
      } else {
        surveillanceTaskDocument.domainId = surveillanceTask.id.toString();
        surveillanceTaskDocument.targetBuilding = surveillanceTask.targetBuilding.value;
        surveillanceTaskDocument.targetFloor = surveillanceTask.targetFloor.value;
        surveillanceTaskDocument.contactInfo = surveillanceTask.contactInfo.value;
        await surveillanceTaskDocument.save();
        return surveillanceTask;
      }
    } catch (err) {
      throw err;
    }
  }
}
