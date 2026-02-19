'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { LeaderboardEntry } from '@/types';
import { motion } from 'framer-motion';

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [currentUserRank, setCurrentUserRank] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await api.get('/api/leaderboard');
        setLeaderboard(response.data.leaderboard);
        setCurrentUserRank(response.data.currentUserRank);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-2xl">Loading...</div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold mb-2">Leaderboard</h1>
              <p className="text-gray-400">Top performers in Sports Vision Training</p>
            </motion.div>

            {currentUserRank && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-6 rounded-xl mb-8 border-2 border-primary-blue"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400">Your Rank</p>
                    <p className="text-3xl font-bold text-primary-blue">#{currentUserRank}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400">Keep training to climb the ranks!</p>
                  </div>
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-6 rounded-xl"
            >
              <div className="space-y-4">
                {leaderboard.map((entry, index) => (
                  <motion.div
                    key={entry.userId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      entry.userId === user?.id
                        ? 'bg-primary-blue/20 border-2 border-primary-blue'
                        : 'bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                          index === 0
                            ? 'bg-yellow-500 text-black'
                            : index === 1
                            ? 'bg-gray-400 text-black'
                            : index === 2
                            ? 'bg-orange-600 text-white'
                            : 'bg-white/10 text-white'
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-lg">
                          {entry.name}
                          {entry.userId === user?.id && (
                            <span className="ml-2 text-primary-blue">(You)</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-green">
                        {entry.totalScore.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-400">points</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
