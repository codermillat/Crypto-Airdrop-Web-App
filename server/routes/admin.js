import { Router } from 'express';
import { getAdminStats, manageUser, manageTask } from '../controllers/admin.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = Router();

// Ensure all routes are protected by admin middleware
router.use(verifyAdmin);

router.get('/stats', getAdminStats);
router.post('/users/:userId/:action', manageUser);
router.put('/tasks/:taskId', manageTask);

export default router;