import { Container } from 'inversify';
import { config } from '../../config/config';
import {
  BOARD_IDENTIFIER, SERVICE_IDENTIFIER,
  TASK_IDENTIFIER,
  USER_IDENTIFIER
} from './injectorService.constants';

import { BoardRepository } from '../../repository/abstract/board.repository';
import { BoardService } from '../board/board.service';
import { BoardDBRepository } from '../../repository/db/board.db.repository';
import { BoardMemoryRepository } from '../../repository/memory/board.memory.repository';

import { TaskRepository } from '../../repository/abstract/task.repository';
import { TaskService } from '../task/task.service';
import { TaskDBRepository } from '../../repository/db/task.db.repository';
import { TaskMemoryRepository } from '../../repository/memory/task.memory.repository';

import { UserRepository } from '../../repository/abstract/user.repository';
import { UserService } from '../user/user.service';
import { UserDBRepository } from '../../repository/db/user.db.repository';
import { UserMemoryRepository } from '../../repository/memory/user.memory.repository';
import { AuthService } from '../auth/authService';

import { LoggerService } from '../logger/loggerService';


export class InjectorService {
  static container: Container;

  static init() {
    const userRepository = config.isDBConnection ? UserDBRepository : UserMemoryRepository;
    const taskRepository = config.isDBConnection ? TaskDBRepository : TaskMemoryRepository;
    const boardRepository = config.isDBConnection ? BoardDBRepository : BoardMemoryRepository;

    InjectorService.container = new Container();
    InjectorService.container.bind<UserRepository>(USER_IDENTIFIER.USER_REPOSITORY).to(userRepository);
    InjectorService.container.bind<UserService>(USER_IDENTIFIER.USER_SERVICE).to(UserService);
    InjectorService.container.bind<TaskRepository>(TASK_IDENTIFIER.TASK_REPOSITORY).to(taskRepository);
    InjectorService.container.bind<TaskService>(TASK_IDENTIFIER.TASK_SERVICE).to(TaskService);
    InjectorService.container.bind<BoardRepository>(BOARD_IDENTIFIER.BOARD_REPOSITORY).to(boardRepository);
    InjectorService.container.bind<BoardService>(BOARD_IDENTIFIER.BOARD_SERVICE).to(BoardService);
    InjectorService.container.bind<AuthService>(SERVICE_IDENTIFIER.AUTH_SERVICE).to(AuthService);
    InjectorService.container.bind<LoggerService>(SERVICE_IDENTIFIER.LOGGER_SERVICE).to(LoggerService);
  }

  static get<T>(serviceType) {
    return InjectorService.container.get<T>(serviceType);
  }
}
