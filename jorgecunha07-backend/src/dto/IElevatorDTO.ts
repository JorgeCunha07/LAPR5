export default interface IElevatorDTO {
  buildingFinderId: string;
  floors: string[];
  location: {
    x: number;
    y: number;
  };
}
