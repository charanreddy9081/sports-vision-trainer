import { Response } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/prisma';
import { createTrainingSession as createTrainingSessionMongo, updateLeaderboardScore } from '../utils/mongo';
import { AuthRequest } from '../middleware/auth';

const createTrainingSchema = z.object({
  moduleType: z.enum(['REACTION', 'TRACKING', 'COLOR_MATCH', 'TARGET_HIT']),
  score: z.number().int().min(0),
  accuracy: z.number().min(0).max(100),
  reactionTime: z.number().optional(),
  duration: z.number().int().min(1),
});

export const createTrainingSession = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    const validatedData = createTrainingSchema.parse(req.body);

    // Create training session via native MongoDB (avoids replica set requirement)
    const trainingSession = await createTrainingSessionMongo({
      userId: req.user.userId,
      moduleType: validatedData.moduleType,
      score: validatedData.score,
      accuracy: validatedData.accuracy,
      reactionTime: validatedData.reactionTime ?? null,
      duration: validatedData.duration,
    });

    // Update leaderboard via native MongoDB
    await updateLeaderboardScore(req.user.userId, validatedData.score);

    res.status(201).json({
      message: 'Training session created',
      trainingSession,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message });
      return;
    }
    console.error('Create training session error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserTrainingSessions = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    const userId = req.params.id || req.user.userId;

    // Check if user is requesting their own data or is admin
    if (userId !== req.user.userId && req.user.role !== 'ADMIN') {
      res.status(403).json({ error: 'Access denied' });
      return;
    }

    const sessions = await prisma.trainingSession.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 100, // Limit to last 100 sessions
    });

    res.json({ sessions });
  } catch (error) {
    console.error('Get user training sessions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTrainingStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    const userId = req.user.userId;

    // Get all sessions
    const sessions = await prisma.trainingSession.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    // Calculate stats
    const totalSessions = sessions.length;
    const totalScore = sessions.reduce((sum, s) => sum + s.score, 0);
    const avgAccuracy = sessions.length > 0
      ? sessions.reduce((sum, s) => sum + s.accuracy, 0) / sessions.length
      : 0;
    
    const reactionSessions = sessions.filter(s => s.reactionTime !== null);
    const avgReactionTime = reactionSessions.length > 0
      ? reactionSessions.reduce((sum, s) => sum + (s.reactionTime || 0), 0) / reactionSessions.length
      : null;

    // Stats by module type
    const statsByModule = {
      REACTION: {
        count: sessions.filter(s => s.moduleType === 'REACTION').length,
        avgScore: 0,
        avgAccuracy: 0,
        avgReactionTime: 0,
      },
      TRACKING: {
        count: sessions.filter(s => s.moduleType === 'TRACKING').length,
        avgScore: 0,
        avgAccuracy: 0,
      },
      COLOR_MATCH: {
        count: sessions.filter(s => s.moduleType === 'COLOR_MATCH').length,
        avgScore: 0,
        avgAccuracy: 0,
      },
      TARGET_HIT: {
        count: sessions.filter(s => s.moduleType === 'TARGET_HIT').length,
        avgScore: 0,
        avgAccuracy: 0,
      },
    };

    // Calculate averages for each module
    Object.keys(statsByModule).forEach((moduleType) => {
      const moduleSessions = sessions.filter(s => s.moduleType === moduleType);
      if (moduleSessions.length > 0) {
        statsByModule[moduleType as keyof typeof statsByModule].avgScore =
          moduleSessions.reduce((sum, s) => sum + s.score, 0) / moduleSessions.length;
        statsByModule[moduleType as keyof typeof statsByModule].avgAccuracy =
          moduleSessions.reduce((sum, s) => sum + s.accuracy, 0) / moduleSessions.length;
        
        if (moduleType === 'REACTION') {
          const reactionTimes = moduleSessions.filter(s => s.reactionTime !== null).map(s => s.reactionTime!);
          if (reactionTimes.length > 0) {
            statsByModule.REACTION.avgReactionTime =
              reactionTimes.reduce((sum, rt) => sum + rt, 0) / reactionTimes.length;
          }
        }
      }
    });

    // Get streak (consecutive days with at least one session)
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (sessions.length > 0) {
      const sessionDates = [...new Set(sessions.map(s => {
        const date = new Date(s.createdAt);
        date.setHours(0, 0, 0, 0);
        return date.getTime();
      }))].sort((a, b) => b - a);

      let checkDate = today.getTime();
      for (const sessionDate of sessionDates) {
        if (sessionDate === checkDate) {
          streak++;
          checkDate -= 24 * 60 * 60 * 1000; // Subtract one day
        } else if (sessionDate < checkDate) {
          break;
        }
      }
    }

    res.json({
      totalSessions,
      totalScore,
      avgAccuracy: Math.round(avgAccuracy * 100) / 100,
      avgReactionTime: avgReactionTime ? Math.round(avgReactionTime * 100) / 100 : null,
      streak,
      statsByModule,
      recentSessions: sessions.slice(0, 10),
    });
  } catch (error) {
    console.error('Get training stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
