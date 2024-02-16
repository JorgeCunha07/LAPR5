import { Repo } from '../../core/infra/Repo';
import { Role } from '../../domain/role/role';
import { RoleId } from '../../domain/role/roleId';
import {Result} from "../../core/logic/Result";
import IRoleDTO from "../../dto/IRoleDTO";

export default interface IRoleRepo extends Repo<Role> {
  save(role: Role): Promise<Role>;

  findByDomainId(roleId: RoleId | string): Promise<Role>;
  findByName(roleName:  string): Promise<Role>;
  getAllRoles():Promise<Result<Array<Role>>>;


}
