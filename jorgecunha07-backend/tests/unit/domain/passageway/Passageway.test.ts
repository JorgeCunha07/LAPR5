import { expect } from 'chai';
import IPassagewayDTO from '../../../../src/dto/IPassagewayDTO';
import { Passageway } from '../../../../src/domain/passageway/passageway';

describe('Passageway', () => {
  let dto: IPassagewayDTO;

  beforeEach(() => {
    dto = {
      buildingACode: 'A',
      buildingBCode: 'B',
      floorA: 1,
      floorB: 2,
      locationA: { x: 10, y: 20 },
      locationB: { x: 30, y: 40 },
    };
  });

  describe('create', () => {
    it('should return a Result with a Passageway object when given valid data', () => {
      const passagewayResult = Passageway.create(dto);
      expect(passagewayResult.isSuccess).to.be.true;
      const passageway = passagewayResult.getValue();
      expect(passageway).to.be.instanceOf(Passageway);
      expect(passageway.buildingACode.props.code).to.equal(dto.buildingACode);
      expect(passageway.buildingBCode.props.code).to.equal(dto.buildingBCode);
      expect(passageway.floorA.value).to.equal(dto.floorA);
      expect(passageway.floorB.value).to.equal(dto.floorB);
      expect(passageway.locationA.x).to.equal(dto.locationA.x);
      expect(passageway.locationA.y).to.equal(dto.locationA.y);
      expect(passageway.locationB.x).to.equal(dto.locationB.x);
      expect(passageway.locationB.y).to.equal(dto.locationB.y);
    });

    // Additional test cases for invalid data...
  });

  describe('updateBuildingACode', () => {
    // ... Test cases for updateBuildingACode method
  });

  // Other methods testing
  describe('updateBuildingBCode', () => {
    // ... Test cases for updateBuildingBCode method
  });
});
