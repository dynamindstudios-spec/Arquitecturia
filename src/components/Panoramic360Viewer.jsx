import React, { useState, useRef, useEffect } from 'react';
import { Compass, RotateCw, Play, Pause, X, MoveHorizontal } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export const Panoramic360Viewer = ({ imageSrc, projectTitle, onClose }) => {
  const { language } = useTranslation();
  const [posX, setPosX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const startXRef = useRef(0);
  const lastXRef = useRef(0);
  const velocityRef = useRef(0);
  const reqAnimRef = useRef(null);
  const currentPosRef = useRef(0);

  // Auto-orbit loop
  useEffect(() => {
    const loop = () => {
      if (autoRotate && !isDragging) {
        currentPosRef.current = (currentPosRef.current - 0.4) % 2400;
        setPosX(currentPosRef.current);
      }
      reqAnimRef.current = requestAnimationFrame(loop);
    };
    reqAnimRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(reqAnimRef.current);
  }, [autoRotate, isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setAutoRotate(false);
    startXRef.current = e.clientX;
    lastXRef.current = currentPosRef.current;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = (e.clientX - startXRef.current) * 1.4;
    currentPosRef.current = lastXRef.current + deltaX;
    setPosX(currentPosRef.current);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Support for mobile smartphones
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setAutoRotate(false);
      startXRef.current = e.touches[0].clientX;
      lastXRef.current = currentPosRef.current;
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = (e.touches[0].clientX - startXRef.current) * 1.4;
    currentPosRef.current = lastXRef.current + deltaX;
    setPosX(currentPosRef.current);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Calculate compass azimuth based on scroll position (0° to 360°)
  const azimuthDegrees = Math.round(Math.abs(posX * 0.15) % 360);

  return (
    <div
      className="relative w-full h-full min-h-[380px] sm:min-h-[480px] bg-black overflow-hidden select-none cursor-grab active:cursor-grabbing border border-brand-mint/30 rounded-[3px]"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Seamless Panoramic Continuous Image Strip */}
      <div
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundPosition: `${posX}px center`,
          backgroundSize: 'cover',
          backgroundRepeat: 'repeat-x',
          transition: isDragging ? 'none' : 'background-position 0.05s ease-out'
        }}
      />

      {/* Top Horizon Line & Azimuth Telemetry HUD */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2.5 px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/20 rounded font-mono text-[10px] text-white">
          <Compass className="w-3.5 h-3.5 text-brand-mint animate-spin" style={{ animationDuration: '8s' }} />
          <span>AZIMUT: <strong className="text-brand-mint">{azimuthDegrees}°</strong></span>
          <span className="text-white/20">|</span>
          <span className="uppercase">{projectTitle}</span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-1.5 rounded border transition-colors cursor-pointer ${
              autoRotate ? 'bg-brand-mint text-brand-deep border-brand-mint' : 'bg-black/60 text-white border-white/20 hover:border-brand-mint'
            }`}
            title="Giro automático"
          >
            {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded bg-black/60 text-white border border-white/20 hover:border-white transition-colors cursor-pointer"
              title="Volver a la galería"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Center Drag Hint Pill */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-2 px-3 py-1.5 bg-black/70 backdrop-blur-md border border-white/20 rounded-full font-mono text-[10px] text-white/80">
        <MoveHorizontal className="w-3.5 h-3.5 text-brand-mint animate-pulse" />
        <span>{language === 'EN' ? 'CLICK & DRAG TO ROTATE 360°' : language === 'FR' ? 'GLISSEZ POUR TOURNER EN 360°' : 'ARRASTRA PARA GIRAR 360°'}</span>
      </div>

      {/* Architectural Horizon Reticle Lines */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none border-t border-brand-mint/15" />
    </div>
  );
};
