import { UUID } from 'crypto';
import { UserDataAccess } from '../data/UserDataAccess';
import { UserDto } from '../models/UserDto';
import bcrypt from 'bcrypt';
import { Login } from '../models/Login';

export class UserService {
    private userDataAccess: UserDataAccess;

    constructor() {
        this.userDataAccess = new UserDataAccess();
    }

    async register(userData: UserDto): Promise<UserDto> {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser = await this.userDataAccess.createUser({ ...userData, password: hashedPassword });
        return newUser;
    }

    async getUserById(userId: UUID): Promise<UserDto | null> {
        const user = await this.userDataAccess.getUserById(userId);
        return user;
    }

    async logInUser(userData: Login): Promise<UserDto> {
        // Retrieve the user from the database
        const user = await this.userDataAccess.logInUser(userData);
        if (!user) {
            throw new Error('User not found');
        }
        
        // Check if the entered password is correct
        const isPasswordValid = await this.checkPassword(userData.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        
        // You could add token generation or session creation here if needed
        
        return user;
    }
    async checkPassword(enteredPassword: string, storedHash: string): Promise<boolean> {
        // bcrypt.compare returns a promise that resolves to true if the password matches the hash,
        // and false otherwise.
        return bcrypt.compare(enteredPassword, storedHash);
    }

    // Additional methods for user-related operations...
}
