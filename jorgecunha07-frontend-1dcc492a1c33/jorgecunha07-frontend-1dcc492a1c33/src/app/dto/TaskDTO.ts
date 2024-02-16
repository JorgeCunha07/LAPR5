import {TaskStatusEnum} from "../Constants/TastStatusEnum";
import {TaskTypeEnum} from "../Constants/TaskTypeEnum";

export interface TaskDTO {
  id: number;
  taskStatus: TaskStatusEnum;
  description?: string;
  taskType: TaskTypeEnum;
  user: string;
  robotId: string;
  robotType: string;
  name: string;
}
