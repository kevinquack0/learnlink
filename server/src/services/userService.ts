import { UUID } from 'crypto';
import { UserDataAccess } from '../data/UserDataAccess';
import { UserDto } from '../models/UserDto';
import bcrypt from 'bcrypt';

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

    // Additional methods for user-related operations...
}
