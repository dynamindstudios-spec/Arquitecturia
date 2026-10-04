import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { atmosphereService } from '../services/atmosphereService';

export const AtmosphericBackdrop = () => {
  const [atmosphereId, setAtmosphereId] = useState(() => atmosphereService.getCurrentId());

  useEffect(() => {
    const handleAtmosphereChange = () => {
      setAtmosphereId(atmosphereService.getCurrentId());
    };

    window.addEventListener('storage', handleAtmosphereChange);
    window.addEventListener('arquitecturia-atmosphere-change', handleAtmosphereChange);

    return () => {
      window.removeEventListener('storage', handleAtmosphereChange);
      window.removeEventListener('arquitecturia-atmosphere-change', handleAtmosphereChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      <AnimatePresence mode="wait">
        {/* ========================================================================= */}
        {/* ATMOSPHERE 1: CONCRETO & MENTA PURA (Zen / Rigor Arquitectónico) */}
        {/* ========================================================================= */}
        {atmosphereId === 'zen' && (
          <motion.div
            key="zen-lighting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            {/* Top-Right Soft Mint Radial Glow */}
            <div 
              className="absolute -top-[20%] -right-[15%] w-[65vw] h-[65vw] rounded-full blur-[140px] opacity-40 will-change-transform"
              style={{ background: 'radial-gradient(circle, rgba(184, 222, 216, 0.16) 0%, rgba(184, 222, 216, 0.02) 65%, transparent 100%)' }}
            />

            {/* Bottom-Left Ambient Architecture Backlight */}
            <div 
              className="absolute -bottom-[25%] -left-[15%] w-[70vw] h-[70vw] rounded-full blur-[160px] opacity-35 will-change-transform"
              style={{ background: 'radial-gradient(circle, rgba(184, 222, 216, 0.12) 0%, rgba(140, 184, 176, 0.02) 65%, transparent 100%)' }}
            />

            {/* Central Precision Architectural Grid Lines */}
            <div 
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage: 'linear-gradient(to right, rgba(184, 222, 216, 0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(184, 222, 216, 0.6) 1px, transparent 1px)',
                backgroundSize: '80px 80px'
              }}
            />
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* ATMOSPHERE 2: ATARDECER CAFETERO & TEKA NOBLE (Sunset / Golden Cordillera) */}
        {/* ========================================================================= */}
        {atmosphereId === 'sunset' && (
          <motion.div
            key="sunset-lighting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            {/* Top Horizon Sunburst Amber Lighting */}
            <div 
              className="absolute -top-[30%] left-[10%] w-[80vw] h-[55vw] rounded-full blur-[150px] opacity-50 will-change-transform"
              style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.22) 0%, rgba(229, 184, 105, 0.08) 50%, transparent 100%)' }}
            />

            {/* Warm Teak & Bronze Lateral Fill */}
            <div 
              className="absolute top-[40%] -right-[15%] w-[60vw] h-[60vw] rounded-full blur-[140px] opacity-40 will-change-transform"
              style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, rgba(170, 130, 10, 0.03) 60%, transparent 100%)' }}
            />

            {/* Atmospheric Sunset Vignette */}
            <div 
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(212, 175, 55, 0.35) 0%, transparent 60%)'
              }}
            />
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* ATMOSPHERE 3: BOSQUE DE NIEBLA & ESMERALDA (Bio-Zen / Andean Mist) */}
        {/* ========================================================================= */}
        {atmosphereId === 'forest' && (
          <motion.div
            key="forest-lighting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            {/* Emerald Mist Top Ambient Aura */}
            <div 
              className="absolute -top-[20%] left-[20%] w-[70vw] h-[60vw] rounded-full blur-[160px] opacity-45 will-change-transform"
              style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, rgba(52, 211, 153, 0.04) 55%, transparent 100%)' }}
            />

            {/* Deep Salento Bio-Fog Lighting */}
            <div 
              className="absolute bottom-[10%] -left-[10%] w-[65vw] h-[65vw] rounded-full blur-[150px] opacity-40 will-change-transform"
              style={{ background: 'radial-gradient(circle, rgba(4, 120, 87, 0.16) 0%, rgba(16, 185, 129, 0.03) 65%, transparent 100%)' }}
            />

            {/* Dew Mesh Subtle Overlay */}
            <div 
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.4) 0%, transparent 50%)'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
