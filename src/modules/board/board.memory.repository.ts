import { Board, BoardRepository } from './board.interface';
import { injectable } from 'inversify';
import * as _ from 'lodash';
import { NotFoundError } from '../../error';
import { boardsData } from '../../data';
import { BoardModel } from './board.model';

@injectable()
export class BoardMemoryRepository extends BoardRepository {
  boards: Board[] = boardsData;

  async getAll(): Promise<Board[]> {
    return this.boards;
  }

  async getBoard(boardId: string): Promise<Board> {
    const board = this.boards.find(({ id }) => id === boardId);

    if (!board) {
      throw new NotFoundError('Board not found');
    }

    return board;
  }

  async addBoard(board: Board): Promise<Board> {
    const newBoard = new BoardModel(board);
    this.boards.push(newBoard);

    return newBoard;
  }

  async updateBoard(boardId: string, updatedBoardFields: Board): Promise<Board> {
    const board = await this.getBoard(boardId);

    return Object.assign(board, updatedBoardFields);
  }

  async deleteBoard(boardId: string): Promise<boolean> {
    const removedBoards = _.remove(this.boards, ({ id }) => id === boardId);

    if (!removedBoards.length) {
      throw new NotFoundError('Board not found');
    }

    return true;
  }
}
