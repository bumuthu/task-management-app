import { UserModel } from "../models/entities";
import { AbstractUserService } from "./abstract-user-service";
import { DynamoDBUserService } from "./dynamodb-user-service";
import { ExternalUserService } from "./external-user-service";

export class CachedUserService extends AbstractUserService {
    private dynamodbUserService = DynamoDBUserService.getInstance();
    private externalUserService = ExternalUserService.getInstance();

    public async getAll(): Promise<UserModel[]> {
        const dynamodbUsers = await this.dynamodbUserService.getAll();
        if (dynamodbUsers.length > 0) {
            return dynamodbUsers;
        }
        const externalUsers = await this.externalUserService.getAll();
        if (externalUsers.length > 0) {
            await this.dynamodbUserService.batchCreate(externalUsers);
        }
        return externalUsers
    }
}