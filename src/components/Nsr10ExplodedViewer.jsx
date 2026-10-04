import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, ShieldAlert, Sparkles, Sliders, CheckCircle2, 
  Info, Compass, ChevronRight, X, ArrowUpRight, Maximize2 
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

// Datos de los 4 Estratos Estructurales NSR-10
const STRUCTURAL_STRATA = [
  {
    id: 'roof',
    level: 3,
    title: 'ESTRATO 3: CUBIERTA BIOCLIMÁTICA & ALEROS MONOLÍTICOS',
    shortTitle: 'Cubierta & Aleros',
    normRef: 'NSR-10 Título B (Cargas Viento) & Título J (Seguridad Incendio)',
    tag: 'BIOCLIMÁTICA PASIVA',
    color: '#B8DED8',
    specs: [
      { k: 'Vuelo en Voladizo:', v: '1.80 m perimetral libre de apoyos' },
      { k: 'Aislamiento Térmico:', v: 'Poliestireno Extruido (XPS) e=50mm' },
      { k: 'Pendiente Mínima:', v: '8% con colectores de agua pluvial' },
      { k: 'Impermeabilización:', v: 'Membrana asfáltica bicapa 4mm con gravilla' }
    ],
    technicalNote: 'El diseño de la losa de cubierta en voladizo genera una pantalla cenital que reduce en un 70% el calentamiento solar directo sobre los cerramientos de vidrio.'
  },
  {
    id: 'skin',
    level: 2,
    title: 'ESTRATO 2: ENVOLVENTE NOBLE & CARPINTERÍA DE AUTOR',
    shortTitle: 'Mampostería & Teka',
    normRef: 'NSR-10 Título D (Mampostería Estructural) & Título K (Vidrios)',
    tag: 'CERRAMIENTO ACÚSTICO',
    color: '#D4AF37',
    specs: [
      { k: 'Muros Confinados:', v: 'Ladrillo tolete macizo con columnetas de amarre' },
      { k: 'Carpintería de Fachada:', v: 'Madera teka curada con aceite de linaza' },
      { k: 'Ventanería:', v: 'Perfilería de aluminio serie europea con rotura térmica' },
      { k: 'Acristalamiento:', v: 'Vidrio laminado de seguridad 4+4 con PVB acústico' }
    ],
    technicalNote: 'Los elementos no estructurales cuentan con anclajes sísmicos independientes para evitar fisuras o desprendimientos ante derivas de entrepiso.'
  },
  {
    id: 'skeleton',
    level: 1,
    title: 'ESTRATO 1: PÓRTICOS DE CONCRETO CON DISIPACIÓN ESPECIAL (DES)',
    shortTitle: 'Esqueleto Sismorresistente',
    normRef: 'NSR-10 Título C (Concreto Estructural) - Capítulo C.21',
    tag: 'AMENAZA SÍSMICA ALTA (Aa = 0.25)',
    color: '#60A5FA',
    specs: [
      { k: 'Resistencia Concreto:', v: "f'c = 28 MPa a 35 MPa (4.000 a 5.000 PSI)" },
      { k: 'Acero de Refuerzo:', v: 'Barras corrugadas soldables Grado 60 (W60)' },
      { k: 'Confinamiento Nodal:', v: 'Estribos cerrados a 135° espaciados a d/4' },
      { k: 'Límite de Deriva:', v: 'Δi ≤ 0.010 hi (1.0% de la altura de piso)' }
    ],
    technicalNote: 'Los nudos viga-columna están hiper-confinados para garantizar que la disipación inelástica ocurra en zonas de plastificación controlada sin colapso frágil.'
  },
  {
    id: 'foundations',
    level: 0,
    title: 'ESTRATO 0: GEOTECNIA EN ANDISOLES & MITIGACIÓN DE EMPUJES',
    shortTitle: 'Cimentación & Laderas',
    normRef: 'NSR-10 Título H (Estudios Geotécnicos)',
    tag: 'SUELOS VOLCÁNICOS',
    color: '#34D399',
    specs: [
      { k: 'Suelo Portante:', v: 'Cenizas volcánicas compactas (Andisoles Quindío)' },
      { k: 'Capacidad Admisible:', v: 'qa = 1.2 kg/cm² a 1.8 kg/cm²' },
      { k: 'Cimentación:', v: 'Zapatas enlazadas bidireccionalmente con vigas de amarre' },
      { k: 'Drenaje Perimetral:', v: 'Geodrenes franceses y lloraderos para presión cero' }
    ],
    technicalNote: 'El sistema de drenaje continuo de ladera desvía las escorrentías pluviales subterráneas, eliminando cualquier empuje hidrostático contra los muros de contención.'
  }
];

export const Nsr10ExplodedViewer = ({ isOpen = true, onClose }) => {
  const { language } = useTranslation();
  const [separationPct, setSeparationPct] = useState(65); // 0 a 100%
  const [selectedStratum, setSelectedStratum] = useState(STRUCTURAL_STRATA[1]); // Estrato 1 por defecto

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto select-none">
      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative w-full max-w-5xl bg-brand-deep border border-brand-mint/35 rounded-xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden text-white flex flex-col my-auto max-h-[95vh]"
      >
        {/* Encabezado Superior */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-brand-surface/70">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-mint/15 text-brand-mint border border-brand-mint/30 rounded-md">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-wider text-brand-mint uppercase font-bold">
                  DESPIECE ISOMÉTRICO ESTRUCTURAL · NORMA NSR-10
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 bg-blue-950/50 text-blue-300 rounded border border-blue-500/30">
                  DISIPACIÓN ESPECIAL (DES)
                </span>
              </div>
              <h3 className="font-editorial-heading text-lg sm:text-2xl text-white">
                Anatomía Sismorresistente & Estratos de Construcción
              </h3>
            </div>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Contenido Principal: Isometría en Canvas / CSS 3D + Ficha Técnica */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 min-h-0 overflow-y-auto">
          {/* Columna Izquierda: Escena Isométrica Despiezada */}
          <div className="lg:col-span-7 relative bg-black/60 flex flex-col items-center justify-between p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden">
            {/* Visualizador de Estratos Flotantes */}
            <div className="relative w-full h-[380px] sm:h-[420px] flex items-center justify-center">
              {/* Retícula Isométrica de Fondo */}
              <div 
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 50% 50%, rgba(184, 222, 216, 0.4) 1px, transparent 1px)
                  `,
                  backgroundSize: '24px 24px'
                }}
              />

              {/* Contenedor de Capas Flotantes */}
              <div className="relative w-[300px] h-[340px] flex flex-col items-center justify-center">
                {STRUCTURAL_STRATA.map((stratum) => {
                  const isSelected = selectedStratum.id === stratum.id;
                  // Cálculo de elevación vertical según separación %
                  const baseOffset = (3 - stratum.level) * (separationPct * 0.95);
                  const translateY = -120 + baseOffset;

                  return (
                    <motion.div
                      key={stratum.id}
                      animate={{ 
                        y: translateY,
                        scale: isSelected ? 1.03 : 1
                      }}
                      transition={{ type: 'spring', stiffness: 180, damping: 22 }}
                      onClick={() => setSelectedStratum(stratum)}
                      className={`absolute w-full cursor-pointer transition-all duration-300 ${
                        isSelected ? 'z-30' : 'z-10 hover:z-20'
                      }`}
                    >
                      {/* Representación Gráfica Isométrica de la Capa */}
                      <div className={`relative p-3 rounded-lg border backdrop-blur-md shadow-2xl transition-all ${
                        isSelected 
                          ? 'border-brand-mint bg-brand-deep/95 shadow-[0_0_25px_rgba(184,222,216,0.35)]'
                          : 'border-white/15 bg-brand-surface/85 hover:border-white/40'
                      }`}>
                        <div className="flex items-center justify-between mb-1">
                          <span 
                            className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded"
                            style={{ backgroundColor: `${stratum.color}22`, color: stratum.color }}
                          >
                            CAPA {stratum.level}: {stratum.shortTitle}
                          </span>
                          <span className="text-[9px] font-mono text-white/40">
                            {isSelected ? '● ACTIVA' : 'Clic para inspeccionar'}
                          </span>
                        </div>

                        {/* Dibujo Vectorial del Estrato */}
                        <div className="relative h-12 rounded bg-black/40 border border-white/5 flex items-center justify-between px-3 overflow-hidden">
                          <div className="text-[10px] font-mono text-white/70 truncate">
                            {stratum.tag}
                          </div>
                          <div 
                            className="w-3 h-3 rounded-full border"
                            style={{ borderColor: stratum.color, backgroundColor: `${stratum.color}40` }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Slider de Separación Isométrica */}
            <div className="w-full bg-brand-surface/90 border border-white/10 p-3.5 rounded-lg space-y-2 mt-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-brand-mint font-bold flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5" />
                  SEPARACIÓN ESTRUCTURAL:
                </span>
                <span className="text-sm font-bold text-white bg-brand-deep px-2.5 py-0.5 rounded border border-brand-mint/40">
                  {separationPct}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={separationPct}
                onChange={(e) => setSeparationPct(parseInt(e.target.value))}
                className="w-full accent-brand-mint h-2 bg-brand-deep rounded cursor-pointer"
              />
              <div className="flex justify-between text-[9px] font-mono text-white/40">
                <span>0% (Ensamblado en Obra)</span>
                <span>50% (Corte Isométrico)</span>
                <span>100% (Despiece Total)</span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Ficha Técnica de la Capa Seleccionada */}
          <div className="lg:col-span-5 p-4 sm:p-6 flex flex-col justify-between space-y-4 bg-brand-surface/40">
            <div className="space-y-4">
              <div>
                <span 
                  className="text-[10px] font-mono font-bold uppercase tracking-wider block"
                  style={{ color: selectedStratum.color }}
                >
                  {selectedStratum.tag}
                </span>
                <h4 className="font-editorial-heading text-xl text-white mt-0.5">
                  {selectedStratum.title}
                </h4>
                <div className="mt-1 text-[11px] font-mono text-white/60 bg-brand-deep px-2.5 py-1 rounded border border-white/10 inline-block">
                  ⚖️ {selectedStratum.normRef}
                </div>
              </div>

              {/* Especificaciones Técnicas */}
              <div className="space-y-2 bg-brand-deep/80 p-3.5 rounded-lg border border-white/10 font-mono text-xs">
                <span className="text-[10px] text-white/40 uppercase tracking-wider block mb-2">
                  PARÁMETROS DE CÁLCULO & MATERIALES:
                </span>
                {selectedStratum.specs.map((item, idx) => (
                  <div key={idx} className="flex justify-between border-b border-white/5 pb-1.5 last:border-0 last:pb-0">
                    <span className="text-white/60 text-[11px]">{item.k}</span>
                    <span className="text-white font-bold text-[11px] text-right">{item.v}</span>
                  </div>
                ))}
              </div>

              {/* Memoria Descriptiva */}
              <div className="p-3 bg-brand-deep/90 border border-brand-mint/20 rounded-lg">
                <span className="text-[10px] font-mono text-brand-mint uppercase tracking-wider font-bold block mb-1">
                  CRITERIO SISMORRESISTENTE DEL ATELIER:
                </span>
                <p className="text-xs font-mono text-white/70 leading-relaxed">
                  {selectedStratum.technicalNote}
                </p>
              </div>
            </div>

            {/* Selector Rápido de Capas */}
            <div className="pt-2 border-t border-white/10">
              <span className="text-[10px] font-mono text-white/40 uppercase block mb-1.5">
                NAVEGACIÓN POR ESTRATOS:
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {STRUCTURAL_STRATA.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStratum(s)}
                    className={`py-1.5 px-1 rounded text-center font-mono text-[9px] border transition-all ${
                      selectedStratum.id === s.id
                        ? 'bg-brand-mint text-brand-deep font-bold border-brand-mint shadow-sm'
                        : 'bg-brand-deep border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    CAPA {s.level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
