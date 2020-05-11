import { inject, injectable } from 'inversify';
import { Task } from '../../models/task/task.interface';
import * as _ from 'lodash';
import { BoardService } from '../board/board.service';
import { TaskRepository } from '../../repository/abstract/task.repository';
import { BOARD_IDENTIFIER, TASK_IDENTIFIER } from '../injector/injectorService.constants';

@injectable()
export class TaskService {
  taskRepository: TaskRepository;
  boardService: BoardService;
  static readonly EDITABLE_FIELDS = ['title', 'order', 'description', 'userId', 'boardId', 'columnId'];

  constructor(
    @inject(TASK_IDENTIFIER.TASK_REPOSITORY) taskRepository: TaskRepository,
    @inject(BOARD_IDENTIFIER.BOARD_SERVICE) boardService: BoardService,
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
