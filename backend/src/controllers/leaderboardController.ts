import { Response } from 'express';
import { prisma } from '../utils/prisma';
import { AuthRequest } from '../middleware/auth';

export const getLeaderboard = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const topUsers = await prisma.leaderboard.findMany({
      orderBy: { totalScore: 'desc' },
      take: 10,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Get current user's rank
    let currentUserRank = null;
    if (req.user) {
      const userLeaderboard = await prisma.leaderboard.findUnique({
        where: { userId: req.user.userId },
      });

      if (userLeaderboard) {
        const usersAbove = await prisma.leaderboard.count({
          where: {
            totalScore: {
              gt: userLeaderboard.totalScore,
            },
          },
        });
        currentUserRank = usersAbove + 1;
      }
    }

    res.json({
      leaderboard: topUsers.map((entry, index) => ({
        rank: index + 1,
        userId: entry.user.id,
        name: entry.user.name,
        totalScore: entry.totalScore,
      })),
      currentUserRank,
    });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
