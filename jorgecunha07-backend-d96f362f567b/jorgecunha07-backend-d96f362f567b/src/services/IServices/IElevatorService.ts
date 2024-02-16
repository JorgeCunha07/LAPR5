import { Result } from '../../core/logic/Result';
import IElevatorDTO from '../../dto/IElevatorDTO';

export default interface IElevatorService {
  createElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>>;
  updateElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>>;
  getAllElevators(): Promise<Result<Array<IElevatorDTO>>>;
  getElevator(elevatorId: string): Promise<Result<IElevatorDTO>>;
  getElevatorsByBuilding(buildingId: string): Promise<Array<IElevatorDTO>>;
}
