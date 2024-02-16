export default interface IPassagewayDTO {
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
