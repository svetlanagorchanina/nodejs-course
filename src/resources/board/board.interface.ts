import { injectable } from 'inversify';

export interface Column {
    id: string;
    title: string;
    order: number;
}


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
