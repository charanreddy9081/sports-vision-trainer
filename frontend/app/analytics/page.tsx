'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { TrainingStats, TrainingSession } from '@/types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function AnalyticsPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<TrainingStats | null>(null);
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsResponse, sessionsResponse] = await Promise.all([
          api.get('/api/training/stats'),
          api.get('/api/training/user/' + user?.id),
        ]);
        setStats(statsResponse.data);
        setSessions(sessionsResponse.data.sessions);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-2xl">Loading...</div>
        </div>
      </ProtectedRoute>
    );
  }

  // Prepare chart data
  const recentSessions = sessions.slice(0, 10).reverse();
  const reactionTimeData = {
    labels: recentSessions
      .filter((s) => s.moduleType === 'REACTION' && s.reactionTime)
      .map((_, i) => `Session ${i + 1}`),
    datasets: [
      {
        label: 'Reaction Time (ms)',
        data: recentSessions
          .filter((s) => s.moduleType === 'REACTION' && s.reactionTime)
          .map((s) => s.reactionTime!),
        borderColor: '#00D4FF',
        backgroundColor: 'rgba(0, 212, 255, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const accuracyData = {
    labels: recentSessions.map((_, i) => `Session ${i + 1}`),
    datasets: [
      {
        label: 'Accuracy (%)',
        data: recentSessions.map((s) => s.accuracy),
        borderColor: '#39FF14',
        backgroundColor: 'rgba(57, 255, 20, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const scoreData = {
    labels: recentSessions.map((_, i) => `Session ${i + 1}`),
    datasets: [
      {
        label: 'Score',
        data: recentSessions.map((s) => s.score),
        backgroundColor: '#00D4FF',
      },
    ],
  };

  const moduleDistribution = {
    labels: ['Reaction', 'Tracking', 'Color Match', 'Target Hit'],
    datasets: [
      {
        data: [
          stats?.statsByModule.REACTION.count || 0,
          stats?.statsByModule.TRACKING.count || 0,
          stats?.statsByModule.COLOR_MATCH.count || 0,
          stats?.statsByModule.TARGET_HIT.count || 0,
        ],
        backgroundColor: [
          '#00D4FF',
          '#39FF14',
          '#FF006E',
          '#FFBE0B',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#fff',
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
      y: {
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
    },
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold mb-2">Analytics</h1>
              <p className="text-gray-400">Track your performance and improvement over time</p>
            </motion.div>

            {/* Summary Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: 'Total Sessions',
                  value: stats?.totalSessions || 0,
                  color: 'text-primary-blue',
                },
                {
                  title: 'Avg Accuracy',
                  value: stats ? `${stats.avgAccuracy.toFixed(1)}%` : '0%',
                  color: 'text-primary-green',
                },
                {
                  title: 'Avg Reaction Time',
                  value: stats?.avgReactionTime
                    ? `${stats.avgReactionTime.toFixed(0)}ms`
                    : 'N/A',
                  color: 'text-primary-blue',
                },
                {
                  title: 'Current Streak',
                  value: `${stats?.streak || 0} days`,
                  color: 'text-primary-green',
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass p-6 rounded-xl"
                >
                  <div className={`text-2xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
                  <div className="text-gray-400">{stat.title}</div>
                </motion.div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass p-6 rounded-xl"
              >
                <h2 className="text-2xl font-bold mb-4">Accuracy Trend</h2>
                <div className="h-64">
                  <Line data={accuracyData} options={chartOptions} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass p-6 rounded-xl"
              >
                <h2 className="text-2xl font-bold mb-4">Score History</h2>
                <div className="h-64">
                  <Bar data={scoreData} options={chartOptions} />
                </div>
              </motion.div>
            </div>

            {reactionTimeData.datasets[0].data.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-6 rounded-xl mb-8"
              >
                <h2 className="text-2xl font-bold mb-4">Reaction Time Trend</h2>
                <div className="h-64">
                  <Line data={reactionTimeData} options={chartOptions} />
                </div>
              </motion.div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-6 rounded-xl"
              >
                <h2 className="text-2xl font-bold mb-4">Module Distribution</h2>
                <div className="h-64">
                  <Doughnut data={moduleDistribution} options={chartOptions} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-6 rounded-xl"
              >
                <h2 className="text-2xl font-bold mb-4">Module Statistics</h2>
                <div className="space-y-4">
                  {Object.entries(stats?.statsByModule || {}).map(([module, data]: [string, any]) => (
                    <div key={module} className="border-b border-white/10 pb-4">
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">{module.replace('_', ' ')}</span>
                        <span className="text-primary-blue">{data.count} sessions</span>
                      </div>
                      <div className="text-sm text-gray-400">
                        Avg Score: {data.avgScore.toFixed(0)} | Avg Accuracy:{' '}
                        {data.avgAccuracy.toFixed(1)}%
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
