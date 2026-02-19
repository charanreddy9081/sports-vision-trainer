import { Router } from 'express';
import { getAllUsers, deleteUser, getAdminAnalytics } from '../controllers/adminController';
import { authenticate, requireAdmin } from '../middleware/auth';
import { apiLimiter } from '../middleware/rateLimiter';

const router = Router();

router.get('/users', authenticate, requireAdmin, apiLimiter, getAllUsers);
router.delete('/user/:id', authenticate, requireAdmin, apiLimiter, deleteUser);
router.get('/analytics', authenticate, requireAdmin, apiLimiter, getAdminAnalytics);

export default router;
