import { injectable } from 'inversify';

export interface User {
    id?: string;
    name: string;
    login: string;
    password: string;
}

@injectable()
export abstract class UserRepository {
    public abstract getAll(): Promise<User[]>;
    public abstract getUser(id: string): Promise<User>;
    public abstract addUser(user: User): Promise<User>;
    public abstract updateUser(id: string, user: User): Promise<User>;
    public abstract deleteUser(id: string): Promise<boolean>;
}
