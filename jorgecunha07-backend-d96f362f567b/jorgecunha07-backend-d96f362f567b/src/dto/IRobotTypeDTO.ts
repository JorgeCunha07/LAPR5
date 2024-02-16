export default interface IRobotTypeDTO {
  robotTypeName: string;
  description: string;
  robotBrand: string;
  robotModel: string;
  supportedTaskTypes?: string[];
}
