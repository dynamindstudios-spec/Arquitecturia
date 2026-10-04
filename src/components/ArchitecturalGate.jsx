import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';
import { HERO_SLIDES } from '../data/projectsData';
import { BRANDING_DATA } from '../data/brandingData';
import { useTranslation } from '../hooks/useTranslation';

export const ArchitecturalGate = ({ onEnter }) => {
  const { t, language } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03, filter: 'blur(10px)' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 overflow-hidden bg-brand-deep flex flex-col justify-between p-6 sm:p-12 md:p-16 select-none"
    >
      {/* Background Slideshow with Dark Architectural Vignette */}
      {HERO_SLIDES.map((slide, idx) => (
        <div
          key={slide}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: idx === currentSlide ? 1 : 0 }}
        >
          <img
            src={slide}
            alt="ArquitecturIA Atelier"
            className="w-full h-full object-cover scale-105 transform animate-pulse duration-1000"
            style={{ animationDuration: '8s' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-brand-deep/80 to-brand-deep/60" />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
        </div>
      ))}

      {/* Subtle Grid overlay for Architectural Feel */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(184, 222, 216, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(184, 222, 216, 0.1) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />

      {/* Top Telemetry */}
      <div className="relative z-10 flex items-center justify-between w-full border-b border-brand-mint/15 pb-4 text-[10px] sm:text-xs font-mono tracking-widest text-brand-mint/70 uppercase">
        <span className="flex items-center gap-2">
          <Compass className="w-3.5 h-3.5 text-brand-mint animate-spin" style={{ animationDuration: '18s' }} />
          <span>ESTUDIO DE ARQUITECTURA & CONSTRUCCIÓN</span>
        </span>
        <span className="hidden sm:inline-block">ARMENIA, QUINDÍO · {BRANDING_DATA.gps.lat.toFixed(4)}° N, {BRANDING_DATA.gps.lng.toFixed(4)}° W</span>
        <span>01 / 24 OBRAS</span>
      </div>

      {/* Centerpiece: Monolithic Logo & Poetic Quote */}
      <div className="relative z-10 my-auto flex flex-col items-center text-center max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6 sm:mb-8"
        >
          <img
            src={BRANDING_DATA.logos.mint}
            alt="ArquitecturIA"
            className="h-28 sm:h-40 md:h-48 w-auto object-contain filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-16 h-[1px] bg-brand-mint/40 mb-6 sm:mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xs sm:text-sm md:text-base font-light leading-relaxed text-brand-mint/85 max-w-xl font-body italic tracking-wide"
        >
          {language === 'EN' ? '"A dialogue between orthogonal mass, light, and natural geography."' : language === 'FR' ? '"Un dialogue entre la masse orthogonale, la lumière et la géographie naturelle."' : `"${BRANDING_DATA.quote}"`}
        </motion.p>

        {/* Enter Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 sm:mt-12"
        >
          <button
            onClick={onEnter}
            className="group relative inline-flex items-center gap-4 px-10 sm:px-14 py-4 bg-transparent border border-brand-mint/60 hover:border-brand-mint text-brand-mint hover:text-brand-deep hover:bg-brand-mint transition-all duration-400 ease-out font-architectural text-xs sm:text-sm tracking-ultra-wide cursor-pointer"
          >
            <span>{language === 'EN' ? 'ENTER' : language === 'FR' ? 'ENTRER' : 'ENTRAR'}</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
            
            {/* Corner architectural ticks */}
            <span className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-brand-mint" />
            <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-brand-mint" />
          </button>
        </motion.div>
      </div>

      {/* Bottom Telemetry & Slide Indicators */}
      <div className="relative z-10 flex items-center justify-between w-full border-t border-brand-mint/15 pt-4 text-[10px] sm:text-xs font-mono text-brand-mint/50">
        <div className="flex items-center gap-3">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-[2px] transition-all duration-500 ${
                i === currentSlide ? 'w-8 bg-brand-mint' : 'w-2 bg-brand-mint/20 hover:bg-brand-mint/50'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <div className="tracking-widest uppercase">
          ARQUITECTURIA {t('brand.group') || 'GRUPO'} {t('brand.constructor') || 'CONSTRUCTOR'} © MMXXVI
        </div>
      </div>
    </motion.div>
  );
};
