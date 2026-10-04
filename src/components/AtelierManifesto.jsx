import React from 'react';
import { BRANDING_DATA } from '../data/brandingData';
import { Reveal } from './Reveal';
import { MaterialityComparator } from './MaterialityComparator';
import { AnimatedMetricCounter } from './AnimatedMetricCounter';
import { ArchitecturalBlueprintIcon } from './ArchitecturalBlueprintIcon';
import { Award, Compass, ShieldCheck, Ruler } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export const AtelierManifesto = () => {
  const { t, language } = useTranslation();

  const translatedPillars = t('pillars.items') || BRANDING_DATA.pillars;
  const quoteTranslated = {
    ES: 'Construimos no para el presente inmediato, sino para la memoria del paisaje.',
    EN: 'We build not for the fleeting present, but for the enduring memory of the landscape.',
    FR: 'Nous bâtissons non pour l’immédiat éphémère, mais pour la mémoire durable du paysage.'
  }[language] || BRANDING_DATA.quote;

  const yearSuffix = language === 'EN' ? ' Years' : language === 'FR' ? ' Ans' : ' Años';

  return (
    <div id="estudio" className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-28">
      {/* 1. Main Manifesto Overture */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: Team Photo with Monolithic Architectural Frame */}
        <Reveal direction="left" delay={0.1} className="lg:col-span-5">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[4px] border border-brand-mint/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group">
            <img
              src={BRANDING_DATA.teamPhoto}
              alt="Atelier ArquitecturIA — Estudio de Arquitectura & Diseño Paramétrico"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-transparent to-transparent opacity-85" />

            <div className="absolute bottom-6 left-6 right-6 z-10 p-5 bg-brand-deep/90 backdrop-blur-md border border-white/10 rounded-[3px]">
              <span className="text-[10px] font-mono tracking-widest text-brand-mint uppercase block">
                {t('manifesto.teamBadge')}
              </span>
              <span className="font-architectural text-xs font-bold text-white tracking-wider">
                {t('manifesto.teamStudio')}
              </span>
            </div>
          </div>
        </Reveal>

        {/* Right: Author Quote & Dynamic Metrics */}
        <Reveal direction="right" delay={0.2} className="lg:col-span-7 space-y-8">
          <div>
            <h2 className="font-editorial-heading text-4xl sm:text-6xl text-white mb-6">
              {t('manifesto.title')}
            </h2>
            <blockquote className="border-l-2 border-brand-mint pl-6 italic text-base sm:text-lg text-brand-mint/90 font-light leading-relaxed">
              "{quoteTranslated}"
            </blockquote>
          </div>

          <p className="font-body text-sm sm:text-base text-white/80 leading-relaxed font-light">
            {t('manifesto.philosophyBody')}
          </p>

          {/* Dynamic Milestones (Odometer Dopamine) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
            <div className="p-4 bg-brand-surface border border-white/5 rounded-[3px]">
              <div className="font-editorial-heading text-3xl sm:text-4xl text-brand-mint font-bold">
                <AnimatedMetricCounter endValue={50} suffix="+" />
              </div>
              <span className="text-[10px] font-mono text-white/60 tracking-wider uppercase block mt-1">
                {t('manifesto.metric1')}
              </span>
            </div>

            <div className="p-4 bg-brand-surface border border-white/5 rounded-[3px]">
              <div className="font-editorial-heading text-3xl sm:text-4xl text-brand-mint font-bold">
                <AnimatedMetricCounter endValue={12} suffix={yearSuffix} />
              </div>
              <span className="text-[10px] font-mono text-white/60 tracking-wider uppercase block mt-1">
                {t('manifesto.metric2')}
              </span>
            </div>

            <div className="p-4 bg-brand-surface border border-white/5 rounded-[3px]">
              <div className="font-editorial-heading text-3xl sm:text-4xl text-brand-mint font-bold">
                <AnimatedMetricCounter endValue={140} suffix="k" />
              </div>
              <span className="text-[10px] font-mono text-white/60 tracking-wider uppercase block mt-1">
                {t('manifesto.metric3')}
              </span>
            </div>

            <div className="p-4 bg-brand-surface border border-white/5 rounded-[3px]">
              <div className="font-editorial-heading text-3xl sm:text-4xl text-brand-mint font-bold">
                <AnimatedMetricCounter endValue={100} suffix="%" />
              </div>
              <span className="text-[10px] font-mono text-white/60 tracking-wider uppercase block mt-1">
                {t('manifesto.metric4')}
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 2. Interactive Materiality Comparator Section */}
      <section className="space-y-8 border-t border-white/10 pt-20">
        <Reveal direction="up">
          <div className="max-w-3xl space-y-3">
            <h3 className="font-editorial-heading text-3xl sm:text-5xl text-white">
              {t('manifesto.anatomyTitle')}
            </h3>
            <p className="font-body text-sm sm:text-base text-white/70 leading-relaxed font-light">
              {t('manifesto.anatomyDesc')}
            </p>
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.15}>
          <MaterialityComparator />
        </Reveal>
      </section>

      {/* 3. The 4 Monolithic Pillars */}
      <section className="space-y-8 border-t border-white/10 pt-20">
        <Reveal direction="up">
          <div className="max-w-3xl space-y-3">
            <h3 className="font-editorial-heading text-3xl sm:text-5xl text-white">
              {t('manifesto.pillarsTitle')}
            </h3>
            <p className="font-body text-sm sm:text-base text-white/70 leading-relaxed font-light">
              {t('manifesto.pillarsDesc')}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BRANDING_DATA.pillars.map((pillar, idx) => {
            const translatedItem = Array.isArray(translatedPillars) ? translatedPillars[idx] : null;
            const title = translatedItem?.title || pillar.title;
            const description = translatedItem?.description || pillar.description;

            return (
              <Reveal key={pillar.number} direction="up" delay={idx * 0.1}>
                <div className="p-8 bg-brand-surface border border-white/10 hover:border-brand-mint/40 transition-all duration-300 rounded-[4px] h-full flex flex-col justify-between group hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-editorial-heading text-4xl text-brand-mint/40 group-hover:text-brand-mint transition-colors block">
                        {pillar.number}
                      </span>
                      <ArchitecturalBlueprintIcon
                        pillarNumber={pillar.number}
                        className="w-10 h-10 text-brand-mint/60 group-hover:text-brand-mint transition-colors"
                      />
                    </div>
                    <h4 className="font-architectural text-sm font-bold text-white tracking-wider mb-3">
                      {title}
                    </h4>
                    <p className="font-body text-xs text-white/60 leading-relaxed font-light">
                      {description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* 4. Atelier & Obra Signature Photographic Finale */}
      <section className="space-y-8 border-t border-white/10 pt-20 pb-8">
        <Reveal direction="up">
          <div className="max-w-3xl space-y-3">
            <h3 className="font-editorial-heading text-3xl sm:text-5xl text-white">
              {t('manifesto.territoryTitle')}
            </h3>
            <p className="font-body text-sm sm:text-base text-white/70 leading-relaxed font-light">
              {t('manifesto.territoryDesc')}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-4">
          {([
            {
              src: '/extracted/arquitecturia/assets/studio-architecture-atelier.jpg',
              title: language === 'EN' ? 'Concept Atelier Desk' : language === 'FR' ? 'Table de Conception' : 'Mesa de Concepción',
              caption: language === 'EN' ? 'Bespoke 3D architectural drafting' : language === 'FR' ? 'Modélisation 3D et plans directeurs' : 'Modelado y trazo de planos directos'
            },
            {
              src: '/extracted/arquitecturia/assets/studio-drafting-models.jpg',
              title: language === 'EN' ? 'Cast Concrete Oversight' : language === 'FR' ? 'Supervision du Béton Banché' : 'Supervisión en Concreto',
              caption: language === 'EN' ? 'Helical structural ramp inspection' : language === 'FR' ? 'Contrôle structural de rampe hélicoïdale' : 'Verificación de rampa helicoidal'
            },
            {
              src: '/extracted/arquitecturia/assets/tracking-steel-structure.jpg',
              title: language === 'EN' ? 'Geometry & Heavy Steel' : language === 'FR' ? 'Géométrie et Acier Lourd' : 'Geometría y Acero',
              caption: language === 'EN' ? 'High-tensile moment frame assembly' : language === 'FR' ? 'Assemblage de portiques haute résistance' : 'Ensamble de pórticos de alta resistencia'
            },
            {
              src: '/extracted/arquitecturia/assets/hero-cliff-home.jpg',
              title: language === 'EN' ? 'On-Site Construction Rigor' : language === 'FR' ? 'Rigueur de Chantier' : 'Rigor en Obra',
              caption: language === 'EN' ? 'Millimetric spatial quality control' : language === 'FR' ? 'Contrôle millimétrique des proportions' : 'Control milimétrico de proporciones'
            }
          ]).map((shot, idx) => (
            <Reveal key={idx} direction="up" delay={idx * 0.1}>
              <div className="relative aspect-[3/4] rounded-[3px] overflow-hidden border border-white/10 group shadow-xl">
                <img
                  src={shot.src}
                  alt={shot.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                  <h4 className="font-architectural text-xs font-bold text-white tracking-wider">
                    {shot.title}
                  </h4>
                  <p className="text-[11px] font-mono text-brand-mint/80 mt-1">
                    {shot.caption}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
};

