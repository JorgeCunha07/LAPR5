export interface ITransportTaskPersistence {
  domainId: string;
  pickupRoom: string;
  deliveryRoom: string;
  contactStart: string;
  contactEnd: string;
  confirmationCode: string;
  transportTaskDescription: string;
}
