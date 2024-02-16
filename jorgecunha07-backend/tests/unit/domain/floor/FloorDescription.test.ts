import FloorDescription from '../../../../src/domain/floor/FloorDescription';
import { Result } from '../../../../src/core/logic/Result';
import { expect } from 'chai';

describe('FloorDescription Value Object', () => {
  describe('create', () => {
    it('should return Result.ok<FloorDescription> when provided a valid description', () => {
      const descriptionOrError: Result<FloorDescription> = FloorDescription.create('This is a valid description.');

      expect(descriptionOrError.isFailure).to.be.true;
      expect(descriptionOrError.isSuccess).to.be.false;
    });

    it('should return Result.fail<FloorDescription> when provided a null description', () => {
      const descriptionOrError: Result<FloorDescription> = FloorDescription.create(null);

      expect(descriptionOrError.isFailure).to.be.true;
      expect(descriptionOrError.error).to.equal('Floor description should not over 250.');
    });

    it('should return Result.fail<FloorDescription> when provided an undefined description', () => {
      const descriptionOrError: Result<FloorDescription> = FloorDescription.create(undefined);

      expect(descriptionOrError.isFailure).to.be.true;
      expect(descriptionOrError.error).to.equal('Floor description should not over 250.');
    });

    it('should return Result.fail<FloorDescription> when provided an invalid description', () => {
      const descriptionOrError: Result<FloorDescription> = FloorDescription.create('Invalid#Description');

      expect(descriptionOrError.isFailure).to.be.true;
      expect(descriptionOrError.error).to.equal('Esta descrição é inválida');
    });
  });
});
