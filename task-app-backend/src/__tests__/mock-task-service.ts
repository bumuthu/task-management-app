import { InmemoryTaskService } from "../services/inmemory-task-service";

export class MockTaskService extends InmemoryTaskService {
    public static getInstance() {
        if (!MockTaskService.instace) {
            MockTaskService.instace = new MockTaskService();
        }
        return MockTaskService.instace;
    }

    protected async getUploadUrl(id: string): Promise<string> {
        return "presigned_url";
    }

    protected async deleteFile(id: string) {
    }
}