import { expect } from 'chai';
import {IUserDTO} from "../../src/dto/IUserDTO";
import {User} from "../../src/domain/user/user";


describe('User', () => {

  it('should fail to create a User with missing fields', () => {
    // Arrange
    const userDTO: IUserDTO = {
      role: "", userNif: "", userNumber: "",
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'P@ssw0rd'
      // Missing 'role'
    };

    // Act
    const result = User.create(userDTO);

    // Assert
    expect(result.isFailure).to.be.true;
  });

  it('should fail to create a User with an invalid email', () => {
    // Arrange
    const userDTO: IUserDTO = {
      userNif: "", userNumber: "",
      firstName: 'John',
      lastName: 'Doe',
      email: 'invalid-email', // Invalid email format
      password: 'P@ssw0rd',
      role: 'User'
    };

    // Act
    const result = User.create(userDTO);

    // Assert
    expect(result.isFailure).to.be.true;
    expect(result.error).to.equal('Invalid email or password');
  });

  it('should fail to create a User with an invalid password', () => {
    // Arrange
    const userDTO: IUserDTO = {
      userNif: "", userNumber: "",
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'weakpassword', // Password doesn't meet criteria
      role: 'User'
    };

    // Act
    const result = User.create(userDTO);

    // Assert
    expect(result.isFailure).to.be.true;

  });
});
