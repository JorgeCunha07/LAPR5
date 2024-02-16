import { Result } from '../../core/logic/Result';
import IFloorDTO from '../../dto/IFloorDTO';
import { Floor } from '../../domain/floor/Floor';
import IFloorMapDTO from '../../dto/IFloorMapDTO';
import {NextFunction, Response} from "express";

export default interface IFloorService {
  createFloor(floorDTO: IFloorDTO, res: Response, next: NextFunction): Promise<Result<IFloorDTO>>;
  updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
  updateFloorMap(buildingFinderId: string, number: number, floorMap: IFloorMapDTO): Promise<Result<IFloorDTO>>;
  getAllFloor(): Promise<Result<Array<IFloorDTO>>>;
  findFloorsByBuilding(buildingCode: string): Promise<number>;
  getFloorsByBuildingFinderId(param1: string): Promise<Array<IFloorDTO>>;
  findFloorByBuildingCodeFloorNumber(buildingCode: string, floorNumber: number): Promise<Floor>;
}
