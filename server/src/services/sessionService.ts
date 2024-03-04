import { UUID } from 'crypto';
import { SessionDataAccess } from '../data/SessionDataAccess';
import { SessionDto } from '../models/SessionDto';

export class SessionService {
    private sessionDataAccess: SessionDataAccess;

    constructor() {
        this.sessionDataAccess = new SessionDataAccess();
    }

    async createSession(sessionData: SessionDto): Promise<SessionDto> {
        // You could add business logic here before creating the session
        // For example, validating the session data, checking for scheduling conflicts, etc.

        // After business logic has been applied, create the session
        const newSession = await this.sessionDataAccess.createSession(sessionData);
        return newSession;
    }

    async getSessionById(sessionId: UUID): Promise<SessionDto | null> {
        // Business logic can be added here as needed, such as access controls or transformations

        // Retrieve the session from the data access layer
        const session = await this.sessionDataAccess.getSessionById(sessionId);
        return session;
    }

    async deleteSessionById(sessionId: UUID): Promise<JSON | null> {
        // Business logic can be added here as needed, such as access controls or transformations

        // Retrieve the session from the data access layer
        const session = await this.sessionDataAccess.deleteSessionById(sessionId);
        return session;
    }

    // Additional methods for session-related operations can be added here
}
