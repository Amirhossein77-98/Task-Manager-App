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
        const currentUser = req.headers['authorization'];
        const userTasks = await TaskRepository.fetchUserTasks(currentUser as string);
        if (userTasks) {
            res.json(userTasks)
        } else if (!userTasks) {
            res.json('You have no tasks!')
        } else if (userTasks !== undefined) {
            res.json('There was a problem fetching your tasks')
        }
    }
    
    static async updateTask(req: Request, res: Response): Promise<void> {
        
    }
    
    static async deleteTask(req: Request, res: Response): Promise<void> {

    }

}