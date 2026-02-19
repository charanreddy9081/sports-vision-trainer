'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';

interface ReactionTimeGameProps {
  onClose: () => void;
}

export default function ReactionTimeGame({ onClose }: ReactionTimeGameProps) {
  const [round, setRound] = useState(0);
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);
  const [showColor, setShowColor] = useState(false);
  const [color, setColor] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const colors = ['#00D4FF', '#39FF14', '#FF006E', '#FFBE0B', '#8338EC'];
  const TOTAL_ROUNDS = 10;

  const startCountdown = () => {
    setCountdown(3);
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          startRound();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startRound = () => {
    setShowColor(false);
    const delay = Math.random() * 2000 + 1000; // 1-3 seconds

    timeoutRef.current = setTimeout(() => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setColor(randomColor);
      setShowColor(true);
      setStartTime(Date.now());
    }, delay);
  };

  const gameStartTimeRef = useRef<number>(0);

  const handleClick = () => {
    if (!showColor || gameFinished) return;

    const reactionTime = Date.now() - startTime;
    const newTimes = [...reactionTimes, reactionTime];
    setReactionTimes(newTimes);
    setShowColor(false);

    if (round + 1 >= TOTAL_ROUNDS) {
      finishGame(newTimes);
    } else {
      setRound(round + 1);
      setTimeout(() => startRound(), 500);
    }
  };

  const finishGame = async (allReactionTimes?: number[]) => {
    setGameFinished(true);
    const times = allReactionTimes ?? reactionTimes;
    if (times.length === 0) return;
    const avgReactionTime = times.reduce((a, b) => a + b, 0) / times.length;
    const accuracy = 100; // All clicks are valid in this game
    const duration = Math.floor((Date.now() - gameStartTimeRef.current) / 1000);

    try {
      await api.post('/api/training/create', {
        moduleType: 'REACTION',
        score: Math.round(10000 / avgReactionTime), // Higher score for faster times
        accuracy,
        reactionTime: avgReactionTime,
        duration,
      });
    } catch (error) {
      console.error('Failed to save session:', error);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setRound(0);
    setReactionTimes([]);
    setGameFinished(false);
    gameStartTimeRef.current = Date.now();
    startCountdown();
  };

  const avgReactionTime = reactionTimes.length > 0
    ? reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length
    : 0;

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="glass p-8 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Reaction Time Test</h1>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              Close
            </button>
          </div>

          {!gameStarted ? (
            <div className="text-center py-20">
              <p className="text-xl mb-6">Click when you see a color appear</p>
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
                  <p className="text-gray-400">Average Reaction Time</p>
                  <p className="text-4xl font-bold text-primary-blue">
                    {avgReactionTime.toFixed(0)}ms
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Best Time</p>
                  <p className="text-2xl font-bold text-primary-green">
                    {Math.min(...reactionTimes).toFixed(0)}ms
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
            <div className="text-center py-20">
              {countdown > 0 ? (
                <motion.div
                  key={countdown}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-8xl font-bold text-primary-blue"
                >
                  {countdown}
                </motion.div>
              ) : (
                <>
                  <p className="text-xl mb-4">
                    Round {round + 1} of {TOTAL_ROUNDS}
                  </p>
                  <div
                    className="w-full h-96 rounded-xl cursor-pointer flex items-center justify-center transition-all"
                    style={{
                      backgroundColor: showColor ? color : '#1a1a2e',
                    }}
                    onClick={handleClick}
                  >
                    <AnimatePresence>
                      {showColor && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="text-6xl font-bold text-white"
                        >
                          CLICK!
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {showColor && (
                    <p className="mt-4 text-gray-400">Click now!</p>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
