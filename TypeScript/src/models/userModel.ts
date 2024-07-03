import { Database } from "../database/db";

export interface User {
    username: string;
    password: string;
    name: string;
  }
  

export class UserModel {
    static async create(username:string, password:string, name:string): Promise<void> {
        const db = await Database.getInstance();

        await db.execute(`CREATE TABLE IF NOT EXISTS users (
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            PRIMARY KEY (username)
            );`);
        await db.execute("INSERT INTO users (username, password, name) VALUES (?, ?, ?)", [username, password, name]);
    };

    static async findByUsernameAndPassword(username: string, password: string): Promise<User | null> {
        const db = await Database.getInstance();
        const [rows] = await db.execute("SELECT * FROM users WHERE username = ? AND password = ?", [username, password]);
        const users = rows as User[]
        return users.length > 0 ? users[0] : null;
    };
}