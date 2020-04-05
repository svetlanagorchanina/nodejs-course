import { Board, BoardRepository } from './board.interface';
import { injectable } from 'inversify';
import * as _ from 'lodash';
import { NotFoundError } from '../../error';
import { boardsData } from '../data';

@injectable()
export class BoardMemoryRepository extends BoardRepository {
  boards: Board[] = boardsData;

  getAll(): Board[] {
    return this.boards;
  }

  getBoard(boardId: string): Board {
    const board = this.boards.find(({ id }) => id === boardId);

    if (!board) {
      throw new NotFoundError('Board not found');
    }

    return board;
  }

  addBoard(board: Board): Board {
    this.boards.push(board);

    return board;
  }

  updateBoard(boardId: string, updatedBoard: Board): Board {
    const board = this.boards.find(({ id }) => id === boardId);

    if (!board) {
      throw new NotFoundError('Board not found');
    }

    return Object.assign(board, updatedBoard);
  }

  deleteBoard(boardId: string) {
    const removedBoards = _.remove(this.boards, ({ id }) => id === boardId);

    if (!removedBoards.length) {
      throw new NotFoundError('Board not found');
    }
  }
}
