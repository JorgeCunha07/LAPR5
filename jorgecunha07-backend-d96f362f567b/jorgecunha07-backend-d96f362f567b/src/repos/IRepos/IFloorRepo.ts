import { Repo } from '../../core/infra/Repo';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Result } from '../../core/logic/Result';
import { Floor } from '../../domain/floor/Floor';
import IFloorDTO from "../../dto/IFloorDTO";

export default interface IFloorRepo extends Repo<Floor> {
  save(floor: Floor): Promise<Floor>;
  update(floor: Floor): Promise<Result<Floor>>;
  findByDomainId(floorId: UniqueEntityID | string): Promise<Floor>;
  getAllFloor(): Promise<Result<Array<Floor>>>;
  findFloorByBuildingCodeFloorNumber(buildingCode: string, floorNumber: number): Promise<Floor>;
  findFloorsByBuilding(buildingCode: string): Promise<number>;
  findFloorsObjectByBuilding(buildingCode: string): Promise<Array<IFloorDTO>>;
}
