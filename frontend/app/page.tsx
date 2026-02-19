'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

export default function Home() {
  return (
    <div className="min-h-screen text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 overflow-visible">
        <div className="container mx-auto text-center max-w-6xl overflow-visible">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-7xl font-bold mb-6 text-white"
            style={{ textShadow: '0 0 40px rgba(0,212,255,0.4), 0 2px 4px rgba(0,0,0,0.8)' }}
          >
            Sports Vision Trainer
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-2xl text-slate-200 mb-8 max-w-2xl mx-auto leading-relaxed"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
          >
            Improve your eye-hand coordination with interactive visual drills, reaction-time games, and performance analytics
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/signup"
              className="inline-block px-8 py-4 rounded-lg gradient-button text-white font-semibold text-lg shadow-lg"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}
            >
              Get Started Free
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <motion.section 
        className="py-20 px-4"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer}
      >
        <div className="container mx-auto">
          <motion.h2 
            variants={fadeUp}
            className="text-4xl font-bold text-center mb-12 text-white"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
          >
            Features
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Reaction Time Test',
                description: 'Measure and improve your reaction speed with visual stimuli',
                icon: '⚡',
              },
              {
                title: 'Moving Target Tracking',
                description: 'Enhance your tracking abilities with dynamic moving targets',
                icon: '🎯',
              },
              {
                title: 'Color Recognition',
                description: 'Test your color recognition speed and accuracy',
                icon: '🌈',
              },
              {
                title: 'Target Hit Game',
                description: 'Challenge yourself with random target hitting exercises',
                icon: '🎮',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass p-6 rounded-xl hover:bg-white/[0.08] transition-colors duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-slate-300" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section 
        className="py-20 px-4"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer}
      >
        <div className="container mx-auto">
          <motion.h2 
            variants={fadeUp}
            className="text-4xl font-bold text-center mb-12 text-white"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
          >
            Pricing
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: 'Free',
                price: '$0',
                features: [
                  'Limited training drills',
                  'Basic analytics',
                  'Leaderboard access',
                ],
              },
              {
                name: 'Pro',
                price: '$9.99',
                period: '/month',
                features: [
                  'Unlimited training drills',
                  'Advanced analytics',
                  'Performance reports',
                  'Priority support',
                ],
                highlighted: true,
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.02, y: -4 }}
                className={`glass p-8 rounded-xl transition-colors duration-300 ${plan.highlighted ? 'border-2 border-primary-blue' : 'hover:bg-white/[0.08]'}`}
              >
                <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                <div className="text-4xl font-bold mb-4 text-white">
                  {plan.price}
                  {plan.period && <span className="text-lg text-slate-300">{plan.period}</span>}
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-200">
                      <span className="text-primary-green">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`block text-center px-6 py-3 rounded-lg font-semibold ${
                    plan.highlighted
                      ? 'gradient-button text-white'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="container mx-auto text-center text-slate-400">
          <p>&copy; 2024 Sports Vision Trainer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
