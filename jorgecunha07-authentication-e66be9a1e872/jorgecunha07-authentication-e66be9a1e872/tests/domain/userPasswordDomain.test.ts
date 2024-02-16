import { expect } from 'chai';
import {UserPassword} from "../../src/domain/user/userPassword";


describe('UserPassword', () => {
  describe('create', () => {
    it('should create a valid UserPassword', () => {
      const passwordValue = 'ValidPassword123';
      const userPasswordResult = UserPassword.create({ value: passwordValue });

      expect(userPasswordResult.isSuccess).to.be.true;

      // Extract UserPassword from Result
      const userPassword = userPasswordResult.getValue();
      expect(userPassword.value).to.equal(passwordValue);
    });

    it('should fail to create an invalid UserPassword', () => {
      const invalidPassword = 'Short';
      const userPasswordResult = UserPassword.create({ value: invalidPassword });

      expect(userPasswordResult.isFailure).to.be.true;
      expect(userPasswordResult.error).to.equal(
        'Password doesnt meet criteria [1 uppercase, 1 lowercase, one digit or symbol and 8 chars min].'
      );
    });
  });

  describe('comparePassword', () => {
    it('should compare hashed password successfully', async () => {
      const plainTextPassword = 'ValidPassword123';
      const hashedPassword = await UserPassword.create({
        value: plainTextPassword,
        hashed: true,
      });

      // Extract UserPassword from Result
      const userPassword = hashedPassword.getValue();

      const result = await userPassword.comparePassword(plainTextPassword);
      expect(result).to.be.false;
    });

    it('should compare plain text password successfully', async () => {
      const plainTextPassword = 'ValidPassword123';
      const userPassword = await UserPassword.create({ value: plainTextPassword });

      // Extract UserPassword from Result
      const extractedUserPassword = userPassword.getValue();

      const result = await extractedUserPassword.comparePassword(plainTextPassword);
      expect(result).to.be.true;
    });

    it('should fail to compare password when incorrect', async () => {
      const plainTextPassword = 'ValidPassword123';
      const incorrectPassword = 'InvalidPassword456';
      const userPassword = await UserPassword.create({ value: plainTextPassword });

      // Extract UserPassword from Result
      const extractedUserPassword = userPassword.getValue();

      const result = await extractedUserPassword.comparePassword(incorrectPassword);
      expect(result).to.be.false;
    });
  });

  describe('getHashedValue', () => {
    it('should return hashed password if already hashed', async () => {
      const hashedPassword = await UserPassword.create({
        value: 'ValidPassword123',
        hashed: true,
      });

      // Extract UserPassword from Result
      const userPassword = hashedPassword.getValue();

      const hashedValue = await userPassword.getHashedValue();
      expect(hashedValue).to.equal(userPassword.value);
    });

    it('should return hashed password if not already hashed', async () => {
      const plainTextPassword = 'ValidPassword123';
      const userPassword = await UserPassword.create({ value: plainTextPassword });

      // Extract UserPassword from Result
      const extractedUserPassword = userPassword.getValue();

      const hashedValue = await extractedUserPassword.getHashedValue();
      expect(hashedValue).to.not.equal(plainTextPassword);
    });
  });
});
