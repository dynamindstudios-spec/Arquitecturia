import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { useTranslation } from '../hooks/useTranslation';

// Selected premier master photography for high-status hero background (Verified Local HD Assets)
const HERO_SLIDES = [
  {
    image: '/extracted/arquitecturia/assets/hero-residence-1.jpg',
    title: 'Villa Lumina',
    location: 'Residencial de Alta Gama'
  },
  {
    image: '/extracted/arquitecturia/assets/hero-residence-2.jpg',
    title: 'Residencia Aethelgard',
    location: 'Residencial Campestre'
  },
  {
    image: '/extracted/arquitecturia/assets/hero-cliff-home.jpg',
    title: 'Monolito Andino',
    location: 'Arquitectura en Ladera'
  },
  {
    image: '/extracted/arquitecturia/assets/hero-pavilion.jpg',
    title: 'Pabellón Kroma',
    location: 'Comercial & Negocios'
  },
  {
    image: '/extracted/arquitecturia/assets/hero-villa-pool.jpg',
    title: 'Casa Éter',
    location: 'Minimalismo y Luz'
  },
  {
    image: '/extracted/arquitecturia/assets/turismo-santuario-bioclimatico.jpg',
    title: 'Santuario Bioclimático',
    location: 'Hotelería Boutique'
  },
  {
    image: '/extracted/arquitecturia/assets/hero-concrete-tower.jpg',
    title: 'Torre Zenith',
    location: 'Complejo Corporativo'
  },
  {
    image: '/extracted/arquitecturia/assets/turismo-villas-delirio.jpg',
    title: 'Villas del Valle',
    location: 'Ecoturismo & Suites de Lujo'
  }
];

export const Hero = ({ onNavigateProjects, onOpenBooking }) => {
  const { t, language, translateCategory } = useTranslation();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const heroRef = useRef(null);

  // Parallax Curtain Lift Effect: As the user scrolls down, the Hero glides upward like an architectural curtain
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const curtainY = useTransform(scrollYProgress, [0, 1], ['0%', '-32%']);
  const curtainScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const curtainOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.85, 0.15]);

  // Preload all hero slide images into browser cache immediately for zero-flicker transitions
  useEffect(() => {
    HERO_SLIDES.forEach(slide => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  // Smooth automatic crossfade every 4.8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4800);

    return () => clearInterval(timer);
  }, []);

  const activeSlide = HERO_SLIDES[currentSlideIndex];

  return (
    <div ref={heroRef} className="relative z-10 w-full min-h-screen h-screen overflow-hidden bg-brand-deep">
      <motion.section
        style={{ y: curtainY, scale: curtainScale, opacity: curtainOpacity }}
        className="relative w-full h-full min-h-screen flex flex-col justify-between pt-32 sm:pt-36 pb-12 sm:pb-16 px-6 md:px-12 select-none will-change-transform"
      >
        {/* 1. Cinematic Background Slideshow (Difuminación / Blur Crossfade & Ken Burns, No UI Clutter) */}
        <div className="absolute inset-0 z-0 bg-brand-deep overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={currentSlideIndex}
              initial={{ opacity: 0, filter: 'blur(16px)', scale: 1.05 }}
              animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, filter: 'blur(16px)', scale: 0.97 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 will-change-[transform,filter,opacity]"
            >
              <img
                src={activeSlide.image}
                alt={activeSlide.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Cinematic Vignette Overlays: Contrast AAA for Typographic Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-brand-deep/75 to-brand-deep/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-deep via-brand-deep/60 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(10,10,10,0.8)_100%)]" />

          {/* Subtle Architectural Blueprint Grid */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(184, 222, 216, 0.5) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(184, 222, 216, 0.5) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        {/* 2. Main Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto w-full my-auto">
          <div className="max-w-4xl space-y-8">
            {/* Monumental Architectural Brand Title */}
            <Reveal direction="up" delay={0.1}>
              <div className="space-y-2">
                <h1 className="font-editorial-heading text-6xl sm:text-8xl md:text-9xl text-brand-mint tracking-tight leading-[0.88] drop-shadow-[0_10px_40px_rgba(0,0,0,0.9)] transition-colors duration-700">
                  ArquitecturIA
                </h1>
                <p className="font-mono text-xs sm:text-sm tracking-[0.35em] text-white/80 uppercase font-semibold pl-1">
                  {t('hero.eyebrow')}
                </p>
              </div>
            </Reveal>

          {/* Subtitle Statement & Call to Action */}
          <Reveal direction="up" delay={0.25}>
            <div className="space-y-8 border-l-2 border-brand-mint pl-6 sm:pl-8">
              <p className="font-body text-base sm:text-xl text-white/90 max-w-2xl leading-relaxed font-light drop-shadow-md">
                {t('hero.subtitle')}
              </p>

              {/* Clean Action Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={onNavigateProjects}
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-brand-mint text-brand-deep hover:bg-brand-mint-light transition-all duration-300 font-architectural text-xs tracking-wider font-bold rounded-md shadow-[0_0_30px_rgba(184,222,216,0.35)]"
                >
                  <span>{t('hero.exploreBtn')}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </motion.section>
  </div>
);
};
