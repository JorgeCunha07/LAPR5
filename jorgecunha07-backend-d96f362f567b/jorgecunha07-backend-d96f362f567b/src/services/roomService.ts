import { Service, Inject } from 'typedi';
import config from '../../config';
import IRoomDTO from '../dto/IRoomDTO';
import { Room } from '../domain/room/Room';
import IRoomRepo from '../repos/IRepos/IRoomRepo';
import IRoomService from './IServices/IRoomService';
import { Result } from '../core/logic/Result';
import { RoomMap } from '../mappers/RoomMap';
import IFloorService from './IServices/IFloorService';

@Service()
export default class RoomService implements IRoomService {
  constructor(
    @Inject(config.repos.room.name) private roomRepo: IRoomRepo,
    @Inject(config.services.floor.name) private iFloorService: IFloorService,
  ) {}

  public async getAllRooms(): Promise<Result<Array<IRoomDTO>>> {
    const rooms = await this.roomRepo.getAllRooms();
    const IRoomDTO = rooms.getValue().map(room => RoomMap.toDTO(room));
    return Result.ok(IRoomDTO);
  }

  public async getRoom(roomId: string): Promise<Result<IRoomDTO>> {
    try {
      const room = await this.roomRepo.findByDomainId(roomId);

      if (room === null) {
        return Result.fail<IRoomDTO>('Room not found');
      } else {
        const roomDTOResult = RoomMap.toDTO(room) as IRoomDTO;
        return Result.ok<IRoomDTO>(roomDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async createRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>> {
    try {
      const roomOrError = await Room.create(roomDTO);

      if (roomOrError.isFailure) {
        return Result.fail<IRoomDTO>(roomOrError.errorValue());
      }

      const floor = await this.iFloorService.findFloorByBuildingCodeFloorNumber(
        roomDTO.buildingFinderId,
        roomDTO.floorNumber,
      );

      if (floor == null) {
        throw new Error('Could not find floor ');
      }

      if (roomOrError.getValue().location.x < 0  ) {
        throw new Error('Location x cannot be negative');
      }

      if (roomOrError.getValue().location.y < 0  ) {
        throw new Error('Location y cannot be negative');
      }

      if (roomOrError.getValue().location.x > floor.props.floorMaxDimensions.width  ) {
        throw new Error('Location x cannot be superior to floor');
      }
      if (roomOrError.getValue().location.y > floor.props.floorMaxDimensions.length  ) {
        throw new Error('Location y cannot be superior to floor');
      }

      const roomResult = roomOrError.getValue();
      await this.roomRepo.save(roomResult);

      const roomDTOResult = RoomMap.toDTO(roomResult) as IRoomDTO;
      return Result.ok<IRoomDTO>(roomDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async updateRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>> {
    return null;
  }
}
