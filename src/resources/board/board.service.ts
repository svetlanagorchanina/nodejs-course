import { inject, injectable } from 'inversify';
import { Board, BoardRepository } from './board.interface';
import { BOARD_SERVICE_IDENTIFIER } from './board.constants';
import { BoardModel } from './board.model';

@injectable()
export class BoardService {
  boardRepository: BoardRepository;

  constructor(@inject(BOARD_SERVICE_IDENTIFIER.BOARD_REPOSITORY) boardRepository: BoardRepository) {
    this.boardRepository = boardRepository;
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
    return this.boardRepository.deleteBoard(id);
  }
}
