import { inject, injectable } from 'inversify';
import { Board } from '../../models/board/board.interface';
import { TaskService } from "../task/task.service";
import * as _ from 'lodash';
import { InjectorService } from '../injector/injectorService';
import { BOARD_IDENTIFIER, TASK_IDENTIFIER } from '../injector/injectorService.constants';
import { BoardRepository } from '../../repository/abstract/board.repository';

@injectable()
export class BoardService {
  boardRepository: BoardRepository;
  static readonly EDITABLE_FIELDS = ['columns', 'title'];

  constructor(
      @inject(BOARD_IDENTIFIER.BOARD_REPOSITORY) boardRepository: BoardRepository,
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
    return this.boardRepository.addBoard(board);
  }

  updateBoard(id: string, board: Board): Promise<Board> {
    return this.boardRepository.updateBoard(id, _.pick(board, BoardService.EDITABLE_FIELDS));
  }

  async deleteBoard(id: string): Promise<any> {
    const taskService: TaskService = InjectorService.get<TaskService>(TASK_IDENTIFIER.TASK_SERVICE);

    await this.boardRepository.deleteBoard(id);
    await taskService.deleteAllTasksByBoardId(id);
  }
}
