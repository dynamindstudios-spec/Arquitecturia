import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

/**
 * AmbientCursorGlow Cinemático
 * Halo de luz sutil en tono menta arquitectónica (rgba(184, 222, 216, 0.05))
 * Sigue el cursor con física de resorte (inercia elástica Apple-style).
 * Desactivado automáticamente en dispositivos táctiles para optimización de GPU y batería.
 */
export const AmbientCursorGlow = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  // Raw cursor coordinates
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Spring physics for elastic luxury catch-up
  const springConfig = { damping: 32, stiffness: 220, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on pointer-precise devices (mouse/trackpad, not touch)
    if (typeof window === 'undefined') return;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    setIsSupported(true);

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isSupported) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden select-none">
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-[520px] h-[520px] rounded-full will-change-transform"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `
              radial-gradient(
                circle at center,
                rgba(184, 222, 216, 0.055) 0%,
                rgba(184, 222, 216, 0.025) 30%,
                rgba(184, 222, 216, 0.008) 55%,
                transparent 72%
              )
            `,
            filter: 'blur(12px)'
          }}
        />
      </motion.div>
    </div>
  );
};
