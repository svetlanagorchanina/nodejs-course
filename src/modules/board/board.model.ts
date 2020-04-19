import * as uuid from 'uuid';
import * as mongoose from 'mongoose';
import { Board } from './board.interface';
import * as _ from 'lodash';

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
  columns: [{
    id: {
      type: String,
      default: uuid,
    },
    order: {
      type: Number,
      required: true,
      min: 0,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
  }],
});
const BOARD_RESPONSE_FIELDS = ['id', 'title', 'columns'];
const COLUMN_RESPONSE_FIELDS = ['id', 'order', 'title'];

boardSchema.statics.toResponse = (board: Board) => {
  const columns = board.columns.map(column => _.pick(column, COLUMN_RESPONSE_FIELDS));

  return {
    ..._.pick(board, BOARD_RESPONSE_FIELDS),
    columns,
  };
};

export const BoardModel = mongoose.model('Board', boardSchema);
