import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Result } from '../../core/logic/Result';
import ITaskDTO from '../../dto/ITaskDTO';
import { TaskTypeEnum } from '../taskType/taskTypeEnum';
import { TaskStateEnum } from './taskStateEnum';

interface ITaskProps {
  taskState: TaskStateEnum;
  description: string;
  typeTaskId: string;
  taskTypeEnum: TaskTypeEnum;
}

export class Task extends AggregateRoot<ITaskProps> {
  constructor(props: ITaskProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(dto: ITaskDTO, id?: UniqueEntityID): Result<Task> {
    if (!dto.taskState || dto.taskState.length === 0) {
      return Result.fail<Task>('Task state is required.');
    }

    if (!dto.description || dto.description.length === 0) {
      return Result.fail<Task>('Description is required.');
    }

    if (!dto.typeTaskId || dto.typeTaskId.length === 0) {
      return Result.fail<Task>('Type Task ID is required.');
    }

    if (!dto.taskTypeEnum || dto.taskTypeEnum.length === 0) {
      return Result.fail<Task>('Type Task is required.');
    }

    const taskProps: ITaskProps = {
      taskState: dto.taskState as TaskStateEnum,
      description: dto.description,
      typeTaskId: dto.typeTaskId,
      taskTypeEnum: dto.taskTypeEnum as TaskTypeEnum,
    };

    return Result.ok<Task>(new Task(taskProps, id));
  }

  get taskState(): TaskStateEnum {
    return this.props.taskState;
  }

  get description(): string {
    return this.props.description;
  }

  get typeTaskId(): string {
    return this.props.typeTaskId;
  }

  get taskTypeEnum(): TaskTypeEnum {
    return this.props.taskTypeEnum;
  }
}
