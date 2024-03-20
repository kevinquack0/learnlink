import express from 'express';
import { SessionController } from '../controllers/sessionController';

const router = express.Router();
const sessionController = new SessionController();

// Create a new study session
router.post('/', sessionController.createSession);

router.post('/getAll', sessionController.getAllSessions);
// Retrieve a specific study session by ID
router.get('/get', sessionController.getSession);


// Delete a specific study session by ID
router.delete('/delete', sessionController.deleteSession);

// Delete a specific study session by ID
router.put('/update', sessionController.updateSession);

// Additional session-related routes can be added here

export default router;
