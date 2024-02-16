import { Mapper } from '../core/infra/Mapper';
import { Document, Model } from 'mongoose';
import { IPassagewayPersistence } from '../dataschema/IPassagewayPersistence';
import IPassagewayDTO from '../dto/IPassagewayDTO';
import { Passageway } from '../domain/passageway/passageway';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

export class PassagewayMap extends Mapper<Passageway> {
  public static toDTO(passageway: Passageway): IPassagewayDTO {
    return {
      buildingACode: passageway.buildingACode.value,
      buildingBCode: passageway.buildingBCode.value,
      floorA: passageway.floorA.value,
      floorB: passageway.floorB.value,
      locationA: {
        x: passageway.locationA.x,
        y: passageway.locationA.y,
      },
      locationB: {
        x: passageway.locationB.x,
        y: passageway.locationB.y,
      },
    };
  }

  public static toDomain(passageway: any | Model<IPassagewayPersistence & Document>): Passageway {
    const domainObj = {
      ...passageway._doc,
      locationA: {
        x: passageway.locationX_A,
        y: passageway.locationY_A,
      },
      locationB: {
        x: passageway.locationX_B,
        y: passageway.locationY_B,
      },
    };

    const passagewayOrError = Passageway.create(domainObj, new UniqueEntityID(passageway.domainId));

    if (passagewayOrError.isFailure) {
      console.log(passagewayOrError.error);
      return null;
    }

    return passagewayOrError.getValue();
  }

  public static toPersistence(passageway: Passageway): any {
    return {
      buildingACode: passageway.buildingACode.value,
      buildingBCode: passageway.buildingBCode.value,
      floorA: passageway.floorA.value,
      floorB: passageway.floorB.value,
      locationX_A: passageway.locationA.x,
      locationY_A: passageway.locationA.y,
      locationX_B: passageway.locationB.x,
      locationY_B: passageway.locationB.y,
    };
  }
}
