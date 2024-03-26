import { UUID } from 'crypto';
import { SessionDataAccess } from '../data/SessionDataAccess';
import { SessionDto } from '../models/SessionDto';

export class SessionService {
    private sessionDataAccess: SessionDataAccess;

    constructor() {
        this.sessionDataAccess = new SessionDataAccess();
    }

    async createSession(sessionData: SessionDto): Promise<SessionDto> {

        const newSession = await this.sessionDataAccess.createSession(sessionData);
        return newSession;
    }

    async getSessionById(sessionId: UUID): Promise<SessionDto | null> {

        const session = await this.sessionDataAccess.getSessionById(sessionId);
        return session;
    }

    async deleteSessionById(sessionId: UUID): Promise<JSON | null> {

        const session = await this.sessionDataAccess.deleteSessionById(sessionId);
        return session;
    }
    async getAllSessionsByStudentId(studentId: UUID): Promise<SessionDto[] | null> {

        try {
            const sessions = await this.sessionDataAccess.getAllSessionsByStudentId(studentId);
            return sessions.length > 0 ? sessions : [];
        } catch (error: any) {
            throw error;
        }
    }
    async getAllSessions(studentId: UUID): Promise<SessionDto[] | null> {

        try {
            const sessions = await this.sessionDataAccess.getAllSessionsExceptStudentId(studentId);
            return sessions.length > 0 ? sessions : [];
        } catch (error: any) {
            throw error;
        }
    }
    async updateSession(sessionData: SessionDto, id: UUID): Promise<JSON | null> {

        const newSession = await this.sessionDataAccess.updateSession(sessionData, id);
        return newSession;
    }

    // Additional methods for session-related operations can be added here
}
