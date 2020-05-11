import { Task } from '../../models/task/task.interface';
import { injectable } from 'inversify';
import * as _ from 'lodash';
import { NotFoundError } from '../../error';
import { tasksData } from '../../memory';
import { TaskModel } from '../../models/task/task.model';
import { TaskRepository } from '../abstract/task.repository';

@injectable()
export class TaskMemoryRepository extends TaskRepository {
  tasks: Task[] = tasksData;

  async getAll(boardId: string): Promise<Task[]> {
    return this.tasks.filter(task => task.boardId === boardId);
  }

  async getTask(boardId: string, taskId: string): Promise<Task> {
    const task = this.tasks.find(task => task.id === taskId && task.boardId === boardId);

    if (!task) {
      throw new NotFoundError('Task not found');
    }

    return task;
  }

  async addTask(boardId: string, task: Task): Promise<Task> {
    const newTask = new TaskModel({ ...task, boardId });
    this.tasks.push(newTask);

    return newTask;
  }

  async updateTask({ boardId, taskId, task }): Promise<Task> {
    const currentTask = await this.getTask(boardId, taskId);

    return Object.assign(currentTask, task);
  }

  async updateUserTasks(userId: string, updatedTask): Promise<Task[]> {
    const tasks = this.tasks.map(task => {
      if (task.userId === userId) {
        Object.assign(task, updatedTask);
      }

      return task;
    });

    return tasks;
  }

  async deleteTask(boardId: string, taskId: string): Promise<boolean> {
    const removedTasks = _.remove(this.tasks, task => task.id === taskId && task.boardId === boardId);

    if (!removedTasks.length) {
      throw new NotFoundError('Task not found');
    }

    return true;
  }

  async deleteAllTasksByBoardId(boardId: string): Promise<boolean> {
    _.remove(this.tasks, task => task.boardId === boardId);

    return true;
  }
}
