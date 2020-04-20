import { Board, BoardRepository } from './board.interface';
import { injectable } from 'inversify';
import * as _ from 'lodash';
import { NotFoundError } from '../../error';
import { boardsData } from '../../data';
import { BoardModel } from './board.model';

@injectable()
export class BoardMemoryRepository extends BoardRepository {
  boards: Board[] = boardsData;

  getAll(): Promise<Board[]> {
    return new Promise(resolve => resolve(this.boards));
  }

  getBoard(boardId: string): Promise<Board> {
    const board = this.boards.find(({ id }) => id === boardId);

    if (!board) {
      throw new NotFoundError('Board not found');
    }

    return new Promise(resolve => resolve(board));
  }

  addBoard(board: Board): Promise<Board> {
    const newBoard = new BoardModel(board);
    this.boards.push(newBoard);

    return new Promise(resolve => resolve(newBoard));
  }

  async updateBoard(boardId: string, updatedBoardFields: Board): Promise<Board> {
    const board = await this.getBoard(boardId);
    const updatedBoard = Object.assign(board, updatedBoardFields);

    return new Promise(resolve => resolve(updatedBoard));
  }

  deleteBoard(boardId: string): Promise<any> {
    const removedBoards = _.remove(this.boards, ({ id }) => id === boardId);

    if (!removedBoards.length) {
      throw new NotFoundError('Board not found');
    }

    return new Promise(resolve => resolve(true));
  }
}
