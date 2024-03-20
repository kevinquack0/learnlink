import { Pool } from 'pg';
import { UserDto } from '../models/UserDto';
import { v4 as uuidv4 } from 'uuid';
import { UUID } from 'crypto';
import { Login } from '../models/Login';
import bcrypt from 'bcrypt';

require('dotenv').config();
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432', 10),
});

export class UserDataAccess {
    async getUserById(userId: UUID): Promise<UserDto | null> {
        const query = 'SELECT * FROM student WHERE student_id = $1';
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

    async logInUser(user: Login): Promise<UserDto | null> {
        const query = 'SELECT * FROM student WHERE email = $1';
        const values = [user.email];
        try {
            const { rows } = await pool.query(query, values);

            if (rows.length === 0) {
                return null;
            }

            const output = await this.checkPassword(user.password, rows);
            if (output >= 0) {
                return rows[output] as UserDto;
            }

            return null;
        } catch (error) {
            throw new Error('Error fetching user from database');
        }
    }

    async checkPassword(guess: string, rows: Array<UserDto>): Promise<number> {
        for (let i = 0; i < rows.length; i++) {
            const res = await new Promise<boolean>((resolve, reject) => {
                bcrypt.compare(guess, rows[i].password, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });

            if (res) {
                return i;
            }
        }

        return -1;
    }

}
