import { inject, injectable } from 'inversify';
import { User, UserRepository } from './user.interface';
import { USER_SERVICE_IDENTIFIER } from './user.constants';
import { Task } from '../task/task.interface';
import { TaskService } from '../task/task.service';
import { TASK_SERVICE_IDENTIFIER } from '../task/task.constants';
import * as _ from 'lodash';

@injectable()
export class UserService {
  userRepository: UserRepository;
  taskService: TaskService;
  static readonly EDITABLE_FIELDS = ['name', 'login', 'password'];

  constructor(
      @inject(USER_SERVICE_IDENTIFIER.USER_REPOSITORY) userRepository: UserRepository,
      @inject(TASK_SERVICE_IDENTIFIER.TASK_SERVICE) taskService: TaskService,
  ) {
    this.userRepository = userRepository;
    this.taskService = taskService;
  }

  getAll(): Promise<User[]> {
    return this.userRepository.getAll();
  }

  getUser(id: string): Promise<User> {
    return this.userRepository.getUser(id);
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
