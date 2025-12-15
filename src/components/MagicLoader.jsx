import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function MagicLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Inicializando magia...');

  const loadingMessages = [
    'Inicializando magia...',
    'Convocando varinhas...',
    'Preparando poções...',
    'Abrindo o Grimório...',
    'Ativando feitiços...',
    'Sincronizando com Hogwarts...',
    'Magia pronta!',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const messageInterval = setInterval(() => {
      const currentIndex = Math.floor((progress / 100) * loadingMessages.length);
      if (currentIndex < loadingMessages.length) {
        setLoadingText(loadingMessages[currentIndex]);
      }
    }, 300);

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 z-50 flex flex-col items-center justify-center overflow-hidden">
      {/* Estrelas mágicas */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-300"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      {/* Partículas mágicas */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 text-center">
        {/* Logo/Título */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping:15 }}
          className="mb-8"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-extrabold mb-4"
            animate={{
              textShadow: [
                '0 0 20px rgba(234, 179, 8, 0.5)',
                '0 0 40px rgba(234, 179, 8, 0.8)',
                '0 0 20px rgba(234, 179, 8, 0.5)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 bg-clip-text text-transparent animate-gradient">
              PORTFOLIO
            </span>
          </motion.h1>
          <div className="flex items-center justify-center gap-2 text-yellow-400">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              ⚡
            </motion.div>
            <span className="text-sm font-mono">MAGIA ATIVADA</span>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              ✨
            </motion.div>
          </div>
        </motion.div>

        {/* Barra de progresso mágica */}
        <div className="w-80 md:w-96 mb-6">
          <div className="relative h-3 bg-slate-800 rounded-full overflow-hidden border-2 border-yellow-500/50 shadow-lg">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-white/30"
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
            {/* Brilho mágico */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/50 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: 'linear',
              }}
            />
          </div>
          <motion.p
            className="text-yellow-400 font-mono text-sm mt-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            {progress}%
          </motion.p>
        </div>

        {/* Texto de carregamento */}
        <motion.p
          key={loadingText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-amber-300 font-mono text-sm md:text-base mb-8"
        >
          {loadingText}
        </motion.p>

        {/* Varinha animada */}
        <motion.div
          className="flex items-center justify-center"
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <div className="text-6xl">🪄</div>
        </motion.div>
      </div>

      {/* Linhas de magia */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          y: ['-100%', '100%'],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: 'linear',
        }}
      >
        <div className="w-full h-1 bg-gradient-to-b from-transparent via-yellow-400/30 to-transparent"></div>
      </motion.div>
    </div>
  );
}

