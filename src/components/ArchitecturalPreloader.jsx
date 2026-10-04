import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';

// High-impact fullscreen master photography focusing on the studio and architecture
const PRELOADER_SLIDES = [
  { image: '/extracted/arquitecturia/assets/studio-architecture-atelier.jpg', alt: 'Atelier de Arquitectura & Diseño Paramétrico' },
  { image: '/extracted/arquitecturia/assets/studio-drafting-models.jpg', alt: 'Modelado Espacial & Rigor Geométrico' },
  { image: '/extracted/arquitecturia/assets/hero-residence-1.jpg', alt: 'Obras Residenciales de Alto Estatus' },
  { image: '/extracted/arquitecturia/assets/turismo-santuario-bioclimatico.jpg', alt: 'Integración Bioclimática & Paisaje' }
];

export const ArchitecturalPreloader = ({ onComplete }) => {
  const { t, language } = useTranslation();
  const [progress, setProgress] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);

  // Preload images into browser cache
  useEffect(() => {
    PRELOADER_SLIDES.forEach(s => {
      const img = new Image();
      img.src = s.image;
    });
  }, []);

  // Slide rotation every 1.1s to showcase the portfolio in full screen
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % PRELOADER_SLIDES.length);
    }, 1150);

    return () => clearInterval(slideTimer);
  }, []);

  // Progress counter to 100% over ~3.4s
  useEffect(() => {
    const startTime = Date.now();
    const duration = 3400; // 3.4s full-screen cinematic sequence

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(rawProgress);

      if (rawProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 400);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  const activeSlide = PRELOADER_SLIDES[slideIndex];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.03 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-black select-none overflow-hidden"
    >
      {/* 1. Fullscreen Background Slideshow with Blur Diffusion Crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0, filter: 'blur(16px)', scale: 1.08 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1.0 }}
            exit={{ opacity: 0, filter: 'blur(16px)', scale: 0.96 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full will-change-[transform,filter,opacity]"
          >
            <img
              src={activeSlide.image}
              alt={activeSlide.title}
              className="w-full h-full object-cover brightness-[0.75] contrast-[1.12]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Vignettes: Absolute Contrast for Ultra-Sharp Brand Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-brand-deep/60 to-brand-deep/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-deep/85 via-transparent to-brand-deep/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(0,0,0,0.92)_100%)]" />

        {/* Blueprint Structural Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(184, 222, 216, 0.6) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(184, 222, 216, 0.6) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      {/* 2. Central Brand Emblem (Minimalist Pure Brand Identity, ZERO labels or pills) */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-6 text-center flex flex-col items-center my-auto">
        {/* Official Monogram without background */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative mb-6"
        >
          <img
            src="/logo-s-sin-fondo.png"
            alt="ArquitecturIA Atelier"
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-[0_0_35px_rgba(184,222,216,0.5)]"
          />
        </motion.div>

        {/* Monumental Wordmark */}
        <motion.div
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="space-y-2.5"
        >
          <h1 className="font-editorial-heading text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white uppercase drop-shadow-[0_8px_30px_rgba(0,0,0,0.95)]">
            ARQUITECTUR<span className="text-brand-mint">IA</span>
          </h1>
          <p className="font-mono text-xs sm:text-sm tracking-[0.35em] text-brand-mint font-semibold uppercase drop-shadow-md">
            ATELIER DE ARQUITECTURA & DISEÑO COMPUTACIONAL
          </p>
        </motion.div>
      </div>

      {/* 3. Bottom Metric: Hairline Progress Bar & Percentage (Zero Clutter) */}
      <div className="relative z-20 w-full max-w-xl mx-auto px-6 pb-12 space-y-3">
        {/* Hairline Progress Track */}
        <div className="w-full h-[2px] bg-white/15 overflow-hidden relative rounded-full backdrop-blur-sm">
          <motion.div
            className="h-full bg-brand-mint shadow-[0_0_15px_#b8ded8]"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>

        {/* Pure Percentage Counter */}
        <div className="flex items-center justify-center text-xs font-mono text-brand-mint font-bold tracking-widest">
          <span>{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
};
