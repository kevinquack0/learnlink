import { Pool } from 'pg';
import { UserDto } from '../models/UserDto';
import { v4 as uuidv4 } from 'uuid';
require('dotenv').config();
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432', 10),
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
        const query = `
            INSERT INTO student(student_id, name, email, password, major, second_major, minor, classes)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `;
        // Generate a UUID for the student_id
        const studentId = uuidv4();
        // Convert classes array to a comma-separated string
        const classesString = user.classes.join(',');

        const values = [
            studentId,
            user.name,
            user.email,
            user.password,
            user.major,
            user.second_major || null,
            user.minor || null,
            classesString
        ];

        try {
            const { rows } = await pool.query(query, values);
            return rows[0] as UserDto;
        } catch (error) {
            throw new Error('Error creating new user in database');
        }
    }
}
