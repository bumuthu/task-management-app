import { TaskStatus } from "./enums";

export interface EntityModel {
    id: string;
}

export interface TaskModel extends EntityModel {
    title: string;
    description?: string;
    status: TaskStatus;
    createdAt: number;
    updatedAt?: number;
}

export interface UserModel extends EntityModel {
    name: string;
    email: string;
}