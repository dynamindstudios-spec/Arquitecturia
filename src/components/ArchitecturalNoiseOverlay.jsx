import React from 'react';

/**
 * ArchitecturalNoiseOverlay
 * Procedural ultra-fine micro-grain film overlay that gives the viewport
 * the tangible materiality of architectural drafting paper and smooth cast concrete.
 * Fully GPU-accelerated, zero external network requests, pointer-events none.
 */
export const ArchitecturalNoiseOverlay = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-40 select-none overflow-hidden"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.035'/%3E%3C/svg%3E")`,
        opacity: 0.75,
        mixBlendMode: 'screen'
      }}
    />
  );
};
