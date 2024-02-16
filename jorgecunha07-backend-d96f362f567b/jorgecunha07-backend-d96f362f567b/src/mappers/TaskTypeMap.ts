import { Mapper } from '../core/infra/Mapper';
import TaskType from '../domain/taskType/taskType';
import ITaskTypeDTO from '../dto/ITaskTypeDTO';

export class TaskTypeMap extends Mapper<TaskType> {
  public static taskTypeToDTO(taskType: TaskType): ITaskTypeDTO {
    return {
      name: taskType.getName(),
      description: taskType.getDescription(),
    };
  }
}
