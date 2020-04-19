import { User, UserRepository } from './user.interface';
import { injectable } from 'inversify';
import { usersData } from '../../data';
import { UserModel } from './user.model';

@injectable()
export class UserDBRepository extends UserRepository {
  users: User[] = usersData;

  getAll(): Promise<User[]> {
    return UserModel.find();
  }

  getUser(userId: string): User {
    return null;
  }

  addUser(user: User): User {
    return null;
  }

  updateUser(userId: string, updatedUser: User): User {
    return null;
  }

  deleteUser(userId: string) {
    return null;
  }
}
