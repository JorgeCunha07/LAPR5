import { AggregateRoot } from '../../core/domain/AggregateRoot';
import BuildingCode from './BuildingCode';
import BuildingName from './BuildingName';
import BuildingDescription from './BuildingDescription';
import { BuildingSize } from './BuildingSize';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import IBuildingDTO from '../../dto/IBuildingDTO';
import { Result } from '../../core/logic/Result';

interface IBuildingProps {
  buildingCode: BuildingCode;
  buildingName: BuildingName;
  buildingDescription: BuildingDescription;
  buildingSize: BuildingSize;
}

export class Building extends AggregateRoot<IBuildingProps> {
  private constructor(props: IBuildingProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(dto: IBuildingDTO, id?: UniqueEntityID): Result<Building> {
    if (!dto.buildingCode || dto.buildingCode.length === 0) {
      return Result.fail<Building>('Building code is required.');
    }

    if (!dto.buildingName || dto.buildingName.length === 0) {
      return Result.fail<Building>('Building name is required.');
    }

    if (!dto.buildingDescription || dto.buildingDescription.length === 0) {
      return Result.fail<Building>('Building description is required.');
    }

    if (
      !dto.buildingSize ||
      typeof dto.buildingSize.width !== 'number' ||
      typeof dto.buildingSize.length !== 'number'
    ) {
      return Result.fail<Building>('Building size with valid width and length is required.');
    }

    const buildingSizeResult = BuildingSize.create(dto.buildingSize.width, dto.buildingSize.length);

    if (buildingSizeResult.isFailure) {
      return Result.fail<Building>(buildingSizeResult.errorValue());
    }

    const buildingProps: IBuildingProps = {
      buildingCode: BuildingCode.create(dto.buildingCode).getValue(),
      buildingName: BuildingName.create(dto.buildingName).getValue(),
      buildingDescription: BuildingDescription.create(dto.buildingDescription).getValue(),
      buildingSize: BuildingSize.create(dto.buildingSize.width, dto.buildingSize.length).getValue(),
    };

    return Result.ok<Building>(new Building(buildingProps, id));
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get buildingCode(): BuildingCode {
    return this.props.buildingCode;
  }

  get buildingName(): BuildingName {
    return this.props.buildingName;
  }

  get buildingDescription(): BuildingDescription {
    return this.props.buildingDescription;
  }

  get buildingSize(): BuildingSize {
    return this.props.buildingSize;
  }
}
