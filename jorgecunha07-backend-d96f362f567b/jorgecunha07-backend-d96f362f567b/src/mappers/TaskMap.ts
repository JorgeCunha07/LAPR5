import { Document, Model } from 'mongoose';
import { Mapper } from '../core/infra/Mapper';
import { Task } from '../domain/task/task';
import ITaskDTO from '../dto/ITaskDTO';
import { ITaskPersistence } from '../dataschema/ITaskPersistence';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

export class TaskMap extends Mapper<Task> {
  public static toDTO(task: Task): ITaskDTO {
    return {
      taskState: task.taskState,
      description: task.description,
      typeTaskId: task.typeTaskId,
      taskTypeEnum: task.taskTypeEnum,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static toDomain(task: any | Model<ITaskPersistence & Document>): Task {
    const taskOrError = Task.create(
      {
        taskState: task.taskState,
        description: task.description,
        typeTaskId: task.typeTaskId,
        taskTypeEnum: task.taskTypeEnum,
      },
      new UniqueEntityID(task.domainId),
    );

    taskOrError.isFailure ? console.log(taskOrError.error) : '';

    return taskOrError.isSuccess ? taskOrError.getValue() : null;
  }

  public static toPersistence(task: Task): ITaskPersistence {
    return {
      domainId: task.id.toString(),
      taskState: task.taskState,
      description: task.description,
      typeTaskId: task.typeTaskId,
      taskTypeEnum: task.taskTypeEnum,
    };
  }
}
