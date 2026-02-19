'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { TrainingStats } from '@/types';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<TrainingStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/api/training/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
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
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-400 mb-8">Track your progress and improve your skills</p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: 'Total Sessions',
                  value: stats?.totalSessions || 0,
                  icon: '📊',
                },
                {
                  title: 'Total Score',
                  value: stats?.totalScore || 0,
                  icon: '🏆',
                },
                {
                  title: 'Average Accuracy',
                  value: stats ? `${stats.avgAccuracy.toFixed(1)}%` : '0%',
                  icon: '🎯',
                },
                {
                  title: 'Current Streak',
                  value: `${stats?.streak || 0} days`,
                  icon: '🔥',
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass p-6 rounded-xl"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-gray-400">{stat.title}</div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass p-8 rounded-xl"
              >
                <h2 className="text-2xl font-bold mb-4">Start Training</h2>
                <p className="text-gray-400 mb-6">
                  Improve your eye-hand coordination with our interactive training modules
                </p>
                <Link
                  href="/training"
                  className="inline-block px-6 py-3 rounded-lg gradient-button text-white font-semibold"
                >
                  Start Training
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass p-8 rounded-xl"
              >
                <h2 className="text-2xl font-bold mb-4">View Analytics</h2>
                <p className="text-gray-400 mb-6">
                  Analyze your performance trends and track your improvement over time
                </p>
                <Link
                  href="/analytics"
                  className="inline-block px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors font-semibold"
                >
                  View Analytics
                </Link>
              </motion.div>
            </div>

            {/* Recent Sessions */}
            {stats && stats.recentSessions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-6 rounded-xl"
              >
                <h2 className="text-2xl font-bold mb-4">Recent Sessions</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2">Module</th>
                        <th className="text-left py-2">Score</th>
                        <th className="text-left py-2">Accuracy</th>
                        <th className="text-left py-2">Reaction Time</th>
                        <th className="text-left py-2">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentSessions.slice(0, 5).map((session) => (
                        <tr key={session.id} className="border-b border-white/5">
                          <td className="py-2">{session.moduleType}</td>
                          <td className="py-2">{session.score}</td>
                          <td className="py-2">{session.accuracy.toFixed(1)}%</td>
                          <td className="py-2">
                            {session.reactionTime ? `${session.reactionTime.toFixed(0)}ms` : 'N/A'}
                          </td>
                          <td className="py-2">
                            {new Date(session.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
