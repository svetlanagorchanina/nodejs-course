import * as uuid from 'uuid';
import { Column } from './column.interface';

const DEFAULT_COLUMN = {
  title: 'column',
  order: 0,
};

export class ColumnModel {
  id: string;
  title: string;
  order: number;

  constructor(column: Column = {} as Column) {
    this.id = uuid();

    ['title', 'order'].forEach((property: string) => {
      this[property] = column[property] || DEFAULT_COLUMN[property];
    });
  }
}
