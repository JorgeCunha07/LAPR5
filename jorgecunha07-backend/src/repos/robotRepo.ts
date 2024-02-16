import { Service, Inject } from 'typedi';
import IRobotRepo from './IRepos/IRobotRepo';
import { FilterQuery, Model } from 'mongoose';
import Robot from '../domain/robot/robot';
import { IRobotPersistence } from '../dataschema/IRobotPersistence';
import { RobotMap } from '../mappers/RobotMap';

@Service()
export default class RobotRepo implements IRobotRepo {
  constructor(@Inject('robotSchema') private robotSchema: Model<IRobotPersistence>) {}

  public async exists(robot: Robot): Promise<boolean> {
    const id = robot.id.toString();
    const query = { domainId: id };
    const robotDocument = await this.robotSchema.findOne(query as FilterQuery<IRobotPersistence>);
    return !!robotDocument === true;
  }

  public async save(robot: Robot): Promise<Robot> {
    const query = { domainId: robot.id.toString() };
    const robotDocument = await this.robotSchema.findOne(query);

    try {
      if (robotDocument === null) {
        const rawRobot: IRobotPersistence = RobotMap.toPersistence(robot);
        const robotCreated = await this.robotSchema.create(rawRobot);
        return RobotMap.toDomain(robotCreated);
      } else {
        robotDocument.robotCode = robot.robotCode.value;
        robotDocument.robotDescription = robot.robotDescription.value;
        robotDocument.robotNickname = robot.robotNickname.value;
        robotDocument.robotSerialNumber = robot.robotSerialNumber.value;
        robotDocument.robotTypeName = robot.robotTypeName;
        robotDocument.enabled = robot.isEnabled;
        await robotDocument.save();
        return robot;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByRobotCode(robotCode: string): Promise<Robot> {
    const query = { robotCode: robotCode };
    const robotDocument = await this.robotSchema.findOne(query as FilterQuery<IRobotPersistence>);
    return robotDocument != null ? RobotMap.toDomain(robotDocument) : null;
  }

  public async findByNickname(nickname: string): Promise<Robot> {
    const query = { robotNickname: nickname };
    const robotDocument = await this.robotSchema.findOne(query as FilterQuery<IRobotPersistence>);
    return robotDocument != null ? RobotMap.toDomain(robotDocument) : null;
  }

  public async findBySerialNumberAndType(robotSerialNumber: string, robotTypeName: string): Promise<Robot> {
    const query = { robotSerialNumber: robotSerialNumber, robotTypeName: robotTypeName };
    const robotDocument = await this.robotSchema.findOne(query as FilterQuery<IRobotPersistence>);
    return robotDocument != null ? RobotMap.toDomain(robotDocument) : null;
  }

  public async getAllRobots(): Promise<Robot[]> {
    const robotDocuments = await this.robotSchema.find();
    return robotDocuments.map(robotDocument => RobotMap.toDomain(robotDocument));
  }

  public async getEnabledRobots(): Promise<Robot[]> {
    const query = { enabled: true };
    const robotDocument = await this.robotSchema.find(query as FilterQuery<IRobotPersistence>);
    return robotDocument.map(robotDocument => RobotMap.toDomain(robotDocument));
  }
}
