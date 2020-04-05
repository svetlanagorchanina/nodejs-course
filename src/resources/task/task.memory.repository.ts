import { Task, TaskRepository } from './task.interface';
import { injectable } from 'inversify';
import * as _ from 'lodash';
import { NotFoundError } from '../../error';
import { boardsData, tasksData } from '../data';
import { Board } from '../board/board.interface';

@injectable()
export class TaskMemoryRepository extends TaskRepository {
  tasks: Task[] = tasksData;
  boards: Board[] = boardsData;

  private checkBoard(boardId: string) {
    const board = this.boards.find(({ id }) => id === boardId);

    if (!board) {
      throw new NotFoundError('Board not found');
    }
  }

  getAll(boardId: string): Task[] {
    this.checkBoard(boardId);

    return this.tasks.filter(task => task.boardId === boardId);
  }

  getTask(boardId: string, taskId: string): Task {
    this.checkBoard(boardId);
    const task = this.tasks.find(task => task.id === taskId && task.boardId === boardId);

    if (!task) {
      throw new NotFoundError('Task not found');
    }

    return task;
  }

  addTask(boardId: string, task: Task): Task {
    this.checkBoard(boardId);
    this.tasks.push(task);

    return task;
  }

  updateTask({ boardId, taskId, task }): Task {
    const currentTask = this.getTask(boardId, taskId);

    return Object.assign(currentTask, task);
  }

  deleteTask(boardId: string, taskId: string) {
    this.checkBoard(boardId);
    const removedTasks = _.remove(this.tasks, task => task.id === taskId && task.boardId === boardId);

    if (!removedTasks.length) {
      throw new NotFoundError('Task not found');
    }
  }
}
