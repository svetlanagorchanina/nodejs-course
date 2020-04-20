import { User, UserRepository } from './user.interface';
import { injectable } from 'inversify';
import * as _ from 'lodash';
import { NotFoundError } from '../../error';
import { usersData } from '../../data';
import { UserModel } from './user.model';

@injectable()
export class UserMemoryRepository extends UserRepository {
  users: User[] = usersData;

  getAll(): Promise<User[]> {
    return new Promise(resolve => resolve(this.users));
  }

  getUser(userId: string): Promise<User> {
    const user = this.users.find(({ id }) => id === userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return new Promise(resolve => resolve(user));
  }

  addUser(user: User): Promise<User> {
    const newUser = new UserModel(user);
    this.users.push(newUser);

    return new Promise(resolve => resolve(newUser));
  }

  async updateUser(userId: string, updatedUserFields: User): Promise<User> {
    const user = await this.getUser(userId);
    const updatedUser = Object.assign(user, updatedUserFields);

    return new Promise(resolve => resolve(updatedUser));
  }

  deleteUser(userId: string): Promise<any> {
    const removedUsers = _.remove(this.users, ({ id }) => id === userId);

    if (!removedUsers.length) {
      throw new NotFoundError('User not found');
    }

    return new Promise(resolve => resolve(true));
  }
}
