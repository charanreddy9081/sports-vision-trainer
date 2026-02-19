import { Router } from 'express';
import { getLeaderboard } from '../controllers/leaderboardController';
import { authenticate } from '../middleware/auth';
import { apiLimiter } from '../middleware/rateLimiter';

const router = Router();

router.get('/', authenticate, apiLimiter, getLeaderboard);

export default router;
