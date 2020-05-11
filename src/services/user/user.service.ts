import { inject, injectable } from 'inversify';
import { User } from '../../models/user/user.interface';
import { Task } from '../../models/task/task.interface';
import { TaskService } from '../task/task.service';
import * as _ from 'lodash';
import { UserRepository } from '../../repository/abstract/user.repository';
import { TASK_IDENTIFIER, USER_IDENTIFIER } from '../injector/injectorService.constants';

@injectable()
export class UserService {
  userRepository: UserRepository;
  taskService: TaskService;
  static readonly EDITABLE_FIELDS = ['name', 'login', 'password'];

  constructor(
      @inject(USER_IDENTIFIER.USER_REPOSITORY) userRepository: UserRepository,
      @inject(TASK_IDENTIFIER.TASK_SERVICE) taskService: TaskService,
  ) {
    this.userRepository = userRepository;
    this.taskService = taskService;
  }

  getAll(): Promise<User[]> {
    return this.userRepository.getAll();
  }

  getUserById(id: string): Promise<User> {
    return this.userRepository.getUserByParam('_id', id);
  }

  getUserByLogin(login: string): Promise<User> {
    return this.userRepository.getUserByParam('login', login);
  }

  createUser(user: User): Promise<User> {
    return this.userRepository.addUser(user);
  }

  updateUser(id: string, user: User): Promise<User> {
    return this.userRepository.updateUser(id, _.pick(user, UserService.EDITABLE_FIELDS));
  }

  async deleteUser(id: string): Promise<any> {
    await this.userRepository.deleteUser(id);
    await this.taskService.updateUserTasks(id, { userId: null } as Task);
  }
}
