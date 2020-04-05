import { injectable } from 'inversify';

export interface User {
    id: string;
    name: string;
    login: string;
    password: string;
}

@injectable()
export abstract class UserRepository {
    public abstract getAll(): User[];
    public abstract getUser(id: string): User;
    public abstract addUser(user: User): User;
    public abstract updateUser(id: string, user: User): User;
    public abstract deleteUser(id: string): void;
}