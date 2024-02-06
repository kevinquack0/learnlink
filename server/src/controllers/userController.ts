import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export default class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async registerUser(req: Request, res: Response) {
        try {
            const user = await this.userService.register(req.body);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async loginUser(req: Request, res: Response) {
        // Implementation for login
    }

    async getUserProfile(req: Request, res: Response) {
        // Implementation for fetching user profile
    }
}
