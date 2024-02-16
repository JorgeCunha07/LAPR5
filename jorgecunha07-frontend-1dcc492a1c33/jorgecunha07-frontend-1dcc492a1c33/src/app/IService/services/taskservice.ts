import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map, Observable, Subscription, tap, throwError} from "rxjs";
import {EndPointConfiguration} from "../../Constants/EndPointConfiguration";
import {IPlaneamentoService} from "../PlaneamentoService";
import {ITaskService} from "../ITaskService";
import TransportTaskDTO from "../../dto/TransportTaskDTO";
import SurveillanceTaskDTO from "../../dto/SurveillanceTaskDTO";
import {Task_Full_InfoDTO} from "../../dto/Task_Full_InfoDTO";
import {TaskStatusEnum} from "../../Constants/TastStatusEnum";
import {SequenceResultDTO} from "../../dto/SequenceResultDTO";
import {Task_Full_Info_Model} from "../../models/Task_Full_Info_Model";
import {TaskFullInfoMapper} from "../../Mappers/TaskFullInfoMapper";
import {TaskDTO} from "../../dto/TaskDTO";
import {Task_Model} from "../../models/Task_Model";
import {TaskMapper} from "../../Mappers/TaskMapper";
import TransportTask_Model from "../../models/TransportTask_Model";
import SurveillanceTask_Model from "../../models/SurveillanceTask_Model";
import {TransportTaskMapper} from "../../Mappers/TransportTaskMapper";
import {SurveillanceTaskMapper} from "../../Mappers/SurveillanceTaskMapper";

@Injectable({
  providedIn: 'root',
})
export class Taskservice implements ITaskService{

  private tokenSubscription: Subscription;
  private httpOptions = {
    headers: new HttpHeaders()
  };

  constructor(private authService: AuthService, private httpClient: HttpClient) {
    this.tokenSubscription = this.authService.token.subscribe(token => {
      this.updateHttpOptions(token);
    });
  }

  private updateHttpOptions(token: string) {
    this.httpOptions.headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }



  createTransportTask(transportTaskModel: TransportTask_Model): Observable<any> {
    const transportTaskDTO: TransportTaskDTO = TransportTaskMapper.toTransportTaskDTO(transportTaskModel);
    return this.httpClient.post<any>(
      `${EndPointConfiguration.TASK_DATA_ENDPOINT}/TransportTask/create`,
      transportTaskDTO,
      this.httpOptions
    );
  }

  createSurvaillenceTask(surveillanceTaskModel: SurveillanceTask_Model): Observable<any> {
    const surveillanceTaskDTO: SurveillanceTaskDTO = SurveillanceTaskMapper.toSurveillanceTaskDTO(surveillanceTaskModel);
    return this.httpClient.post<any>(
      `${EndPointConfiguration.TASK_DATA_ENDPOINT}/SurveillanceTask/create`,
      surveillanceTaskDTO,
      this.httpOptions
    );
  }

  getSubmitedTasks(): Observable<any> {
    return this.httpClient.get<any>(`${EndPointConfiguration.TASK_DATA_ENDPOINT}/Task/submitted`,this.httpOptions);
  }

  approvedOrRejectTask(nameTask: string, approvedOrReject: string): Observable<any> {
    return this.httpClient.post<any>(`${EndPointConfiguration.TASK_DATA_ENDPOINT}/Task/${nameTask}/${approvedOrReject}`, null,this.httpOptions);
  }

  getAllTasks(): Observable<Task_Model[]> {
    return this.httpClient.get<TaskDTO[]>(`${EndPointConfiguration.TASK_DATA_ENDPOINT}/Task/filter?`, this.httpOptions)
      .pipe(
        map(tasksDTO => tasksDTO.map(TaskMapper.toTaskModel))
      );
  }

  getEnabledRobotsWithTaskType(taskType: string): Observable<any> {
    return this.httpClient.get<any>(`${EndPointConfiguration.MASTER_DATA_ENDPOINT}/robots/enabled/taskType/${taskType}`,this.httpOptions);
  }

  assignRobotToTask(taskName: string, robotCode: string, robotType: string): Observable<any> {
    return this.httpClient.put<any>(
      `${EndPointConfiguration.TASK_DATA_ENDPOINT}/Task/${taskName}/${robotCode}/${robotType}`,
      null,
      this.httpOptions
    );
  }

  getAllTasksWithAllInformation(): Observable<Task_Full_Info_Model[]> {
    return this.httpClient.get<Task_Full_InfoDTO[]>(`${EndPointConfiguration.TASK_DATA_ENDPOINT}/Task/filter?`, this.httpOptions)
      .pipe(
        map(tasksDTO => tasksDTO
          .filter(taskDTO => taskDTO.taskStatus === TaskStatusEnum.Approved)
          .map(TaskFullInfoMapper.toTaskFullInfoModel)
        )
      );
  }


  createTasksAndBestSequence(selectedTasks: Task_Full_InfoDTO[]): Observable<SequenceResultDTO> {
    return this.httpClient.post<any>(`${EndPointConfiguration.TASK_DATA_ENDPOINT}/RouteTasks/createTasksAndBestSequenceTask`,selectedTasks,
      this.httpOptions)
  }
}
