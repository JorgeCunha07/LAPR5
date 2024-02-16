import { Service, Inject } from 'typedi';
import IRobotTypeRepo from './IRepos/IRobotTypeRepo';
import { Document, FilterQuery, Model } from 'mongoose';
import RobotType from '../domain/robotType/robotType';
import { IRobotTypePersistence } from '../dataschema/IRobotTypePersistence';
import { RobotTypeMap } from '../mappers/RobotTypeMap';

@Service()
export default class RobotTypeRepo implements IRobotTypeRepo {
  constructor(@Inject('robotTypeSchema') private robotTypeSchema: Model<IRobotTypePersistence>) {}

  public async exists(robotType: RobotType): Promise<boolean> {
    const id = robotType.id.toString();
    const query = { domainId: id };
    const robotTypeDocument = await this.robotTypeSchema.findOne(query as FilterQuery<IRobotTypePersistence>);
    return !!robotTypeDocument === true;
  }

  public async save(robotType: RobotType): Promise<RobotType> {
    const query = { domainId: robotType.id.toString() };
    const robotTypeDocument = await this.robotTypeSchema.findOne(query);

    try {
      if (robotTypeDocument === null) {
        const rawRobotType: IRobotTypePersistence = RobotTypeMap.toPersistence(robotType);
        const robotTypeCreated = await this.robotTypeSchema.create(rawRobotType);
        return RobotTypeMap.toDomain(robotTypeCreated);
      } else {
        robotTypeDocument.robotTypeName = robotType.robotTypeName.value;
        robotTypeDocument.description = robotType.description;
        robotTypeDocument.robotBrand = robotType.robotBrand.value;
        robotTypeDocument.robotModel = robotType.robotModel.value;
        robotTypeDocument.supportedTaskTypes = robotType.supportedTaskTypes;
        await robotTypeDocument.save();
        return robotType;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findRobotTypeByName(robotTypeName: string): Promise<RobotType> {
    const query = {
      robotTypeName: robotTypeName,
    };
    const robotTypeRecord = await this.robotTypeSchema.findOne(query as FilterQuery<IRobotTypePersistence & Document>);
    return robotTypeRecord ? RobotTypeMap.toDomain(robotTypeRecord) : null;
  }

  public async findRobotTypeByModel(robotModel: string): Promise<RobotType> {
    const query = {
      robotModel: robotModel,
    };
    const robotTypeRecord = await this.robotTypeSchema.findOne(query as FilterQuery<IRobotTypePersistence & Document>);
    return robotTypeRecord ? RobotTypeMap.toDomain(robotTypeRecord) : null;
  }
}
