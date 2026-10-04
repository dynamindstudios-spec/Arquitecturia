import React, { useEffect, useState, useRef } from 'react';
import { useMotionValue, useSpring, animate } from 'framer-motion';

/**
 * AnimatedPriceCounter
 * Odómetro continuo cinemático para cifras financieras y simulador de inversión.
 * Rueda suavemente los valores numéricos a 60 FPS utilizando interpolación
 * con curva de desaceleración elástica cubic-bezier(0.16, 1, 0.3, 1).
 */
export const AnimatedPriceCounter = ({
  value = 0,
  duration = 0.65,
  isCurrency = true,
  prefix = '',
  suffix = '',
  className = ''
}) => {
  const [displayValue, setDisplayValue] = useState(value);
  const motionVal = useMotionValue(value);
  const prevValueRef = useRef(value);

  const formatValue = (num) => {
    const rounded = Math.round(num);
    if (isCurrency) {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0
      }).format(rounded);
    }
    return new Intl.NumberFormat('es-CO').format(rounded);
  };

  useEffect(() => {
    const startVal = prevValueRef.current;
    motionVal.set(startVal);

    const controls = animate(startVal, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplayValue(latest);
      },
      onComplete: () => {
        prevValueRef.current = value;
      }
    });

    return () => controls.stop();
  }, [value, duration]);

  return (
    <span className={`inline-block tabular-nums transition-colors ${className}`}>
      {prefix}
      {formatValue(displayValue)}
      {suffix}
    </span>
  );
};
