import * as uuid from 'uuid';
import { Task } from './task.interface';
import * as mongoose from 'mongoose';
import * as _ from 'lodash';

const taskSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  order: {
    type: Number,
    min: 0,
  },
  description: {
    type: String,
    trim: true,
  },
  userId: {
    type: String,
    default: uuid,
  },
  boardId: {
    type: String,
    default: uuid,
  },
  columnId: {
    type: String,
    default: uuid,
  },
});

taskSchema.statics.toResponse = (task: Task) => {
  return _.pick(task, ['id', 'title', 'order', 'description', 'userId', 'boardId', 'columnId']);
};

export const TaskModel = mongoose.model('Task', taskSchema);
