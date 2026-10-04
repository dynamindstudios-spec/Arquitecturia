import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const START_FRAME = 44; // Punto exacto de apertura del cerebro, omitiendo el isotipo en 'S' cerrado
const END_FRAME = 239;
const TOTAL_FRAMES = 240;

export const ArchitecturalSynapseScrolly = ({ onExploreProjects }) => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const imagesRef = useRef(new Array(TOTAL_FRAMES));
  const currentTargetFrameRef = useRef(START_FRAME);
  const lastDrawnFrameRef = useRef(-1);

  // Framer Motion useScroll tied directly to the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Apple-style elastic physics spring for silky smooth forward and reverse scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 26,
    restDelta: 0.001
  });

  // Draw optical canvas frame with aspect-ratio cover fit
  const drawFrame = useCallback((frameIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let img = imagesRef.current[frameIdx];

    // Bidirectional nearest-neighbor search if exact frame is not yet fully decoded
    if (!img || !img.complete || img.naturalWidth === 0) {
      let nearestDist = 999;
      let nearestImg = null;
      let nearestIdx = -1;
      for (let i = START_FRAME; i < TOTAL_FRAMES; i++) {
        const candidate = imagesRef.current[i];
        if (candidate && candidate.complete && candidate.naturalWidth > 0) {
          const dist = Math.abs(i - frameIdx);
          if (dist < nearestDist) {
            nearestDist = dist;
            nearestImg = candidate;
            nearestIdx = i;
          }
        }
      }
      img = nearestImg;
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const w = canvas.width;
    const h = canvas.height;
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;

    const hRatio = w / imgW;
    const vRatio = h / imgH;
    const ratio = Math.max(hRatio, vRatio);
    const drawW = imgW * ratio;
    const drawH = imgH * ratio;
    const drawX = (w - drawW) / 2;
    const drawY = (h - drawH) / 2;

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    lastDrawnFrameRef.current = frameIdx;
  }, []);

  // Sync canvas size and device pixel ratio (DPR)
  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const targetW = Math.round((rect.width || window.innerWidth) * dpr);
    const targetH = Math.round((rect.height || window.innerHeight) * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    const currentFrame = currentTargetFrameRef.current;
    drawFrame(currentFrame);
  }, [drawFrame]);

  // Robust Stride Preloading Engine enfocado en frames activos (44 a 239)
  useEffect(() => {
    imagesRef.current = new Array(TOTAL_FRAMES);

    const loadImage = (idx) => {
      if (imagesRef.current[idx]) return imagesRef.current[idx];
      const img = new Image();
      const num = String(idx + 1).padStart(4, '0');
      img.src = `/scrolly_frames/frame_${num}.webp`;
      imagesRef.current[idx] = img;

      img.onload = () => {
        const target = currentTargetFrameRef.current;
        const lastDrawn = lastDrawnFrameRef.current;
        if (lastDrawn === -1 || Math.abs(idx - target) < Math.abs(lastDrawn - target)) {
          drawFrame(target);
        }
      };
      return img;
    };

    // Stride Phase 1: Carga inmediata prioritaria de frames pares desde START_FRAME
    for (let i = START_FRAME; i <= END_FRAME; i += 2) {
      loadImage(i);
    }
    loadImage(START_FRAME);
    loadImage(END_FRAME);

    // Stride Phase 2: Relleno progresivo de frames impares para 60 FPS ininterrumpidos
    const timer = setTimeout(() => {
      for (let i = START_FRAME + 1; i < END_FRAME; i += 2) {
        loadImage(i);
      }
    }, 30);

    window.addEventListener('resize', updateCanvasDimensions);
    updateCanvasDimensions();

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateCanvasDimensions);
    };
  }, [drawFrame, updateCanvasDimensions]);

  // Sincronización continua de scroll 60 FPS mapeada desde START_FRAME
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    const clamped = Math.min(1, Math.max(0, latest));

    // Mapeo dinámico: scroll 0% -> START_FRAME (44, cerebro abriéndose), scroll 100% -> END_FRAME (239)
    const targetFrame = Math.min(END_FRAME, Math.max(START_FRAME, Math.floor(START_FRAME + clamped * (END_FRAME - START_FRAME))));
    currentTargetFrameRef.current = targetFrame;
    drawFrame(targetFrame);
  });

  // Reversible 5 Architectural Phases carefully calibrated across 240-frame dual footage
  // Segment 1 (Portal & Brain Split): 0% to 48%
  // Segment 2 (Pool & Living Room Interior): 48% to 100%
  const p1Opacity = useTransform(smoothProgress, [0.0, 0.10, 0.18], [1, 1, 0]);
  const p1Y = useTransform(smoothProgress, [0.0, 0.10, 0.18], [0, 0, -40]);

  const p2Opacity = useTransform(smoothProgress, [0.16, 0.24, 0.32, 0.40], [0, 1, 1, 0]);
  const p2Y = useTransform(smoothProgress, [0.16, 0.24, 0.32, 0.40], [40, 0, 0, -40]);

  const p3Opacity = useTransform(smoothProgress, [0.38, 0.46, 0.54, 0.62], [0, 1, 1, 0]);
  const p3Y = useTransform(smoothProgress, [0.38, 0.46, 0.54, 0.62], [40, 0, 0, -40]);

  const p4Opacity = useTransform(smoothProgress, [0.60, 0.68, 0.76, 0.84], [0, 1, 1, 0]);
  const p4Y = useTransform(smoothProgress, [0.60, 0.68, 0.76, 0.84], [40, 0, 0, -40]);

  const p5Opacity = useTransform(smoothProgress, [0.82, 0.90, 1.0], [0, 1, 1]);
  const p5Y = useTransform(smoothProgress, [0.82, 0.90, 1.0], [40, 0, 0]);

  // Sincronizar video de respaldo al frame 44
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 3.65;
    }
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[520vh] bg-brand-deep select-none">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* Layer 0: Hardware GPU Backup Video */}
        <video
          ref={videoRef}
          src="/videos/hero_scrolly_complete.mp4"
          poster="/scrolly_frames/frame_0045.webp"
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={() => {
            if (videoRef.current) videoRef.current.currentTime = 3.65;
          }}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
        />

        {/* Layer 1: High-Performance Canvas Image Sequence Engine (240 WebP Frames at 60 FPS) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
        />

        {/* Layer 2: Ambient Crystalline Cinema Vignette (Zero muddy overlays, pristine clarity) */}
        <div 
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: 'linear-gradient(to bottom, rgba(10,10,10,0.65) 0%, rgba(10,10,10,0.02) 25%, rgba(10,10,10,0.02) 75%, rgba(10,10,10,0.75) 100%)'
          }}
        />
        <div 
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 60%, rgba(10,10,10,0.45) 100%)'
          }}
        />


        {/* Central Stage: Absolutely Positioned Synchronized Text Phases */}
        <div className="relative z-30 w-full max-w-4xl mx-auto px-6 text-center pointer-events-none h-64 flex items-center justify-center">
          
          {/* Phase 1: 0% to 20% */}
          <motion.div
            style={{ opacity: p1Opacity, y: p1Y }}
            className="space-y-3 will-change-transform absolute inset-x-0 mx-auto max-w-3xl px-6"
          >
            <h2 className="font-editorial-heading text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
              {t('scrolly.phase1Title')}
            </h2>
            <p className="text-white/80 text-sm sm:text-lg max-w-2xl mx-auto font-light leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
              {t('scrolly.phase1Desc')}
            </p>
          </motion.div>

          {/* Phase 2: 18% to 42% */}
          <motion.div
            style={{ opacity: p2Opacity, y: p2Y }}
            className="space-y-3 will-change-transform absolute inset-x-0 mx-auto max-w-3xl px-6"
          >
            <h2 className="font-editorial-heading text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
              {t('scrolly.phase2Title')}
            </h2>
            <p className="text-white/80 text-sm sm:text-lg max-w-2xl mx-auto font-light leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
              {t('scrolly.phase2Desc')}
            </p>
          </motion.div>

          {/* Phase 3: 38% to 63% (Seamless footage continuation into scroll2) */}
          <motion.div
            style={{ opacity: p3Opacity, y: p3Y }}
            className="space-y-3 will-change-transform absolute inset-x-0 mx-auto max-w-3xl px-6"
          >
            <h2 className="font-editorial-heading text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
              {t('scrolly.phase3Title')}
            </h2>
            <p className="text-white/80 text-sm sm:text-lg max-w-2xl mx-auto font-light leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
              {t('scrolly.phase3Desc')}
            </p>
          </motion.div>

          {/* Phase 4: 59% to 83% */}
          <motion.div
            style={{ opacity: p4Opacity, y: p4Y }}
            className="space-y-3 will-change-transform absolute inset-x-0 mx-auto max-w-3xl px-6"
          >
            <h2 className="font-editorial-heading text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
              {t('scrolly.phase4Title')}
            </h2>
            <p className="text-white/80 text-sm sm:text-lg max-w-2xl mx-auto font-light leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
              {t('scrolly.phase4Desc')}
            </p>
          </motion.div>

          {/* Phase 5: 79% to 100% */}
          <motion.div
            style={{ opacity: p5Opacity, y: p5Y }}
            className="space-y-5 will-change-transform absolute inset-x-0 mx-auto max-w-3xl px-6 pointer-events-auto"
          >
            <h2 className="font-editorial-heading text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
              {t('scrolly.phase5Title')}
            </h2>
            <p className="text-white/80 text-sm sm:text-lg max-w-2xl mx-auto font-light leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
              {t('scrolly.phase5Desc')}
            </p>
            <div className="pt-2">
              <button
                onClick={onExploreProjects}
                className="inline-flex items-center gap-3 px-9 py-4 bg-brand-mint text-brand-deep hover:bg-brand-mint-light transition-all duration-300 font-architectural text-xs tracking-wider font-bold rounded-[3px] shadow-[0_0_35px_rgba(184,222,216,0.4)] hover:scale-105 transform cursor-pointer"
              >
                <span>{t('scrolly.exploreBtn')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Scroll Indicator (Fades out gracefully once scroll begins) */}
        <motion.div 
          style={{ opacity: p1Opacity }}
          className="absolute bottom-6 inset-x-0 flex justify-center z-20 pointer-events-none"
        >
          <div className="flex flex-col items-center gap-1.5 opacity-50">
            <span className="text-[9px] font-mono text-white uppercase tracking-widest">{t('scrolly.scrollIndicator')}</span>
            <div className="w-4 h-7 border border-white/40 rounded-full flex justify-center pt-1.5">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-1.5 bg-brand-mint rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
