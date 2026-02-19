'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';

interface ColorMatchGameProps {
  onClose: () => void;
}

export default function ColorMatchGame({ onClose }: ColorMatchGameProps) {
  const [round, setRound] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [targetColor, setTargetColor] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [startTime, setStartTime] = useState(0);

  const colors = ['#00D4FF', '#39FF14', '#FF006E', '#FFBE0B', '#8338EC', '#FF6B35', '#4ECDC4', '#FFE66D'];
  const TOTAL_ROUNDS = 20;

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

    return () => clearInterval(timer);
  }, [gameStarted, gameFinished]);

  const generateRound = () => {
    const target = colors[Math.floor(Math.random() * colors.length)];
    const shuffled = [...colors].sort(() => Math.random() - 0.5).slice(0, 4);
    if (!shuffled.includes(target)) {
      shuffled[Math.floor(Math.random() * 4)] = target;
    }
    setTargetColor(target);
    setOptions(shuffled);
    setSelected(null);
  };

  const handleSelect = (color: string) => {
    if (selected || gameFinished) return;

    setSelected(color);
    if (color === targetColor) {
      setCorrect(correct + 1);
    }

    setTimeout(() => {
      if (round + 1 >= TOTAL_ROUNDS) {
        finishGame();
      } else {
        setRound(round + 1);
        generateRound();
      }
    }, 500);
  };

  const startGame = () => {
    setGameStarted(true);
    setRound(0);
    setCorrect(0);
    setGameFinished(false);
    setTimeLeft(60);
    setStartTime(Date.now());
    generateRound();
  };

  const finishGame = async () => {
    setGameFinished(true);
    const accuracy = (correct / TOTAL_ROUNDS) * 100;
    const duration = Math.floor((Date.now() - startTime) / 1000);

    try {
      await api.post('/api/training/create', {
        moduleType: 'COLOR_MATCH',
        score: correct * 10,
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
            <h1 className="text-3xl font-bold">Color Recognition Speed</h1>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              Close
            </button>
          </div>

          {!gameStarted ? (
            <div className="text-center py-20">
              <p className="text-xl mb-6">Match the target color as fast as you can</p>
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
                  <p className="text-gray-400">Correct Answers</p>
                  <p className="text-4xl font-bold text-primary-blue">{correct}/{TOTAL_ROUNDS}</p>
                </div>
                <div>
                  <p className="text-gray-400">Accuracy</p>
                  <p className="text-2xl font-bold text-primary-green">
                    {((correct / TOTAL_ROUNDS) * 100).toFixed(1)}%
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
              <div className="flex justify-between mb-8">
                <div>
                  <p className="text-gray-400">Round</p>
                  <p className="text-2xl font-bold">{round + 1}/{TOTAL_ROUNDS}</p>
                </div>
                <div>
                  <p className="text-gray-400">Time Left</p>
                  <p className="text-2xl font-bold text-primary-blue">{timeLeft}s</p>
                </div>
                <div>
                  <p className="text-gray-400">Correct</p>
                  <p className="text-2xl font-bold text-primary-green">{correct}</p>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-xl mb-4">Match this color:</p>
                <div
                  className="w-32 h-32 rounded-full mx-auto border-4 border-white/20"
                  style={{ backgroundColor: targetColor }}
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {options.map((color, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleSelect(color)}
                    disabled={selected !== null}
                    className={`w-24 h-24 rounded-full border-4 transition-all ${
                      selected === color
                        ? color === targetColor
                          ? 'border-primary-green scale-110'
                          : 'border-red-500 scale-110'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                    style={{ backgroundColor: color }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
