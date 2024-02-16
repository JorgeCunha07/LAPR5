export default interface RoomDTO {
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
