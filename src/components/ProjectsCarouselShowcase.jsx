import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Maximize2, Calendar, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

// Directional sliding variants for panoramic stage
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 1
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    transition: {
      x: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.3 }
    }
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction > 0 ? '-100%' : '100%',
    opacity: 1,
    transition: {
      x: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.3 }
    }
  })
};

export const ProjectsCarouselShowcase = ({ projects, onSelectProject, onBookProject }) => {
  const { t, translateCategory, translateMaterial, translateProjectDescription } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  // Take top featured projects (e.g. 8 iconic projects)
  const featuredProjects = projects.slice(0, 8);
  const current = featuredProjects[currentIndex] || featuredProjects[0];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, featuredProjects.length]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? featuredProjects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === featuredProjects.length - 1 ? 0 : prev + 1));
  };

  const handleSelectProject = (idx) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  if (!current) return null;

  return (
    <div 
      className="relative w-full bg-brand-surface border border-brand-mint/20 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Panoramic Stage */}
      <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <img
              src={current.coverLocal}
              alt={current.title}
              className="w-full h-full object-cover pointer-events-none select-none"
            />
            {/* Multi-layered cinematic gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-deep via-brand-deep/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-transparent to-black/40" />
          </motion.div>
        </AnimatePresence>

        {/* Content Overlay */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-10 md:p-14">
          {/* Top Spacer */}
          <div className="h-6" />

          {/* Center/Bottom Information */}
          <div className="max-w-2xl">
            <motion.div
              key={current.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 text-brand-mint/80 text-xs sm:text-sm font-mono mb-2">
                <MapPin className="w-4 h-4 text-brand-mint" />
                <span>{current.location}</span>
                <span className="text-white/30">•</span>
                <span>{current.area}</span>
              </div>

              <h2 className="font-editorial-heading text-3xl sm:text-5xl md:text-6xl text-white mb-4">
                {current.title}
              </h2>

              <p className="text-xs sm:text-sm text-white/80 font-body leading-relaxed line-clamp-2 md:line-clamp-3 max-w-xl mb-6">
                {translateProjectDescription ? translateProjectDescription(current.id, current.description) : current.description}
              </p>

              {/* Materiality tags */}
              <div className="hidden sm:flex flex-wrap gap-2 mb-6">
                {current.materials && current.materials.slice(0, 3).map((mat, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-mono text-white/60 bg-white/5 border border-white/10 px-2.5 py-1"
                  >
                    {translateMaterial ? translateMaterial(mat) : mat}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.015, y: -1 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => onSelectProject(current)}
                  className="relative group overflow-hidden flex items-center gap-2 px-6 py-3.5 bg-brand-mint text-brand-deep hover:bg-brand-mint-light transition-all duration-300 font-architectural text-xs tracking-wider font-semibold shadow-[0_0_20px_rgba(184,222,216,0.25)] rounded-md cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
                  <Maximize2 className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>{t('projects.viewGalleryCount') || 'VER GALERÍA COMPLETA'} ({current.totalImages} {t('projects.photosCount') || 'FOTOS'})</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.015, y: -1 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => onBookProject(current.title)}
                  className="relative group overflow-hidden flex items-center gap-2 px-6 py-3.5 bg-white/[0.03] hover:bg-brand-mint/[0.08] border border-white/25 hover:border-brand-mint text-white hover:text-brand-mint transition-all duration-300 font-architectural text-xs tracking-wider font-semibold rounded-md cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(184,222,216,0.2)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-mint/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
                  <Calendar className="w-4 h-4 text-brand-mint transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" />
                  <span>{t('projects.bookCommission') || 'AGENDAR CITA DE PROYECTO'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-mint/60 group-hover:text-brand-mint group-hover:translate-x-1 transition-all duration-300" />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={handlePrev}
              className="p-3 bg-brand-deep/80 hover:bg-brand-mint hover:text-brand-deep text-white border border-brand-mint/30 transition-colors backdrop-blur-sm rounded-md cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 bg-brand-deep/80 hover:bg-brand-mint hover:text-brand-deep text-white border border-brand-mint/30 transition-colors backdrop-blur-sm rounded-md cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Thumbnail Strip */}
      <div className="bg-brand-deep p-3 border-t border-brand-mint/15 overflow-x-auto">
        <div className="flex items-center gap-3 min-w-max">
          {featuredProjects.map((p, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectProject(idx)}
                className={`relative flex items-center gap-3 p-1.5 transition-all duration-300 text-left border cursor-pointer ${
                  isActive
                    ? 'border-brand-mint bg-brand-surface shadow-[0_0_10px_rgba(184,222,216,0.2)]'
                    : 'border-white/10 hover:border-white/30 bg-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={p.coverLocal}
                  alt={p.title}
                  className="w-12 h-10 object-cover"
                />
                <div className="pr-3">
                  <div className={`text-xs font-architectural tracking-wider truncate max-w-[120px] ${
                    isActive ? 'text-brand-mint font-semibold' : 'text-white'
                  }`}>
                    {p.title}
                  </div>
                  <div className="text-[10px] font-mono text-white/40">
                    {translateCategory ? translateCategory(p.category) : p.category}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
