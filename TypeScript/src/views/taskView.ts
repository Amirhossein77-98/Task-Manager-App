import { Response } from "express";

export class TaskView {
    static async displayMessage(res: Response, message: string): Promise<void> {
        res.json({message})
    }

}