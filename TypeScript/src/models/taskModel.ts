import { Request, Response } from "express";
import { Database } from "../database/db";
import { format } from 'date-fns';

export interface Task {
    id: number;
    title: string;
    description: string;
    category: string;
    due_date: string;
    user: string;
    status: number;
}

export class TaskModel {
    static async createTask(title: string, description: string, category: number, dueDate: string, user: string): Promise<boolean> {
        const formattedDate = format(dueDate, 'yyy-MM-dd');
        console.log(typeof(dueDate));
        const db = await Database.getInstance();
        try {
            await db.execute("INSERT INTO tasks (title, description, category, due_date, user) VALUES (?, ?, ?, ?, ?)", [title, description, category, formattedDate, user]);
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    static async readTasks(user: string): Promise<Task[] | null | undefined> {
        const db = await Database.getInstance();
        try {
            const [result] = await db.execute("SELECT * FROM tasks WHERE user = ?", [user]);
            const tasks = result as Task[];
            return tasks.length > 0 ? tasks : null;
        } catch (error) {
            return undefined
        }
    }

    static async updateTask(req: Request, res: Response): Promise<void> {

    }

    static async deleteTask(req: Request, res: Response): Promise<void> {

    }
}