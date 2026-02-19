import { Router } from 'express';
import { upgradeSubscription, getSubscriptionStatus } from '../controllers/subscriptionController';
import { authenticate } from '../middleware/auth';
import { apiLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/upgrade', authenticate, apiLimiter, upgradeSubscription);
router.get('/status', authenticate, getSubscriptionStatus);

export default router;
