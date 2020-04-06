import { injectable } from 'inversify';

export interface Task {
    id: string;
    title: string;
    order: number;
    description: string;
    userId: string;
    boardId: string;
    columnId: string;
}

@injectable()
export abstract class TaskRepository {
    public abstract getAll(boardId: string): Task[];
    public abstract getTask(boardId: string, taskId: string): Task;
    public abstract addTask(boardId, task: Task): Task;
    public abstract updateTask({ boardId, taskId, task }: { boardId: string, taskId: string, task: Task }): Task;
    public abstract updateUserTasks(userId: string, task: Task): Task[];
    public abstract deleteTask(boardId: string, taskId: string): void;
    public abstract deleteAllTasksByBoardId(boardId: string): void;
}
