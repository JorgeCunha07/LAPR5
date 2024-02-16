export default interface Elevator_Model {
  buildingFinderId: string;
  floors: string[];
  location: {
    x: number;
    y: number;
  } | undefined;
}
