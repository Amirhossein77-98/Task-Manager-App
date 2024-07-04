import { Request, Response } from "express";
import { Database } from "../database/db";
import { parseISO, format } from 'date-fns';

export class TaskModel {
    static async createTask(title: string, description: string, category: number, dueDate: string, user: string): Promise<boolean> {
        const formatDate = parseISO(dueDate);
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

    static async readTasks(req: Request, res: Response): Promise<void> {

    }

    static async updateTask(req: Request, res: Response): Promise<void> {

    }

    static async deleteTask(req: Request, res: Response): Promise<void> {

    }
}