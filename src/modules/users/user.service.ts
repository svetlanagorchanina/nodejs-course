import { inject, injectable } from 'inversify';
import { User, UserRepository } from './user.interface';
import { USER_SERVICE_IDENTIFIER } from './user.constants';
import { UserModel } from './user.model';
import { Task } from '../task/task.interface';
import { TaskService } from '../task/task.service';
import { TASK_SERVICE_IDENTIFIER } from '../task/task.constants';

@injectable()
export class UserService {
  userRepository: UserRepository;
  taskService: TaskService;

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

  createUser(user: User): User {
    const newUser = new UserModel(user);

    return this.userRepository.addUser(newUser);
  }

  updateUser(id: string, user: User): User {
    return this.userRepository.updateUser(id, user);
  }

  deleteUser(id: string) {
    this.userRepository.deleteUser(id);
    this.taskService.updateUserTasks(id, { userId: null } as Task);
  }
}
