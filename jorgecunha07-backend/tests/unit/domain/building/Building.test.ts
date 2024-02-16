import { Building } from '../../../../src/domain/building/Building';
import IBuildingDTO from '../../../../src/dto/IBuildingDTO';
import { expect } from 'chai';

describe('Building', () => {
  describe('create', () => {
    it('should return a success result when all fields are valid', () => {
      const validDto: IBuildingDTO = {
        buildingCode: 'BC123',
        buildingName: 'Test Building',
        buildingDescription: 'A test building',
        buildingSize: {
          width: 10,
          length: 20,
        },
      };

      const buildingResult = Building.create(validDto);
      expect(buildingResult.isSuccess).to.be.true;
    });
  });

  describe('getters', () => {
    it('should return the correct values', () => {
      const validDto: IBuildingDTO = {
        buildingCode: 'BC123',
        buildingName: 'Test Building',
        buildingDescription: 'A test building',
        buildingSize: {
          width: 10,
          length: 20,
        },
      };

      const buildingResult = Building.create(validDto);
      if (buildingResult.isFailure) {
        throw new Error('Test setup failed: could not create Building');
      }
      const building = buildingResult.getValue();

      expect(building.buildingCode.value).to.equal('BC123');
      expect(building.buildingName.value).to.equal('Test Building');
      expect(building.buildingDescription.value).to.equal('A test building');
      expect(building.buildingSize.width).to.equal(10);
      expect(building.buildingSize.length).to.equal(20);
    });
  });
});
