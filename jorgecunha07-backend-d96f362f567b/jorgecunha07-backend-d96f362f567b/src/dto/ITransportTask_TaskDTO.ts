export default interface ITransportTask_TaskDTO {
  taskState: string;
  description: string;
  typeTaskId: string;
  taskTypeEnum: string;
  pickupRoom: string;
  deliveryRoom: string;
  contactStart: string;
  contactEnd: string;
  confirmationCode: string;
  transportTaskDescription: string;
}
