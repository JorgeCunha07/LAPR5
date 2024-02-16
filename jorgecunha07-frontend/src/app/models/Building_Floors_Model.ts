export default interface Building_Floors_Model {
  buildingCode: string;
  buildingName: string;
  buildingDescription: string;
  floorsNumber: number;
  buildingSize: {
    width: number;
    length: number;
  };
}
