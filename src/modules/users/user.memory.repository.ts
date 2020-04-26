import { User, UserRepository } from './user.interface';
import { injectable } from 'inversify';
import * as _ from 'lodash';
import { NotFoundError } from '../../error';
import { usersData } from '../../data';
import { UserModel } from './user.model';

@injectable()
export class UserMemoryRepository extends UserRepository {
  users: User[] = usersData;

  async getAll(): Promise<User[]> {
    return this.users;
  }

  async getUser(userId: string): Promise<User> {
    const user = this.users.find(({ id }) => id === userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async addUser(user: User): Promise<User> {
    const newUser = new UserModel(user);
    this.users.push(newUser);

    return newUser;
  }

  async updateUser(userId: string, updatedUserFields: User): Promise<User> {
    const user = await this.getUser(userId);

    return Object.assign(user, updatedUserFields);
  }

  async deleteUser(userId: string): Promise<boolean> {
    const removedUsers = _.remove(this.users, ({ id }) => id === userId);

    if (!removedUsers.length) {
      throw new NotFoundError('User not found');
    }

    return true;
  }
}
