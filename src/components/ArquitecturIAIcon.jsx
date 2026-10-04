import React from 'react';

/**
 * ArquitecturIAIcon
 * Monograma arquitectónico minimalista y de alto estatus.
 * Simboliza la 'A' de Arquitectura como un portal estructural monolítico
 * con un núcleo vertical esbelto que encarna la 'I' de Inteligencia geométrica y computacional.
 */
export const ArquitecturIAIcon = ({ 
  className = 'w-6 h-6', 
  color = 'currentColor',
  accentColor = '#b8ded8' 
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="ArquitecturIA Emblema"
    >
      {/* Pylon Izquierdo: Plano diagonal monolítico */}
      <path
        d="M50 14L18 86H32L50 44L68 86H82L50 14Z"
        fill={color}
      />

      {/* Dintel Horizontal Cantilever: Viga estructural que cruza y proyecta */}
      <rect
        x="24"
        y="58"
        width="52"
        height="8"
        rx="1"
        fill={color}
      />

      {/* Núcleo Central 'I': Fisura vertical de luz y cálculo paramétrico */}
      <rect
        x="47.5"
        y="28"
        width="5"
        height="22"
        rx="1"
        fill={accentColor}
      />

      {/* Punto de precisión de coordenadas geodésicas / Golden Ratio */}
      <circle
        cx="50"
        cy="72"
        r="2.5"
        fill={accentColor}
      />
    </svg>
  );
};

export default ArquitecturIAIcon;
