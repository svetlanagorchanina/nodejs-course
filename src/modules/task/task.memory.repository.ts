import { Task, TaskRepository } from './task.interface';
import { injectable } from 'inversify';
import * as _ from 'lodash';
import { NotFoundError } from '../../error';
import { boardsData, tasksData } from '../../data';
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

  getAll(boardId: string): Promise<Task[]> {
    this.checkBoard(boardId);
    const tasks = this.tasks.filter(task => task.boardId === boardId);

    return new Promise(resolve => resolve(tasks));
  }

  getTask(boardId: string, taskId: string): Promise<Task> {
    this.checkBoard(boardId);
    const task = this.tasks.find(task => task.id === taskId && task.boardId === boardId);

    if (!task) {
      throw new NotFoundError('Task not found');
    }

    return new Promise(resolve => resolve(task));
  }

  addTask(boardId: string, task: Task): Promise<Task> {
    this.checkBoard(boardId);
    this.tasks.push(task);

    return new Promise(resolve => resolve(task));
  }

  async updateTask({ boardId, taskId, task }): Promise<Task> {
    const currentTask = await this.getTask(boardId, taskId);
    const updatedTask = Object.assign(currentTask, task);

    return new Promise(resolve => resolve(updatedTask));
  }

  updateUserTasks(userId: string, updatedTask): Promise<Task[]> {
    const tasks = this.tasks.map(task => {
      if (task.userId === userId) {
        Object.assign(task, updatedTask);
      }

      return task;
    });

    return new Promise(resolve => resolve(tasks));
  }

  deleteTask(boardId: string, taskId: string): Promise<any> {
    this.checkBoard(boardId);
    const removedTasks = _.remove(this.tasks, task => task.id === taskId && task.boardId === boardId);

    if (!removedTasks.length) {
      throw new NotFoundError('Task not found');
    }

    return new Promise(resolve => resolve(true));
  }

  deleteAllTasksByBoardId(boardId: string): Promise<any> {
    _.remove(this.tasks, task => task.boardId === boardId);

    return new Promise(resolve => resolve(true));
  }
}
