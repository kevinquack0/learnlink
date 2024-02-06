import { Pool } from 'pg';
import { SessionDto } from '../models/SessionDto';

const pool = new Pool({
    // Database configuration
});

export class SessionDataAccess {
    async createSession(session: SessionDto): Promise<SessionDto> {
        const query = `
      INSERT INTO sessions (title, description, location, duration, start_time, end_time, owner_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
    `;
        const values = [
            session.title,
            session.description,
            session.location,
            session.duration,
            session.startTime,
            session.endTime,
            session.ownerId,
        ];

        try {
            const { rows } = await pool.query(query, values);
            return rows[0] as SessionDto;
        } catch (error) {
            throw new Error('Error creating session in database');
        }
    }

    async getSessionById(sessionId: number): Promise<SessionDto | null> {
        const query = 'SELECT * FROM sessions WHERE id = $1';
        const values = [sessionId];

        try {
            const { rows } = await pool.query(query, values);
            if (rows.length) {
                return rows[0] as SessionDto;
            }
            return null;
        } catch (error) {
            throw new Error('Error retrieving session from database');
        }
    }

    // Additional methods for session-related database operations...
}
