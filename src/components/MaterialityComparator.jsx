import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Sparkles, Wind, Sun, Layers } from 'lucide-react';
import { Reveal } from './Reveal';
import { useTranslation } from '../hooks/useTranslation';

const MATERIALS_DICTIONARY = {
  ES: [
    {
      id: 'concreto',
      name: 'Concreto Visto Encofrado',
      subtitle: 'Masa monolítica & Sello bioclimático',
      image: '/extracted/arquitecturia/assets/tracking-concrete-pour.jpg',
      specs: {
        durability: '100+ años sin degradación',
        thermal: 'Alta inercia térmica (reduce 4°C al interior)',
        origin: 'Canteras del Valle del Cauca y Quindío',
        finish: 'Desencofrado a grano fino con sellador hidrófugo mate'
      },
      tag: 'ESTRUCTURA & ESTÉTICA'
    },
    {
      id: 'teka',
      name: 'Madera Teka Curada',
      subtitle: 'Calidez orgánica & Resistencia intemperie',
      image: '/extracted/arquitecturia/assets/tracking-timber-deck.jpg',
      specs: {
        durability: 'Clase I para intemperie tropical',
        thermal: 'Baja conductividad, cero acumulación de calor',
        origin: 'Plantaciones forestales certificadas FSC',
        finish: 'Curado con aceites botánicos de poro abierto'
      },
      tag: 'BIOMATERIAL NOBLE'
    },
    {
      id: 'travertino',
      name: 'Piedra Natural & Travertino',
      subtitle: 'Texturas minerales de alta solidez',
      image: '/extracted/arquitecturia/assets/turismo-villas-delirio.jpg',
      specs: {
        durability: 'Inalterable frente a rayos UV y lluvias andinas',
        thermal: 'Superficie fresca al tacto en climas cálidos',
        origin: 'Cortes seleccionados de cantera andina',
        finish: 'Corte al hilo apomazado con textura táctil'
      },
      tag: 'MINERAL PERPETUO'
    },
    {
      id: 'vidrio',
      name: 'Ventanería & Acero Negro Mate',
      subtitle: 'Integración lumínica con el paisaje cafetero',
      image: '/extracted/arquitecturia/assets/comercial-atrium-glass.jpg',
      specs: {
        durability: 'Perfilería de aluminio anodizado estructural',
        thermal: 'Laminado con cámara y filtro UV al 99%',
        origin: 'Sistemas de alta gama de apertura total',
        finish: 'Pintura electrostática negro micro-texturado'
      },
      tag: 'TRANSPARENCIA TOTAL'
    }
  ],
  EN: [
    {
      id: 'concreto',
      name: 'Exposed Formwork Concrete',
      subtitle: 'Monolithic mass & Bioclimatic thermal envelope',
      image: '/extracted/arquitecturia/assets/tracking-concrete-pour.jpg',
      specs: {
        durability: '100+ years without surface degradation',
        thermal: 'High thermal inertia (reduces indoor temp by 4°C)',
        origin: 'Selected quarries in Valle del Cauca and Quindío',
        finish: 'Fine-grain formwork with matte hydrophobic sealant'
      },
      tag: 'STRUCTURE & AESTHETICS'
    },
    {
      id: 'teka',
      name: 'Seasoned Teak Hardwood',
      subtitle: 'Organic warmth & Weather resistance',
      image: '/extracted/arquitecturia/assets/tracking-timber-deck.jpg',
      specs: {
        durability: 'Class I tropical outdoor durability',
        thermal: 'Low conductivity, zero heat buildup',
        origin: 'FSC-certified sustainable plantations',
        finish: 'Open-pore curing with organic botanical oils'
      },
      tag: 'NOBLE BIOMATERIAL'
    },
    {
      id: 'travertino',
      name: 'Natural Stone & Travertine',
      subtitle: 'High-density mineral textures',
      image: '/extracted/arquitecturia/assets/turismo-villas-delirio.jpg',
      specs: {
        durability: 'Impervious to Andean UV radiation and heavy rainfall',
        thermal: 'Naturally cool to the touch in warm climates',
        origin: 'Selected cuts from Andean quarries',
        finish: 'Honed vein-cut finish with tactile relief'
      },
      tag: 'TIMELESS MINERAL'
    },
    {
      id: 'vidrio',
      name: 'Glazing & Matte Black Steel',
      subtitle: 'Seamless visual continuity with coffee vistas',
      image: '/extracted/arquitecturia/assets/comercial-atrium-glass.jpg',
      specs: {
        durability: 'Heavy-gauge structural anodized aluminum',
        thermal: 'Double-glazed with argon gas and 99% UV rejection',
        origin: 'High-performance full-aperture slide systems',
        finish: 'Micro-textured electrostatic black coating'
      },
      tag: 'TOTAL TRANSPARENCY'
    }
  ],
  FR: [
    {
      id: 'concreto',
      name: 'Béton Banché Apparent',
      subtitle: 'Masse monolithique & Enveloppe bioclimatique',
      image: '/extracted/arquitecturia/assets/tracking-concrete-pour.jpg',
      specs: {
        durability: 'Plus de 100 ans sans altération',
        thermal: 'Forte inertie thermique (-4°C en intérieur)',
        origin: 'Carrières locales de la Vallée du Cauca et Quindío',
        finish: 'Décoffrage à grain fin et hydrofuge mat'
      },
      tag: 'STRUCTURE & ÉLÉGANCE'
    },
    {
      id: 'teka',
      name: 'Bois de Teck Traité',
      subtitle: 'Chaleur organique & Résistance aux intempéries',
      image: '/extracted/arquitecturia/assets/tracking-timber-deck.jpg',
      specs: {
        durability: 'Classe I pour environnement tropical',
        thermal: 'Faible conductivité, zéro accumulation thermique',
        origin: 'Plantations durables certifiées FSC',
        finish: 'Traitement aux huiles végétales à pores ouverts'
      },
      tag: 'BIOMATÉRIAU NOBLE'
    },
    {
      id: 'travertino',
      name: 'Pierre Naturelle & Travertin',
      subtitle: 'Textures minérales haute densité',
      image: '/extracted/arquitecturia/assets/turismo-villas-delirio.jpg',
      specs: {
        durability: 'Inaltérable sous les UV et pluies andines',
        thermal: 'Surface fraîche au toucher sous climat chaud',
        origin: 'Sélection rigoureuse en carrières andines',
        finish: 'Coupe dans le fil adoucie et texturée'
      },
      tag: 'MINÉRAL INTEMPOREL'
    },
    {
      id: 'vidrio',
      name: 'Baies Vitrées & Acier Noir Mat',
      subtitle: 'Intégration lumineuse avec le paysage caféier',
      image: '/extracted/arquitecturia/assets/comercial-atrium-glass.jpg',
      specs: {
        durability: 'Profilés aluminium anodisé structural',
        thermal: 'Double vitrage feuilleté à filtre UV 99%',
        origin: 'Systèmes haut de gamme à ouverture totale',
        finish: 'Peinture électrostatique noire micro-texturée'
      },
      tag: 'TRANSPARENCE TOTALE'
    }
  ]
};

export const MaterialityComparator = () => {
  const { language } = useTranslation();
  const materialsList = MATERIALS_DICTIONARY[language] || MATERIALS_DICTIONARY.ES;
  const [selectedId, setSelectedId] = useState('concreto');
  const activeMaterial = materialsList.find((m) => m.id === selectedId) || materialsList[0];

  // Section Labels dictionary
  const labels = {
    ES: {
      dossier: 'FICHA DE MATERIALIDAD & SOSTENIBILIDAD',
      durability: 'DURABILIDAD',
      bioclimatic: 'BIOCLIMÁTICA',
      origin: 'ORIGEN & HUELLA',
      finish: 'ACABADO FINAL',
      compliance: 'ENSAYOS DE RESISTENCIA NSR-10 CERTIFICADOS',
      control: 'CONTROL 100%'
    },
    EN: {
      dossier: 'MATERIALITY & SUSTAINABILITY DOSSIER',
      durability: 'DURABILITY',
      bioclimatic: 'BIOCLIMATIC',
      origin: 'ORIGIN & FOOTPRINT',
      finish: 'FINAL FINISH',
      compliance: 'CERTIFIED NSR-10 STRUCTURAL COMPLIANCE',
      control: '100% QUALITY CONTROL'
    },
    FR: {
      dossier: 'DOSSIER MATÉRIALITÉ & DURABILITÉ',
      durability: 'DURABILITÉ',
      bioclimatic: 'BIOCLIMATIQUE',
      origin: 'ORIGINE & EMPREINTE',
      finish: 'FINITION FINALE',
      compliance: 'ESSAIS DE RÉSISTANCE NSR-10 CERTIFIÉS',
      control: 'CONTRÔLE QUALITÉ 100%'
    }
  }[language] || {
    dossier: 'FICHA DE MATERIALIDAD & SOSTENIBILIDAD',
    durability: 'DURABILIDAD',
    bioclimatic: 'BIOCLIMÁTICA',
    origin: 'ORIGEN & HUELLA',
    finish: 'ACABADO FINAL',
    compliance: 'ENSAYOS DE RESISTENCIA NSR-10 CERTIFICADOS',
    control: 'CONTROL 100%'
  };

  return (
    <div className="space-y-8 select-none">
      {/* Interactive Tabs */}
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {materialsList.map((mat) => {
          const isActive = mat.id === selectedId;
          return (
            <button
              key={mat.id}
              onClick={() => setSelectedId(mat.id)}
              className={`relative px-4 py-2.5 text-xs font-architectural tracking-wider transition-all duration-300 rounded-[3px] border cursor-pointer ${
                isActive
                  ? 'bg-brand-mint text-brand-deep border-brand-mint font-bold shadow-[0_0_15px_rgba(184,222,216,0.3)]'
                  : 'bg-brand-surface/70 text-white/70 border-white/10 hover:border-brand-mint/40 hover:text-white'
              }`}
            >
              {mat.name}
              {isActive && (
                <motion.div
                  layoutId="activeMaterialPill"
                  className="absolute -bottom-1 left-2 right-2 h-[2px] bg-brand-deep rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Visual Comparator Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeMaterial.id}-${language}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-brand-surface border border-white/10 p-6 sm:p-8 rounded-[4px] shadow-2xl relative overflow-hidden group"
        >
          {/* Subtle Ambient Hover Sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-mint/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* Left: HD Material Photography */}
          <div className="lg:col-span-6 relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-[3px] border border-white/10 shadow-lg">
            <img
              src={activeMaterial.image}
              alt={activeMaterial.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/80 via-transparent to-transparent" />

            <div className="absolute bottom-4 left-4 right-4">
              <h4 className="font-architectural text-base font-bold text-white tracking-wide">
                {activeMaterial.name}
              </h4>
              <p className="text-xs text-white/80 font-light mt-0.5">
                {activeMaterial.subtitle}
              </p>
            </div>
          </div>

          {/* Right: Architectural Specifications Breakdown */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-brand-mint">
                <Layers className="w-4 h-4" />
                <span className="text-[11px] font-mono tracking-widest uppercase font-semibold">
                  {labels.dossier}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 bg-brand-deep/60 border border-white/5 rounded-[3px] space-y-1">
                  <div className="flex items-center gap-1.5 text-white/50 text-[10px] font-mono uppercase">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-mint" />
                    <span>{labels.durability}</span>
                  </div>
                  <p className="text-xs text-white/90 font-light">
                    {activeMaterial.specs.durability}
                  </p>
                </div>

                <div className="p-3.5 bg-brand-deep/60 border border-white/5 rounded-[3px] space-y-1">
                  <div className="flex items-center gap-1.5 text-white/50 text-[10px] font-mono uppercase">
                    <Sun className="w-3.5 h-3.5 text-brand-mint" />
                    <span>{labels.bioclimatic}</span>
                  </div>
                  <p className="text-xs text-white/90 font-light">
                    {activeMaterial.specs.thermal}
                  </p>
                </div>

                <div className="p-3.5 bg-brand-deep/60 border border-white/5 rounded-[3px] space-y-1">
                  <div className="flex items-center gap-1.5 text-white/50 text-[10px] font-mono uppercase">
                    <Wind className="w-3.5 h-3.5 text-brand-mint" />
                    <span>{labels.origin}</span>
                  </div>
                  <p className="text-xs text-white/90 font-light">
                    {activeMaterial.specs.origin}
                  </p>
                </div>

                <div className="p-3.5 bg-brand-deep/60 border border-white/5 rounded-[3px] space-y-1">
                  <div className="flex items-center gap-1.5 text-white/50 text-[10px] font-mono uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-brand-mint" />
                    <span>{labels.finish}</span>
                  </div>
                  <p className="text-xs text-white/90 font-light">
                    {activeMaterial.specs.finish}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
