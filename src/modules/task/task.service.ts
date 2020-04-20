import { inject, injectable } from 'inversify';
import { Task, TaskRepository } from './task.interface';
import { TASK_SERVICE_IDENTIFIER } from './task.constants';
import * as _ from 'lodash';
import { BOARD_SERVICE_IDENTIFIER } from '../board/board.constants';
import { BoardService } from '../board/board.service';

@injectable()
export class TaskService {
  taskRepository: TaskRepository;
  boardService: BoardService;
  static readonly EDITABLE_FIELDS = ['title', 'order', 'description', 'userId', 'boardId', 'columnId'];

  constructor(
    @inject(TASK_SERVICE_IDENTIFIER.TASK_REPOSITORY) taskRepository: TaskRepository,
    @inject(BOARD_SERVICE_IDENTIFIER.BOARD_SERVICE) boardService: BoardService,
  ) {
    this.taskRepository = taskRepository;
    this.boardService = boardService;
  }

  async getAll(boardId: string): Promise<Task[]> {
    await this.boardService.getBoard(boardId);
    return this.taskRepository.getAll(boardId);
  }

  async getTask(boardId: string, taskId: string): Promise<Task> {
    await this.boardService.getBoard(boardId);
    return this.taskRepository.getTask(boardId, taskId);
  }

  async createTask(boardId: string, task: Task = {} as Task): Promise<Task> {
    await this.boardService.getBoard(boardId);
    return this.taskRepository.addTask(boardId, { ...task, boardId });
  }

  async updateTask({ boardId, taskId, task }): Promise<Task> {
    await this.boardService.getBoard(boardId);
    return this.taskRepository.updateTask({ boardId, taskId, task: _.pick(task, TaskService.EDITABLE_FIELDS) });
  }

  updateUserTasks(userId: string, task: Task): Promise<Task[]> {
    return this.taskRepository.updateUserTasks(userId, _.pick(task, TaskService.EDITABLE_FIELDS));
  }

  async deleteTask(boardId: string, taskId: string) {
    await this.boardService.getBoard(boardId);
    return this.taskRepository.deleteTask(boardId, taskId);
  }

  deleteAllTasksByBoardId(boardId: string) {
    return this.taskRepository.deleteAllTasksByBoardId(boardId);
  }
}
