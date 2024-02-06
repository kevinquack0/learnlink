import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();
const userController = new UserController();

// Register a new user
router.post('/register', userController.registerUser);

// Login user
router.post('/login', userController.loginUser);

// Get user profile
router.get('/profile/:id', userController.getUserProfile);

export default router;
