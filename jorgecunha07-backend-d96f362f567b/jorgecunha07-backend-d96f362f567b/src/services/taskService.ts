import { Service, Inject } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import ITaskService from './IServices/ITaskService';
import { Task } from '../domain/task/task';
import ITransportTask_TaskDTO from '../dto/ITransportTask_TaskDTO';
import { TransportTask } from '../domain/taskType/transportTask';
import ISurveillanceTask_TaskDTO from '../dto/ISurveillanceTask_TaskDTO';
import { SurveillanceTask } from '../domain/taskType/surveillanceTask';
import ITaskRepo from '../repos/IRepos/ITaskRepo';
import ITransportTaskRepo from '../repos/IRepos/ITransportTaskRepo';
import ISurveillanceTaskRepo from '../repos/IRepos/ISurveillanceTaskRepo';
import { SurveillanceTaskMap } from '../mappers/SurveillanceTaskMap';
import ISurveillanceTaskDTO from '../dto/ISurveillanceTaskDTO';
import { TransportTaskMap } from '../mappers/TransportTaskMap';
import ITransportTaskDTO from '../dto/ITransportTaskDTO';

@Service()
export default class TaskService implements ITaskService {
  constructor(
    @Inject(config.repos.task.name) private taskRepo: ITaskRepo,
    @Inject(config.repos.transportTask.name) private transportTaskRepo: ITransportTaskRepo,
    @Inject(config.repos.surveillanceTask.name) private surveillanceTaskRepo: ISurveillanceTaskRepo,
  ) {}

  public async createTransportTask(transportTaskDTO: ITransportTask_TaskDTO): Promise<Result<ITransportTaskDTO>> {
    try {
      // Create TransportTask using the saved Task
      const transportTask = TransportTask.create({
        pickupRoom: transportTaskDTO.pickupRoom,
        deliveryRoom: transportTaskDTO.deliveryRoom,
        contactStart: transportTaskDTO.contactStart,
        contactEnd: transportTaskDTO.contactEnd,
        confirmationCode: transportTaskDTO.confirmationCode,
        transportTaskDescription: transportTaskDTO.transportTaskDescription,
      });

      // Save TransportTask
      const savedTransportTask = await this.transportTaskRepo.save(transportTask.getValue());

      const savedTransportResult = TransportTaskMap.toDTO(savedTransportTask) as ITransportTaskDTO;

      // Create Task
      const task = Task.create({
        taskTypeEnum: 'TransportTask',
        typeTaskId: savedTransportTask.id.toString(),
        taskState: transportTaskDTO.taskState,
        description: transportTaskDTO.description,
      });

      // Save Task
      await this.taskRepo.save(task.getValue());

      return Result.ok<ITransportTaskDTO>(savedTransportResult);
    } catch (error) {
      return Result.fail(error.message);
    }
  }

  public async createSurveillanceTask(
    surveillanceTaskDTO: ISurveillanceTask_TaskDTO,
  ): Promise<Result<ISurveillanceTaskDTO>> {
    try {

      const surveillanceTask = SurveillanceTask.create({
        targetBuilding: surveillanceTaskDTO.targetBuilding,
        targetFloor: surveillanceTaskDTO.targetFloor,
        contactInfo: surveillanceTaskDTO.contactInfo,
      });

      // Save SurveillanceTask
      const savedSurveillanceTask = await this.surveillanceTaskRepo.save(surveillanceTask.getValue());

      const savedSurveillanceResult = SurveillanceTaskMap.toDTO(savedSurveillanceTask) as ISurveillanceTaskDTO;

      // Create Task
      const task = Task.create({
        typeTaskId: savedSurveillanceTask.id.toString(),
        taskTypeEnum: 'SurveillanceTask',
        taskState: surveillanceTaskDTO.taskState,
        description: surveillanceTaskDTO.description,
      });

      // Save Task
      await this.taskRepo.save(task.getValue());

      return Result.ok<ISurveillanceTaskDTO>(savedSurveillanceResult);
    } catch (error) {
      return Result.fail(error.message);
    }
  }
}
