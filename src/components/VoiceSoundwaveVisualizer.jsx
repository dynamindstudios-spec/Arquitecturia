import React from 'react';
import { motion } from 'framer-motion';

/**
 * VoiceSoundwaveVisualizer
 * Visualizador de frecuencias de audio dinámico y reactivo a voz.
 */
export const VoiceSoundwaveVisualizer = ({ isActive = false, isListening = false, barsCount = 14 }) => {
  const bars = Array.from({ length: barsCount });

  return (
    <div className="flex items-center justify-center gap-1 h-6 px-3 py-1 bg-black/40 border border-white/5 rounded-full backdrop-blur-sm">
      {bars.map((_, i) => {
        // Vary heights organically
        const centerDistance = Math.abs(i - barsCount / 2) / (barsCount / 2);
        const baseMultiplier = 1 - centerDistance * 0.4;

        return (
          <motion.span
            key={i}
            animate={{
              scaleY: isActive
                ? [
                    0.25 * baseMultiplier,
                    (0.6 + Math.sin(i * 1.3) * 0.4) * baseMultiplier,
                    (1.0 - Math.cos(i * 0.9) * 0.3) * baseMultiplier,
                    0.3 * baseMultiplier
                  ]
                : isListening
                ? [0.2, 0.5, 0.3]
                : 0.15
            }}
            transition={{
              duration: isActive ? 0.45 + (i % 3) * 0.15 : 0.8,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: (i * 0.04) % 0.3
            }}
            className={`w-[2px] rounded-full origin-center ${
              isListening
                ? 'bg-amber-400 shadow-[0_0_6px_#fcd34d]'
                : isActive
                ? 'bg-brand-mint shadow-[0_0_6px_#b8ded8]'
                : 'bg-white/20'
            }`}
            style={{ height: '100%' }}
          />
        );
      })}
    </div>
  );
};
