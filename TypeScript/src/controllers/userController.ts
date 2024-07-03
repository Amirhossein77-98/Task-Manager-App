import { Request, Response } from 'express';
import { UserRepository, UserRepositoryImpl } from "../repository/userRepository";
import { UserView } from "../views/userView";

const userRepository: UserRepository = new UserRepositoryImpl;

export class UserController {
    static async register(req: Request, res: Response): Promise<void> {
        const {username, password, name} = req.body;
        await userRepository.create(username, password, name);
        UserView.displayMessage(res, `User ${username} registered successfully.`)
    }
}