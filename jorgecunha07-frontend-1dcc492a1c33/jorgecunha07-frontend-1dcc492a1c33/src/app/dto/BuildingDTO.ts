export default interface BuildingDTO {
  buildingCode: string;
  buildingName: string;
  buildingDescription: string;
  buildingSize: {
    width: number;
    length: number;
  };
}
