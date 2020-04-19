import { User, UserRepository } from './user.interface';
import { injectable } from 'inversify';
import { usersData } from '../../data';
import { UserModel } from './user.model';
import { NotFoundError } from '../../error';

@injectable()
export class UserDBRepository extends UserRepository {
  users: User[] = usersData;

  getAll(): Promise<User[]> {
    return UserModel.find();
  }

  async getUser(id: string): Promise<User> {
    const user = await UserModel.findById(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async addUser(user: User): Promise<User> {
    const newUser = new UserModel(user);
    await newUser.save();

    return newUser;
  }

  updateUser(userId: string, updatedUser: User): User {
    return null;
  }

  deleteUser(userId: string) {
    return null;
  }
}
