import express from 'express';
import { SearchController } from '../controllers/searchController';

const router = express.Router();
const searchController = new SearchController();

// Endpoint for searching sessions
router.get('/sessions', searchController.searchSessions);

// Additional search-related routes can be added here

export default router;
