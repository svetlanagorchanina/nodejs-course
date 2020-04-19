import { Container } from 'inversify';
import { USER_SERVICE_IDENTIFIER } from './user.constants';
import { UserRepository } from './user.interface';
import { UserService } from './user.service';
import { UserMemoryRepository } from './user.memory.repository';
import { TaskService } from "../task/task.service";
import { TASK_SERVICE_IDENTIFIER } from "../task/task.constants";
import { TaskRepository } from "../task/task.interface";
import { TaskMemoryRepository } from "../task/task.memory.repository";
import { UserDBRepository } from './user.db.repository';
import { config } from '../../common/config';

export class UserModule {
  static container: Container;

  static init() {
    const userRepository = config.isDBConnection ? UserDBRepository : UserMemoryRepository;

    UserModule.container = new Container();
    UserModule.container.bind<UserRepository>(USER_SERVICE_IDENTIFIER.USER_REPOSITORY).to(userRepository);
    UserModule.container.bind<UserService>(USER_SERVICE_IDENTIFIER.USER_SERVICE).to(UserService);
    UserModule.container.bind<TaskService>(TASK_SERVICE_IDENTIFIER.TASK_SERVICE).to(TaskService);
    UserModule.container.bind<TaskRepository>(TASK_SERVICE_IDENTIFIER.TASK_REPOSITORY).to(TaskMemoryRepository);
  }

  static get<T>(serviceType) {
    return UserModule.container.get<T>(serviceType);
  }
}
