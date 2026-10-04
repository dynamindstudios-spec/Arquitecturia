import React from 'react';
import { motion } from 'framer-motion';

/**
 * ArchitecturalVoiceOrb
 * Orbe cuántico de voz cinemático para el Concierge Inteligente de ArquitecturIA.
 * Modos de estado:
 * - 'idle': Respiración sutil, rotación etérea de anillos orbitales.
 * - 'listening': Ondas reactivas en tono ámbar/menta, halo pulsante de captura.
 * - 'speaking': Frecuencias de audio moduladas, ondas expansivas, resplandor biomórfico.
 * - 'thinking': Rotación acelerada de anillos concéntricos.
 */
export const ArchitecturalVoiceOrb = ({ 
  state = 'idle', // 'idle' | 'listening' | 'speaking' | 'thinking'
  size = 'md',    // 'sm' (trigger), 'md' (header), 'lg' (showcase)
  onClick
}) => {
  const isSpeaking = state === 'speaking';
  const isListening = state === 'listening';
  const isThinking = state === 'thinking';

  // Dimension presets
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-24 h-24'
  }[size] || 'w-14 h-14';

  const coreSizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-16 h-16'
  }[size] || 'w-9 h-9';

  return (
    <div 
      onClick={onClick}
      className={`relative ${sizeClasses} flex items-center justify-center select-none cursor-pointer group`}
    >
      {/* 1. Outer Ethereal Shockwaves (Audio Reactive) */}
      {(isSpeaking || isListening) && (
        <>
          <motion.div
            animate={{
              scale: isSpeaking ? [1, 1.8, 2.2] : [1, 1.5, 1.8],
              opacity: [0.6, 0.2, 0]
            }}
            transition={{
              duration: isSpeaking ? 1.4 : 2.0,
              repeat: Infinity,
              ease: "easeOut"
            }}
            className={`absolute inset-0 rounded-full border ${
              isListening ? 'border-amber-400/40 bg-amber-400/5' : 'border-brand-mint/50 bg-brand-mint/10'
            }`}
          />
          <motion.div
            animate={{
              scale: isSpeaking ? [1, 1.5, 1.9] : [1, 1.3, 1.6],
              opacity: [0.7, 0.25, 0]
            }}
            transition={{
              duration: isSpeaking ? 1.4 : 2.0,
              delay: 0.4,
              repeat: Infinity,
              ease: "easeOut"
            }}
            className={`absolute inset-0 rounded-full border ${
              isListening ? 'border-amber-300/40' : 'border-brand-mint-light/40'
            }`}
          />
        </>
      )}

      {/* 2. Ambient Volumetric Glow */}
      <motion.div
        animate={{
          scale: isSpeaking ? [1, 1.25, 1.05, 1.3, 1] : isListening ? [1, 1.15, 1] : [1, 1.08, 1],
          opacity: isSpeaking ? [0.6, 0.9, 0.6] : isListening ? 0.75 : 0.45
        }}
        transition={{
          duration: isSpeaking ? 1.2 : isListening ? 1.8 : 3.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`absolute inset-0 rounded-full blur-xl pointer-events-none transition-colors duration-500 ${
          isListening 
            ? 'bg-gradient-to-tr from-amber-500/50 via-amber-300/30 to-brand-mint/40' 
            : 'bg-gradient-to-tr from-brand-mint/40 via-brand-mint-light/30 to-brand-mint/60'
        }`}
      />

      {/* 3. Orbital Gyro Rings (3D Architectural Horizon) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Ring 1 - Vertical Axial Tilt */}
        <motion.div
          animate={{
            rotateZ: [0, 360],
            rotateX: [65, 75, 65]
          }}
          transition={{
            rotateZ: { duration: isSpeaking ? 6 : isThinking ? 3 : 14, repeat: Infinity, ease: "linear" },
            rotateX: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className={`absolute w-full h-full rounded-full border ${
            isListening ? 'border-amber-400/40' : 'border-brand-mint/40'
          } opacity-60`}
          style={{ transformStyle: 'preserve-3d' }}
        />

        {/* Ring 2 - Counter-Rotating Inclined Ring */}
        <motion.div
          animate={{
            rotateZ: [360, 0],
            rotateY: [60, 70, 60]
          }}
          transition={{
            rotateZ: { duration: isSpeaking ? 8 : isThinking ? 4 : 18, repeat: Infinity, ease: "linear" },
            rotateY: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
          className={`absolute w-full h-full rounded-full border border-dashed ${
            isListening ? 'border-amber-300/30' : 'border-white/30'
          } opacity-50`}
          style={{ transformStyle: 'preserve-3d' }}
        />

        {/* Ring 3 - Dynamic Node Orbit */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: isSpeaking ? 3 : 9, repeat: Infinity, ease: "linear" }}
          className="absolute w-full h-full"
        >
          <span className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full ${
            isListening ? 'bg-amber-300 shadow-[0_0_8px_#fcd34d]' : 'bg-brand-mint shadow-[0_0_8px_#b8ded8]'
          }`} />
        </motion.div>
      </div>

      {/* 4. Glass Sphere Shell & Concentric Core */}
      <motion.div
        animate={{
          scale: isSpeaking ? [1, 1.08, 0.96, 1.05, 1] : isListening ? [1, 1.04, 1] : [1, 1.02, 1]
        }}
        transition={{
          duration: isSpeaking ? 0.9 : 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`relative ${coreSizeClasses} rounded-full bg-gradient-to-b from-brand-surface/90 via-brand-deep to-black border ${
          isListening 
            ? 'border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.5)]' 
            : 'border-brand-mint/60 shadow-[0_0_20px_rgba(184,222,216,0.35)]'
        } overflow-hidden flex items-center justify-center backdrop-blur-md`}
      >
        {/* Living Inner Gradient Plasma */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: isSpeaking ? [1, 1.3, 1] : [1, 1.1, 1]
          }}
          transition={{
            rotate: { duration: isSpeaking ? 4 : 10, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className={`absolute -inset-2 opacity-75 blur-[3px] ${
            isListening
              ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-300 via-brand-mint to-amber-700'
              : 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-mint-light via-brand-mint to-brand-deep'
          }`}
        />

        {/* Specular Highlight Arc (Apple Glass effect) */}
        <div className="absolute inset-x-1 top-0.5 h-[40%] rounded-t-full bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />

        {/* Monogram or Core Icon */}
        <div className="relative z-10 flex items-center justify-center">
          <img
            src="/logo-s-sin-fondo.png"
            alt="ArquitecturIA Voice Core"
            className={`${size === 'lg' ? 'w-8 h-8' : size === 'md' ? 'w-5 h-5' : 'w-4 h-4'} object-contain drop-shadow-[0_0_8px_rgba(184,222,216,0.8)] transition-transform duration-300 group-hover:scale-110`}
          />
        </div>
      </motion.div>
    </div>
  );
};
