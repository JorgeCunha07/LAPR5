import { Service, Inject } from 'typedi';
import { FilterQuery, Model } from 'mongoose';
import { ITaskPersistence } from '../dataschema/ITaskPersistence';
import { TaskMap } from '../mappers/TaskMap';
import { Task } from '../domain/task/task';
import ITaskRepo from './IRepos/ITaskRepo';

@Service()
export default class TaskRepo implements ITaskRepo {
  constructor(@Inject('taskSchema') private taskSchema: Model<ITaskPersistence>) {}

  public async exists(task: Task): Promise<boolean> {
    const id = task.id.toString();
    const query = { domainId: id };
    const taskDocument = await this.taskSchema.findOne(query as FilterQuery<ITaskPersistence>);
    return !!taskDocument === true;
  }

  public async save(task: Task): Promise<Task> {
    const query = { domainId: task.id.toString() };
    const taskDocument = await this.taskSchema.findOne(query);

    try {
      if (taskDocument === null) {
        const rawTask: ITaskPersistence = TaskMap.toPersistence(task);
        const taskCreated = await this.taskSchema.create(rawTask);
        return TaskMap.toDomain(taskCreated);
      } else {
        taskDocument.taskState = task.taskState;
        taskDocument.description = task.description;
        taskDocument.typeTaskId = task.typeTaskId;
        taskDocument.taskTypeEnum = task.taskTypeEnum;
        await taskDocument.save();
        return task;
      }
    } catch (err) {
      throw err;
    }
  }
}
