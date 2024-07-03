import { Database } from "../database/db";

export class UserModel {
    static async create(username:string, password:string, name:string): Promise<void> {
        const db = await Database.getInstance();
        await db.execute("INSERT INTO users (username, password, name) VALUES (?, ?, ?)", [username, password, name]);
    }
}