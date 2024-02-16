import { expect } from 'chai';
import {ISignUpRequestDTO} from "../../src/dto/ISignUpRequestDTO";
import {SignUpRequest} from "../../src/domain/userActions/signUpRequest";


describe('SignUpRequest', () => {
  describe('create', () => {
    it('should create a valid SignUpRequest', () => {
      // Define valid ISignUpRequestDTO
      const validSignUpRequestDTO: ISignUpRequestDTO = {
        domainId: "",
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        userNif: '123456789',
        userNumber: '+351123456789'
      };

      // Create a new SignUpRequest
      const signUpRequestResult = SignUpRequest.create(validSignUpRequestDTO);

      // Check if creation was successful
      expect(signUpRequestResult.isSuccess).to.be.true;

      // Extract SignUpRequest from Result
      const signUpRequest = signUpRequestResult.getValue();

      // Check if properties match
      expect(signUpRequest.firstName).to.equal(validSignUpRequestDTO.firstName);
      expect(signUpRequest.lastName).to.equal(validSignUpRequestDTO.lastName);
      expect(signUpRequest.email).to.equal(validSignUpRequestDTO.email);
      expect(signUpRequest.password).to.equal(validSignUpRequestDTO.password);
      expect(signUpRequest.userNif.value).to.equal(validSignUpRequestDTO.userNif);
      expect(signUpRequest.userNumber.value).to.equal(validSignUpRequestDTO.userNumber);
    });

    it('should fail to create a SignUpRequest with invalid UserNIF', () => {
      try {
        const invalidUserNIF = '123'; // Provide an invalid UserNIF here
        SignUpRequest.create({
          domainId: "",
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          password: 'password123',
          userNif: invalidUserNIF,
          userNumber: '+351123456789'
        });
        // If the create method does not throw an error, fail the test
        throw new Error('Expected error but got success');
      } catch (error) {
        // Here, you can assert that the error message or type matches your expectations
        expect(error.message).contain('NIF is invalid');
      }
    });

    it('should fail to create a SignUpRequest with invalid UserNumber', () => {
      try {
        const invalidUserNumber = '+351123'; // Provide an invalid UserNumber here
        SignUpRequest.create({
          domainId: "",
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          password: 'password123',
          userNif: '123456789',
          userNumber: 'invalid-number'
        });
        // If the create method does not throw an error, fail the test
        throw new Error('Expected error but got success');
      } catch (error) {
        // Here, you can assert that the error message or type matches your expectations
        expect(error.message).contain('Number is invalid');
      }
    });
  });
});
