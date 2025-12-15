import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiZap, FiTarget } from 'react-icons/fi';

export default function SpaceGame() {
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [targets, setTargets] = useState([]);
  const [missed, setMissed] = useState(0);
  const gameAreaRef = useRef(null);
  const gameLoopRef = useRef(null);
  const targetIdRef = useRef(0);

  const createTarget = useCallback(() => {
    if (!gameActive) return;
    
    const newTarget = {
      id: targetIdRef.current++,
      x: Math.random() * 80 + 10,
      y: -10,
      speed: 1 + Math.random() * 2,
      size: 40 + Math.random() * 30,
    };
    
    setTargets(prev => [...prev, newTarget]);
  }, [gameActive]);

  const updateTargets = useCallback(() => {
    if (!gameActive) return;
    
    setTargets(prev => 
      prev.map(target => ({
        ...target,
        y: target.y + target.speed,
      })).filter(target => {
        if (target.y > 110) {
          setMissed(m => m + 1);
          return false;
        }
        return true;
      })
    );
  }, [gameActive]);

  const hitTarget = (id) => {
    setTargets(prev => prev.filter(t => t.id !== id));
    setScore(prev => prev + 10);
  };

  useEffect(() => {
    if (gameActive) {
      const createInterval = setInterval(createTarget, 800);
      const updateInterval = setInterval(updateTargets, 16);
      
      gameLoopRef.current = { createInterval, updateInterval };
      
      return () => {
        clearInterval(createInterval);
        clearInterval(updateInterval);
      };
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current.createInterval);
        clearInterval(gameLoopRef.current.updateInterval);
      }
    }
  }, [gameActive, createTarget, updateTargets]);

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setMissed(0);
    setTargets([]);
  };

  const stopGame = () => {
    setGameActive(false);
    setTargets([]);
  };

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 rounded-2xl overflow-hidden border-2 border-teal-500/50 shadow-2xl">
      {/* Estrelas de fundo */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* HUD do jogo */}
      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start">
        <div className="bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg border border-teal-500/50">
          <div className="flex items-center gap-4 text-white">
            <div className="flex items-center gap-2">
              <FiTarget className="text-teal-400" />
              <span className="font-bold">Score: {score}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiZap className="text-red-400" />
              <span className="font-bold">Missed: {missed}</span>
            </div>
          </div>
        </div>
        
        {!gameActive && (
          <motion.button
            onClick={startGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-2 rounded-lg font-bold shadow-lg hover:shadow-teal-500/50"
          >
            Iniciar Jogo
          </motion.button>
        )}
        
        {gameActive && (
          <motion.button
            onClick={stopGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-500 text-white px-6 py-2 rounded-lg font-bold shadow-lg"
          >
            Parar
          </motion.button>
        )}
      </div>

      {/* Área do jogo */}
      <div
        ref={gameAreaRef}
        className="absolute inset-0 z-10"
        style={{ touchAction: 'none' }}
      >
        <AnimatePresence>
          {targets.map((target) => (
            <motion.div
              key={target.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                y: `${target.y}%`,
                x: `${target.x}%`,
              }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => hitTarget(target.id)}
              className="absolute cursor-crosshair"
              style={{
                width: `${target.size}px`,
                height: `${target.size}px`,
                marginLeft: `-${target.size / 2}px`,
                marginTop: `-${target.size / 2}px`,
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full border-4 border-white shadow-lg hover:shadow-teal-500/50 transition-all animate-pulse">
                <div className="w-full h-full flex items-center justify-center text-white font-bold text-sm">
                  {target.size > 50 ? '💎' : '⭐'}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Instruções */}
      {!gameActive && targets.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 bg-black/80 backdrop-blur-md px-6 py-4 rounded-lg border border-teal-500/50 text-white text-center"
        >
          <p className="text-lg font-semibold mb-2">🎮 Minigame Interativo</p>
          <p className="text-sm opacity-80">Clique nos alvos que aparecem para ganhar pontos!</p>
        </motion.div>
      )}

      {/* Efeitos de partículas ao clicar */}
      {gameActive && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Linhas de energia */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
            </defs>
            {targets.map((target) => (
              <line
                key={`line-${target.id}`}
                x1="50%"
                y1="100%"
                x2={`${target.x}%`}
                y2={`${target.y}%`}
                stroke="url(#energyGradient)"
                strokeWidth="1"
                opacity="0.3"
              />
            ))}
          </svg>
        </div>
      )}
    </div>
  );
}

