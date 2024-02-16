import { Request, Response, NextFunction } from 'express';
import * as sinon from 'sinon'; // Import sinon for mocking

import RoleController from "../../src/controllers/roleController";
import IRoleService from "../../src/services/IServices/IRoleService";
import IRoleDTO from "../../src/dto/IRoleDTO";
import { Result } from "../../src/core/logic/Result";
import RoleService from "../../src/services/roleService";

describe('RoleController', () => {
  let mockRoleService: sinon.SinonStubbedInstance<IRoleService>;
  let roleController: RoleController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRoleService = sinon.createStubInstance<IRoleService>(RoleService); // Replace with your actual RoleService class
    roleController = new RoleController(mockRoleService);
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

  describe('createRole', () => {
    it('should create a role successfully and return it', async () => {
      const roleDTO: IRoleDTO = {
        id: "1",
        name: "Admin",
      };

      const result: Result<IRoleDTO> = Result.ok(roleDTO);

      mockRoleService.createRole.resolves(result);
      await roleController.createRole(mockRequest as Request, mockResponse as Response, mockNext);

      sinon.assert.calledWith(mockResponse.status, 201); // This line is causing the error
      sinon.assert.calledWith(mockResponse.json, roleDTO);
    });


    it('should handle a failure case when creating a role', async () => {
      const errorResult: Result<IRoleDTO> = Result.fail('Some error message');

      mockRoleService.createRole.resolves(errorResult);
      await roleController.createRole(mockRequest as Request, mockResponse as Response, mockNext);

      sinon.assert.calledWith(mockResponse.status, 402);
      sinon.assert.called(mockResponse.send);
    });

    it('should handle an exception when creating a role', async () => {
      const error = new Error('An unexpected error');

      mockRoleService.createRole.rejects(error);
      await roleController.createRole(mockRequest as Request, mockResponse as Response, mockNext);

      sinon.assert.calledWith(mockNext, error);
    });
  });

  // Similar tests for updateRole and getAllRole methods
});
