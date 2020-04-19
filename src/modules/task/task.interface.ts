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
    public abstract getAll(boardId: string): Promise<Task[]>;
    public abstract getTask(boardId: string, taskId: string): Promise<Task>;
    public abstract addTask(boardId, task: Task): Promise<Task>;
    public abstract updateTask({ boardId, taskId, task }: { boardId: string, taskId: string, task: Task }): Promise<Task>;
    public abstract updateUserTasks(userId: string, task: Task): Promise<Task[]>;
    public abstract deleteTask(boardId: string, taskId: string): Promise<any>;
    public abstract deleteAllTasksByBoardId(boardId: string): Promise<any>;
}
