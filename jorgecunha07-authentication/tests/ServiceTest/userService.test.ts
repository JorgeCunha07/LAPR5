import { expect } from 'chai';
import sinon from 'sinon';
import 'mocha';
import IRoleRepo from "../../src/repos/IRepos/IRoleRepo";
import ISignUpRequestRepo from "../../src/repos/IRepos/ISignUpRequestRepo";
import {IUserDTO} from "../../src/dto/IUserDTO";
import {User} from "../../src/domain/user/user";
import UserService from "../../src/services/userService";
import IUserRepo from "../../src/repos/IRepos/IUserRepo";
import {Result} from "../../src/core/logic/Result";
import assert = require("node:assert");
import {Role} from "../../src/domain/role/role";


describe('UserService', () => {
  let userService: UserService;
  let userRepoStub: Partial<sinon.SinonStubbedInstance<IUserRepo>>;
  let roleRepoStub: Partial<sinon.SinonStubbedInstance<IRoleRepo>>;
  let signUpRequestRepoStub: Partial<sinon.SinonStubbedInstance<ISignUpRequestRepo>>;
  let loggerStub: any;

  const userDTO: IUserDTO = {
    firstName: "Jorge",
    lastName: "Cunha",
    email: "cunha57@me.com",
    password: "1234",
    role: "Admin",
    userNif: "252663111",
    userNumber: "+351912638411"
  };

  beforeEach(() => {
    userRepoStub = {
      findByEmail: sinon.stub(),
      existsByUserNif: sinon.stub(),
      existsByUserNumber: sinon.stub(),
      save: sinon.stub(),
    };
    roleRepoStub = { /* ... */ };
    signUpRequestRepoStub = { /* ... */ };
    loggerStub = { error: sinon.stub() };

    userService = new UserService(userRepoStub as any, roleRepoStub as any, signUpRequestRepoStub as any, loggerStub);
  });

  it('should fail if user already exists with the same email', async () => {
    const userDTO: IUserDTO = {
      firstName: "Jorge",
      lastName: "Cunha",
      email: "cunha57@me.com",
      password: "1234",
      role:"Admin",
      userNif:"252663111",
      userNumber:"+351912638411"
    }
    userRepoStub.findByEmail.resolves(User.create(userDTO));

    const result = await userService.signUpUserRequest(userDTO);

    expect(result.isFailure).to.be.true;
    expect(result.error).to.equal('User already exists with email =' + userDTO.email);
  });

  it('should fail if user already exists with the same user number', async () => {
    userRepoStub.findByEmail.resolves(null);
    userRepoStub.existsByUserNif.resolves(false);
    userRepoStub.existsByUserNumber.resolves(true);

    const result = await userService.signUpUserRequest(userDTO);

    expect(result.isFailure).to.be.true;
  });

  it('should fail if user already exists with the same user NIF', async () => {
    userRepoStub.findByEmail.resolves(null);
    userRepoStub.existsByUserNif.resolves(true);
    userRepoStub.existsByUserNumber.resolves(false);

    const result = await userService.signUpUserRequest(userDTO);

    expect(result.isFailure).to.be.true;
    expect(result.error).to.equal('User already exists with userNif = ' + userDTO.userNif);
  });


  it('should validate user DTO fields', async () => {
    const invalidUserDTO = { ...userDTO, email: "invalid email" };
    let flag = false;
    try {
      const result = await userService.signUpUserRequest(invalidUserDTO);

      expect(result.isFailure).to.be.true;
      expect(result.error).to.equal('Invalid email domain. Expected domain: me.com');
    }catch (e){
      flag = true;
    }
    assert.equal(flag,true);

  });


});
