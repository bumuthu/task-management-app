import ConfigProvider from "../config/config-provider";
import { UserModel } from "../models/entities";
import { AbstractUserService } from "./abstract-user-service";

export class ExternalUserService extends AbstractUserService {
    private static instace: ExternalUserService;
    private externalDataSource: string;

    private constructor() {
        super()
        this.externalDataSource = ConfigProvider.get('EXTERNAL_DATA_SOURCE') as string;
    }

    public static getInstance() {
        if (!ExternalUserService.instace) {
            ExternalUserService.instace = new ExternalUserService();
        }
        return ExternalUserService.instace;
    }

    public async getAll(): Promise<UserModel[]> {
        const users = await (await fetch(`${this.externalDataSource}/users`)).json();
        return users as UserModel[];
    }
}