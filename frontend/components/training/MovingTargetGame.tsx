'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import api from '@/lib/api';

interface MovingTargetGameProps {
  onClose: () => void;
}

export default function MovingTargetGame({ onClose }: MovingTargetGameProps) {
  const [targets, setTargets] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [speed, setSpeed] = useState(2);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>(0);
  const scoreRef = useRef(0);
  scoreRef.current = score;

  const TARGET_COUNT = 3;
  const GAME_DURATION = 30;

  useEffect(() => {
    if (!gameStarted || gameFinished) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const moveTargets = () => {
      setTargets((prev) =>
        prev.map((target) => {
          let newX = target.x + (Math.random() - 0.5) * speed * 2;
          let newY = target.y + (Math.random() - 0.5) * speed * 2;

          // Keep targets within bounds
          newX = Math.max(target.size, Math.min(canvas.width - target.size, newX));
          newY = Math.max(target.size, Math.min(canvas.height - target.size, newY));

          return { ...target, x: newX, y: newY };
        })
      );
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      targets.forEach((target) => {
        ctx.beginPath();
        ctx.arc(target.x, target.y, target.size, 0, Math.PI * 2);
        ctx.fillStyle = '#39FF14';
        ctx.fill();
        ctx.strokeStyle = '#00D4FF';
        ctx.lineWidth = 3;
        ctx.stroke();
      });

      moveTargets();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameStarted, gameFinished, targets, speed]);

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

    // Increase speed every 5 seconds
    const speedInterval = setInterval(() => {
      setSpeed((prev) => Math.min(prev + 0.5, 5));
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(speedInterval);
    };
  }, [gameStarted, gameFinished]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!gameStarted || gameFinished) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let hit = false;
    setTargets((prev) => {
      const newTargets = prev.filter((target) => {
        const distance = Math.sqrt(
          Math.pow(x - target.x, 2) + Math.pow(y - target.y, 2)
        );
        if (distance <= target.size) {
          hit = true;
          return false; // Remove hit target
        }
        return true;
      });

      // Add new target if one was hit
      if (hit && newTargets.length < TARGET_COUNT) {
        newTargets.push({
          id: Date.now(),
          x: Math.random() * (canvas.width - 40) + 20,
          y: Math.random() * (canvas.height - 40) + 20,
          size: 20,
        });
      }

      return newTargets;
    });

    if (hit) {
      setScore(score + 1);
    } else {
      setMisses(misses + 1);
    }
  };

  // When game starts, canvas is mounted; init its size and targets in this effect
  useEffect(() => {
    if (!gameStarted || gameFinished) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = 600;

    const initialTargets = Array.from({ length: TARGET_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * (canvas.width - 40) + 20,
      y: Math.random() * (canvas.height - 40) + 20,
      size: 20,
    }));
    setTargets(initialTargets);
  }, [gameStarted, gameFinished]);

  const startGame = () => {
    setScore(0);
    setMisses(0);
    setTimeLeft(GAME_DURATION);
    setSpeed(2);
    setGameFinished(false);
    setGameStarted(true);
    startTimeRef.current = Date.now();
  };

  const finishGame = async () => {
    setGameFinished(true);
    const finalScore = scoreRef.current;
    const totalClicks = score + misses;
    const accuracy = totalClicks > 0 ? (finalScore / totalClicks) * 100 : 0;
    const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);

    try {
      await api.post('/api/training/create', {
        moduleType: 'TRACKING',
        score: finalScore,
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
            <h1 className="text-3xl font-bold">Moving Target Tracking</h1>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              Close
            </button>
          </div>

          {!gameStarted ? (
            <div className="text-center py-20">
              <p className="text-xl mb-6">Click on the moving targets as fast as you can</p>
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
                    {((score / (score + misses)) * 100).toFixed(1)}%
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
              <canvas
                ref={canvasRef}
                onClick={handleCanvasClick}
                className="w-full h-[600px] rounded-lg bg-[#1a1a2e] cursor-crosshair"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
