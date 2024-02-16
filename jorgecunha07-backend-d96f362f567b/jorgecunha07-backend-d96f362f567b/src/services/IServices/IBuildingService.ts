


import { Result } from '../../core/logic/Result';
import IBuildingDTO from '../../dto/IBuildingDTO';
import { Building } from '../../domain/building/Building';
import IBuilding_FloorsDTO from '../../dto/IBuilding_FloorsDTO';

export default interface IBuildingService {
  createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;
  updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;
  getAllBuilding(): Promise<Result<Array<IBuildingDTO>>>;
  getBuilding(buildingId: string): Promise<Result<IBuildingDTO>>;
  findByCode(buildingId: string): Promise<Building>;
  getFloorsByParameters(param1: string, param2: string): Promise<Result<IBuilding_FloorsDTO[]>>;
}






