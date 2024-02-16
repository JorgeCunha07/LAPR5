import { Observable } from "rxjs";
import TransportTaskDTO from "../dto/TransportTaskDTO";
import SurveillanceTaskDTO from "../dto/SurveillanceTaskDTO";
import {EndPointConfiguration} from "../Constants/EndPointConfiguration";


export interface ITaskService {

  createTransportTask(transportTaskDTO: TransportTaskDTO): Observable<any>;
  createSurvaillenceTask(transportTaskDTO: SurveillanceTaskDTO): Observable<any>;
  createSurvaillenceTask(survaillenceTaskDTO: SurveillanceTaskDTO): Observable<any>;
  getSubmitedTasks(): Observable<any> ;
  approvedOrRejectTask(nameTask: string, approvedOrReject: string): Observable<any>;
}
