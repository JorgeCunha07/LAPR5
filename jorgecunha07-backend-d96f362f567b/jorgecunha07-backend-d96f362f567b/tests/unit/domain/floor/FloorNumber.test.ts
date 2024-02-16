import { Result } from '../../../../src/core/logic/Result';
import FloorNumber from '../../../../src/domain/floor/FloorNumber';
import { expect } from 'chai';

describe('FloorNumber Value Object', () => {
  describe('create', () => {
    it('should return Result.ok<FloorNumber> when provided a valid floornumber', () => {
      const floorNumberOrError: Result<FloorNumber> = FloorNumber.create(5);

      expect(floorNumberOrError.getValue().value).to.equal(5);
    });

    it('should return Result.fail<FloorNumber> when provided a null floornumber', () => {
      const floorNumberOrError: Result<FloorNumber> = FloorNumber.create(null);

      expect(floorNumberOrError.isFailure).to.be.true;
      expect(floorNumberOrError.error).to.equal('floorNumber should not be null, undefined or empty.');
    });

    it('should return Result.fail<FloorNumber> when provided an undefined floornumber', () => {
      const floorNumberOrError: Result<FloorNumber> = FloorNumber.create(undefined);

      expect(floorNumberOrError.isFailure).to.be.true;
      expect(floorNumberOrError.error).to.equal('floorNumber should not be null, undefined or empty.');
    });
  });

  describe('value', () => {
    it('should return the correct floornumber', () => {
      const floorNumber = FloorNumber.create(10);

      // Assuming that the creation will succeed for this test
      expect(floorNumber.isSuccess).to.be.true;
      expect(floorNumber.getValue().value).to.equal(10);
    });
  });
});
