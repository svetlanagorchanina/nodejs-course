import { injectable } from 'inversify';
import { NotFoundError } from '../../error';
import { Board, BoardRepository } from './board.interface';
import { BoardModel } from './board.model';

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
