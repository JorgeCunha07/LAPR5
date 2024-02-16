export default interface Passageway_Model {
  buildingACode: string;
  buildingBCode: string;
  floorA: number;
  floorB: number;
  locationA: {
    x: number;
    y: number;
  };
  locationB: {
    x: number;
    y: number;
  };
}
