import { Repo } from '../../core/infra/Repo';
import { Result } from '../../core/logic/Result';
import { Passageway } from '../../domain/passageway/passageway';
import IPassagewayDTO from '../../dto/IPassagewayDTO';

export default interface IPassagewayRepo extends Repo<Passageway> {
  save(passageway: Passageway): Promise<Passageway>;
  update(passageway: Passageway): Promise<Result<Passageway>>;
  findById(id: string): Promise<Passageway | null>;
  findByBuildingCodes(buildingACode: string, buildingBCode: string): Promise<Passageway | null>;
  getAllPassagewaysBetweenBuildings(
    buildingACode: string,
    buildingBCode: string,
  ): Promise<Result<Array<IPassagewayDTO>>>;
  getFloorsFromBuildingWithPassageway(buildingCode: string): Promise<Array<IPassagewayDTO>>;
}
