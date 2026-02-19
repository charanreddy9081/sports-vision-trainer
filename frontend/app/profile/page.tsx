'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { motion } from 'framer-motion';

const updateNameSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type UpdateNameFormData = z.infer<typeof updateNameSchema>;
type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export default function ProfilePage() {
  const { user, logout, refreshUser } = useAuth();
  const router = useRouter();
  const [subscriptionStatus, setSubscriptionStatus] = useState<any>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register: registerName,
    handleSubmit: handleSubmitName,
    formState: { errors: nameErrors },
  } = useForm<UpdateNameFormData>({
    resolver: zodResolver(updateNameSchema),
    defaultValues: { name: user?.name || '' },
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await api.get('/api/subscription/status');
        setSubscriptionStatus(response.data);
      } catch (error) {
        console.error('Failed to fetch subscription:', error);
      }
    };

    if (user) {
      fetchSubscription();
    }
  }, [user]);

  const onUpdateName = async (data: UpdateNameFormData) => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      // In a real app, you'd have an API endpoint for this
      setSuccess('Name updated successfully');
      await refreshUser();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update name');
    } finally {
      setLoading(false);
    }
  };

  const onChangePassword = async (data: ChangePasswordFormData) => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      // In a real app, you'd have an API endpoint for this
      setSuccess('Password changed successfully');
      resetPassword();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const handleUpgradeSubscription = async () => {
    try {
      setLoading(true);
      await api.post('/api/subscription/upgrade', { plan: 'PRO' });
      setSuccess('Subscription upgraded successfully');
      const response = await api.get('/api/subscription/status');
      setSubscriptionStatus(response.data);
      await refreshUser();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to upgrade subscription');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    try {
      setLoading(true);
      // In a real app, you'd have an API endpoint for this
      await logout();
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete account');
    } finally {
      setLoading(false);
    }
  };

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
              <h1 className="text-4xl font-bold mb-2">Profile</h1>
              <p className="text-gray-400">Manage your account settings</p>
            </motion.div>

            {error && (
              <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400">
                {success}
              </div>
            )}

            {/* Update Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-6 rounded-xl mb-6"
            >
              <h2 className="text-2xl font-bold mb-4">Update Name</h2>
              <form onSubmit={handleSubmitName(onUpdateName)} className="space-y-4">
                <div>
                  <label className="block mb-2">Name</label>
                  <input
                    type="text"
                    {...registerName('name')}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-primary-blue"
                  />
                  {nameErrors.name && (
                    <p className="text-red-400 text-sm mt-1">{nameErrors.name.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 rounded-lg gradient-button text-white font-semibold disabled:opacity-50"
                >
                  Update Name
                </button>
              </form>
            </motion.div>

            {/* Change Password */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-6 rounded-xl mb-6"
            >
              <h2 className="text-2xl font-bold mb-4">Change Password</h2>
              <form onSubmit={handleSubmitPassword(onChangePassword)} className="space-y-4">
                <div>
                  <label className="block mb-2">Current Password</label>
                  <input
                    type="password"
                    {...registerPassword('currentPassword')}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-primary-blue"
                  />
                  {passwordErrors.currentPassword && (
                    <p className="text-red-400 text-sm mt-1">
                      {passwordErrors.currentPassword.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-2">New Password</label>
                  <input
                    type="password"
                    {...registerPassword('newPassword')}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-primary-blue"
                  />
                  {passwordErrors.newPassword && (
                    <p className="text-red-400 text-sm mt-1">
                      {passwordErrors.newPassword.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    {...registerPassword('confirmPassword')}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-primary-blue"
                  />
                  {passwordErrors.confirmPassword && (
                    <p className="text-red-400 text-sm mt-1">
                      {passwordErrors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 rounded-lg gradient-button text-white font-semibold disabled:opacity-50"
                >
                  Change Password
                </button>
              </form>
            </motion.div>

            {/* Subscription */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-6 rounded-xl mb-6"
            >
              <h2 className="text-2xl font-bold mb-4">Subscription</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400">Current Plan</p>
                  <p className="text-2xl font-bold text-primary-blue">
                    {user?.subscription || 'FREE'}
                  </p>
                </div>
                {user?.subscription === 'FREE' && (
                  <button
                    onClick={handleUpgradeSubscription}
                    disabled={loading}
                    className="px-6 py-3 rounded-lg gradient-button text-white font-semibold disabled:opacity-50"
                  >
                    Upgrade to Pro
                  </button>
                )}
              </div>
            </motion.div>

            {/* Delete Account */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-6 rounded-xl border-2 border-red-500/50"
            >
              <h2 className="text-2xl font-bold mb-4 text-red-400">Danger Zone</h2>
              <p className="text-gray-400 mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button
                onClick={handleDeleteAccount}
                disabled={loading}
                className="px-6 py-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 font-semibold disabled:opacity-50"
              >
                Delete Account
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
