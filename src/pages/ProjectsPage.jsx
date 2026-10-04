import React, { useState, useMemo } from 'react';
import { Search, LayoutGrid, SlidersHorizontal, Eye, Compass, Layers, MapPin, FileText, Maximize2 } from 'lucide-react';
import { PROJECTS_DATA, CATEGORIES } from '../data/projectsData';
import { storageService } from '../services/storageService';
import { CategoryFilter } from '../components/CategoryFilter';
import { ProjectCard } from '../components/ProjectCard';
import { QuimbayasProjectShowcase } from '../components/QuimbayasProjectShowcase';
import { ProjectModal } from '../components/ProjectModal';
import { Reveal } from '../components/Reveal';
import { useTranslation } from '../hooks/useTranslation';

export const ProjectsPage = ({ onBookProject }) => {
  const { t, translateCategory, translateMaterial, translateProjectDescription } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProject, setActiveProject] = useState(null);
  const [viewMode, setViewMode] = useState('quimbayas'); // 'quimbayas' | 'grid' | 'editorial'

  // Load all projects including custom ones published from DSB
  const allProjects = useMemo(() => {
    return storageService.getProjects();
  }, []);

  // Compute counts per category
  const projectCounts = useMemo(() => {
    const counts = { Todos: allProjects.length };
    CATEGORIES.filter(c => c !== 'Todos').forEach(cat => {
      counts[cat] = allProjects.filter(p => p.category === cat).length;
    });
    return counts;
  }, [allProjects]);

  // Filter projects based on category and search query
  const filteredProjects = useMemo(() => {
    return allProjects.filter((proj) => {
      const matchesCategory =
        selectedCategory === 'Todos' || proj.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        proj.title.toLowerCase().includes(q) ||
        proj.location.toLowerCase().includes(q) ||
        (proj.description && proj.description.toLowerCase().includes(q)) ||
        (proj.materials && proj.materials.some(m => m.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [allProjects, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen pt-32 pb-32 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
      {/* Editorial Header (Zero Eyebrow Pills, Pure Monumental Title) */}
      <Reveal direction="up">
        <div className="mb-12 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-editorial-heading text-4xl sm:text-6xl md:text-7xl text-white">
              {t('projects.heading')}
            </h1>
            <p className="font-body text-xs sm:text-sm text-white/70 max-w-lg mt-3 leading-relaxed font-light">
              {t('projects.description')}
            </p>
          </div>

          {/* View Mode Switcher Toolbar */}
          <div className="flex items-center gap-1.5 p-1 bg-brand-surface border border-white/10 rounded-[4px] self-start md:self-end">
            <button
              onClick={() => setViewMode('quimbayas')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-[3px] text-xs font-architectural tracking-wider transition-all ${
                viewMode === 'quimbayas'
                  ? 'bg-brand-mint text-brand-deep font-bold shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
              title={t('projects.showcaseTab')}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('projects.showcaseTab')}</span>
            </button>

            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-[3px] text-xs font-architectural tracking-wider transition-all ${
                viewMode === 'grid'
                  ? 'bg-brand-mint text-brand-deep font-bold shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
              title={t('projects.gridTab')}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('projects.gridTab')}</span>
            </button>

            <button
              onClick={() => setViewMode('editorial')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-[3px] text-xs font-architectural tracking-wider transition-all ${
                viewMode === 'editorial'
                  ? 'bg-brand-mint text-brand-deep font-bold shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
              title={t('projects.editorialTab')}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('projects.editorialTab')}</span>
            </button>
          </div>
        </div>
      </Reveal>

      {/* Filter & Search Bar */}
      <div className="mb-10 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <CategoryFilter
            categories={CATEGORIES}
            activeCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            projectCounts={projectCounts}
          />

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('projects.searchPlaceholder')}
              className="w-full bg-brand-surface border border-white/10 px-4 py-2.5 pl-10 text-xs font-mono text-white placeholder-white/40 focus:outline-none focus:border-brand-mint rounded-[3px] transition-colors"
            />
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs font-mono"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* VIEW 1: Quimbayas Multi-Photo Showcase Mode */}
      {viewMode === 'quimbayas' && (
        <div className="space-y-6">
          <QuimbayasProjectShowcase
            projects={filteredProjects}
            onOpenModal={(p) => setActiveProject(p)}
            onBookProject={onBookProject}
          />
        </div>
      )}

      {/* VIEW 2: High-Density Compact Grid View */}
      {viewMode === 'grid' && (
        <div>
          {filteredProjects.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-white/10 p-8 rounded-[4px]">
              <p className="font-architectural text-sm text-white/60 mb-2">
                {t('projects.notFound')}
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('Todos');
                  setSearchQuery('');
                }}
                className="text-xs font-mono text-brand-mint hover:underline"
              >
                {t('projects.resetFilters')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={(p) => setActiveProject(p)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW 3: Editorial Magazine View (Expansive Horizontal Strips) */}
      {viewMode === 'editorial' && (
        <div className="space-y-8">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="bg-brand-surface border border-white/10 hover:border-brand-mint/40 rounded-[4px] overflow-hidden transition-all duration-300 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
            >
              {/* Photo Strip */}
              <div className="lg:col-span-6 relative aspect-[16/10] overflow-hidden rounded-[3px] bg-black">
                <img
                  src={proj.coverLocal}
                  alt={proj.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Editorial Description & Details */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-brand-mint mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{proj.location}</span>
                    <span className="text-white/20">•</span>
                    <span>{proj.area}</span>
                  </div>

                  <h3 className="font-editorial-heading text-2xl sm:text-3xl text-white">
                    {proj.title}
                  </h3>

                  <p className="font-body text-xs sm:text-sm text-white/75 mt-3 leading-relaxed font-light">
                    {translateProjectDescription ? translateProjectDescription(proj.id, proj.description) : proj.description}
                  </p>

                  <div className="pt-3">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.materials && proj.materials.map((m, i) => (
                        <span key={i} className="text-[10px] font-mono text-white/70 bg-white/5 border border-white/10 px-2 py-0.5 rounded-[2px]">
                          {translateMaterial ? translateMaterial(m) : m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveProject(proj)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-brand-mint text-brand-deep font-architectural text-xs font-bold rounded-md shadow-md hover:bg-brand-mint-light transition-colors"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>{t('projects.viewGallery')}</span>
                  </button>

                  <button
                    onClick={() => onBookProject(proj.title)}
                    className="flex items-center gap-2 px-4 py-2.5 border border-white/20 hover:border-brand-mint text-white hover:text-brand-mint font-architectural text-xs rounded-md transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5 text-brand-mint" />
                    <span>CONSULTAR OBRA</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Deep Dive Modal */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
          onBookProject={(title) => {
            setActiveProject(null);
            onBookProject(title);
          }}
        />
      )}
    </div>
  );
};
