import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { UUID } from 'crypto';

export default class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    registerUser = async (req: Request, res: Response) => {
        try {
            const user = await this.userService.register(req.body);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    loginUser = async (req: Request, res: Response) => {
        try {
            const user = await this.userService.logInUser(req.body);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    getUserProfile = async (req: Request, res: Response) => {
        const userId = req.query.id as UUID;

        if (!userId) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        try {
            const user = await this.userService.getUserById(userId);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
