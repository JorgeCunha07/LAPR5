import IFloorDTO from '../../../../src/dto/IFloorDTO';
import { Result } from '../../../../src/core/logic/Result';
import { Floor } from '../../../../src/domain/floor/Floor';
import { expect } from 'chai';

describe('Floor Aggregate Root', () => {
  describe('create', () => {
    it('should create a Floor instance successfully', () => {
      // Assuming that floorMap is an object with required properties
      const floorDto: IFloorDTO = {
        buildingFinderId: '1',
        floorNumber: 2,
        floorDescription: 'Second floor',
        floorMap: null,
        floorMaxDimensions: { width: 2, length: 2 },
      };
      const floorOrError: Result<Floor> = Floor.create(floorDto);

      expect(floorOrError.isSuccess).to.be.true;
      const floor = floorOrError.getValue();
      expect(floor.buildingFinderId).to.equal('1');
      expect(floor.floorNumber.value).to.equal(2);
      expect(floor.floorDescription.value).to.equal('Second floor');
      expect(floor.floorMaxDimensions.width).to.equal(2);
      expect(floor.floorMaxDimensions.length).to.equal(2);
    });
  });
});
