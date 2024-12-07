import { UserModel } from "../models/entities";

export abstract class AbstractUserService {
    public abstract getAll(): Promise<UserModel[]>;
}