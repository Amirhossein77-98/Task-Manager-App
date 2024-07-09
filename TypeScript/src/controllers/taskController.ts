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
        } else if (userTasks == undefined) {
            res.json('There was a problem fetching your tasks')
        }
    }
    
    static async fetchUserTaskById(req: Request, res: Response): Promise<void> {
        const taskID = +req.body.taskId;
        const userID = req.body.userId;

        const userTask = await TaskRepository.fetchUserTaskById(taskID, userID);

        if (userTask) {
            res.json(userTask)
        } else if (!userTask) {
            res.json(`Couldn't find your task!`)
        } else {
            res.json('There was a problem fetching your task')
        }
    }

    static async updateTask(req: Request, res: Response): Promise<void> {
        const taskId = +req.body.taskId;
        const taskTitle = req.body.title;
        const taskDescription = req.body.description;
        const taskCategory = req.body.category;
        const taskDueDate = req.body.dueDate;
        const taskStatus = req.body.status;
        const user = req.body.user;
        const result = await TaskRepository.updateTask(taskId, taskTitle, taskDescription, taskCategory, taskDueDate, taskStatus, user)

        if (result) {
            res.status(200).send();
        } else {
            res.status(400).send();
        }
    }
    
    static async deleteTask(req: Request, res: Response): Promise<void> {
        const taskId = req.body.taskId;
        const userId = req.body.userId;

        const result = await TaskRepository.deleteTask(taskId, userId);

        if (result) {
            res.status(200).send();
        } else {
            res.status(400).send();
        }
    }

}