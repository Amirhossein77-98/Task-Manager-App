import { Task, TaskModel } from "../models/taskModel";

export class TaskRepository {
    static async createNewTask(title: string, description: string, category: number, dueDate: string, user: string): Promise<boolean> {
        const createTaskResult = await TaskModel.createTask(title, description, category, dueDate, user);
        return createTaskResult;
    }

    static async fetchUserTasks(user: string): Promise<Task[] | null | undefined> {
        const userTasks = await TaskModel.readTasks(user);
        if (userTasks !== undefined) {
            return userTasks ? userTasks : null;
        } else {
            return undefined;
        }
    }

    static async fetchUserTaskById(taskId: number, userName: string) {
        const userTask = await TaskModel.fetchTaskByTaskId(taskId, userName);
        if (userTask !== undefined) {
            return userTask ? userTask : null;
        } else {
            return undefined;
        }
    }

    static async updateTask(taskId: number, taskTitle: string, taskDescription: string, taskCategory: number, taskDueDate: string, taskStatus: number, user: string): Promise<boolean> {
        const result = await TaskModel.updateTask(taskId, taskTitle, taskDescription, taskCategory, taskDueDate, taskStatus, user)
        if (result) {
            return result
        } else {
            return result
        }
    }

    static async deleteTask(taskId: number, userId: string): Promise<boolean> {
        const result = await TaskModel.deleteTask(taskId, userId);
        
        return result ? true : false
    }
}