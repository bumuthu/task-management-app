import { TaskStatus } from "./enums";

export interface TaskModel {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    createdAt: number;
    updatedAt?: number;
}

export interface UserModel {
    id: number;
    name: string;
    email: string;
}