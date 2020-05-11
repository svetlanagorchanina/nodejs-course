import { injectable } from 'inversify';
import { User } from '../../models/user/user.interface';

@injectable()
export abstract class UserRepository {
  public abstract getAll(): Promise<User[]>;
  public abstract getUserByParam(label: string, value: any): Promise<User>;
  public abstract addUser(user: User): Promise<User>;
  public abstract updateUser(id: string, user: User): Promise<User>;
  public abstract deleteUser(id: string): Promise<boolean>;
}
