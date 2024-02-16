import { expect } from 'chai';
import {UserNIF} from "../../src/domain/user/UserNif";


describe('UserNIF', () => {
  describe('create', () => {
    it('should create a valid UserNIF with null value', () => {
      const userNIF = null;
      const userNIFResult = UserNIF.create(userNIF);

      expect(userNIFResult.isSuccess).to.be.true;

      // Extract UserNIF from Result
      const extractedUserNIF = userNIFResult.getValue();
      expect(extractedUserNIF.value).to.equal(userNIF);
    });

    it('should create a valid UserNIF with a valid NIF', () => {
      const validNIF = '123456789';
      const userNIFResult = UserNIF.create(validNIF);

      expect(userNIFResult.isSuccess).to.be.true;

      // Extract UserNIF from Result
      const extractedUserNIF = userNIFResult.getValue();
      expect(extractedUserNIF.value).to.equal(validNIF);
    });

    it('should fail to create an invalid UserNIF with an invalid NIF', () => {
      const invalidNIF = '12345';
      const userNIFResult = UserNIF.create(invalidNIF);

      expect(userNIFResult.isFailure).to.be.true;
      expect(userNIFResult.error).to.equal('NIF is invalid, it must be exactly 9 numbers.');
    });

    it('should fail to create a UserNIF with a null value and a non-null guard result', () => {
      const invalidNIF = null;
      const userNIFResult = UserNIF.create(invalidNIF);

      expect(userNIFResult.isFailure).to.be.false;
    });
  });
});
