import * as uuid from 'uuid';
import { Board, Column } from './board.interface';

const DEFAULT_BOARD = {
  title: 'board',
  columns: [],
};

export class BoardModel {
  id: string;
  title: string;
  columns: Column[];

  constructor(board: Board = {} as Board) {
    this.id = uuid();

    ['title', 'columns'].forEach((property: string) => {
      this[property] = board[property] || DEFAULT_BOARD[property];
    });
  }
}
