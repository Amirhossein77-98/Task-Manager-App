import { UserModel } from "../models/userModel";

export interface UserRepository {
    create(username:string, password:string, name:string): Promise<void>;
    findByUsernameAndPassword(username:string, password:string): Promise<any>;
}


export class UserRepositoryImpl implements UserRepository {
    async create(username:string, password:string, name:string): Promise<void> {
        await UserModel.create(username, password, name);
    }

    async findByUsernameAndPassword(username: string, password: string): Promise<any> {
        await UserModel.findByUsernameAndPassword(username, password)
    }
}