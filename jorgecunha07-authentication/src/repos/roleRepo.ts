import { Service, Inject } from 'typedi';

import IRoleRepo from './IRepos/IRoleRepo';
import { Role } from '../domain/role/role';
import { RoleId } from '../domain/role/roleId';
import { RoleMap } from '../mappers/RoleMap';

import { Document, FilterQuery, Model } from 'mongoose';
import { IRolePersistence } from '../dataschema/IRolePersistence';
import {Result} from "../core/logic/Result";
import IRoleDTO from "../dto/IRoleDTO";

@Service()
export default class RoleRepo implements IRoleRepo {
  private models: any;

  constructor(@Inject('roleSchema') private roleSchema: Model<IRolePersistence & Document>) {}

  public async exists(role: Role): Promise<boolean> {
    const idX = role.id instanceof RoleId ? (<RoleId>role.id).toValue() : role.id;

    const query = { domainId: idX };
    const roleDocument = await this.roleSchema.findOne(query as FilterQuery<IRolePersistence & Document>);

    return !!roleDocument === true;
  }

  public async save(role: Role): Promise<Role> {
    const query = { domainId: role.id.toString() };

    const roleDocument = await this.roleSchema.findOne(query);

    try {
      if (roleDocument === null) {
        const rawRole: any = RoleMap.toPersistence(role);

        const roleCreated = await this.roleSchema.create(rawRole);

        return RoleMap.toDomain(roleCreated);
      } else {
        roleDocument.name = role.name;
        await roleDocument.save();

        return role;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(roleId: RoleId | string): Promise<Role> {
    const query = { domainId: roleId };
    const roleRecord = await this.roleSchema.findOne(query as FilterQuery<IRolePersistence & Document>);

    if (roleRecord != null) {
      return RoleMap.toDomain(roleRecord);
    } else return null;
  }

  public async findByName(name: string): Promise<Role> {
    const query = { name }; // Corrected to use the value of `name`
    const roleRecord = await this.roleSchema.findOne(query as FilterQuery<IRolePersistence & Document>);

    if (roleRecord != null) {
      return RoleMap.toDomain(roleRecord);
    } else return null;
  }

  public async getAllRoles(): Promise<Result<Array<Role>>> {
    try {
      // Fetch all role records from the database
      const roleRecords  = await this.roleSchema.find({});

      if (roleRecords) {
        // Map each role record to a domain object
        const rolesDTO = roleRecords.map(roleRecord => RoleMap.toDomain(roleRecord));

        // Wrap the array in a Result object and return
        return Result.ok(rolesDTO);
      } else {
        // Handle the case where no roles are found
        return Result.fail('No roles found');
      }
    } catch (error) {
      // Handle any errors that might occur during the database query
      return Result.fail(error.message);
    }
  }




  private createBaseQuery(): any {
    return {
      where: {},
    };
  }
}
