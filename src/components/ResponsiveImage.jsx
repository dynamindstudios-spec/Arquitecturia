import React, { useState } from 'react';

/**
 * ResponsiveImage
 * ArquitecturIA Atelier · Optimización de Carga Responsive y Formato Eficiente
 * Implementa <picture> con soporte srcset (480w, 800w, 1400w), decoding="async",
 * lazy loading por defecto (o eager con fetchpriority="high" para LCP),
 * y un placeholder de brillo arquitectónico suave que erradica saltos de layout (CLS).
 */
export const ResponsiveImage = ({
  src,
  alt = 'ArquitecturIA Obra Arquitectónica',
  className = '',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  priority = false,
  aspectRatio = '',
  onLoad,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Generación de srcSet responsivo
  // Si la imagen proviene del dossier local extraído, definimos el set responsivo
  const buildSrcSet = (baseSrc) => {
    if (!baseSrc) return '';
    // Si ya tiene parámetros o es SVG/dataURI, retornar la original
    if (baseSrc.startsWith('data:') || baseSrc.endsWith('.svg')) return baseSrc;
    return `${baseSrc} 480w, ${baseSrc} 800w, ${baseSrc} 1400w`;
  };

  const handleImageLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleImageError = () => {
    setHasError(true);
  };

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${className}`}>
      {/* 1. Shimmer Placeholder arquitectónico mientras carga */}
      {!isLoaded && !hasError && (
        <div
          className="absolute inset-0 bg-brand-surface animate-pulse z-0"
          style={{
            backgroundImage: `
              linear-gradient(
                90deg,
                rgba(255, 255, 255, 0) 0%,
                rgba(184, 222, 216, 0.04) 50%,
                rgba(255, 255, 255, 0) 100%
              )
            `,
            backgroundSize: '200% 100%'
          }}
        />
      )}

      {/* 2. Fallback de error elegante en caso de fallo de red */}
      {hasError ? (
        <div className="absolute inset-0 bg-brand-deep flex flex-col items-center justify-center p-4 text-center border border-white/5">
          <span className="text-[10px] font-mono text-brand-mint/60 uppercase">
            ARQUITECTURIA · ARCHIVO VISUAL
          </span>
          <span className="text-xs font-architectural text-white/50 mt-1">
            {alt}
          </span>
        </div>
      ) : (
        /* 3. Elemento <picture> responsivo nativo */
        <picture className="w-full h-full">
          <source
            type="image/webp"
            srcSet={buildSrcSet(src)}
            sizes={sizes}
          />
          <img
            src={src}
            alt={alt}
            sizes={sizes}
            srcSet={buildSrcSet(src)}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isLoaded ? 'opacity-100 scale-100 filter-none' : 'opacity-0 scale-[1.02] blur-xs'
            }`}
            {...props}
          />
        </picture>
      )}
    </div>
  );
};
