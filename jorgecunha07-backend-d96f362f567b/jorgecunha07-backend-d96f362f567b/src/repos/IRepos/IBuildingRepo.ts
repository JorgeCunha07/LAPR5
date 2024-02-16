import { Repo } from '../../core/infra/Repo';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Building } from '../../domain/building/Building';
import { Result } from '../../core/logic/Result';

export default interface IBuildingRepo extends Repo<Building> {
  save(building: Building): Promise<Building>;
  update(building: Building): Promise<Result<Building>>;
  findByCode(code: string): Promise<Building>;
  findByDomainId(buildingId: UniqueEntityID | string): Promise<Building>;
  getAllBuilding(): Promise<Result<Array<Building>>>;

  // Uncomment and modify the below methods if needed for buildings.
  // findByIds (buildingIds: UniqueEntityID[]): Promise<Building[]>;
  // saveCollection (buildings: Building[]): Promise<Building[]>;
  // removeByBuildingIds (buildings: UniqueEntityID[]): Promise<any>
}
