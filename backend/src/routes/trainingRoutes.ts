import { Router } from 'express';
import { createTrainingSession, getUserTrainingSessions, getTrainingStats } from '../controllers/trainingController';
import { authenticate } from '../middleware/auth';
import { apiLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/create', authenticate, apiLimiter, createTrainingSession);
router.get('/user/:id', authenticate, getUserTrainingSessions);
router.get('/stats', authenticate, getTrainingStats);

export default router;
