import { UserModel } from "../models/entities";
import { batchWriteItems, getAll } from "../utils/dynamodb-utils";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { AbstractUserService } from "./abstract-user-service";
import { getTTL } from "../utils/common-utils";
import ConfigProvider from "../config/config-provider";

const userTableName = "UserTable";

export class DynamoDBUserService extends AbstractUserService {
    private static instace: DynamoDBUserService;

    private constructor() {
        super()
    }

    public static getInstance() {
        if (!DynamoDBUserService.instace) {
            DynamoDBUserService.instace = new DynamoDBUserService();
        }
        return DynamoDBUserService.instace;
    }

    public async getAll(): Promise<UserModel[]> {
        const res = await getAll(userTableName);
        if (!res.Items) {
            return [];
        }
        const users = res.Items.map((item) => unmarshall(item) as UserModel);
        return users as UserModel[]
    }

    public async batchCreate(data: UserModel[]): Promise<UserModel[]> {
        await batchWriteItems(userTableName,
            data.map((item) => marshall({ ...item, ttl: getTTL(ConfigProvider.get('TTL_MINUTES') as number) }))
        );
        return data;
    }
}