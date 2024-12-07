import { TaskModel } from "../models/entities";
import { AbstractTaskService } from "./abstract-task-service";

export class DynamoDBTaskService extends AbstractTaskService {
    private static instace: DynamoDBTaskService;

    public static getInstance() {
        if (!DynamoDBTaskService.instace) {
            DynamoDBTaskService.instace = new DynamoDBTaskService();
        }
        return DynamoDBTaskService.instace;
    }

    public getAll(): TaskModel[] {
        throw new Error("Method not implemented.");
    }
    public get(id: string): TaskModel {
        throw new Error("Method not implemented.");
    }
    public create(data: TaskModel): TaskModel {
        throw new Error("Method not implemented.");
    }
    public update(id: string, data: TaskModel): TaskModel {
        throw new Error("Method not implemented.");
    }
    public delete(id: string): TaskModel {
        throw new Error("Method not implemented.");
    }
}