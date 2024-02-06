import { Pool } from 'pg';
import { UserDto } from '../models/UserDto';

const pool = new Pool({
    // configuration from your environment or config files
});

export class UserDataAccess {
    async getUserById(userId: number): Promise<UserDto | null> {
        const query = 'SELECT * FROM users WHERE id = $1';
        const values = [userId];

        try {
            const { rows } = await pool.query(query, values);
            if (rows.length) {
                return rows[0] as UserDto;
            }
            return null;
        } catch (error) {
            throw new Error('Error fetching user from database');
        }
    }

    async createUser(user: UserDto): Promise<UserDto> {
        const query = 'INSERT INTO users(name, email, password) VALUES ($1, $2, $3) RETURNING *';
        const values = [user.name, user.email, user.password];

        try {
            const { rows } = await pool.query(query, values);
            return rows[0] as UserDto;
        } catch (error) {
            throw new Error('Error creating new user in database');
        }
    }

    // Additional methods for user-related database operations...
}
