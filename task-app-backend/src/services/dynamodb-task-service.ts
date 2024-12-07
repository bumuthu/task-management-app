import { TaskModel } from "../models/entities";
import { generateId } from "../utils/common-utils";
import { createItem, deleteItem, getAll, getItemById, updateItem } from "../utils/dynamodb-utils";
import { AbstractTaskService } from "./abstract-task-service";
import { TaskStatus } from "../models/enums";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

const taskTableName = "TaskTable";

export class DynamoDBTaskService extends AbstractTaskService {
    private static instace: DynamoDBTaskService;

    public static getInstance() {
        if (!DynamoDBTaskService.instace) {
            DynamoDBTaskService.instace = new DynamoDBTaskService();
        }
        return DynamoDBTaskService.instace;
    }

    public async getAll(): Promise<TaskModel[]> {
        try {
            const res = await getAll(taskTableName);
            if (!res.Items) {
                return [];
            }
            const tasks = res.Items.map((item) => unmarshall(item) as TaskModel);
            return tasks as TaskModel[]
        } catch (err) {
            console.error("Failed to retrieve all tasks", err)
            throw new Error("Failed to retrieve all tasks");
        }
    }

    public async get(id: string): Promise<TaskModel | null> {
        try {
            const res = await getItemById(taskTableName, id);
            if (!res.Item) {
                return null;
            }
            return unmarshall(res.Item!) as TaskModel
        } catch (err) {
            console.error("Failed to retrieve task", err)
            throw new Error("Failed to retrieve task");
        }
    }

    public async create(data: TaskModel): Promise<TaskModel> {
        try {
            const enrichedTask = { ...data, id: generateId(), createdAt: Date.now(), status: data.status ?? TaskStatus.PENDING }
            await createItem(taskTableName, marshall(enrichedTask));
            return enrichedTask;
        } catch (err) {
            console.error("Failed to create task", err)
            throw new Error("Failed to create task");
        }
    }

    public async update(id: string, data: TaskModel): Promise<TaskModel> {
        try {
            const enrichedTask = { ...data, updatedAt: Date.now() }
            await updateItem(taskTableName, id, marshall(enrichedTask));
            return enrichedTask;
        } catch (err) {
            console.error("Failed to update task", err)
            throw new Error("Failed to update task");
        }
    }

    public async delete(id: string): Promise<void> {
        try {
            await deleteItem(taskTableName, id);
        } catch (err) {
            console.error("Failed to delete task", err)
            throw new Error("Failed to delete task");
        }
    }
}