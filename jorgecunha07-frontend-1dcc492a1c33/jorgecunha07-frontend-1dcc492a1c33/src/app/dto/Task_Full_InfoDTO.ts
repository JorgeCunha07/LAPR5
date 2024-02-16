import {TaskStatusEnum} from "../Constants/TastStatusEnum";


enum TaskTypeEnum {
  TransportTask, // 0
  SurveillanceTask // 1
}

interface LocationDto {
  id?: number; // Add if server expects it
  building: string;
  room: number;
  x: number;
  y: number;
}

export interface Task_Full_InfoDTO {
  id?: number; // Add if server expects it
  taskStatus: TaskStatusEnum;
  description: string;
  taskType: TaskTypeEnum;
  user: string;
  robotId: string | null;
  robotType: string | null;
  name: string;
  fromLocation: LocationDto;
  toLocation: LocationDto;
}
