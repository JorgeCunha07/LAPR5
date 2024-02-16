import { Result } from '../../core/logic/Result';
import ISurveillanceTaskDTO from '../../dto/ISurveillanceTaskDTO';
import ISurveillanceTask_TaskDTO from '../../dto/ISurveillanceTask_TaskDTO';
import ITransportTaskDTO from '../../dto/ITransportTaskDTO';
import ITransportTask_TaskDTO from '../../dto/ITransportTask_TaskDTO';

export default interface ITaskService {
  createTransportTask(transportTask: ITransportTask_TaskDTO): Promise<Result<ITransportTaskDTO>>;
  createSurveillanceTask(surveillanceTask: ISurveillanceTask_TaskDTO): Promise<Result<ISurveillanceTaskDTO>>;
}
