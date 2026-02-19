'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';

interface TargetHitGameProps {
  onClose: () => void;
}

interface Target {
  id: number;
  x: number;
  y: number;
  size: number;
  createdAt: number;
}

export default function TargetHitGame({ onClose }: TargetHitGameProps) {
  const [targets, setTargets] = useState<Target[]>([]);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const containerRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number>(0);
  const targetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const TARGET_LIFETIME = 2000; // 2 seconds
  const SPAWN_INTERVAL = 1000; // 1 second

  useEffect(() => {
    if (!gameStarted || gameFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          finishGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const spawnTarget = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const size = Math.random() * 40 + 30; // 30-70px
      const x = Math.random() * (container.offsetWidth - size);
      const y = Math.random() * (container.offsetHeight - size);

      const newTarget: Target = {
        id: Date.now(),
        x,
        y,
        size,
        createdAt: Date.now(),
      };

      setTargets((prev) => [...prev, newTarget]);

      // Remove target after lifetime
      setTimeout(() => {
        setTargets((prev) => prev.filter((t) => t.id !== newTarget.id));
        setMisses((prev) => prev + 1);
      }, TARGET_LIFETIME);
    };

    // Spawn first target
    spawnTarget();

    // Spawn targets at intervals
    const spawnInterval = setInterval(spawnTarget, SPAWN_INTERVAL);

    // Remove expired targets
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setTargets((prev) => {
        const expired = prev.filter((t) => now - t.createdAt > TARGET_LIFETIME);
        if (expired.length > 0) {
          setMisses((prev) => prev + expired.length);
        }
        return prev.filter((t) => now - t.createdAt <= TARGET_LIFETIME);
      });
    }, 100);

    return () => {
      clearInterval(timer);
      clearInterval(spawnInterval);
      clearInterval(cleanupInterval);
      if (targetTimeoutRef.current) {
        clearTimeout(targetTimeoutRef.current);
      }
    };
  }, [gameStarted, gameFinished]);

  const handleTargetClick = (targetId: number) => {
    if (gameFinished) return;

    setTargets((prev) => prev.filter((t) => t.id !== targetId));
    setScore((prev) => prev + 1);
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setMisses(0);
    setTimeLeft(30);
    setGameFinished(false);
    setTargets([]);
    startTimeRef.current = Date.now();
  };

  const finishGame = async () => {
    setGameFinished(true);
    const accuracy = score + misses > 0 ? (score / (score + misses)) * 100 : 0;
    const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);

    try {
      await api.post('/api/training/create', {
        moduleType: 'TARGET_HIT',
        score: score * 10,
        accuracy,
        duration,
      });
    } catch (error) {
      console.error('Failed to save session:', error);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="glass p-8 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Random Target Hit</h1>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              Close
            </button>
          </div>

          {!gameStarted ? (
            <div className="text-center py-20">
              <p className="text-xl mb-6">Click targets as they appear before they disappear</p>
              <button
                onClick={startGame}
                className="px-8 py-4 rounded-lg gradient-button text-white font-semibold text-lg"
              >
                Start Game
              </button>
            </div>
          ) : gameFinished ? (
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold mb-4">Game Finished!</h2>
              <div className="space-y-4 mb-8">
                <div>
                  <p className="text-gray-400">Score</p>
                  <p className="text-4xl font-bold text-primary-blue">{score}</p>
                </div>
                <div>
                  <p className="text-gray-400">Accuracy</p>
                  <p className="text-2xl font-bold text-primary-green">
                    {score + misses > 0 ? ((score / (score + misses)) * 100).toFixed(1) : 0}%
                  </p>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={startGame}
                  className="px-6 py-3 rounded-lg gradient-button text-white font-semibold"
                >
                  Play Again
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors font-semibold"
                >
                  Back to Training
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between mb-4">
                <div>
                  <p className="text-gray-400">Score</p>
                  <p className="text-2xl font-bold">{score}</p>
                </div>
                <div>
                  <p className="text-gray-400">Time Left</p>
                  <p className="text-2xl font-bold text-primary-blue">{timeLeft}s</p>
                </div>
                <div>
                  <p className="text-gray-400">Accuracy</p>
                  <p className="text-2xl font-bold text-primary-green">
                    {score + misses > 0 ? ((score / (score + misses)) * 100).toFixed(0) : 0}%
                  </p>
                </div>
              </div>
              <div
                ref={containerRef}
                className="w-full h-[600px] rounded-lg bg-[#1a1a2e] relative overflow-hidden"
              >
                <AnimatePresence>
                  {targets.map((target) => (
                    <motion.div
                      key={target.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      onClick={() => handleTargetClick(target.id)}
                      className="absolute cursor-pointer rounded-full gradient-primary"
                      style={{
                        left: `${target.x}px`,
                        top: `${target.y}px`,
                        width: `${target.size}px`,
                        height: `${target.size}px`,
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
