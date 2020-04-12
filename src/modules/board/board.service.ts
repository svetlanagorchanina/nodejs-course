import { inject, injectable } from 'inversify';
import { Board, BoardRepository } from './board.interface';
import { BOARD_SERVICE_IDENTIFIER } from './board.constants';
import { BoardModel } from './board.model';
import { TaskService } from "../task/task.service";
import { TASK_SERVICE_IDENTIFIER } from "../task/task.constants";

@injectable()
export class BoardService {
  boardRepository: BoardRepository;
  taskService: TaskService;

  constructor(
      @inject(BOARD_SERVICE_IDENTIFIER.BOARD_REPOSITORY) boardRepository: BoardRepository,
      @inject(TASK_SERVICE_IDENTIFIER.TASK_SERVICE) taskService: TaskService,
  ) {
    this.boardRepository = boardRepository;
    this.taskService = taskService;
  }

  getAll(): Board[] {
    return this.boardRepository.getAll();
  }

  getBoard(id: string): Board {
    return this.boardRepository.getBoard(id);
  }

  createBoard(board: Board): Board {
    const newBoard = new BoardModel(board);

    return this.boardRepository.addBoard(newBoard);
  }

  updateBoard(id: string, board: Board): Board {
    return this.boardRepository.updateBoard(id, board);
  }

  deleteBoard(id: string) {
    this.boardRepository.deleteBoard(id);
    this.taskService.deleteAllTasksByBoardId(id);
  }
}
