import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Maximize2, Layers, Check, SlidersHorizontal, Eye, ZoomIn, ZoomOut, RotateCcw, Wind, ShieldCheck } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export const ArchitecturalCadViewer = ({ projectTitle = 'CASA 49 SANTA CLARA', area = '450 m²' }) => {
  const { language } = useTranslation();
  const [zoom, setZoom] = useState(1);
  const [showDimensions, setShowDimensions] = useState(true);
  const [showAxes, setShowAxes] = useState(true);
  const [showBioclimatic, setShowBioclimatic] = useState(true);
  const [showStructure, setShowStructure] = useState(true);
  const [activeLevel, setActiveLevel] = useState('level1'); // 'level1' | 'level2'

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 2.2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoom(1);

  return (
    <div className="relative w-full h-full bg-[#080c0a] border border-brand-mint/40 rounded-[3px] overflow-hidden flex flex-col justify-between p-4 sm:p-6 font-mono select-none">
      {/* 1. CAD Millimeter Blueprint Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(184, 222, 216, 0.25) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(184, 222, 216, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px'
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(184, 222, 216, 0.6) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(184, 222, 216, 0.6) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px'
        }}
      />

      {/* 2. Top Header Telemetry & Layer Switchers */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-b border-brand-mint/20 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-brand-mint animate-pulse" />
          <span className="text-xs font-bold text-brand-mint uppercase tracking-widest">
            PLANO TÉCNICO CAD · {projectTitle}
          </span>
          <span className="text-white/20 text-xs">|</span>
          <span className="text-[11px] text-white/60">ESCALA 1:100 · NSR-10</span>
        </div>

        {/* Level Switcher */}
        <div className="flex items-center gap-1 bg-black/60 p-1 border border-white/10 rounded-[3px] text-[10px]">
          <button
            type="button"
            onClick={() => setActiveLevel('level1')}
            className={`px-2.5 py-1 rounded-[2px] transition-colors cursor-pointer ${
              activeLevel === 'level1'
                ? 'bg-brand-mint text-brand-deep font-bold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            PLANTA N1 (SOCIAL & DECK)
          </button>
          <button
            type="button"
            onClick={() => setActiveLevel('level2')}
            className={`px-2.5 py-1 rounded-[2px] transition-colors cursor-pointer ${
              activeLevel === 'level2'
                ? 'bg-brand-mint text-brand-deep font-bold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            PLANTA N2 (SUITES & TERRAZA)
          </button>
        </div>

        {/* Layer Toggles & Interactive Zoom Toolbar */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowStructure(!showStructure)}
            className={`px-2.5 py-1 text-[10px] rounded border transition-colors cursor-pointer flex items-center gap-1.5 ${
              showStructure
                ? 'bg-brand-mint/20 border-brand-mint text-brand-mint'
                : 'bg-black/40 border-white/10 text-white/40'
            }`}
          >
            <ShieldCheck className="w-3 h-3" />
            <span>ESTRUCTURA</span>
          </button>

          <button
            type="button"
            onClick={() => setShowBioclimatic(!showBioclimatic)}
            className={`px-2.5 py-1 text-[10px] rounded border transition-colors cursor-pointer flex items-center gap-1.5 ${
              showBioclimatic
                ? 'bg-brand-mint/20 border-brand-mint text-brand-mint'
                : 'bg-black/40 border-white/10 text-white/40'
            }`}
          >
            <Wind className="w-3 h-3" />
            <span>BIOCLIMÁTICA</span>
          </button>

          <button
            type="button"
            onClick={() => setShowDimensions(!showDimensions)}
            className={`px-2.5 py-1 text-[10px] rounded border transition-colors cursor-pointer flex items-center gap-1.5 ${
              showDimensions
                ? 'bg-brand-mint/20 border-brand-mint text-brand-mint'
                : 'bg-black/40 border-white/10 text-white/40'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>COTAS</span>
          </button>

          <div className="flex items-center gap-1 bg-brand-surface border border-white/10 p-0.5 rounded-[2px] ml-1">
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1 hover:bg-white/10 text-white/70 hover:text-brand-mint rounded-[2px]"
              title="Acercar plano"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1 hover:bg-white/10 text-white/70 hover:text-brand-mint rounded-[2px]"
              title="Alejar plano"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              className="p-1 hover:bg-white/10 text-white/70 hover:text-brand-mint rounded-[2px]"
              title="Restablecer zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Central Interactive SVG Blueprint Stage with Drag-to-Pan and Zoom */}
      <div className="relative z-10 flex-1 min-h-[340px] sm:min-h-[420px] flex items-center justify-center p-2 overflow-hidden cursor-grab active:cursor-grabbing">
        <motion.div
          drag
          dragConstraints={{ left: -180, right: 180, top: -120, bottom: 120 }}
          dragElastic={0.15}
          animate={{ scale: zoom }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full h-full max-h-[450px] flex items-center justify-center"
        >
          <svg
            viewBox="0 0 800 500"
            className="w-full h-full max-h-[440px] overflow-visible drop-shadow-[0_0_20px_rgba(184,222,216,0.25)]"
          >
            {/* North Arrow Symbol */}
            <g transform="translate(740, 60)" className="text-brand-mint">
              <circle cx="0" cy="0" r="22" fill="none" stroke="rgba(184,222,216,0.3)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="18" x2="0" y2="-18" stroke="#b8ded8" strokeWidth="1.5" />
              <polygon points="0,-18 5,-8 -5,-8" fill="#b8ded8" />
              <text x="-4" y="-24" fill="#b8ded8" fontSize="11" fontWeight="bold">N</text>
              <text x="-12" y="32" fill="rgba(255,255,255,0.4)" fontSize="8">AZIMUTH 342°</text>
            </g>

            {/* Structural Grid Axes Lines */}
            {showAxes && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.45 }}
                transition={{ duration: 0.6 }}
                stroke="#b8ded8"
                strokeDasharray="4 4"
                strokeWidth="0.8"
              >
                {/* Vertical Grid Lines (1, 2, 3, 4) */}
                <line x1="120" y1="40" x2="120" y2="440" />
                <line x1="260" y1="40" x2="260" y2="440" />
                <line x1="440" y1="40" x2="440" y2="440" />
                <line x1="660" y1="40" x2="660" y2="440" />

                {/* Horizontal Grid Lines (A, B, C) */}
                <line x1="60" y1="100" x2="740" y2="100" />
                <line x1="60" y1="240" x2="740" y2="240" />
                <line x1="60" y1="380" x2="740" y2="380" />

                {/* Axis Coordinate Markers */}
                <g fill="#b8ded8" fontSize="10" fontWeight="bold" textAnchor="middle">
                  <circle cx="120" cy="30" r="8" fill="#080c0a" stroke="#b8ded8" strokeWidth="1" />
                  <text x="120" y="33">A</text>
                  <circle cx="260" cy="30" r="8" fill="#080c0a" stroke="#b8ded8" strokeWidth="1" />
                  <text x="260" y="33">B</text>
                  <circle cx="440" cy="30" r="8" fill="#080c0a" stroke="#b8ded8" strokeWidth="1" />
                  <text x="440" y="33">C</text>
                  <circle cx="660" cy="30" r="8" fill="#080c0a" stroke="#b8ded8" strokeWidth="1" />
                  <text x="660" y="33">D</text>

                  <circle cx="50" cy="100" r="8" fill="#080c0a" stroke="#b8ded8" strokeWidth="1" />
                  <text x="50" y="103">1</text>
                  <circle cx="50" cy="240" r="8" fill="#080c0a" stroke="#b8ded8" strokeWidth="1" />
                  <text x="50" y="243">2</text>
                  <circle cx="50" cy="380" r="8" fill="#080c0a" stroke="#b8ded8" strokeWidth="1" />
                  <text x="50" y="383">3</text>
                </g>
              </motion.g>
            )}

            {/* Perimeter Monolithic Architectural Walls */}
            <motion.path
              d={activeLevel === 'level1'
                ? "M 140 120 L 440 120 L 440 240 L 640 240 L 640 370 L 140 370 Z"
                : "M 180 140 L 480 140 L 480 220 L 620 220 L 620 350 L 180 350 Z"
              }
              fill="rgba(184, 222, 216, 0.04)"
              stroke="#b8ded8"
              strokeWidth="2.5"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Structural Columns (NSR-10 Reinforced Concrete Cores) */}
            {showStructure && (
              <g fill="#b8ded8">
                <rect x="135" y="115" width="12" height="12" />
                <rect x="275" y="115" width="12" height="12" />
                <rect x="435" y="115" width="12" height="12" />
                <rect x="435" y="235" width="12" height="12" />
                <rect x="635" y="235" width="12" height="12" />
                <rect x="635" y="365" width="12" height="12" />
                <rect x="275" y="365" width="12" height="12" />
                <rect x="135" y="365" width="12" height="12" />
              </g>
            )}

            {/* Bioclimatic Light Court & Ventilation */}
            <motion.rect
              x="240"
              y="170"
              width="90"
              height="90"
              fill="none"
              stroke="#b8ded8"
              strokeWidth="1.2"
              strokeDasharray="2 2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            />
            <text x="285" y="210" fill="rgba(184,222,216,0.7)" fontSize="8" textAnchor="middle">PATIO BIOCLIMÁTICO</text>
            <text x="285" y="222" fill="rgba(255,255,255,0.4)" fontSize="7" textAnchor="middle">VENTILACIÓN CRUZADA</text>

            {/* Bioclimatic Airflow Vectors */}
            {showBioclimatic && (
              <g stroke="rgba(184,222,216,0.6)" strokeWidth="1.5" strokeDasharray="3 3">
                <path d="M 80 180 Q 180 200 240 215" fill="none" />
                <polygon points="245,215 237,211 239,219" fill="#b8ded8" />
                <path d="M 330 215 Q 480 230 680 260" fill="none" />
                <polygon points="685,260 677,256 679,264" fill="#b8ded8" />
                <text x="140" y="195" fill="rgba(184,222,216,0.8)" fontSize="7">FLUJO EÓLICO CORDILLERA</text>
              </g>
            )}

            {/* Space Function Callouts */}
            <g fontSize="10" fill="#ffffff" fontWeight="600">
              <text x="170" y="290">{activeLevel === 'level1' ? 'SALÓN SOCIAL & TEKA' : 'MASTER SUITE PANORÁMICA'}</text>
              <text x="170" y="304" fill="rgba(184,222,216,0.8)" fontSize="8" fontWeight="normal">NPT +0.15m · 84.5 m²</text>

              <text x="470" y="300">{activeLevel === 'level1' ? 'SUITE INVITADOS' : 'ESTUDIO ATELIER'}</text>
              <text x="470" y="314" fill="rgba(184,222,216,0.8)" fontSize="8" fontWeight="normal">NPT +0.15m · 42.0 m²</text>

              <text x="460" y="160">TERRAZA VOLADA</text>
              <text x="460" y="174" fill="rgba(184,222,216,0.8)" fontSize="8" fontWeight="normal">VOLADIZO 4.20m SIN COLUMNA</text>
            </g>

            {/* Dimensions Overlay */}
            {showDimensions && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                stroke="#b8ded8"
                strokeWidth="0.9"
                fill="#b8ded8"
                fontSize="9"
                textAnchor="middle"
              >
                {/* Bottom Total Span Dimension */}
                <line x1="120" y1="420" x2="660" y2="420" />
                <line x1="120" y1="412" x2="120" y2="428" />
                <line x1="660" y1="412" x2="660" y2="428" />
                <rect x="360" y="413" width="60" height="14" fill="#080c0a" stroke="none" />
                <text x="390" y="424" fontWeight="bold">24.50 m</text>

                {/* Top Partial Dimensions */}
                <line x1="120" y1="65" x2="440" y2="65" />
                <line x1="120" y1="60" x2="120" y2="70" />
                <line x1="440" y1="60" x2="440" y2="70" />
                <rect x="255" y="58" width="50" height="14" fill="#080c0a" stroke="none" />
                <text x="280" y="69">14.20 m</text>

                <line x1="440" y1="65" x2="660" y2="65" />
                <line x1="440" y1="60" x2="440" y2="70" />
                <line x1="660" y1="60" x2="660" y2="70" />
                <rect x="525" y="58" width="50" height="14" fill="#080c0a" stroke="none" />
                <text x="550" y="69">10.30 m</text>

                {/* Left Total Height Dimension */}
                <line x1="30" y1="100" x2="30" y2="390" />
                <line x1="22" y1="100" x2="38" y2="100" />
                <line x1="22" y1="390" x2="38" y2="390" />
                <g transform="translate(22, 245) rotate(-90)">
                  <rect x="-30" y="-7" width="60" height="14" fill="#080c0a" stroke="none" />
                  <text x="0" y="4" fontWeight="bold">13.80 m</text>
                </g>
              </motion.g>
            )}
          </svg>
        </motion.div>
      </div>

      {/* 4. Bottom Engineering Metadata Banner */}
      <div className="relative z-10 pt-3 border-t border-brand-mint/20 flex flex-wrap items-center justify-between gap-3 text-[10px] text-white/50">
        <div className="flex items-center gap-4">
          <span>ESPECIFICACIÓN: <strong className="text-white">NSR-10 SISMO-RESISTENTE</strong></span>
          <span className="text-white/20">|</span>
          <span>CONCRETO: <strong className="text-brand-mint">f'c 35 MPa (5,000 PSI)</strong></span>
          <span className="text-white/20 hidden sm:inline">|</span>
          <span className="hidden sm:inline">VOLADIZO: <strong className="text-white">4.20m AUTOPORTANTE</strong></span>
        </div>

        <div className="flex items-center gap-2 text-brand-mint font-semibold">
          <span>ÁREA LOTE: 1,850 m²</span>
          <span className="text-white/20">/</span>
          <span>CONSTRUIDA: {area}</span>
        </div>
      </div>
    </div>
  );
};
