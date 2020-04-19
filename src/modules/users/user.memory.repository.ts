import { User, UserRepository } from './user.interface';
import { injectable } from 'inversify';
import * as _ from 'lodash';
import { NotFoundError } from '../../error';
import { usersData } from '../../data';

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
    this.users.push(user);

    return new Promise(resolve => resolve(user));
  }

  updateUser(userId: string, updatedUser: User): User {
    const user = this.users.find(({ id }) => id === userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return Object.assign(user, updatedUser);
  }

  deleteUser(userId: string) {
    const removedUsers = _.remove(this.users, ({ id }) => id === userId);

    if (!removedUsers.length) {
      throw new NotFoundError('User not found');
    }
  }
}
