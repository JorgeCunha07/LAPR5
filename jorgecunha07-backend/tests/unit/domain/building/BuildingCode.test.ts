import BuildingCode from '../../../../src/domain/building/BuildingCode';
import { expect } from 'chai';

describe('BuildingCode', () => {
  it('should return a failure result when code is invalid', () => {
    const invalidCode = BuildingCode.create('Invalid@Code');
    expect(invalidCode.isFailure).to.be.true;
  });

  describe('validateCode', () => {
    it('should return false when code contains special characters', () => {
      const isValid = (BuildingCode as any).validateCode('Invalid@Code');
      expect(isValid).to.be.false;
    });

    it('should return true when code is alphanumeric and spaces only, and 1 to 5 characters long', () => {
      const isValid = (BuildingCode as any).validateCode('V123 ');
      expect(isValid).to.be.true;
    });

    it('should return false when code is empty', () => {
      const isValid = (BuildingCode as any).validateCode('');
      expect(isValid).to.be.false;
    });

    it('should return false when code is longer than 5 characters', () => {
      const longCode = 'abcdef';
      const isValid = (BuildingCode as any).validateCode(longCode);
      expect(isValid).to.be.false;
    });
  });
});
