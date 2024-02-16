export interface IRoomPersistence {
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
