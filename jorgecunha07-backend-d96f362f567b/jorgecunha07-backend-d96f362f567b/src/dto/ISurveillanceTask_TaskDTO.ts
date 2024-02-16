export default interface ISurveillanceTask_TaskDTO {
  taskState: string;
  description: string;
  typeTaskId: string;
  taskTypeEnum: string;
  targetBuilding: string;
  targetFloor: number;
  contactInfo: string;
}
