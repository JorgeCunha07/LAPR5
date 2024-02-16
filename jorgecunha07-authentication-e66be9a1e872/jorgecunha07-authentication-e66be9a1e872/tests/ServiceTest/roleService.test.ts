import { expect } from 'chai';
import sinon from 'sinon';
import 'mocha';

import IRoleRepo from '../../src/repos/IRepos/IRoleRepo';
import { Role } from '../../src/domain/role/role';
import { Result } from "../../src/core/logic/Result";
import IRoleDTO from "../../src/dto/IRoleDTO";
import RoleService from "../../src/services/roleService";

describe('RoleService', () => {
  let roleService: RoleService;
  let roleRepoStub: Partial<sinon.SinonStubbedInstance<IRoleRepo>>;

  beforeEach(() => {
    roleRepoStub = {
      findByDomainId: sinon.stub(),
    };

    roleService = new RoleService(roleRepoStub as IRoleRepo);
  });

  describe('getRole', () => {
    it('should return a role if it exists', async () => {
      const roleId = 'existing_role_id';
      const dto: IRoleDTO = { id: roleId, name: "Admin" };
      const fakeRole: Role = Role.create(dto).getValue();
      (roleRepoStub.findByDomainId as sinon.SinonStub).resolves(fakeRole);

      const result = await roleService.getRole(roleId);

      expect(result.isSuccess).to.be.true;
      expect(result.getValue().name).to.deep.equal(fakeRole.name);
    });

    it('should return an error if the role does not exist', async () => {
      const roleId = 'nonexistent_role_id';
      (roleRepoStub.findByDomainId as sinon.SinonStub).resolves(null);

      const result = await roleService.getRole(roleId);

      expect(result.isFailure).to.be.true;
      expect(result.error).to.equal('Role not found');
    });

  });
});
