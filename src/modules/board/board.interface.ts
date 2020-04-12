import { injectable } from 'inversify';
import { Column } from '../column/column.interface';


export interface Board {
    id: string;
    title: string;
    columns: Column[];
}

@injectable()
export abstract class BoardRepository {
    public abstract getAll(): Board[];
    public abstract getBoard(id: string): Board;
    public abstract addBoard(user: Board): Board;
    public abstract updateBoard(id: string, user: Board): Board;
    public abstract deleteBoard(id: string): void;
}
