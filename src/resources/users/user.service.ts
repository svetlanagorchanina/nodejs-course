import { inject, injectable } from 'inversify';
import { User, UserRepository } from './user.interface';
import { SERVICE_IDENTIFIER } from './user.constants';
import { UserModel } from './user.model';

@injectable()
export class UserService {
  userRepository: UserRepository;

  constructor(@inject(SERVICE_IDENTIFIER.USER_REPOSITORY) userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  getAll(): User[] {
    return this.userRepository.getAll();
  }

  getUser(id: string): User {
    return this.userRepository.getUser(id);
  }

  createUser(user: User): User {
    const newUser = new UserModel(user);

    return this.userRepository.addUser(newUser);
  }

  updateUser(id: string, user: User): User {
    return this.userRepository.updateUser(id, user);
  }

  deleteUser(id: string) {
    return this.userRepository.deleteUser(id);
  }
}
