import { User, UserRepository } from './user.interface';
import { injectable } from 'inversify';
import { UserModel } from './user.model';
import { NotFoundError, ValidationError } from '../../error';
import { MONGOOSE_ERROR_CODE } from '../../error/mongoose-error.constants';

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
    try {
      return await UserModel.create(user);
    } catch(error) {
      if (error.code === MONGOOSE_ERROR_CODE.DUPLICATED) {
        throw new ValidationError('Login should be unique');
      }

      throw error;
    }
  }

  async updateUser(userId: string, updatedUser: User): Promise<User> {
    await this.getUser(userId);

    return UserModel.findByIdAndUpdate(userId, updatedUser, { useFindAndModify: false, new: true, runValidators: true });
  }

  async deleteUser(userId: string): Promise<any> {
    await this.getUser(userId);

    return UserModel.findByIdAndDelete(userId);
  }
}
