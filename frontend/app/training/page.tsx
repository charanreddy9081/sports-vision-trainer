'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ReactionTimeGame from '@/components/training/ReactionTimeGame';
import MovingTargetGame from '@/components/training/MovingTargetGame';
import ColorMatchGame from '@/components/training/ColorMatchGame';
import TargetHitGame from '@/components/training/TargetHitGame';

type ModuleType = 'REACTION' | 'TRACKING' | 'COLOR_MATCH' | 'TARGET_HIT' | null;

export default function TrainingPage() {
  const [activeModule, setActiveModule] = useState<ModuleType>(null);

  const modules = [
    {
      id: 'REACTION' as const,
      title: 'Reaction Time Test',
      description: 'Measure your reaction speed when colors appear',
      icon: '⚡',
    },
    {
      id: 'TRACKING' as const,
      title: 'Moving Target Tracking',
      description: 'Click moving targets to improve tracking skills',
      icon: '🎯',
    },
    {
      id: 'COLOR_MATCH' as const,
      title: 'Color Recognition Speed',
      description: 'Match colors as fast as possible',
      icon: '🌈',
    },
    {
      id: 'TARGET_HIT' as const,
      title: 'Random Target Hit',
      description: 'Hit randomly appearing targets',
      icon: '🎮',
    },
  ];

  if (activeModule === 'REACTION') {
    return (
      <ProtectedRoute>
        <Navbar />
        <ReactionTimeGame onClose={() => setActiveModule(null)} />
      </ProtectedRoute>
    );
  }

  if (activeModule === 'TRACKING') {
    return (
      <ProtectedRoute>
        <Navbar />
        <MovingTargetGame onClose={() => setActiveModule(null)} />
      </ProtectedRoute>
    );
  }

  if (activeModule === 'COLOR_MATCH') {
    return (
      <ProtectedRoute>
        <Navbar />
        <ColorMatchGame onClose={() => setActiveModule(null)} />
      </ProtectedRoute>
    );
  }

  if (activeModule === 'TARGET_HIT') {
    return (
      <ProtectedRoute>
        <Navbar />
        <TargetHitGame onClose={() => setActiveModule(null)} />
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
              className="mb-8"
            >
              <h1 className="text-4xl font-bold mb-2">Training Modules</h1>
              <p className="text-gray-400">Choose a module to start training</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {modules.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass p-8 rounded-xl hover:scale-105 transition-transform cursor-pointer"
                  onClick={() => setActiveModule(module.id)}
                >
                  <div className="text-5xl mb-4">{module.icon}</div>
                  <h2 className="text-2xl font-bold mb-2">{module.title}</h2>
                  <p className="text-gray-400 mb-6">{module.description}</p>
                  <button className="px-6 py-3 rounded-lg gradient-button text-white font-semibold">
                    Start Training
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
