import { Request, Response } from "express";
import { Database } from "../database/db";
import { format } from 'date-fns';
import { error } from "console";

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
        const db = await Database.getInstance();
        try {
            await db.execute("INSERT INTO tasks (title, description, category, due_date, user) VALUES (?, ?, ?, ?, ?)", [title, description, category, formattedDate, user]);
            return true
        } catch (error) {
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

    static async fetchTaskByTaskId(taskId: number, userName: string): Promise<Task | null | undefined> {
        const db = await Database.getInstance();
        try {
            const [task] = await db.execute("SELECT * FROM tasks WHERE id = ? AND user = ?", [taskId, userName]);
            const userTask = task as Task[];
            return userTask.length > 0 ? userTask[0] : null;
        } catch (error) {
         return undefined   
        }
    }

    static async updateTask(taskId: number, taskTitle: string, taskDescription: string, taskCategory: number, taskDueDate: string, taskStatus: number, user: string): Promise<boolean> {
        const db = await Database.getInstance();
        try {
            db.execute(`UPDATE tasks SET title = ?, description = ?, category = ?, due_date = ?, status = ? WHERE user = ? and id = ?`, 
                [taskTitle, 
                    taskDescription, 
                    taskCategory, 
                    taskDueDate, 
                    taskStatus, 
                    user, 
                    taskId]
                )
            return true
        } catch (error) {
            return false
        }
    }

    static async deleteTask(taskId: number, userId: string): Promise<boolean> {
        const db = await Database.getInstance();
        try {
            db.execute("DELETE FROM tasks WHERE id = ? AND user = ?", [taskId, userId]);
            return true
        } catch (error) {
            return false
        }
    }
}