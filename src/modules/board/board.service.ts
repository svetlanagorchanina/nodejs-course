import { inject, injectable } from 'inversify';
import { Board, BoardRepository } from './board.interface';
import { BOARD_SERVICE_IDENTIFIER } from './board.constants';
import { BoardModel } from './board.model';
import { TaskService } from "../task/task.service";
import { TASK_SERVICE_IDENTIFIER } from "../task/task.constants";
import * as _ from 'lodash';
import { InjectorService } from '../../services/injectorService';

@injectable()
export class BoardService {
  boardRepository: BoardRepository;
  static readonly EDITABLE_FIELDS = ['columns', 'title'];

  constructor(
      @inject(BOARD_SERVICE_IDENTIFIER.BOARD_REPOSITORY) boardRepository: BoardRepository,
  ) {
    this.boardRepository = boardRepository;
  }

  getAll(): Promise<Board[]> {
    return this.boardRepository.getAll();
  }

  getBoard(id: string): Promise<Board> {
    return this.boardRepository.getBoard(id);
  }

  createBoard(board: Board): Promise<Board> {
    const newBoard = new BoardModel(board);

    return this.boardRepository.addBoard(newBoard);
  }

  updateBoard(id: string, board: Board): Promise<Board> {
    return this.boardRepository.updateBoard(id, _.pick(board, BoardService.EDITABLE_FIELDS));
  }

  async deleteBoard(id: string): Promise<any> {
    const taskService: TaskService = InjectorService.get<TaskService>(TASK_SERVICE_IDENTIFIER.TASK_SERVICE);

    await this.boardRepository.deleteBoard(id);
    await taskService.deleteAllTasksByBoardId(id);
  }
}
