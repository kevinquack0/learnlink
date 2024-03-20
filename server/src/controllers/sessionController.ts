import { Request, Response } from 'express';
import { SessionService } from '../services/sessionService';
import { UUID } from 'crypto';

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
        const sessionId = req.body.id as UUID;

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
    getAllSessions = async (req: Request, res: Response) => {
        const studentId = req.body.student_id;
        if (!studentId) {
            return res.status(400).json({ message: 'Invalid student ID' });
        }

        try {
            const sessions: any = await this.sessionService.getAllSessionsByStudentId(studentId);
            if (sessions.length > 0) {
                res.status(200).json(sessions);
            } else {
                res.status(404).json({ message: 'No sessions found' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
    deleteSession = async (req: Request, res: Response) => {
        const sessionId = req.query.id as UUID;

        if (!sessionId) {
            return res.status(400).json({ message: 'Invalid session ID' });
        }

        try {
            const session = await this.sessionService.deleteSessionById(sessionId);
            if (session) {
                res.status(200).json(session);
            } else {
                res.status(404).json({ message: 'Session not found' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    updateSession = async (req: Request, res: Response) => {
        const sessionId = req.query.id as UUID;

        try {
            const session = await this.sessionService.updateSession(req.body, sessionId);
            res.status(201).json(session);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    // Additional methods for session-related operations...
}
