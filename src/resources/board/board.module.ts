import { Container } from 'inversify';
import { BOARD_SERVICE_IDENTIFIER } from './board.constants';
import { BoardRepository } from './board.interface';
import { BoardService } from './board.service';
import { BoardMemoryRepository } from './board.memory.repository';

export class BoardModule {
  static container: Container;

  static init() {
    BoardModule.container = new Container();
    BoardModule.container.bind<BoardRepository>(BOARD_SERVICE_IDENTIFIER.BOARD_REPOSITORY).to(BoardMemoryRepository);
    BoardModule.container.bind<BoardService>(BOARD_SERVICE_IDENTIFIER.BOARD_SERVICE).to(BoardService);
  }

  static get<T>(serviceType) {
    return BoardModule.container.get<T>(serviceType);
  }
}
