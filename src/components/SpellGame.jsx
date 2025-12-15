import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiZap, FiTarget, FiAward, FiPlay, FiPause, FiRotateCcw } from 'react-icons/fi';

const spells = [
  { name: 'Expelliarmus', icon: '⚡', color: 'from-red-500 to-orange-500', points: 10 },
  { name: 'Lumos', icon: '💡', color: 'from-yellow-400 to-amber-500', points: 15 },
  { name: 'Expecto Patronum', icon: '🦌', color: 'from-blue-400 to-cyan-500', points: 25 },
  { name: 'Avada Kedavra', icon: '💀', color: 'from-green-600 to-emerald-600', points: 50 },
];

export default function SpellGame() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [targets, setTargets] = useState([]);
  const [combo, setCombo] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [missed, setMissed] = useState(0);
  const gameAreaRef = useRef(null);
  const gameLoopRef = useRef(null);
  const targetIdRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('spellGameHighScore');
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const createTarget = useCallback(() => {
    if (!gameActive) return;
    
    const spell = spells[Math.floor(Math.random() * spells.length)];
    const speed = spell.points === 50 ? 0.8 : spell.points === 25 ? 1.2 : 1.5 + Math.random() * 1;
    
    const newTarget = {
      id: targetIdRef.current++,
      x: Math.random() * 90 + 5,
      y: -10,
      speed,
      size: spell.points === 50 ? 80 : spell.points === 25 ? 60 : 40 + Math.random() * 20,
      spell,
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
          setCombo(0);
          setMultiplier(1);
          return false;
        }
        return true;
      })
    );
  }, [gameActive]);

  const hitTarget = (id, spell) => {
    setTargets(prev => prev.filter(t => t.id !== id));
    const newCombo = combo + 1;
    setCombo(newCombo);
    
    const newMultiplier = Math.min(1 + Math.floor(newCombo / 5), 5);
    setMultiplier(newMultiplier);
    
    const finalPoints = spell.points * newMultiplier;
    setScore(prev => {
      const newScore = prev + finalPoints;
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('spellGameHighScore', newScore.toString());
      }
      return newScore;
    });
  };

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    
    return () => clearInterval(timerRef.current);
  }, [gameActive, timeLeft]);

  useEffect(() => {
    if (gameActive) {
      const createInterval = setInterval(createTarget, Math.max(700 - (score / 150), 400)); // Reduzido frequência
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
  }, [gameActive, createTarget, updateTargets, score]);

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setTimeLeft(30);
    setMissed(0);
    setTargets([]);
    setCombo(0);
    setMultiplier(1);
    targetIdRef.current = 0;
  };

  const stopGame = () => {
    setGameActive(false);
    setTargets([]);
  };

  return (
    <div className="relative w-full h-[600px] md:h-[700px] bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 rounded-2xl overflow-hidden border-2 border-yellow-500/50 shadow-2xl">
      {/* Fundo mágico */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(234, 179, 8, 0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Estrelas mágicas - Reduzido para performance */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-300"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 10 + 6}px`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      {/* HUD do jogo */}
      <div className="absolute top-4 left-4 right-4 z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-black/80 backdrop-blur-md px-4 py-3 rounded-lg border border-yellow-500/50">
            <div className="flex items-center gap-2 text-yellow-400 mb-1">
              <FiTarget />
              <span className="text-xs font-semibold">PONTOS</span>
            </div>
            <div className="text-2xl font-bold text-white">{score.toLocaleString()}</div>
          </div>
          
          <div className="bg-black/80 backdrop-blur-md px-4 py-3 rounded-lg border border-amber-500/50">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <FiAward />
              <span className="text-xs font-semibold">RECORDE</span>
            </div>
            <div className="text-2xl font-bold text-white">{highScore.toLocaleString()}</div>
          </div>
          
          <div className="bg-black/80 backdrop-blur-md px-4 py-3 rounded-lg border border-red-500/50">
            <div className="flex items-center gap-2 text-red-400 mb-1">
              <FiZap />
              <span className="text-xs font-semibold">COMBO</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {combo}x <span className="text-sm text-red-300">({multiplier}x)</span>
            </div>
          </div>
          
          <div className="bg-black/80 backdrop-blur-md px-4 py-3 rounded-lg border border-blue-500/50">
            <div className="flex items-center gap-2 text-blue-400 mb-1">
              <span className="text-xs font-semibold">TEMPO</span>
            </div>
            <div className={`text-2xl font-bold ${timeLeft <= 5 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
              {timeLeft}s
            </div>
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
        {!gameActive && (
          <motion.button
            onClick={startGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-black px-6 py-3 rounded-lg font-bold shadow-lg hover:shadow-yellow-500/50"
          >
            <FiPlay />
            Lançar Feitiços
          </motion.button>
        )}
        
        {gameActive && (
          <>
            <motion.button
              onClick={stopGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg"
            >
              <FiPause />
              Pausar
            </motion.button>
            <motion.button
              onClick={startGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-slate-700 text-white px-6 py-3 rounded-lg font-bold shadow-lg"
            >
              <FiRotateCcw />
              Reiniciar
            </motion.button>
          </>
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
              initial={{ scale: 0, opacity: 0, rotate: -180 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                rotate: 0,
                top: `${target.y}%`,
                left: `${target.x}%`,
              }}
              exit={{ scale: 0, opacity: 0, rotate: 180 }}
              onClick={() => hitTarget(target.id, target.spell)}
              className="absolute cursor-crosshair"
              style={{
                width: `${target.size}px`,
                height: `${target.size}px`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <motion.div
                className={`w-full h-full bg-gradient-to-br ${target.spell.color} rounded-full border-4 border-white shadow-2xl hover:shadow-yellow-500/50 transition-all relative overflow-hidden`}
                animate={{
                  boxShadow: [
                    `0 0 20px rgba(234, 179, 8, 0.5)`,
                    `0 0 40px rgba(234, 179, 8, 0.8)`,
                    `0 0 20px rgba(234, 179, 8, 0.5)`,
                  ],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              >
                <div className="w-full h-full flex flex-col items-center justify-center text-white font-bold text-2xl relative z-10">
                  <div>{target.spell.icon}</div>
                  <div className="text-xs mt-1">{target.spell.name}</div>
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: 'linear',
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Instruções */}
      {!gameActive && targets.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 bg-black/90 backdrop-blur-md px-6 py-4 rounded-lg border border-yellow-500/50 text-white text-center max-w-md"
        >
          <p className="text-xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
            🪄 Jogo de Feitiços
          </p>
          <p className="text-sm opacity-80 mb-2">Clique nos feitiços para ganhar pontos!</p>
          <div className="text-xs opacity-60 space-y-1">
            <p>💀 Avada Kedavra = 50pts | 🦌 Expecto Patronum = 25pts</p>
            <p>💡 Lumos = 15pts | ⚡ Expelliarmus = 10pts</p>
            <p>Combo aumenta o multiplicador! Máximo 5x</p>
          </div>
        </motion.div>
      )}

      {/* Efeitos de magia */}
      {gameActive && (
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="magicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </linearGradient>
            </defs>
            {targets.map((target) => (
              <line
                key={`line-${target.id}`}
                x1="50%"
                y1="100%"
                x2={`${target.x}%`}
                y2={`${target.y}%`}
                stroke="url(#magicGradient)"
                strokeWidth="1"
                opacity="0.2"
              />
            ))}
          </svg>
        </div>
      )}
    </div>
  );
}

