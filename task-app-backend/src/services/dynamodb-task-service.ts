import { TaskModel } from "../models/entities";
import { generateId } from "../utils/common-utils";
import { createItem, deleteItem, getAll, getItemById, updateItem } from "../utils/dynamodb-utils";
import { AbstractTaskService } from "./abstract-task-service";
import { TaskStatus } from "../models/enums";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

const taskTableName = "TaskTable";

export class DynamoDBTaskService extends AbstractTaskService {
    private static instace: DynamoDBTaskService;

    private constructor() {
        super()
    }

    public static getInstance() {
        if (!DynamoDBTaskService.instace) {
            DynamoDBTaskService.instace = new DynamoDBTaskService();
        }
        return DynamoDBTaskService.instace;
    }

    public async getAll(): Promise<TaskModel[]> {
        const res = await getAll(taskTableName);
        if (!res.Items) {
            return [];
        }
        const tasks = res.Items.map((item) => unmarshall(item) as TaskModel);
        return tasks as TaskModel[]
    }

    public async get(id: string): Promise<TaskModel | null> {
        const res = await getItemById(taskTableName, id);
        if (!res.Item) {
            return null;
        }
        return unmarshall(res.Item!) as TaskModel
    }

    public async create(data: TaskModel): Promise<TaskModel> {
        const id = generateId();
        const enrichedTask: TaskModel = {
            ...data, id, createdAt: Date.now(),
            status: data.status ?? TaskStatus.PENDING,
            fileUrl: await this.getUploadUrl(id)
        }
        await createItem(taskTableName, marshall(enrichedTask));
        return enrichedTask;
    }

    public async update(id: string, data: TaskModel): Promise<TaskModel> {
        const enrichedTask = { ...data, updatedAt: Date.now() }
        await updateItem(taskTableName, id, marshall(enrichedTask));
        return enrichedTask;
    }

    public async delete(id: string): Promise<void> {
        await this.deleteFile(id)
        await deleteItem(taskTableName, id);
    }
}