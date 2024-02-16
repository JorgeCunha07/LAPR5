export default interface RobotTypeDTO {  
  robotTypeName: string;
  robotBrand: string;
  robotModel: string;
  supportedTaskTypes?: string[] | null;
}