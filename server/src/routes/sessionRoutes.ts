import express from 'express';
import { SessionController } from '../controllers/sessionController';

const router = express.Router();
const sessionController = new SessionController();


router.post('/', sessionController.createSession);

router.post('/getById', sessionController.getByIdSessions);

router.get('/get', sessionController.getSession);

router.post('/getAll', sessionController.getAllSessions);



router.delete('/delete', sessionController.deleteSession);

router.put('/update', sessionController.updateSession);


export default router;
