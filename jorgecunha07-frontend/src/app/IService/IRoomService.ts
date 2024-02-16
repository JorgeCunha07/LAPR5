import { Observable } from "rxjs";
import RoomDTO from "../dto/RoomDTO";


export interface IRoomService {
  createRoom(roomDTO: RoomDTO): Observable<RoomDTO>;
}
