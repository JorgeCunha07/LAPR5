export default interface IBuildingDTO {
  buildingCode: string;
  buildingName: string;
  buildingDescription: string;
  buildingSize: {
    width: number;
    length: number;
  };
}
