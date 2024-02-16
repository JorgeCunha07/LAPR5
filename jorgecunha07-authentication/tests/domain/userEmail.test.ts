import { expect } from 'chai';
import properties from "../../properties.config";
import {UserEmail} from "../../src/domain/user/userEmail";


describe('UserEmail', () => {
  describe('create', () => {
    it('should create a valid UserEmail with a valid email', () => {
      const validEmail = `test@${properties.config.emailDomain}`;
      const userEmailResult = UserEmail.create(validEmail);

      expect(userEmailResult.isSuccess).to.be.true;

      // Extract UserEmail from Result
      const extractedUserEmail = userEmailResult.getValue();
      expect(extractedUserEmail.value).to.equal(validEmail);
    });

    it('should fail to create a UserEmail with an invalid email', () => {
      const invalidEmail = 'invalid-email';
      const userEmailResult = UserEmail.create(invalidEmail);

      expect(userEmailResult.isFailure).to.be.true;
      expect(userEmailResult.error).to.equal('Invalid email domain. Expected domain: ' + properties.config.emailDomain);
    });

    it('should fail to create a UserEmail with a null value', () => {
      const invalidEmail = null;
      const userEmailResult = UserEmail.create(invalidEmail);

      expect(userEmailResult.isFailure).to.be.true;
      expect(userEmailResult.error).to.equal('email is null or undefined');
    });

    it('should fail to create a UserEmail with an undefined value', () => {
      const invalidEmail = undefined;
      const userEmailResult = UserEmail.create(invalidEmail);

      expect(userEmailResult.isFailure).to.be.true;
      expect(userEmailResult.error).to.equal('email is null or undefined');
    });
  });
});
