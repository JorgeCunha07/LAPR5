export interface IElevatorPersistence {
  domainId: string;
  buildingFinderId: string;
  floors: string[];
  location: {
    x: number;
    y: number;
  };
}
