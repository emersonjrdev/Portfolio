import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function FuturisticLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Inicializando sistema...');

  const loadingMessages = [
    'Inicializando sistema...',
    'Carregando módulos 3D...',
    'Conectando à matrix...',
    'Sincronizando partículas...',
    'Ativando efeitos neon...',
    'Preparando experiência...',
    'Sistema pronto!',
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
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 z-50 flex flex-col items-center justify-center overflow-hidden">
      {/* Efeito de grid animado */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(cyan 1px, transparent 1px),
                            linear-gradient(90deg, cyan 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite',
        }}></div>
      </div>

      {/* Partículas de fundo */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full"
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
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              PORTFOLIO
            </span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-cyan-400">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-mono">SYSTEM ONLINE</span>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          </div>
        </motion.div>

        {/* Barra de progresso */}
        <div className="w-80 md:w-96 mb-6">
          <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden border border-cyan-500/50">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
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
          </div>
          <motion.p
            className="text-cyan-400 font-mono text-sm mt-2"
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
          className="text-purple-300 font-mono text-sm md:text-base mb-8"
        >
          {loadingText}
        </motion.p>

        {/* Círculos rotativos */}
        <div className="flex items-center justify-center gap-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-cyan-400"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Linhas de scan */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          y: ['-100%', '100%'],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: 'linear',
        }}
      >
        <div className="w-full h-1 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent"></div>
      </motion.div>

      <style>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  );
}

