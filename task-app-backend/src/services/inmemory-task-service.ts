import { AbstractTaskService } from "./abstract-task-service";
import { TaskStatus } from "../models/enums";
import { generateId } from "../utils/common-utils";
import { TaskModel } from "../models/entities";

export class InmemoryTaskService extends AbstractTaskService {
    private records: TaskModel[] = [];
    private static instace: InmemoryTaskService;

    private constructor() {
        super()
        this.records = [];
    }

    public static getInstance() {
        if (!InmemoryTaskService.instace) {
            InmemoryTaskService.instace = new InmemoryTaskService();
        }
        return InmemoryTaskService.instace;
    }

    public async getAll(): Promise<TaskModel[]> {
        return this.records;
    }

    public async get(id: string): Promise<TaskModel | null> {
        const record = this.records.find(r => r.id == id)
        return record ?? null;
    }

    public async create(data: TaskModel): Promise<TaskModel> {
        const newTask: TaskModel = {
            ...data,
            createdAt: Date.now(),
            status: TaskStatus.PENDING,
            id: generateId()
        }
        this.records.push(newTask)
        return newTask;
    }

    public async update(id: string, data: TaskModel): Promise<TaskModel> {
        const record = this.records.find(r => r.id == id)
        if (!record) {
            throw new Error("Record not found");
        }
        const index = this.records.indexOf(record);
        const newRecord = {
            ...data,
            ...record
        }
        this.records.splice(index, 1, newRecord)
        return newRecord;
    }

    public async delete(id: string): Promise<void> {
        const record = this.records.find(r => r.id == id)
        if (!record) {
            throw new Error("Record not found");
        }
        const index = this.records.indexOf(record);
        this.records.splice(index, 1)
    }
}