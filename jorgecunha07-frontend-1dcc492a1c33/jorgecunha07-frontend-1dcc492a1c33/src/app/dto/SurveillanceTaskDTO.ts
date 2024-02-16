import {TaskStatusEnum} from "../Constants/TastStatusEnum";

interface LocationDto {
  Building: string;
  Room: number;
  X: number;
  Y: number;
}


export default interface SurveillanceTaskDTO {
  TaskState: TaskStatusEnum;
  Description: string;
  FromLocation: LocationDto;
  ToLocation: LocationDto;
  ContactInfo: string;
  User: string;
  RobotId: string;
  RobotType: string;
  name: string;
}
