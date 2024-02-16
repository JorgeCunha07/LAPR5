import { Repo } from '../../core/infra/Repo';
import { User } from '../../domain/user/user';

export default interface IUserRepo extends Repo<User> {

  save(user: User): Promise<User>;

  findByEmail(email: string): Promise<User>;

  existsByUserNif(userNif: string): Promise<boolean>

  existsByUserNumber(userNumber: string): Promise<boolean>

  findById(id: string): Promise<User>;

  delete(user: User): Promise<boolean>;
}
