import { Repo } from '../../core/infra/Repo';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Elevator } from '../../domain/elevator/Elevator';
import { Result } from '../../core/logic/Result';
import IElevatorDTO from '../../dto/IElevatorDTO';

export default interface IElevatorRepo extends Repo<Elevator> {
  save(elevator: Elevator): Promise<Elevator>;
  update(elevator: Elevator): Promise<Result<Elevator>>;
  findByCode(code: string): Promise<Elevator>;
  findByDomainId(elevatorId: UniqueEntityID | string): Promise<Elevator>;
  getAllElevators(): Promise<Result<Array<Elevator>>>;
  findElevatorsByBuilding(buildingCode: string): Promise<number>;
  findElevatorsObjectByBuilding(buildingCode: string): Promise<IElevatorDTO[]>;
}
