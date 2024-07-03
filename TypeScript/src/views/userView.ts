import { Response } from "express";

export class UserView {
    static displayMessage(res: Response, message: string): void {
        res.json({message});
    }
}