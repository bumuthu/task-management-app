import { TaskStatus } from "./enums";

export interface TaskModel {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    createdAt: number;
    fileUrl?: string,
    updatedAt?: number;
}

export interface UserModel {
    id: number;
    name: string;
    email: string;
    username: string,
    address: any,
    phone: string,
    website: string,
    company: any
}