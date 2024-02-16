import { expect } from 'chai';
import {UserNumber} from "../../src/domain/user/UserNumber";


describe('UserNumber', () => {
  describe('create', () => {
    it('should create a valid UserNumber with null value', () => {
      const userNumber = null;
      const userNumberResult = UserNumber.create(userNumber);

      expect(userNumberResult.isSuccess).to.be.true;

      // Extract UserNumber from Result
      const extractedUserNumber = userNumberResult.getValue();
      expect(extractedUserNumber.value).to.equal(userNumber);
    });

    it('should create a valid UserNumber with a valid number', () => {
      const validNumber = '+351123456789';
      const userNumberResult = UserNumber.create(validNumber);

      expect(userNumberResult.isSuccess).to.be.true;

      // Extract UserNumber from Result
      const extractedUserNumber = userNumberResult.getValue();
      expect(extractedUserNumber.value).to.equal(validNumber);
    });

    it('should fail to create an invalid UserNumber with an invalid number', () => {
      const invalidNumber = '12345';
      const userNumberResult = UserNumber.create(invalidNumber);

      expect(userNumberResult.isFailure).to.be.true;
      expect(userNumberResult.error).to.equal(
        'Number is invalid. It must start with +351 and be followed by 9 numbers.'
      );
    });
  });
});
