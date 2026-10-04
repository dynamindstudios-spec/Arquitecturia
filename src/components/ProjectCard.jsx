import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, MapPin, Layers } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export const ProjectCard = ({ project, onSelect }) => {
  const { t, language, translateCategory, translateStatus } = useTranslation();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const images = project.galleryLocal && project.galleryLocal.length > 0
    ? project.galleryLocal
    : [project.coverLocal];

  // 3D Card Tilt with Spring Physics & Dynamic Specular Sheen
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [sheenPos, setSheenPos] = useState({ x: 50, y: 50 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 280, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 280, damping: 22 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
    setSheenPos({ x: (mouseX / width) * 100, y: (mouseY / height) * 100 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setDirection(-1);
    setCurrentImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setDirection(1);
    setCurrentImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleSelectDot = (e, idx) => {
    e.stopPropagation();
    if (idx === currentImgIndex) return;
    setDirection(idx > currentImgIndex ? 1 : -1);
    setCurrentImgIndex(idx);
  };

  return (
    <div style={{ perspective: 1000 }} className="w-full h-full">
      <motion.div
        ref={cardRef}
        onClick={() => onSelect(project)}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        className="group relative aspect-[3/4] bg-brand-surface overflow-hidden cursor-pointer border border-white/10 hover:border-brand-mint/50 rounded-[4px] transition-colors duration-300 flex flex-col justify-between shadow-lg will-change-transform"
      >
        {/* Specular Sheen Overlay: Dynamic Reflection on Beveled Borders */}
        <div
          className="pointer-events-none absolute inset-0 z-25 transition-opacity duration-300 rounded-[4px]"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(420px circle at ${sheenPos.x}% ${sheenPos.y}%, rgba(255, 255, 255, 0.08) 0%, rgba(184, 222, 216, 0.04) 35%, transparent 75%)`,
            mixBlendMode: 'overlay'
          }}
        />
      {/* Background Image with Directional Slide on Carousel Nav */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={currentImgIndex}
            src={images[currentImgIndex]}
            alt={project.title}
            custom={direction}
            initial={(dir) => ({ x: dir > 0 ? '100%' : '-100%' })}
            animate={{ x: 0 }}
            exit={(dir) => ({ x: dir > 0 ? '-100%' : '100%' })}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none select-none"
            loading="lazy"
            decoding="async"
          />
        </AnimatePresence>
        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-brand-deep/20 to-black/30 group-hover:via-brand-deep/40 transition-all duration-500 pointer-events-none" />
      </div>

      {/* Top Spacer for Clean Architectural Framing */}
      <div className="relative z-10 p-3" />

      {/* Carousel Navigation Arrows (visible on hover) */}
      {images.length > 1 && (
        <div className="relative z-20 px-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handlePrev}
            className="p-1.5 bg-black/70 hover:bg-brand-mint hover:text-brand-deep text-white backdrop-blur-sm transition-colors border border-white/10 rounded-[2px]"
            aria-label={language === 'EN' ? 'Previous image' : language === 'FR' ? 'Image précédente' : 'Foto anterior'}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-1.5 bg-black/70 hover:bg-brand-mint hover:text-brand-deep text-white backdrop-blur-sm transition-colors border border-white/10 rounded-[2px]"
            aria-label={language === 'EN' ? 'Next image' : language === 'FR' ? 'Image suivante' : 'Siguiente foto'}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Bottom Content: Title, Location, Area and CTA */}
      <div className="relative z-10 p-5 bg-gradient-to-t from-brand-deep via-brand-deep/90 to-transparent">
        <div className="flex items-center gap-2 text-brand-mint/70 text-[11px] font-mono mb-1">
          <MapPin className="w-3 h-3 text-brand-mint" />
          <span className="truncate">{project.location}</span>
          {project.area && (
            <>
              <span className="text-white/20">|</span>
              <span>{project.area}</span>
            </>
          )}
        </div>

        <h3 className="font-architectural text-base sm:text-lg font-bold text-white group-hover:text-brand-mint transition-colors duration-300 tracking-wide line-clamp-1">
          {project.title}
        </h3>

        <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/10">
          <span className="text-[11px] text-white/50 font-mono">
            {project.year || '2024'}
          </span>

          <span className="inline-flex items-center gap-1.5 text-xs font-architectural text-brand-mint tracking-wider group-hover:translate-x-1 transition-transform">
            <span>{t('projects.explore')}</span>
            <Maximize2 className="w-3 h-3" />
          </span>
        </div>

        {/* Carousel Mini Indicators */}
        {images.length > 1 && (
          <div className="flex items-center justify-center gap-1 mt-3">
            {images.slice(0, 8).map((_, idx) => (
              <button
                type="button"
                key={idx}
                onClick={(e) => handleSelectDot(e, idx)}
                className={`h-1 transition-all duration-300 rounded-full cursor-pointer ${
                  idx === currentImgIndex
                    ? 'w-4 bg-brand-mint'
                    : 'w-1 bg-white/20 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
      </motion.div>
    </div>
  );
};
