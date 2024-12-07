import { TaskModel } from "../models/entities";
import { S3Service } from "./s3-service";

export abstract class AbstractTaskService {
    public abstract getAll(): Promise<TaskModel[]>;
    public abstract get(id: string): Promise<TaskModel | null>;
    public abstract create(data: TaskModel): Promise<TaskModel>;
    public abstract update(id: string, data: TaskModel): Promise<TaskModel>;
    public abstract delete(id: string): Promise<void>;

    protected async getUploadUrl(id: string): Promise<string> {
        const s3Service = new S3Service();
        return await s3Service.getPreSignedUrl(id);
    }

    protected async deleteFile(id: string) {
        const s3Service = new S3Service();
        await s3Service.deleteFile(id);
    }
}