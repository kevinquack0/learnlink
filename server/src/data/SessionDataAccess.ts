import { Pool } from 'pg';
import { SessionDto } from '../models/SessionDto';
import { v4 as uuidv4 } from 'uuid';
import { UUID } from 'crypto';
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
      INSERT INTO study_session (session_id, title, description, location, start_time, end_time, type, creator_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;
    `;
        const sessionId = uuidv4();
        const values = [
            sessionId,
            session.title,
            session.description,
            session.location,
            session.startTime,
            session.endTime,
            session.type,
            session.ownerId,
        ];

        try {
            const { rows } = await pool.query(query, values);
            return rows[0] as SessionDto;
        } catch (error) {
            throw new Error('Error creating session in database');
        }
    }

    async getSessionById(sessionId: UUID): Promise<SessionDto | null> {
        const query = 'SELECT * FROM study_session WHERE session_id = $1';
        const values = [sessionId];
        console.log(values);
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
