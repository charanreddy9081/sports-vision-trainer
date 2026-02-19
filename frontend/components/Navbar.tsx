'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <nav className="glass-strong fixed top-0 left-0 right-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
            Sports Vision Trainer
          </Link>
          
          <div className="flex items-center gap-6">
            {user ? (
              <>
                <Link href="/dashboard" className="text-white hover:text-primary-blue transition-colors duration-300">
                  Dashboard
                </Link>
                <Link href="/training" className="text-white hover:text-primary-blue transition-colors duration-300">
                  Training
                </Link>
                <Link href="/analytics" className="text-white hover:text-primary-blue transition-colors duration-300">
                  Analytics
                </Link>
                <Link href="/leaderboard" className="text-white hover:text-primary-blue transition-colors duration-300">
                  Leaderboard
                </Link>
                {user.role === 'ADMIN' && (
                  <Link href="/admin" className="text-white hover:text-primary-green transition-colors duration-300">
                    Admin
                  </Link>
                )}
                <Link href="/profile" className="text-white hover:text-primary-blue transition-colors duration-300">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-white hover:text-primary-blue transition-colors duration-300">
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-lg gradient-button text-white font-semibold"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
