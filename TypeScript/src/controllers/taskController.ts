import { Request, Response } from 'express';
import { TaskRepository } from '../repository/taskRepository';
import { TaskView } from '../views/taskView';

export class TaskController {
    static async newTask(req: Request, res: Response): Promise<void> {
        const {title, description, category, dueDate, user} = req.body;
        if (user){
            const createTaskResult = await TaskRepository.createNewTask(title, description, category, dueDate, user);
            if (createTaskResult) {
                TaskView.displayMessage(res, 'Task created successfully.')
            } else {
                console.log(createTaskResult)
                TaskView.displayMessage(res, 'Task creation failed.')
            }
        } else {
            TaskView.displayMessage(res, 'You should login first')
        }
    }

    static async readTasks(req: Request, res: Response): Promise<void> {

    }
    
    static async updateTask(req: Request, res: Response): Promise<void> {
        
    }
    
    static async deleteTask(req: Request, res: Response): Promise<void> {

    }

}