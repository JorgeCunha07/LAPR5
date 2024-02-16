export default interface IRoomDTO {
  name: string;
  type: string;
  description: string;
  buildingFinderId: string;
  floorNumber: number;
  location: {
    x: number;
    y: number;
  };
}
