import { inject, injectable } from 'inversify';
import { Task, TaskRepository } from './task.interface';
import { TASK_SERVICE_IDENTIFIER } from './task.constants';
import { TaskModel } from './task.model';

@injectable()
export class TaskService {
  taskRepository: TaskRepository;

  constructor(@inject(TASK_SERVICE_IDENTIFIER.TASK_REPOSITORY) taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  getAll(boardId: string): Promise<Task[]> {
    return this.taskRepository.getAll(boardId);
  }

  getTask(boardId: string, taskId: string): Promise<Task> {
    return this.taskRepository.getTask(boardId, taskId);
  }

  createTask(boardId: string, task: Task = {} as Task): Promise<Task> {
    const newTask = new TaskModel({ ...task, boardId });

    return this.taskRepository.addTask(boardId, newTask);
  }

  updateTask({ boardId, taskId, task }): Promise<Task> {
    return this.taskRepository.updateTask({ boardId, taskId, task });
  }

  updateUserTasks(userId: string, task: Task): Promise<Task[]> {
    return this.taskRepository.updateUserTasks(userId, task);
  }

  deleteTask(boardId: string, taskId: string) {
    return this.taskRepository.deleteTask(boardId, taskId);
  }

  deleteAllTasksByBoardId(boardId: string) {
    return this.taskRepository.deleteAllTasksByBoardId(boardId);
  }
}
