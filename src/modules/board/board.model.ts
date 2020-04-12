import * as uuid from 'uuid';
import { Board } from './board.interface';
import { Column } from '../column/column.interface';
import { ColumnModel } from '../column/column.model';

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
    this.title = board.title || DEFAULT_BOARD.title;
    this.columns = (board.columns || DEFAULT_BOARD.columns).map(column => new ColumnModel(column));
  }
}
