import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Maximize2, Layers, Compass, Ruler, ShieldCheck, ArrowRight, FileText } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

// Fluid directional sliding variants (zero flicker / continuous horizontal travel)
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 1,
    scale: 1
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { duration: 0.58, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.25 }
    }
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction > 0 ? '-100%' : '100%',
    opacity: 1,
    scale: 1,
    transition: {
      x: { duration: 0.58, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.25 }
    }
  })
};

export const QuimbayasProjectShowcase = ({ projects = [], onOpenModal, onBookProject }) => {
  const { t, language, translateCategory, translateStatus, translateMaterial, translateProjectDescription } = useTranslation();
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isPhotoAutoplayPaused, setIsPhotoAutoplayPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward (slide left), -1 = backward (slide right)

  const selectedProject = projects[activeProjectIndex] || projects[0];

  // Get gallery for active project
  const projectPhotos = selectedProject?.galleryLocal && selectedProject.galleryLocal.length > 0
    ? selectedProject.galleryLocal
    : [selectedProject?.coverLocal];

  // Reset photo index when switching projects
  useEffect(() => {
    setCurrentPhotoIndex(0);
  }, [activeProjectIndex]);

  // Autoplay through the photos of the SELECTED project with fluid forward slide
  useEffect(() => {
    if (isPhotoAutoplayPaused || projectPhotos.length <= 1) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentPhotoIndex((prev) => (prev + 1) % projectPhotos.length);
    }, 4200);

    return () => clearInterval(timer);
  }, [isPhotoAutoplayPaused, projectPhotos.length, activeProjectIndex]);

  const handleNextPhoto = (e) => {
    if (e) e.stopPropagation();
    setDirection(1);
    setCurrentPhotoIndex((prev) => (prev + 1) % projectPhotos.length);
  };

  const handlePrevPhoto = (e) => {
    if (e) e.stopPropagation();
    setDirection(-1);
    setCurrentPhotoIndex((prev) => (prev - 1 + projectPhotos.length) % projectPhotos.length);
  };

  const handleSelectPhoto = (idx) => {
    if (idx === currentPhotoIndex) return;
    setDirection(idx > currentPhotoIndex ? 1 : -1);
    setCurrentPhotoIndex(idx);
  };

  const handleSelectProject = (newIdx) => {
    if (newIdx === activeProjectIndex) return;
    setDirection(newIdx > activeProjectIndex ? 1 : -1);
    setActiveProjectIndex(newIdx);
    setCurrentPhotoIndex(0);
  };

  if (!selectedProject) return null;

  return (
    <div className="w-full space-y-6">
      {/* Responsive Layout: Split Quimbayas Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ========================================================= */}
        {/* MOBILE ONLY: Horizontal Quick-Select Photo Rail */}
        {/* ========================================================= */}
        <div className="lg:hidden flex items-center gap-2.5 overflow-x-auto pb-2 px-1 scrollbar-none">
          {projects.map((proj, idx) => {
            const isSelected = idx === activeProjectIndex;
            return (
              <button
                type="button"
                key={proj.id}
                onClick={() => handleSelectProject(idx)}
                className={`relative w-16 h-16 rounded-[4px] overflow-hidden border-2 cursor-pointer shrink-0 transition-all ${
                  isSelected
                    ? 'border-brand-mint shadow-[0_0_15px_rgba(184,222,216,0.6)] ring-2 ring-brand-mint/60 scale-105'
                    : 'border-white/15 opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={proj.coverLocal}
                  alt={proj.title}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* DESKTOP ONLY: Left Rail with 2-Column Photo Grid (Benchmark Quimbayas) */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex lg:col-span-4 xl:col-span-3 flex-col gap-3 p-4 rounded-[4px] bg-brand-surface/90 border border-brand-mint/25 shadow-2xl max-h-[720px] overflow-y-auto scrollbar-thin scrollbar-thumb-brand-mint/20"
        >
          {/* Header Title */}
          <div className="pb-3 border-b border-white/10">
            <span className="text-xs font-architectural font-bold text-brand-mint uppercase tracking-[0.2em]">
              {t('projects.catalogTitle') || 'CATÁLOGO DE OBRAS'}
            </span>
          </div>

          {/* 2-Column Clean Photo Grid for All Projects */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            {projects.map((proj, idx) => {
              const isSelected = idx === activeProjectIndex;

              return (
                <div
                  key={proj.id}
                  onClick={() => handleSelectProject(idx)}
                  title={`${proj.title} · ${proj.location}`}
                  className={`aspect-square rounded-[3px] overflow-hidden border-2 cursor-pointer relative group transition-all duration-300 ${
                    isSelected
                      ? 'border-brand-mint shadow-[0_0_18px_rgba(184,222,216,0.5)] scale-[1.03] ring-2 ring-brand-mint/60 z-10'
                      : 'border-white/10 opacity-60 hover:opacity-100 hover:border-brand-mint/40 hover:scale-[1.02]'
                  }`}
                >
                  <img
                    src={proj.coverLocal}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-brand-mint/15 pointer-events-none" />
                  )}
                  {/* Subtle Label on Hover */}
                  <div className="absolute inset-x-0 bottom-0 p-1 bg-brand-deep/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-[9px] font-mono text-white truncate text-center">
                      {proj.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* CENTER / RIGHT: Master Feature Showcase with Multi-Photo Carousel */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-8 xl:col-span-9 space-y-6"
        >
          {/* Main Showcase Card */}
          <div
            className="rounded-[4px] bg-brand-surface/95 border border-brand-mint/30 overflow-hidden shadow-2xl p-4 sm:p-7 text-left space-y-6"
            onMouseEnter={() => setIsPhotoAutoplayPaused(true)}
            onMouseLeave={() => setIsPhotoAutoplayPaused(false)}
          >
            {/* Top Multi-Photo Master Carousel with Continuous Directional Slide & Touch Swipe */}
            <div className="relative rounded-[3px] overflow-hidden aspect-[16/10] sm:aspect-[16/9] group shadow-2xl bg-black">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={`${selectedProject.id}-${currentPhotoIndex}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={(_, { offset, velocity }) => {
                    if (offset.x < -50 || velocity.x < -200) {
                      handleNextPhoto();
                    } else if (offset.x > 50 || velocity.x > 200) {
                      handlePrevPhoto();
                    }
                  }}
                  className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing select-none"
                >
                  <img
                    src={projectPhotos[currentPhotoIndex]}
                    alt={`${selectedProject.title} toma ${currentPhotoIndex + 1}`}
                    className="w-full h-full object-cover pointer-events-none select-none"
                    loading="eager"
                    decoding="sync"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Gradient Vignettes */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/90 via-transparent to-brand-deep/30 pointer-events-none z-10" />

              {/* Top Right: Expand Button */}
              <div className="absolute top-4 right-4 z-20">
                <button
                  onClick={() => onOpenModal(selectedProject)}
                  className="p-2 rounded-[2px] bg-brand-deep/80 hover:bg-brand-mint hover:text-brand-deep text-white border border-white/20 backdrop-blur-md transition-colors"
                  title={t('projects.expandFullscreen') || "Expandir en pantalla completa"}
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Left/Right Arrows for Cycling Project Photos */}
              {projectPhotos.length > 1 && (
                <>
                  <button
                    onClick={handlePrevPhoto}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-[3px] bg-brand-deep/80 hover:bg-brand-mint hover:text-brand-deep text-white flex items-center justify-center backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 active:scale-95"
                    aria-label={language === 'EN' ? 'Previous photo' : language === 'FR' ? 'Photo précédente' : 'Foto anterior'}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleNextPhoto}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-[3px] bg-brand-deep/80 hover:bg-brand-mint hover:text-brand-deep text-white flex items-center justify-center backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 active:scale-95"
                    aria-label={language === 'EN' ? 'Next photo' : language === 'FR' ? 'Photo suivante' : 'Siguiente foto'}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Photo Strip Indicator Overlay */}
              <div className="absolute bottom-4 right-4 z-20 pointer-events-auto flex items-center gap-1.5">
                {projectPhotos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectPhoto(idx)}
                    className={`h-1.5 transition-all rounded-full cursor-pointer ${
                      idx === currentPhotoIndex
                        ? 'w-6 bg-brand-mint shadow-[0_0_8px_#b8ded8]'
                        : 'w-1.5 bg-white/30 hover:bg-white/60'
                    }`}
                    title={`${t('projects.shotPrefix') || 'Toma'} ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Details Section (Title, Description & Materiality) */}
            <div className="space-y-5">
              <div>
                <h3 className="font-editorial-heading text-3xl sm:text-5xl text-white tracking-tight">
                  {selectedProject.title}
                </h3>
                <p className="font-body text-sm sm:text-base text-white/80 leading-relaxed font-light mt-3">
                  {translateProjectDescription ? translateProjectDescription(selectedProject.id, selectedProject.description) : selectedProject.description}
                </p>
              </div>

              {/* Specs & Materiality Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/10">
                <div className="p-3 bg-brand-deep/60 border border-white/5 rounded-[3px]">
                  <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">
                    {t('projectModal.locationLabel')}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-brand-mint font-mono">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{selectedProject.location}</span>
                  </div>
                </div>

                <div className="p-3 bg-brand-deep/60 border border-white/5 rounded-[3px]">
                  <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">
                    {t('projectModal.areaLabel')}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-brand-mint font-mono">
                    <Ruler className="w-3.5 h-3.5" />
                    <span>{selectedProject.area}</span>
                  </div>
                </div>

                <div className="p-3 bg-brand-deep/60 border border-white/5 rounded-[3px]">
                  <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">
                    {t('projectModal.typeLabel') || 'CATEGORÍA'}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-brand-mint font-mono">
                    <Layers className="w-3.5 h-3.5" />
                    <span>{translateCategory ? translateCategory(selectedProject.category) : selectedProject.category}</span>
                  </div>
                </div>
              </div>

              {/* Noble Materials Tags */}
              {selectedProject.materials && selectedProject.materials.length > 0 && (
                <div className="pt-2">
                  <span className="text-[10px] font-mono text-white/40 uppercase block mb-2">
                    {t('projects.signatureMaterialsLabel') || 'MATERIALES NOBLES DE AUTOR:'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.materials.map((mat, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono text-brand-mint/90 bg-brand-deep border border-brand-mint/20 px-3 py-1 rounded-[2px]"
                      >
                        {translateMaterial ? translateMaterial(mat) : mat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.015, y: -1 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => onOpenModal(selectedProject)}
                  className="flex-1 relative group overflow-hidden flex items-center justify-center gap-2.5 py-3.5 bg-brand-mint text-brand-deep hover:bg-brand-mint-light transition-all duration-300 font-architectural text-xs font-bold rounded-md shadow-[0_0_20px_rgba(184,222,216,0.3)] cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
                  <Maximize2 className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>{t('projects.viewGallery')} ({projectPhotos.length} {t('projectModal.hdTakes')})</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.015, y: -1 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => onBookProject(selectedProject.title)}
                  className="relative group overflow-hidden flex items-center justify-center gap-2 py-3.5 px-6 bg-white/[0.03] hover:bg-brand-mint/[0.08] border border-white/20 hover:border-brand-mint text-white hover:text-brand-mint transition-all duration-300 font-architectural text-xs tracking-wider font-semibold rounded-md cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(184,222,216,0.2)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-mint/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
                  <FileText className="w-4 h-4 text-brand-mint transition-transform duration-300 group-hover:scale-110" />
                  <span>{t('projectModal.bookMeetingBtn')}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-mint/60 group-hover:text-brand-mint group-hover:translate-x-1 transition-all duration-300" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
