import { Pool } from 'pg';
import { SessionDto } from '../models/SessionDto';
require('dotenv').config();
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432', 10),
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
