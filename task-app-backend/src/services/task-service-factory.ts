import { MockTaskService } from "../__tests__/mock-task-service";
import ConfigProvider from "../config/config-provider";
import { DatabaseType } from "../utils/enums";
import { AbstractTaskService } from "./abstract-task-service";
import { DynamoDBTaskService } from "./dynamodb-task-service";
import { InmemoryTaskService } from "./inmemory-task-service";

export class TaskServiceFactory {
    static createService(type: DatabaseType): AbstractTaskService {
        switch (type) {
            case DatabaseType.IN_MEMORY:
                return InmemoryTaskService.getInstance();
            case DatabaseType.DYNAMO_DB:
                return DynamoDBTaskService.getInstance();
            case DatabaseType.MOCKED:
                return MockTaskService.getInstance();
            default:
                throw new Error("Unsupported database type");
        }
    }

    static getDatabaseType(): DatabaseType {
        switch (ConfigProvider.get('DATABASE_TYPE')) {
            case 'inmemory':
                return DatabaseType.IN_MEMORY;
            case 'dynamodb':
                return DatabaseType.DYNAMO_DB;
            case 'mocked':
                return DatabaseType.MOCKED;
            default:
                throw new Error("Unsupported database type");
        }
    }
}