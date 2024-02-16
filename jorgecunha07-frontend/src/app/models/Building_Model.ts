export default interface Building_Model {
  buildingCode: string;
  buildingName: string;
  buildingDescription: string;
  buildingSize: {
    width: number;
    length: number;
  };
}
