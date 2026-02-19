'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import api from '@/lib/api';
import { motion } from 'framer-motion';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  subscription: string;
  createdAt: string;
  _count: {
    trainingSessions: number;
  };
}

interface Analytics {
  totalUsers: number;
  totalSessions: number;
  totalProUsers: number;
  recentSessions: any[];
  sessionsByModule: Array<{ moduleType: string; count: number }>;
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, analyticsResponse] = await Promise.all([
          api.get('/api/admin/users'),
          api.get('/api/admin/analytics'),
        ]);
        setUsers(usersResponse.data.users);
        setAnalytics(analyticsResponse.data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      await api.delete(`/api/admin/user/${userId}`);
      setUsers(users.filter((u) => u.id !== userId));
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete user');
    }
  };

  if (loading) {
    return (
      <ProtectedRoute requireAdmin>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-2xl">Loading...</div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requireAdmin>
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
              <p className="text-gray-400">Manage users and view platform analytics</p>
            </motion.div>

            {error && (
              <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
                {error}
              </div>
            )}

            {/* Analytics Cards */}
            {analytics && (
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                {[
                  {
                    title: 'Total Users',
                    value: analytics.totalUsers,
                    color: 'text-primary-blue',
                  },
                  {
                    title: 'Total Sessions',
                    value: analytics.totalSessions,
                    color: 'text-primary-green',
                  },
                  {
                    title: 'Pro Users',
                    value: analytics.totalProUsers,
                    color: 'text-primary-blue',
                  },
                  {
                    title: 'Sessions Today',
                    value: analytics.recentSessions.length,
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
            )}

            {/* Sessions by Module */}
            {analytics && analytics.sessionsByModule.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-6 rounded-xl mb-8"
              >
                <h2 className="text-2xl font-bold mb-4">Sessions by Module</h2>
                <div className="grid md:grid-cols-4 gap-4">
                  {analytics.sessionsByModule.map((item, index) => (
                    <div key={index} className="bg-white/5 p-4 rounded-lg">
                      <div className="text-gray-400">{item.moduleType.replace('_', ' ')}</div>
                      <div className="text-2xl font-bold text-primary-blue">{item.count}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Users Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-6 rounded-xl"
            >
              <h2 className="text-2xl font-bold mb-4">All Users</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2">Name</th>
                      <th className="text-left py-2">Email</th>
                      <th className="text-left py-2">Role</th>
                      <th className="text-left py-2">Subscription</th>
                      <th className="text-left py-2">Sessions</th>
                      <th className="text-left py-2">Joined</th>
                      <th className="text-left py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-white/5">
                        <td className="py-2">{user.name}</td>
                        <td className="py-2">{user.email}</td>
                        <td className="py-2">
                          <span
                            className={`px-2 py-1 rounded ${
                              user.role === 'ADMIN'
                                ? 'bg-purple-500/20 text-purple-400'
                                : 'bg-white/10 text-white'
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="py-2">
                          <span
                            className={`px-2 py-1 rounded ${
                              user.subscription === 'PRO'
                                ? 'bg-primary-green/20 text-primary-green'
                                : 'bg-white/10 text-white'
                            }`}
                          >
                            {user.subscription}
                          </span>
                        </td>
                        <td className="py-2">{user._count.trainingSessions}</td>
                        <td className="py-2">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-2">
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="px-3 py-1 rounded bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
