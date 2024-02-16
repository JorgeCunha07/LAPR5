export default interface ElevatorDTO {
  buildingFinderId: string;
  floors: string[];
  location: {
    x: number;
    y: number;
  } | undefined;
}
