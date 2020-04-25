import { Task, TaskRepository } from './task.interface';
import { injectable } from 'inversify';
import { NotFoundError } from '../../error';
import { TaskModel } from './task.model';

@injectable()
export class TaskDBRepository extends TaskRepository {

  getAll(boardId: string): Promise<Task[]> {
    return TaskModel.find({ boardId });
  }

  async getTask(boardId: string, taskId: string): Promise<Task> {
    const task = await TaskModel.findOne({ boardId, _id: taskId });

    if (!task) {
      throw new NotFoundError('Task not found');
    }

    return task;
  }

  addTask(boardId: string, task: Task): Promise<Task> {
    return TaskModel.create({ ...task, boardId });
  }

  async updateTask({ boardId, taskId, task }): Promise<Task> {
    await this.getTask(boardId, taskId);
    return TaskModel.findOneAndUpdate({ _id: taskId, boardId }, task, { useFindAndModify: false, new: true });
  }

  updateUserTasks(userId: string, updatedTask): Promise<Task[]> {
    return TaskModel.updateMany({ userId }, updatedTask, { useFindAndModify: false, new: true });
  }

  async deleteTask(boardId: string, taskId: string): Promise<any> {
    await this.getTask(boardId, taskId);
    return TaskModel.findByIdAndDelete(taskId);
  }

  deleteAllTasksByBoardId(boardId: string): Promise<any> {
    return TaskModel.deleteMany({ boardId });
  }
}
