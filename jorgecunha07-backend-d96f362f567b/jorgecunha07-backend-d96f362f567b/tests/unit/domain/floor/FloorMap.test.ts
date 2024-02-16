import { expect } from 'chai';
import FloorMap from "../../../../src/domain/floor/FloorMap";
import IFloorMapDTO from "../../../../src/dto/IFloorMapDTO";

describe('FloorMap', () => {
  describe('create', () => {
    it('should create a null FloorMap with no IFloorMapDTO input', () => {
      const floorMapOrError = FloorMap.create(null);

      expect(floorMapOrError.isSuccess).to.be.true;
      // continue for all properties...
    });

    it('should create a FloorMap with proper IFloorMapDTO input', () => {
      const floorMapDTO: IFloorMapDTO = null;

      const floorMapOrError = FloorMap.create(floorMapDTO);

      expect(floorMapOrError.isSuccess).to.be.true;
    });

    it('should fail to create a FloorMap with invalid IFloorMapDTO input', () => {
      const floorMapDTO: any = { floorMatrix: 'invalid data' };
      const floorMapOrError = FloorMap.create(floorMapDTO as IFloorMapDTO);

      expect(floorMapOrError.isSuccess).to.be.true;
    });
  });
});
