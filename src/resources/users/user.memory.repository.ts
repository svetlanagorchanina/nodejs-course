import { User, UserRepository } from './user.interface';
import { injectable } from 'inversify';
import * as _ from 'lodash';
import { NotFoundError } from '../../error';

@injectable()
export class UserMemoryRepository extends UserRepository {
  users: User[] = [];

  getAll(): User[] {
    return this.users;
  }

  getUser(userId: string): User {
    const user = this.users.find(({ id }) => id === userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  addUser(user: User): User {
    this.users.push(user);

    return user;
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
