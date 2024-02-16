import { BuildingSize } from '../../../../src/domain/building/BuildingSize';
import { expect } from 'chai';

describe('BuildingSize', () => {
  describe('create', () => {
    it('should return a failure result when width or length are non-positive', () => {
      const nonPositiveWidth = BuildingSize.create(-1, 10);
      const nonPositiveLength = BuildingSize.create(10, 0);

      expect(nonPositiveWidth.isFailure).to.be.true;
      expect(nonPositiveLength.isFailure).to.be.true;
    });

    it('should return a success result when width and length are positive', () => {
      const validBuildingSize = BuildingSize.create(10, 20);
      expect(validBuildingSize.isSuccess).to.be.true;
    });
  });

  describe('width and length getters and setters', () => {
    it('should throw an error when setting non-positive width or length', () => {
      const buildingSizeResult = BuildingSize.create(10, 20);
      if (buildingSizeResult.isFailure) {
        throw new Error('Test setup failed: could not create BuildingSize');
      }
      const buildingSize = buildingSizeResult.getValue();

      expect(() => {
        buildingSize.width = -1;
      }).to.throw('Width should be a positive value');
      expect(() => {
        buildingSize.length = 0;
      }).to.throw('Length should be a positive value');
    });
  });
});
