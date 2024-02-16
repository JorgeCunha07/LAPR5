import { FloorMaxDimensions } from '../../../../src/domain/floor/FloorMaxDimensions';
import { Result } from '../../../../src/core/logic/Result';
import { expect, assert } from 'chai';

describe('FloorMaxDimensions Value Object', () => {
  describe('create', () => {
    it('should return Result.ok<FloorMaxDimensions> when provided valid width and length', () => {
      const dimensionsOrError: Result<FloorMaxDimensions> = FloorMaxDimensions.create(10, 20);

      expect(dimensionsOrError.isFailure).to.be.false;
      expect(dimensionsOrError.isSuccess).to.be.true;
      expect(dimensionsOrError.getValue().width).to.equal(10);
      expect(dimensionsOrError.getValue().length).to.equal(20);
    });

    it('should return Result.fail<FloorMaxDimensions> when provided negative width', () => {
      const dimensionsOrError: Result<FloorMaxDimensions> = FloorMaxDimensions.create(-10, 20);

      expect(dimensionsOrError.isFailure).to.be.true;
      expect(dimensionsOrError.error).to.equal('Width and Length should be positive values.');
    });

    it('should return Result.fail<FloorMaxDimensions> when provided negative length', () => {
      const dimensionsOrError: Result<FloorMaxDimensions> = FloorMaxDimensions.create(10, -20);

      expect(dimensionsOrError.isFailure).to.be.true;
      expect(dimensionsOrError.error).to.equal('Width and Length should be positive values.');
    });
  });

  it('should throw error when updating width with non-positive value', () => {
    const dimensionsOrError: Result<FloorMaxDimensions> = FloorMaxDimensions.create(10, 20);

    // Assuming the creation will succeed for this test
    expect(dimensionsOrError.isSuccess).to.be.true;
    const dimensions = dimensionsOrError.getValue();

    assert.throws(() => {
      dimensions.width = -5;
    }, 'Width should be a positive value');
  });
});
