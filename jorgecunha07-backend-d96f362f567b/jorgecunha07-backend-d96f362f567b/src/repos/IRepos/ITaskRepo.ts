import { Repo } from '../../core/infra/Repo';
import { Task } from '../../domain/task/task';

export default interface ITaskRepo extends Repo<Task> {
  save(task: Task): Promise<Task>;
}
