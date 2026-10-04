import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { useTranslation } from '../hooks/useTranslation';

const MATERIALS_DATA = [
  {
    id: 'concrete',
    num: '01',
    name: 'Concreto Visto Fenólico',
    nameEn: 'Phenolic Fair-Faced Concrete',
    nameFr: 'Béton Brut Phénolique',
    image: '/extracted/arquitecturia/assets/tracking-concrete-pour.jpg',
    origin: 'Canteras del Valle del Cauca · Cemento Estructural Quindío',
    originEn: 'Valle del Cauca Quarries · Quindío Structural Cement',
    originFr: 'Carrières du Valle del Cauca · Ciment Quindío',
    desc: 'Vaciado monolítico en formaletas fenólicas que revelan la textura pura del grano pétreo y aportan masa térmica pasiva para noches frías.',
    descEn: 'Monolithic phenolic pours revealing authentic stone grain, offering passive thermal mass during cool mountain nights.',
    descFr: 'Coulage monolithique dans des coffrages phénoliques révélant le grain naturel, assurant une inertie thermique nocturne.'
  },
  {
    id: 'wood',
    num: '02',
    name: 'Teka Noble & Roble',
    nameEn: 'Noble Teak & Oak',
    nameFr: 'Teck Noble & Chêne',
    image: '/extracted/arquitecturia/assets/tracking-timber-deck.jpg',
    origin: 'Bosques Certificados FSC · Eje Cafetero',
    originEn: 'FSC Certified Sustainable Forests · Coffee Axis',
    originFr: 'Forêts Certifiées FSC · Axe Caféier',
    desc: 'Madera noble tratada con aceites botánicos de poro abierto. Celosías que modulan la brisa andina y aportan calidez táctil inmediata.',
    descEn: 'Hand-selected wood treated with natural botanical oils. Operable louvers filtering Andean breezes and adding sensory warmth.',
    descFr: 'Bois noble traité aux huiles botaniques naturelles. Persiennes régulant la brise andine et apportant une chaleur sensorielle.'
  },
  {
    id: 'stone',
    num: '03',
    name: 'Piedra Barichara & Travertino',
    nameEn: 'Barichara Stone & Travertine',
    nameFr: 'Pierre de Barichara & Travertin',
    image: '/extracted/arquitecturia/assets/turismo-villas-delirio.jpg',
    origin: 'Canteras Históricas de Santander y Boyacá',
    originEn: 'Historic Colombian Quarries · Santander & Boyacá',
    originFr: 'Carrières Historiques de Santander & Boyacá',
    desc: 'Muros de cantera andina tallados en sillares exactos que anclan la residencia a la topografía de montaña con alta fono-absorción.',
    descEn: 'Hand-cut Andean sedimentary stone anchoring the residence to the mountain slope with permanent acoustic insulation.',
    descFr: 'Pierre sédimentaire andine taillée à la main, ancrant la résidence au relief montagnard avec une isolation phonique continue.'
  },
  {
    id: 'glass',
    num: '04',
    name: 'Vidrio Solar Low-E',
    nameEn: 'Low-E Solar Glass',
    nameFr: 'Verre Solaire Low-E',
    image: '/extracted/arquitecturia/assets/comercial-atrium-glass.jpg',
    origin: 'Laminación Saint-Gobain Architectural Glass',
    originEn: 'Saint-Gobain Architectural Glass Lamination',
    originFr: 'Verre Feuilleté Architectural Saint-Gobain',
    desc: 'Paneles deslizantes de piso a techo con control térmico selectivo que diluyen el límite interior-exterior y bloquean el 99% de la radiación UV.',
    descEn: 'Floor-to-ceiling sliding panels blurring interior-exterior boundaries while blocking 99% UV radiation without tinting views.',
    descFr: 'Baies coulissantes toute hauteur effaçant la frontière intérieure-extérieure, bloquant 99% des UV sans altérer les teintes naturelles.'
  },
  {
    id: 'steel',
    num: '05',
    name: 'Acero Estructural & Perfilería',
    nameEn: 'Structural Steel & Profiles',
    nameFr: 'Acier Structurel & Profilés',
    image: '/extracted/arquitecturia/assets/tracking-steel-structure.jpg',
    origin: 'Perfiles Estructurales Siderúrgica de Occidente',
    originEn: 'Certified Seismic Steel Profiles · Occidente',
    originFr: 'Profilés d’Acier Parasismique Certifiés',
    desc: 'Pórticos esbeltos sismo-resistentes norma NSR-10 con acabado microtexturado mate, permitiendo voladizos libres de más de 5 metros.',
    descEn: 'Slender seismic moment frames compliant with NSR-10 code in matte black finish, enabling free cantilevers exceeding 5 meters.',
    descFr: 'Portiques parasismiques élancés conformes à la norme NSR-10, permettant des porte-à-faux libres de plus de 5 mètres.'
  }
];

export const MaterialityShowcase = () => {
  const { language } = useTranslation();
  const [selectedId, setSelectedId] = useState('concrete');

  const selectedMaterial = MATERIALS_DATA.find(m => m.id === selectedId) || MATERIALS_DATA[0];

  const getName = (m) => language === 'EN' ? m.nameEn : language === 'FR' ? m.nameFr : m.name;
  const getOrigin = (m) => language === 'EN' ? m.originEn : language === 'FR' ? m.originFr : m.origin;
  const getDesc = (m) => language === 'EN' ? m.descEn : language === 'FR' ? m.descFr : m.desc;

  return (
    <section className="py-20 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto select-none">
      {/* 1. Clean Heading: Pure Title without artificial badges */}
      <Reveal direction="up">
        <div className="mb-10 max-w-3xl">
          <h2 className="font-editorial-heading text-3xl sm:text-5xl text-white tracking-tight">
            {language === 'EN' ? 'Noble Materiality' : language === 'FR' ? 'Matérialité Noble' : 'Materialidad Noble'}
          </h2>
        </div>
      </Reveal>

      {/* 2. Unified Master Grid: Grouped tabs on left + Panoramic viewport on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left Column: Uniform, Grouped Selector Cards */}
        <div className="lg:col-span-5 bg-brand-surface/85 border border-white/10 rounded-[4px] p-2 space-y-1.5 shadow-xl">
          {MATERIALS_DATA.map((mat) => {
            const isSelected = mat.id === selectedId;
            return (
              <button
                key={mat.id}
                onClick={() => setSelectedId(mat.id)}
                className={`w-full px-4 py-3.5 rounded-[3px] border text-left transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                  isSelected
                    ? 'bg-brand-mint/15 border-brand-mint/60 shadow-md'
                    : 'bg-transparent border-transparent hover:bg-white/[0.04] hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`font-mono text-xs transition-colors ${isSelected ? 'text-brand-mint font-bold' : 'text-white/40 group-hover:text-white/70'}`}>
                    {mat.num}
                  </span>
                  <h4 className={`font-architectural text-sm tracking-wide truncate transition-colors ${isSelected ? 'text-white font-bold' : 'text-white/80 group-hover:text-white'}`}>
                    {getName(mat)}
                  </h4>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-10 h-10 rounded-[2px] overflow-hidden border border-white/15 bg-black/40">
                    <img 
                      src={mat.image} 
                      alt={mat.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                  <ChevronRight 
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isSelected ? 'text-brand-mint translate-x-0.5' : 'text-white/20 group-hover:text-white/50'
                    }`} 
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Architectural Viewport with Honest Material Photography & Short Description */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMaterial.id}
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative aspect-[16/10] w-full rounded-[4px] overflow-hidden border border-white/15 bg-brand-surface shadow-2xl group"
            >
              <img
                src={selectedMaterial.image}
                alt={selectedMaterial.name}
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
              />

              {/* Scrim overlay for crisp readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/95 via-brand-deep/40 to-transparent pointer-events-none" />

              {/* Clean Bottom Details: Title, Provenance, and Short Concise Description */}
              <div className="absolute bottom-6 left-6 right-6 pointer-events-none space-y-2">
                <div>
                  <h3 className="font-editorial-heading text-2xl sm:text-3xl text-white">
                    {getName(selectedMaterial)}
                  </h3>
                  <p className="font-mono text-[11px] sm:text-xs text-brand-mint/90 mt-0.5">
                    {getOrigin(selectedMaterial)}
                  </p>
                </div>
                
                <p className="font-body text-xs sm:text-sm text-white/85 leading-relaxed font-light max-w-xl">
                  {getDesc(selectedMaterial)}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
