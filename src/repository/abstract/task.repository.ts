import { injectable } from 'inversify';
import { Task } from '../../models/task/task.interface';

@injectable()
export abstract class TaskRepository {
  public abstract getAll(boardId: string): Promise<Task[]>;
  public abstract getTask(boardId: string, taskId: string): Promise<Task>;
  public abstract addTask(boardId, task: Task): Promise<Task>;
  public abstract updateTask({ boardId, taskId, task }: { boardId: string, taskId: string, task: Task }): Promise<Task>;
  public abstract updateUserTasks(userId: string, task: Task): Promise<Task[]>;
  public abstract deleteTask(boardId: string, taskId: string): Promise<boolean>;
  public abstract deleteAllTasksByBoardId(boardId: string): Promise<boolean>;
}
