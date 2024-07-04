import { Request, Response } from 'express';
import { UserRepository, UserRepositoryImpl } from "../repository/userRepository";
import { UserView } from "../views/userView";
import { User } from '../models/userModel';


const userRepository: UserRepository = new UserRepositoryImpl();

export class UserController {
    static async register(req: Request, res: Response): Promise<void> {
        const {username, password, name} = req.body;
        await userRepository.create(username, password, name);
        UserView.displayMessage(res, `User ${username} registered successfully.`)
    }

    static async login(req: Request, res: Response): Promise<void> {
        const {username, password} = req.body;
        const user = await userRepository.findByUsernameAndPassword(username, password);
        if (user) {
            UserView.displayMessage(res, `Welcome ${user.username}!`);
        } else {
            res.status(401).json({message: `Login failed. Please check your username and password.`});
            console.log(`Login failed. Please check your username and password.`)
        }
    }
}