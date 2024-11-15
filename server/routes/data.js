import { Router } from 'express';
import { fetchAllData } from '../controllers/data.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/all', verifyAdmin, fetchAllData);

export default router;