import { Container } from 'inversify';
import { BOARD_SERVICE_IDENTIFIER } from './board.constants';
import { BoardRepository } from './board.interface';
import { BoardService } from './board.service';
import { BoardMemoryRepository } from './board.memory.repository';
import { TaskService } from "../task/task.service";
import { TASK_SERVICE_IDENTIFIER } from "../task/task.constants";
import { TaskRepository } from "../task/task.interface";
import { TaskMemoryRepository } from "../task/task.memory.repository";
import { config } from '../../common/config';
import { BoardDBRepository } from './board.db.repository';

export class BoardModule {
  static container: Container;

  static init() {
    const boardRepository = config.isDBConnection ? BoardDBRepository : BoardMemoryRepository;

    BoardModule.container = new Container();
    BoardModule.container.bind<BoardRepository>(BOARD_SERVICE_IDENTIFIER.BOARD_REPOSITORY).to(boardRepository);
    BoardModule.container.bind<BoardService>(BOARD_SERVICE_IDENTIFIER.BOARD_SERVICE).to(BoardService);
    BoardModule.container.bind<TaskService>(TASK_SERVICE_IDENTIFIER.TASK_SERVICE).to(TaskService);
    BoardModule.container.bind<TaskRepository>(TASK_SERVICE_IDENTIFIER.TASK_REPOSITORY).to(TaskMemoryRepository);
  }

  static get<T>(serviceType) {
    return BoardModule.container.get<T>(serviceType);
  }
}
