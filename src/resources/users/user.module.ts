import { Container } from 'inversify';
import { SERVICE_IDENTIFIER } from './user.constants';
import { UserRepository } from './user.interface';
import { UserService } from './user.service';
import { UserMemoryRepository } from './user.memory.repository';

export class UserModule {
  static container: Container;

  static init() {
    UserModule.container = new Container();
    UserModule.container.bind<UserRepository>(SERVICE_IDENTIFIER.USER_REPOSITORY).to(UserMemoryRepository);
    UserModule.container.bind<UserService>(SERVICE_IDENTIFIER.USER_SERVICE).to(UserService);
  }

  static get<T>(serviceType) {
    return UserModule.container.get<T>(serviceType);
  }
}
