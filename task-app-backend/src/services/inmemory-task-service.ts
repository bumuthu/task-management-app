import { AbstractTaskService } from "./abstract-task-service";
import { TaskStatus } from "../models/enums";
import { generateId } from "../utils/utils";
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

    public getAll(): TaskModel[] {
        return this.records;
    }

    public get(id: string): TaskModel {
        const record = this.records.find(r => r.id == id)
        if (!record) {
            throw new Error("Record not found");
        }
        return record;
    }

    public create(data: TaskModel): TaskModel {
        const newTask: TaskModel = {
            ...data,
            createdAt: Date.now(),
            status: TaskStatus.PENDING,
            id: generateId()
        }
        this.records.push(newTask)
        return newTask;
    }

    public update(id: string, data: TaskModel): TaskModel {
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

    public delete(id: string) : TaskModel {
        const record = this.records.find(r => r.id == id)
        if (!record) {
            throw new Error("Record not found");
        }
        const index = this.records.indexOf(record);
        this.records.splice(index, 1)
        return record;
    }
}