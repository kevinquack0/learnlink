import { Pool } from 'pg';

require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432', 10),
});

export class SearchDataAccess {
    async searchSessions(searchCriteria: any): Promise<any[]> {
        // Your search criteria should be more specific, and you should use parameterized queries to prevent SQL injection
        const query = `
      SELECT * FROM sessions
      WHERE 
        title ILIKE $1 OR
        description ILIKE $1
      ORDER BY start_time;
    `;
        const values = [`%${searchCriteria.query}%`];

        try {
            const { rows } = await pool.query(query, values);
            return rows;
        } catch (error) {
            throw new Error('Error searching for sessions in database');
        }
    }

    // Additional methods for search-related database operations...
}
