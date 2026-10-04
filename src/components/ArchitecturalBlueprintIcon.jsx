import React from 'react';
import { motion } from 'framer-motion';

/**
 * ArchitecturalBlueprintIcon
 * Anima el trazado vectorial de planos arquitectónicos (stroke line-draw)
 * utilizando pathLength: 0 -> 1 con curva cubic-bezier(0.16, 1, 0.3, 1).
 * Evoca el trazo a mano de un estilógrafo sobre papel vegetal de dibujo técnico.
 */
export const ArchitecturalBlueprintIcon = ({
  pillarNumber = '01',
  className = 'w-12 h-12 text-brand-mint'
}) => {
  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (custom = 0) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: 1.3,
          ease: [0.16, 1, 0.3, 1],
          delay: custom * 0.12
        },
        opacity: { duration: 0.25, delay: custom * 0.12 }
      }
    })
  };

  const renderIcon = () => {
    switch (pillarNumber) {
      case '01':
        // Portal Estructural & Retícula Monolítica NSR-10
        return (
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
            {/* Base ground plate */}
            <motion.line
              x1="6" y1="56" x2="58" y2="56"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
              variants={lineVariants} custom={0}
            />
            {/* Left structural column */}
            <motion.rect
              x="12" y="14" width="8" height="42"
              stroke="currentColor" strokeWidth="1.5"
              variants={lineVariants} custom={1}
            />
            {/* Right structural column */}
            <motion.rect
              x="44" y="14" width="8" height="42"
              stroke="currentColor" strokeWidth="1.5"
              variants={lineVariants} custom={2}
            />
            {/* Main cantilever beam */}
            <motion.rect
              x="8" y="10" width="48" height="8"
              stroke="currentColor" strokeWidth="1.5"
              variants={lineVariants} custom={3}
            />
            {/* Diagonal Moment Frame Tension Braces */}
            <motion.line
              x1="20" y1="18" x2="44" y2="56"
              stroke="currentColor" strokeWidth="1" strokeDasharray="3 3"
              variants={lineVariants} custom={4}
            />
            <motion.line
              x1="44" y1="18" x2="20" y2="56"
              stroke="currentColor" strokeWidth="1" strokeDasharray="3 3"
              variants={lineVariants} custom={5}
            />
            {/* Central Axis Node */}
            <motion.circle
              cx="32" cy="37" r="3"
              stroke="currentColor" strokeWidth="1.2"
              variants={lineVariants} custom={6}
            />
          </svg>
        );

      case '02':
        // Bioclimática, Arco Solar & Vector Eólico
        return (
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
            {/* Solar Trajectory Arc */}
            <motion.path
              d="M8 48 C 16 16, 48 16, 56 48"
              stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2"
              variants={lineVariants} custom={0}
            />
            {/* Sun Core at Apex */}
            <motion.circle
              cx="32" cy="18" r="6"
              stroke="currentColor" strokeWidth="1.5"
              variants={lineVariants} custom={1}
            />
            {/* Sun Radial Beams */}
            <motion.line
              x1="32" y1="6" x2="32" y2="10"
              stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"
              variants={lineVariants} custom={2}
            />
            <motion.line
              x1="20" y1="10" x2="23" y2="13"
              stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"
              variants={lineVariants} custom={2.5}
            />
            <motion.line
              x1="44" y1="10" x2="41" y2="13"
              stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"
              variants={lineVariants} custom={2.8}
            />
            {/* Brise-Soleil Angled Louvers */}
            <motion.line
              x1="18" y1="38" x2="32" y2="34"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
              variants={lineVariants} custom={3}
            />
            <motion.line
              x1="18" y1="44" x2="32" y2="40"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
              variants={lineVariants} custom={3.5}
            />
            <motion.line
              x1="18" y1="50" x2="32" y2="46"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
              variants={lineVariants} custom={4}
            />
            {/* Cross-Ventilation Wind Flow Wave */}
            <motion.path
              d="M32 42 C 40 40, 44 48, 56 44"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
              variants={lineVariants} custom={5}
            />
          </svg>
        );

      case '03':
        // Materialidad Honesta, Bloque Monolítico & Estratigrafía
        return (
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
            {/* Axonometric Isometric Cube - Top Face */}
            <motion.path
              d="M32 8 L54 20 L32 32 L10 20 Z"
              stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
              variants={lineVariants} custom={0}
            />
            {/* Left Vertical Face (Formwork Concrete) */}
            <motion.path
              d="M10 20 L32 32 L32 54 L10 42 Z"
              stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
              variants={lineVariants} custom={1}
            />
            {/* Right Vertical Face (Teak Hardwood Planks) */}
            <motion.path
              d="M32 32 L54 20 L54 42 L32 54 Z"
              stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
              variants={lineVariants} custom={2}
            />
            {/* Concrete Formwork Horizontal Tie Lines */}
            <motion.line
              x1="10" y1="27" x2="32" y2="39"
              stroke="currentColor" strokeWidth="1" strokeDasharray="3 2"
              variants={lineVariants} custom={3}
            />
            <motion.line
              x1="10" y1="35" x2="32" y2="47"
              stroke="currentColor" strokeWidth="1" strokeDasharray="3 2"
              variants={lineVariants} custom={3.5}
            />
            {/* Wood Grain Lines */}
            <motion.line
              x1="39" y1="28" x2="39" y2="50"
              stroke="currentColor" strokeWidth="1"
              variants={lineVariants} custom={4}
            />
            <motion.line
              x1="47" y1="24" x2="47" y2="46"
              stroke="currentColor" strokeWidth="1"
              variants={lineVariants} custom={4.5}
            />
          </svg>
        );

      case '04':
      default:
        // Rigor Milimétrico, Compás de Arquitecto & Eje Cartesiano
        return (
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
            {/* Architectural Drafting Compass (Hinge) */}
            <motion.circle
              cx="32" cy="14" r="4"
              stroke="currentColor" strokeWidth="1.5"
              variants={lineVariants} custom={0}
            />
            {/* Left Compass Leg with Needle */}
            <motion.line
              x1="30" y1="18" x2="16" y2="52"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
              variants={lineVariants} custom={1}
            />
            {/* Right Compass Leg with Lead Point */}
            <motion.line
              x1="34" y1="18" x2="48" y2="52"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
              variants={lineVariants} custom={2}
            />
            {/* Adjustable Compass Spreader Bar */}
            <motion.line
              x1="22" y1="34" x2="42" y2="34"
              stroke="currentColor" strokeWidth="1.2"
              variants={lineVariants} custom={3}
            />
            <motion.circle
              cx="32" cy="34" r="2"
              fill="currentColor"
              variants={lineVariants} custom={3.5}
            />
            {/* Precision Datum Crosshair Circle */}
            <motion.circle
              cx="16" cy="52" r="5"
              stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"
              variants={lineVariants} custom={4}
            />
            {/* Measured Arc at Lead Point */}
            <motion.path
              d="M40 54 A 32 32 0 0 0 54 48"
              stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"
              variants={lineVariants} custom={5}
            />
          </svg>
        );
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className={`inline-block select-none ${className}`}
    >
      {renderIcon()}
    </motion.div>
  );
};
