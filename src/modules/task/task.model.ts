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
    ref: 'User',
    default: null,
  },
  boardId: {
    type: String,
    required: true,
    ref: 'Board',
  },
  columnId: {
    type: String,
    ref: 'Column',
    default: null,
  },
});
const TASK_RESPONSE_FIELDS = ['id', 'title', 'order', 'description', 'userId', 'boardId', 'columnId'];

taskSchema.methods.toJSON = function() {
  const task: Task = this;

  return _.pick(task, TASK_RESPONSE_FIELDS);
};

export const TaskModel = mongoose.model('Task', taskSchema);
