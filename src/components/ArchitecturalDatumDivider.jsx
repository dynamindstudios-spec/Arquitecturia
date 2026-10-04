import React from 'react';

/**
 * ArchitecturalDatumDivider
 * Subtle architectural drafting datum bar with cad millimeter ticks,
 * axis notation, and crosshair survey marks.
 */
export const ArchitecturalDatumDivider = ({ axis = 'AXIS S-01', elevation = '+0.00m' }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-4 select-none pointer-events-none" aria-hidden="true">
      <div className="relative flex items-center justify-between border-t border-white/10 pt-2 text-[9px] font-mono text-white/30 tracking-widest">
        {/* Left Datum Crosshair */}
        <div className="flex items-center gap-2">
          <span className="text-brand-mint/50 font-bold">+</span>
          <span className="uppercase">{axis}</span>
          <span className="text-white/20">|</span>
          <span className="text-white/40">{elevation}</span>
        </div>

        {/* Center CAD Scale Metric Ticks */}
        <div className="hidden sm:flex items-center gap-6 text-white/20">
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 border-t border-white/20" />
            <span>0.0m</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 border-t border-white/20" />
            <span>5.0m</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 border-t border-white/20" />
            <span>10.0m</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 border-t border-white/20" />
            <span>25.0m</span>
          </span>
        </div>

        {/* Right Datum Coordinates */}
        <div className="flex items-center gap-2">
          <span className="hidden md:inline text-white/30">NSR-10 SISMO-RESISTENTE</span>
          <span className="text-white/20 hidden md:inline">|</span>
          <span className="text-brand-mint/60">4°32'N 75°40'W</span>
          <span className="text-brand-mint/50 font-bold">+</span>
        </div>
      </div>
    </div>
  );
};
