import { Response } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/prisma';
import { AuthRequest } from '../middleware/auth';

const upgradeSchema = z.object({
  plan: z.enum(['FREE', 'PRO']),
});

export const upgradeSubscription = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    const validatedData = upgradeSchema.parse(req.body);

    // In a real app, you would integrate with Stripe here
    // For now, we'll just update the subscription directly

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Update user subscription
    await prisma.user.update({
      where: { id: req.user.userId },
      data: {
        subscription: validatedData.plan,
      },
    });

    // Create subscription record
    const endDate = validatedData.plan === 'PRO'
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
      : null;

    await prisma.subscription.create({
      data: {
        userId: req.user.userId,
        plan: validatedData.plan,
        startDate: new Date(),
        endDate: endDate,
      },
    });

    res.json({
      message: 'Subscription upgraded successfully',
      subscription: validatedData.plan,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message });
      return;
    }
    console.error('Upgrade subscription error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSubscriptionStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        subscription: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const activeSubscription = await prisma.subscription.findFirst({
      where: {
        userId: req.user.userId,
        endDate: {
          gte: new Date(),
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({
      subscription: user.subscription,
      activeSubscription: activeSubscription ? {
        plan: activeSubscription.plan,
        startDate: activeSubscription.startDate,
        endDate: activeSubscription.endDate,
      } : null,
    });
  } catch (error) {
    console.error('Get subscription status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
