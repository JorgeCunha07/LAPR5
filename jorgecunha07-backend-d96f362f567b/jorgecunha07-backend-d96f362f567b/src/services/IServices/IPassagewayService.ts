import { Result } from '../../core/logic/Result';
import IPassagewayDTO from '../../dto/IPassagewayDTO';
import { Floor } from '../../domain/floor/Floor';

export default interface IPassagewayService {
  createPassageway(passagewayDTO: IPassagewayDTO): Promise<Result<IPassagewayDTO>>;
  updatePassageway(passagewayDTO: IPassagewayDTO): Promise<Result<IPassagewayDTO>>;
  getAllPassagewaysBetweenBuildings(
    buildingACode: string,
    buildingBCode: string,
  ): Promise<Result<Array<IPassagewayDTO>>>;
  getFloorsFromBuildingWithPassageway(buildingCode: string): Promise<Result<Array<IPassagewayDTO>>>;
  findFloor(buildingCode: string, piso: number): Promise<Floor>;
}
