export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  subscription: 'FREE' | 'PRO';
  createdAt?: string;
}

export interface TrainingSession {
  id: string;
  userId: string;
  moduleType: 'REACTION' | 'TRACKING' | 'COLOR_MATCH' | 'TARGET_HIT';
  score: number;
  accuracy: number;
  reactionTime: number | null;
  duration: number;
  createdAt: string;
}

export interface TrainingStats {
  totalSessions: number;
  totalScore: number;
  avgAccuracy: number;
  avgReactionTime: number | null;
  streak: number;
  statsByModule: {
    REACTION: {
      count: number;
      avgScore: number;
      avgAccuracy: number;
      avgReactionTime: number;
    };
    TRACKING: {
      count: number;
      avgScore: number;
      avgAccuracy: number;
    };
    COLOR_MATCH: {
      count: number;
      avgScore: number;
      avgAccuracy: number;
    };
    TARGET_HIT: {
      count: number;
      avgScore: number;
      avgAccuracy: number;
    };
  };
  recentSessions: TrainingSession[];
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  totalScore: number;
}
