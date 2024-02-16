import {TaskStatusEnum} from "../Constants/TastStatusEnum";

enum TaskTypeEnum {
  TransportTask,
  SurveillanceTask
}

// LocationDto
interface LocationDto {
  building: string; // In TypeScript, properties are camelCase
  room: number;
  x: number;
  y: number;
}

// TaskDto
export interface Task_Full_Info_Model {
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
