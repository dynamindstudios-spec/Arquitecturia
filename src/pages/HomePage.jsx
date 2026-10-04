import React, { useState, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { Hero } from '../components/Hero';
import { ArchitecturalSynapseScrolly } from '../components/ArchitecturalSynapseScrolly';
import { ProjectsCarouselShowcase } from '../components/ProjectsCarouselShowcase';
import { ProjectModal } from '../components/ProjectModal';
import { Reveal } from '../components/Reveal';
import { MaterialityShowcase } from '../components/MaterialityShowcase';
import { InvestmentSimulator } from '../components/InvestmentSimulator';
import { storageService } from '../services/storageService';
import { useTranslation } from '../hooks/useTranslation';

export const HomePage = ({ onNavigateProjects, onOpenBooking }) => {
  const { t } = useTranslation();
  const [activeProject, setActiveProject] = useState(null);

  const projects = useMemo(() => {
    return storageService.getProjects();
  }, []);

  return (
    <div className="space-y-0">
      {/* 1. Overture Hero: Pure High-Status Architecture with Curtain Effect */}
      <Hero
        onNavigateProjects={onNavigateProjects}
        onOpenBooking={() => onOpenBooking()}
      />

      {/* Main Flow wrapper that rises over the hero as a curtain */}
      <div className="relative z-20 bg-brand-deep shadow-[0_-30px_90px_rgba(0,0,0,0.98)] border-t border-white/10">
        {/* 2. Noble Materiality & Tactile Craft: The immediate physical contact point */}
        <div>
          <MaterialityShowcase />
        </div>

        {/* 3. Scrollytelling Section: El Cerebro & Cosmos ArquitecturIA */}
        <div className="border-t border-white/10">
          <ArchitecturalSynapseScrolly onExploreProjects={onNavigateProjects} />
        </div>

        {/* 4. Showcase Panorámico de Obras Insignia y Fotografía de Alta Resolución */}
        <section className="py-24 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto border-t border-white/10">
          <Reveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="font-editorial-heading text-4xl sm:text-6xl text-white">
                  {t('projects.showcaseTitle') || 'Obras Insignia & Materialidad'}
                </h2>
                <p className="font-body text-sm sm:text-base text-white/70 mt-3 max-w-2xl font-light">
                  {t('projects.showcaseSubtitle') || 'Explora la ingeniería de detalle, los acabados bioclimáticos y la precisión geométrica de nuestras 24 obras maestras.'}
                </p>
              </div>

              <button
                onClick={onNavigateProjects}
                className="flex items-center gap-2 px-6 py-3 bg-brand-surface border border-brand-mint/40 hover:border-brand-mint text-brand-mint hover:text-white transition-all font-architectural text-xs tracking-wider rounded-md self-start md:self-end cursor-pointer"
              >
                <span>{t('projects.viewFullCatalogBtn') || 'VER CATÁLOGO COMPLETO'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Reveal>

          <ProjectsCarouselShowcase
            projects={projects}
            onSelectProject={(p) => setActiveProject(p)}
            onBookProject={(title) => onOpenBooking(title)}
          />
        </section>

        {/* 5. Interactive Investment Simulator in Home Flow */}
        <section className="py-16 border-t border-white/10">
          <InvestmentSimulator onOpenBooking={onOpenBooking} />
        </section>

      {/* 6. Portal Invitation to Dedicated Projects Page */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
        <Reveal direction="scale">
          <div className="relative p-10 sm:p-16 bg-gradient-to-r from-brand-surface via-brand-surface/80 to-brand-deep border border-brand-mint/30 rounded-[4px] shadow-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <h2 className="font-editorial-heading text-3xl sm:text-5xl text-white">
                {t('portfolioPortal.title')}
              </h2>
              <p className="font-body text-sm text-white/80 leading-relaxed font-light">
                {t('portfolioPortal.desc')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <button
                onClick={onNavigateProjects}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-brand-mint text-brand-deep hover:bg-brand-mint-light transition-all font-architectural text-xs tracking-wider font-bold rounded-md shadow-[0_0_20px_rgba(184,222,216,0.3)]"
              >
                <span>{t('portfolioPortal.viewFullBtn')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenBooking()}
                className="flex items-center justify-center gap-2 px-6 py-4 border border-white/20 hover:border-brand-mint text-white hover:text-brand-mint transition-colors font-architectural text-xs rounded-md"
              >
                <span>{t('portfolioPortal.bookMeetingBtn')}</span>
              </button>
            </div>
          </div>
        </Reveal>
      </section>
      </div>

      {/* Lightbox Deep Dive Modal for Home View */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
          onBookProject={(title) => {
            setActiveProject(null);
            onOpenBooking(title);
          }}
        />
      )}
    </div>
  );
};

