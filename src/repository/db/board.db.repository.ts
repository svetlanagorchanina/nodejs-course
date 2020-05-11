import { injectable } from 'inversify';
import { NotFoundError } from '../../error';
import { Board } from '../../models/board/board.interface';
import { BoardModel } from '../../models/board/board.model';
import { BoardRepository } from '../abstract/board.repository';

@injectable()
export class BoardDBRepository extends BoardRepository {
  getAll(): Promise<Board[]> {
    return BoardModel.find();
  }

  async getBoard(id: string): Promise<Board> {
    const board = await BoardModel.findById(id);

    if (!board) {
      throw new NotFoundError('Board not found');
    }

    return board;
  }

  addBoard(board: Board): Promise<Board> {
    return BoardModel.create(board);
  }

  async updateBoard(boardId: string, updatedBoard: Board): Promise<Board> {
    await this.getBoard(boardId);

    return BoardModel.findByIdAndUpdate(boardId, updatedBoard, { useFindAndModify: false, new: true, runValidators: true });
  }

  async deleteBoard(boardId: string): Promise<any> {
    await this.getBoard(boardId);

    return BoardModel.findByIdAndDelete(boardId);
  }
}
