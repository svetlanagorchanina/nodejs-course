import { User, UserRepository } from './user.interface';
import { injectable } from 'inversify';
import { UserModel } from './user.model';
import { NotFoundError } from '../../error';

@injectable()
export class UserDBRepository extends UserRepository {
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

  async updateUser(userId: string, updatedUser: User): Promise<User> {
    await this.getUser(userId);

    return UserModel.findByIdAndUpdate(userId, updatedUser, { useFindAndModify: false, new: true });
  }

  async deleteUser(userId: string): Promise<any> {
    await this.getUser(userId);

    return UserModel.findByIdAndDelete(userId);
  }
}
