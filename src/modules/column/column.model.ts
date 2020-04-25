import * as uuid from 'uuid';
import * as mongoose from 'mongoose';
import * as _ from 'lodash';
import { Column } from './column.interface';

export const columnSchema = new mongoose.Schema({
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
});
const COLUMN_RESPONSE_FIELDS = ['id', 'order', 'title'];

columnSchema.statics.toResponse = (column: Column) => {
  return { ..._.pick(column, COLUMN_RESPONSE_FIELDS) };
};

export const ColumnModel = mongoose.model('Column', columnSchema);
