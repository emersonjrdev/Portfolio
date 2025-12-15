import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function HologramCard({ title, description, icon, delay = 0 }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      return () => card.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ scale: 1.05, z: 50 }}
      className="relative perspective-1000"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        className="relative p-4 md:p-6 lg:p-8 rounded-2xl border-2 border-teal-500/50 bg-gradient-to-br from-teal-900/20 to-emerald-900/20 backdrop-blur-md overflow-hidden"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(20, 184, 166, 0.3), transparent 70%)`,
          boxShadow: `
            0 0 20px rgba(20, 184, 166, 0.3),
            0 0 40px rgba(16, 185, 129, 0.2),
            inset 0 0 20px rgba(20, 184, 166, 0.1)
          `,
        }}
      >
        {/* Linhas holográficas */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent"
            style={{
              top: `${mousePosition.y}%`,
              transform: `translateY(-50%)`,
              animation: 'scan 3s linear infinite',
            }}
          />
          <div
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-teal-400 to-transparent"
            style={{
              left: `${mousePosition.x}%`,
              transform: `translateX(-50%)`,
              animation: 'scan 3s linear infinite',
            }}
          />
        </div>

        {/* Conteúdo */}
        <div className="relative z-10">
          <motion.div
            className="text-2xl md:text-3xl lg:text-4xl mb-3 md:mb-4 text-teal-400"
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
          <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-white">{title}</h3>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed">{description}</p>
        </div>

        {/* Efeito de brilho animado */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: 'linear',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes scan {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>
    </motion.div>
  );
}

