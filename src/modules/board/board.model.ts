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
    _id: {
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

boardSchema.statics.toResponse = (board: Board) => {
  const columns = board.columns.map(column => _.pick(column, ['id', 'order', 'title']));

  return {
    ..._.pick(board, ['id', 'title']),
    columns,
  };
};

export const BoardModel = mongoose.model('Board', boardSchema);
