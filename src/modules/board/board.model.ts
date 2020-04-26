import * as uuid from 'uuid';
import * as mongoose from 'mongoose';
import { Board } from './board.interface';
import * as _ from 'lodash';
import { ColumnModel, columnSchema } from '../column/column.model';

const boardSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  columns: [columnSchema],
});
const BOARD_RESPONSE_FIELDS = ['id', 'title', 'columns'];

boardSchema.methods.toJSON = function() {
  const board: Board = this;
  const columns = board.columns.map(ColumnModel.toResponse);

  return {
    ..._.pick(board, BOARD_RESPONSE_FIELDS),
    columns,
  };
};

export const BoardModel = mongoose.model('Board', boardSchema);
