import BuildingName from '../../../../src/domain/building/BuildingName';
import { expect } from 'chai';

describe('BuildingName', () => {
  describe('create', () => {
    it('should return a failure result when name is null or undefined', () => {
      const nullName = BuildingName.create(null as any);
      const undefinedName = BuildingName.create(undefined as any);

      expect(nullName.isFailure).to.be.true;
      expect(undefinedName.isFailure).to.be.true;
    });

    it('should return a failure result when name is invalid', () => {
      const invalidName = BuildingName.create('Invalid@Name');
      expect(invalidName.isFailure).to.be.true;
    });

    it('should return a success result when name is valid', () => {
      const validName = BuildingName.create('Valid Name 123');
      expect(validName.isSuccess).to.be.true;
    });
  });

  describe('validateName', () => {
    it('should return false when name contains special characters', () => {
      const isValid = (BuildingName as any).validateName('Invalid@Name');
      expect(isValid).to.be.false;
    });

    it('should return true when name is alphanumeric and spaces only, and 1 to 50 characters long', () => {
      const isValid = (BuildingName as any).validateName('Valid Name 123');
      expect(isValid).to.be.true;
    });

    it('should return false when name is empty', () => {
      const isValid = (BuildingName as any).validateName('');
      expect(isValid).to.be.false;
    });

    it('should return false when name is longer than 50 characters', () => {
      const longName = 'a'.repeat(51);
      const isValid = (BuildingName as any).validateName(longName);
      expect(isValid).to.be.false;
    });
  });
});
