import { Service, Inject } from 'typedi';
import { Document, FilterQuery, Model } from 'mongoose';
import { Result } from '../core/logic/Result';
import IPassagewayRepo from './IRepos/IPassagewayRepo';
import { Passageway } from '../domain/passageway/passageway';
import { PassagewayMap } from '../mappers/PassagewayMap';
import { IPassagewayPersistence } from '../dataschema/IPassagewayPersistence';
import IPassagewayDTO from '../dto/IPassagewayDTO';

@Service()
export default class PassagewayRepo implements IPassagewayRepo {
  constructor(@Inject('passagewaySchema') private passagewaySchema: Model<IPassagewayPersistence & Document>) {}

  exists(t: Passageway): Promise<boolean> {
    return Promise.resolve(false);
  }

  public async save(passageway: Passageway): Promise<Passageway> {
    const query = { domainId: passageway.id.toString() };
    const passagewayDocument = await this.passagewaySchema.findOne(query);

    try {
      if (passagewayDocument === null) {
        const rawPassageway: any = PassagewayMap.toPersistence(passageway);
        const passagewayCreated = await this.passagewaySchema.create(rawPassageway);
        return PassagewayMap.toDomain(passagewayCreated);
      } else {
        await passagewayDocument.save();
        return passageway;
      }
    } catch (err) {
      throw err;
    }
  }

  public async update(passageway: Passageway): Promise<Result<Passageway>> {
    console.log('Starting the update process...');

    const query = { domainId: passageway.id.toString() };
    const passagewayDocument = await this.passagewaySchema.findOne(
      query as FilterQuery<IPassagewayPersistence & Document>,
    );

    if (!passagewayDocument) {
      return Result.fail<Passageway>('Passageway not found.'); // If not found, fails
    }

    const rawPassageway = PassagewayMap.toPersistence(passageway);
    for (const prop in rawPassageway) {
      passagewayDocument[prop] = rawPassageway[prop];
    }

    try {
      await passagewayDocument.save();
      return Result.ok(PassagewayMap.toDomain(passagewayDocument)); // Returns updated document
    } catch (err) {
      console.error('Error occurred during update:', err);
      throw err;
    }
  }

  public async findByBuildingCodes(buildingACode: string, buildingBCode: string): Promise<Passageway | null> {
    const passagewayDocument = await this.passagewaySchema.findOne({
      buildingACode: buildingACode,
      buildingBCode: buildingBCode,
    });
    if (!passagewayDocument) return null;
    return PassagewayMap.toDomain(passagewayDocument);
  }

  public async findById(id: string): Promise<Passageway | null> {
    const passagewayDocument = await this.passagewaySchema.findOne({ domainId: id });
    if (!passagewayDocument) return null;

    return PassagewayMap.toDomain(passagewayDocument);
  }

  async getAllPassagewaysBetweenBuildings(
    buildingACode: string,
    buildingBCode: string,
  ): Promise<Result<Array<IPassagewayDTO>>> {
    const passageways = await this.passagewaySchema.find({
      buildingACode: buildingACode,
      buildingBCode: buildingBCode,
    });

    const domainPassageways = passageways
      .map(PassagewayMap.toDomain)
      .filter(passageway => passageway !== null) as Passageway[];
    return Result.ok(domainPassageways.map(PassagewayMap.toDTO));
  }

  public async getFloorsFromBuildingWithPassageway(buildingCode: string): Promise<Array<IPassagewayDTO>> {
    const passageways = await this.passagewaySchema.find({
      $or: [{ buildingACode: buildingCode }, { buildingBCode: buildingCode }],
    });

    const domainPassageways = passageways
      .map(PassagewayMap.toDomain)
      .filter(passageway => passageway !== null) as Passageway[];
    return domainPassageways.map(PassagewayMap.toDTO);
  }
}
