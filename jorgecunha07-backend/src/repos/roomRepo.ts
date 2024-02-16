import { Service, Inject } from 'typedi';
import IRoomRepo from './IRepos/IRoomRepo';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { RoomMap } from '../mappers/RoomMap'; // Ensure you have a mapper for Room
import { Document, FilterQuery, Model } from 'mongoose';
import { IRoomPersistence } from '../dataschema/IRoomPersistence'; // Ensure you have a persistence schema for Room
import { Result } from '../core/logic/Result';
import { Room } from '../domain/room/Room'; // Adjust the path if necessary

@Service()
export default class RoomRepo implements IRoomRepo {
  private models: any;

  constructor(@Inject('roomSchema') private roomSchema: Model<IRoomPersistence & Document>) {}

  public async findByName(name: string): Promise<Room> {
    try {
      const query = { name: name };
      const roomRecord = await this.roomSchema.findOne(query as FilterQuery<IRoomPersistence & Document>);
      if (roomRecord != null) {
        return RoomMap.toDomain(roomRecord);
      }
      return null;
    } catch (error) {
      console.error(`Error occurred while finding Room by name: ${error}`);
      throw error;
    }
  }

  public async exists(room: Room): Promise<boolean> {
    const idX = room.id instanceof UniqueEntityID ? room.id.toValue() : room.id;
    const query = { domainId: idX };
    const roomDocument = await this.roomSchema.findOne(query as FilterQuery<IRoomPersistence & Document>);
    return !!roomDocument === true;
  }

  public async save(room: Room): Promise<Room> {
    const query = { domainId: room.id.toString() };
    const roomDocument = await this.roomSchema.findOne(query);

    try {
      if (roomDocument === null) {
        const rawRoom: any = RoomMap.toPersistence(room);
        const roomCreated = await this.roomSchema.create(rawRoom);
        return RoomMap.toDomain(roomCreated);
      } else {
        roomDocument.name = room.props.name.value;
        roomDocument.type = room.props.type;
        roomDocument.description = room.props.description.value;
        await roomDocument.save();
        return room;
      }
    } catch (err) {
      throw err;
    }
  }

  public async getAllRooms(): Promise<Result<Room[]>> {
    const list = new Array<Room>();
    (await this.roomSchema.find({})).forEach(room => list.push(RoomMap.toDomain(room)));

    if (list != null) {
      return Result.ok(list);
    } else {
      return null;
    }
  }

  public async findByDomainId(roomId: UniqueEntityID | string): Promise<Room> {
    const query = { domainId: roomId };
    const roomRecord = await this.roomSchema.findOne(query as FilterQuery<IRoomPersistence & Document>);
    if (roomRecord != null) {
      return RoomMap.toDomain(roomRecord);
    } else return null;
  }

  public async update(room: Room): Promise<Result<Room>> {
    const query = { domainId: room.id.toString() };
    const roomDocument = await this.roomSchema.findOne(query as FilterQuery<IRoomPersistence & Document>);

    if (!roomDocument) {
      const rawRoom = RoomMap.toPersistence(room);
      const roomCreated = await this.roomSchema.create(rawRoom);
      return Result.ok(RoomMap.toDomain(roomCreated));
    }

    roomDocument.name = room.props.name.value;
    roomDocument.type = room.props.type;
    roomDocument.description = room.props.description.value;

    try {
      await roomDocument.save();
      return Result.ok(room);
    } catch (err) {
      console.error('Error occurred during update:', err);
      throw err;
    }
  }
}
