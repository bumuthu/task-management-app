import { TaskModel } from "../models/entities";

export abstract class AbstractTaskService {
    public abstract getAll(): TaskModel[];
    public abstract get(id: string): TaskModel;
    public abstract create(data: TaskModel): TaskModel;
    public abstract update(id: string, data: TaskModel): TaskModel;
    public abstract delete(id: string): TaskModel;
}