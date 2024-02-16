interface Location {
  Building: string;
  Room: number;
  X: number;
  Y: number;
}

export default interface TransportTaskDTO {
  Description: string;
  FromLocation: Location;
  ToLocation: Location;
  ContactStart: string;
  ContactEnd: string;
  User: string;
  RobotId: string;
  RobotType: string;
  name: string;
}
