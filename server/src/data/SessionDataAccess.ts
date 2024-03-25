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
    async createSession(session: any): Promise<any> {
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
            session.creatorId,
        ];

        try {
            const { rows } = await pool.query(query, values);
            return rows[0] as SessionDto;
        } catch (error) {
            console.log('123', error)
            throw new Error('Error creating session in database' + "-->" + values);
        }
    }
    async getAllSessionsByStudentId(studentId: UUID): Promise<SessionDto[]> {
        const query = 'SELECT * FROM study_session WHERE creator_id = $1';
        const values = [studentId];

        try {
            const { rows } = await pool.query(query, values);
            return rows as SessionDto[];
        } catch (error) {
            console.log("error23", error)
            throw new Error('Error retrieving sessions from database');
        }
    }
    async getSessionById(sessionId: UUID): Promise<SessionDto | null> {
        const query = 'SELECT * FROM study_session WHERE session_id = $1';
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

    async deleteSessionById(sessionId: UUID): Promise<JSON | null> {
        const query = 'DELETE FROM study_session WHERE session_id = $1';
        const values = [sessionId];

        try {
            const { rowCount } = await pool.query(query, values);
            if (rowCount != null) {
                const message: JSON = <JSON><unknown>{
                    "message": "Session successfully deleted"
                }
                return message;
            }
            return null;
        } catch (error) {
            throw new Error('Error deleting session from database');
        }
    }

    async updateSession(session: SessionDto, id: UUID): Promise<JSON | null> {
        const query = `UPDATE study_session 
        SET title = $2, description = $3, location = $4, start_time = $5, end_time = $6, type = $7, creator_id = $8
        WHERE session_id = $1;`;
        const values = [
            id,
            session.title,
            session.description,
            session.location,
            session.startTime,
            session.endTime,
            session.type,
            session.ownerId,
        ];

        try {
            const { rowCount } = await pool.query(query, values);
            if (rowCount != null) {
                const message: JSON = <JSON><unknown>{
                    "message": "Session successfully updated"
                }
                return message;
            }
            return null;
        } catch (error) {
            console.log(error);
            throw new Error('Error updating session in database');
        }
    }

    // Additional methods for session-related database operations...
}
