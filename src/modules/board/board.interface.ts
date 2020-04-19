import { injectable } from 'inversify';
import { Column } from '../column/column.interface';

export interface Board {
    id: string;
    title: string;
    columns: Column[];
}

@injectable()
export abstract class BoardRepository {
    public abstract getAll(): Promise<Board[]>;
    public abstract getBoard(id: string): Promise<Board>;
    public abstract addBoard(user: Board): Promise<Board>;
    public abstract updateBoard(id: string, user: Board): Promise<Board>;
    public abstract deleteBoard(id: string): Promise<any>;
}
