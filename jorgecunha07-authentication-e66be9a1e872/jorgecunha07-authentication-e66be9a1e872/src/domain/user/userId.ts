import { Entity } from '../../core/domain/Entity';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';

export class UserId extends Entity<any> {
  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }
}
