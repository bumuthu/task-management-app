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
            default:
                throw new Error("Unsupported database type");
        }
    }
}