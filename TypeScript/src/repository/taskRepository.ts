import { TaskModel } from "../models/taskModel"



export class TaskRepository {
    static async createNewTask(title: string, description: string, category: number, dueDate: string, user: string): Promise<boolean> {
        const createTaskResult = await TaskModel.createTask(title, description, category, dueDate, user);
        return createTaskResult;
    }
}