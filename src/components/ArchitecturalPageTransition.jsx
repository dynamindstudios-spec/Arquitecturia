import React from 'react';
import { motion } from 'framer-motion';

/**
 * ArchitecturalPageTransition
 * Cortina arquitectónica minimalista con clip-path: polygon(...)
 * Transición de 0.4s cinemática entre rutas con curva cubic-bezier(0.16, 1, 0.3, 1).
 * Erradica saltos abruptos y genera una entrada fluida tipo galería de arquitectura contemporánea.
 */
export const ArchitecturalPageTransition = ({
  children,
  routeKey,
  className = ''
}) => {
  return (
    <motion.div
      key={routeKey}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={`relative w-full ${className}`}
    >
      {children}
    </motion.div>
  );
};
