import { Request, Response, NextFunction } from 'express';
import * as sinon from 'sinon';

import UserController from "../../src/controllers/userController";
import IUserService from "../../src/services/IServices/IUserService";
import { Result } from "../../src/core/logic/Result";
import { ISignUpRequestDTO } from "../../src/dto/ISignUpRequestDTO";
import { IUserDTO } from "../../src/dto/IUserDTO";
import UserService from "../../src/services/userService";

describe('UserController', () => {
  let mockUserService: sinon.SinonStubbedInstance<IUserService>;
  let userController: UserController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockUserService = sinon.createStubInstance<IUserService>(UserService); // Replace with your actual UserService class
    userController = new UserController(mockUserService);
    mockRequest = {};
    mockResponse = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
      send: sinon.stub(),
    };
    mockNext = sinon.stub() as unknown as NextFunction;
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('getAllUserRequests', () => {
    it('should get all user requests successfully', async () => {
      const userRequests: ISignUpRequestDTO[] = [
        // Create sample user request objects here
      ];

      const result: Result<ISignUpRequestDTO[]> = Result.ok(userRequests);

      mockUserService.getAllUserRequests.resolves(result);
      await userController.getAllUserRequests(mockRequest as Request, mockResponse as Response, mockNext);

      sinon.assert.calledWith(mockResponse.status, 201);
      sinon.assert.calledWith(mockResponse.json, userRequests);
    });


  });

  describe('signUp', () => {
    it('should sign up a user successfully', async () => {
      const signUpRequestDTO: ISignUpRequestDTO = {
        domainId: "123",
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: "password",
        userNif: "123456789",
        userNumber: "987654321",
      };

      const userDTO: IUserDTO = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: "hashedPassword",
        role: "user",
        userNif: "123456789",
        userNumber: "987654321",
      };

      const result: Result<{ userDTO: IUserDTO, token: string }> = Result.ok({ userDTO, token: "authToken" });

      mockUserService.SignUp.resolves(result);
      await userController.signUp(mockRequest as Request, mockResponse as Response, mockNext);

      sinon.assert.calledWith(mockResponse.status, 201);
      sinon.assert.calledWith(mockResponse.json, { userDTO, token: "authToken" });
    });

    // Add similar tests for failure and exception cases
  });

  describe('getUser', () => {
    it('should get a user by email successfully', async () => {
      const userEmail = "john@example.com";

      const userDTO: IUserDTO = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: "hashedPassword",
        role: "user",
        userNif: "123456789",
        userNumber: "987654321",
      };

      const result: Result<IUserDTO> = Result.ok(userDTO);

      mockRequest.params = { email: userEmail };
      mockUserService.getUserByEmail.withArgs(userEmail).resolves(result);

      await userController.getUser(mockRequest as Request, mockResponse as Response, mockNext);

      sinon.assert.calledWith(mockResponse.status, 201);
      sinon.assert.calledWith(mockResponse.json, userDTO);
    });

    // Add similar tests for failure and exception cases
  });

  // Add tests for other methods in UserController
});
