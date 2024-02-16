import { Repo } from '../../core/infra/Repo';
import { TransportTask } from '../../domain/taskType/transportTask';

export default interface ITransportTaskRepo extends Repo<TransportTask> {
  save(transportTask: TransportTask): Promise<TransportTask>;
}
