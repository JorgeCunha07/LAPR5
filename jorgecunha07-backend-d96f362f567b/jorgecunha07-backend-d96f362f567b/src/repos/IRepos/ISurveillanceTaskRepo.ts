import { Repo } from '../../core/infra/Repo';
import { SurveillanceTask } from '../../domain/taskType/surveillanceTask';

export default interface ISurveillanceTaskRepo extends Repo<SurveillanceTask> {
  save(surveillanceTask: SurveillanceTask): Promise<SurveillanceTask>;
}
