import { Container } from 'inversify';
import { config } from '../common/config';

import { BoardRepository } from '../modules/board/board.interface';
import { BoardService } from '../modules/board/board.service';
import { BoardDBRepository } from '../modules/board/board.db.repository';
import { BoardMemoryRepository } from '../modules/board/board.memory.repository';
import { BOARD_SERVICE_IDENTIFIER } from '../modules/board/board.constants';

import { TaskRepository } from '../modules/task/task.interface';
import { TaskService } from '../modules/task/task.service';
import { TaskDBRepository } from '../modules/task/task.db.repository';
import { TaskMemoryRepository } from '../modules/task/task.memory.repository';
import { TASK_SERVICE_IDENTIFIER } from '../modules/task/task.constants';

import { UserRepository } from '../modules/users/user.interface';
import { UserService } from '../modules/users/user.service';
import { UserDBRepository } from '../modules/users/user.db.repository';
import { UserMemoryRepository } from '../modules/users/user.memory.repository';
import { USER_SERVICE_IDENTIFIER } from '../modules/users/user.constants';
import { AuthService } from './authService';

import { SERVICE_IDENTIFIER } from './services.constants';
import { LoggerService } from './loggerService';

export class InjectorService {
  static container: Container;

  static init() {
    const userRepository = config.isDBConnection ? UserDBRepository : UserMemoryRepository;
    const taskRepository = config.isDBConnection ? TaskDBRepository : TaskMemoryRepository;
    const boardRepository = config.isDBConnection ? BoardDBRepository : BoardMemoryRepository;

    InjectorService.container = new Container();
    InjectorService.container.bind<UserRepository>(USER_SERVICE_IDENTIFIER.USER_REPOSITORY).to(userRepository);
    InjectorService.container.bind<UserService>(USER_SERVICE_IDENTIFIER.USER_SERVICE).to(UserService);
    InjectorService.container.bind<TaskRepository>(TASK_SERVICE_IDENTIFIER.TASK_REPOSITORY).to(taskRepository);
    InjectorService.container.bind<TaskService>(TASK_SERVICE_IDENTIFIER.TASK_SERVICE).to(TaskService);
    InjectorService.container.bind<BoardRepository>(BOARD_SERVICE_IDENTIFIER.BOARD_REPOSITORY).to(boardRepository);
    InjectorService.container.bind<BoardService>(BOARD_SERVICE_IDENTIFIER.BOARD_SERVICE).to(BoardService);
    InjectorService.container.bind<AuthService>(SERVICE_IDENTIFIER.AUTH_SERVICE).to(AuthService);
    InjectorService.container.bind<LoggerService>(SERVICE_IDENTIFIER.LOGGER_SERVICE).to(LoggerService);
  }

  static get<T>(serviceType) {
    return InjectorService.container.get<T>(serviceType);
  }
}
