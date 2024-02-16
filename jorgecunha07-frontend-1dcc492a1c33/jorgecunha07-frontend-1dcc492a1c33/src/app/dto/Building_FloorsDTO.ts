export default interface Building_FloorsDTO {
  buildingCode: string;
  buildingName: string;
  buildingDescription: string;
  floorsNumber: number;
  buildingSize: {
    width: number;
    length: number;
  };
}
