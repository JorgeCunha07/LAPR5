import { Repo } from '../../core/infra/Repo';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Room } from '../../domain/room/Room'; // Please adjust the path if it's different
import { Result } from '../../core/logic/Result';

export default interface IRoomRepo extends Repo<Room> {
  save(room: Room): Promise<Room>;
  update(room: Room): Promise<Result<Room>>;
  findByDomainId(roomId: UniqueEntityID | string): Promise<Room>;
  getAllRooms(): Promise<Result<Array<Room>>>;
}
