import { TaskModel } from "../models/entities";

export abstract class AbstractTaskService {
    public abstract getAll(): Promise<TaskModel[]>;
    public abstract get(id: string): Promise<TaskModel | null>;
    public abstract create(data: TaskModel): Promise<TaskModel>;
    public abstract update(id: string, data: TaskModel): Promise<TaskModel>;
    public abstract delete(id: string): Promise<void>;
}