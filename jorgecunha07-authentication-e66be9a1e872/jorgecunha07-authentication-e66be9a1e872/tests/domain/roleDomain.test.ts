import { expect } from 'chai';
import IRoleDTO from "../../src/dto/IRoleDTO";
import {Role} from "../../src/domain/role/role"; // Import 'expect' from Chai


describe('Role', () => {
  it('should create a valid Role', () => {
    // Arrange
    const roleDTO: IRoleDTO = {
      id: "",
      name: 'Admin'
    };

    // Act
    const result = Role.create(roleDTO);

    // Assert
    expect(result.isSuccess).to.be.true;
    const role = result.getValue();
    expect(role).to.be.instanceOf(Role);
    expect(role.name).to.equal('Admin');
  });

  it('should fail to create a Role with an empty name', () => {
    // Arrange
    const roleDTO: IRoleDTO = {
      id: "",
      name: ''
    };

    // Act
    const result = Role.create(roleDTO);

    // Assert
    expect(result.isFailure).to.be.true;
    expect(result.error).to.equal('Must provide a role name');
  });

  it('should fail to create a Role with a null name', () => {
    // Arrange
    const roleDTO: IRoleDTO = {
      id: "",
      name: null
    };

    // Act
    const result = Role.create(roleDTO);

    // Assert
    expect(result.isFailure).to.be.true;
    expect(result.error).to.equal('Must provide a role name');
  });


});
