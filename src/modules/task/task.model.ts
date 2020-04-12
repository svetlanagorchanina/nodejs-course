import * as uuid from 'uuid';
import { Task } from './task.interface';

const DEFAULT_TASK = {
  title: 'task',
  order: 0,
  description: '',
  userId: null,
  boardId: null,
  columnId: null,
};

export class TaskModel {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;

  constructor(task: Task = {} as Task) {
    this.id = uuid();

    ['title', 'order', 'description', 'userId', 'boardId', 'columnId'].forEach((property: string) => {
      this[property] = task[property] || DEFAULT_TASK[property];
    });
  }
}
