import { Request, Response } from 'express';
import { SessionService } from '../services/sessionService';

export class SessionController {
    private sessionService: SessionService;

    constructor() {
        this.sessionService = new SessionService();
    }

    createSession = async (req: Request, res: Response) => {
        try {
            const session = await this.sessionService.createSession(req.body);
            res.status(201).json(session);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    getSession = async (req: Request, res: Response) => {
        const sessionId = parseInt(req.params.id);
        if (!sessionId) {
            return res.status(400).json({ message: 'Invalid session ID' });
        }

        try {
            const session = await this.sessionService.getSessionById(sessionId);
            if (session) {
                res.status(200).json(session);
            } else {
                res.status(404).json({ message: 'Session not found' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    // Additional methods for session-related operations...
}
