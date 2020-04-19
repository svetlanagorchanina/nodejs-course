import * as uuid from 'uuid';
import * as mongoose from 'mongoose';

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

export const BoardModel = mongoose.model('Board', boardSchema);
