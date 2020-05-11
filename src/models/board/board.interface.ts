import { Column } from '../column/column.interface';

export interface Board {
    id?: string;
    title: string;
    columns: Column[];
}
