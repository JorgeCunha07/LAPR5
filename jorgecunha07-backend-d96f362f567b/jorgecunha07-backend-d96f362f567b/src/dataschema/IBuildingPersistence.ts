export interface IBuildingPersistence {
  buildingCode: string;
  buildingName: string;
  buildingDescription: string;
  buildingSize: {
    width: number;
    length: number;
  };
}
