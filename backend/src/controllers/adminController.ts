import { Response } from 'express';
import { prisma } from '../utils/prisma';
import { AuthRequest } from '../middleware/auth';

export const getAllUsers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        subscription: true,
        createdAt: true,
        _count: {
          select: {
            trainingSessions: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ users });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;

    if (!userId) {
      res.status(400).json({ error: 'User ID required' });
      return;
    }

    // Prevent self-deletion
    if (userId === req.user?.userId) {
      res.status(400).json({ error: 'Cannot delete your own account' });
      return;
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAdminAnalytics = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const totalUsers = await prisma.user.count();
    const totalSessions = await prisma.trainingSession.count();
    const totalProUsers = await prisma.user.count({
      where: { subscription: 'PRO' },
    });

    const recentSessions = await prisma.trainingSession.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    const sessionsByModule = await prisma.trainingSession.groupBy({
      by: ['moduleType'],
      _count: {
        id: true,
      },
    });

    res.json({
      totalUsers,
      totalSessions,
      totalProUsers,
      recentSessions,
      sessionsByModule: sessionsByModule.map(item => ({
        moduleType: item.moduleType,
        count: item._count.id,
      })),
    });
  } catch (error) {
    console.error('Get admin analytics error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
