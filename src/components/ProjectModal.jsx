import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Layers, ShieldCheck, Download, Share2, Compass, Image, Eye, FileText, ArrowRight, ExternalLink } from 'lucide-react';
import { ArchitecturalCadViewer } from './ArchitecturalCadViewer';
import { Panoramic360Viewer } from './Panoramic360Viewer';
import { ExecutiveDossierPdfModal } from './ExecutiveDossierPdfModal';
import { BRANDING_DATA } from '../data/brandingData';
import { useTranslation } from '../hooks/useTranslation';

// Directional sliding variants for lightbox
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 1
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    transition: {
      x: { duration: 0.48, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.2 }
    }
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction > 0 ? '-100%' : '100%',
    opacity: 1,
    transition: {
      x: { duration: 0.48, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.2 }
    }
  })
};

export const ProjectModal = ({ project, onClose, onBookProject }) => {
  const { t, language, translateCategory, translateStatus, translateMaterial, translateProjectDescription } = useTranslation();
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [viewMode, setViewMode] = useState('photo'); // 'photo' | 'cad' | '360'
  const [showDossierPdf, setShowDossierPdf] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (viewMode === 'photo') {
        if (e.key === 'ArrowLeft') handlePrevPhoto();
        if (e.key === 'ArrowRight') handleNextPhoto();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, viewMode]);

  if (!project) return null;

  const gallery = project.galleryLocal && project.galleryLocal.length > 0
    ? project.galleryLocal
    : [project.coverLocal];

  const handlePrevPhoto = () => {
    setDirection(-1);
    setActivePhotoIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNextPhoto = () => {
    setDirection(1);
    setActivePhotoIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  const handleSelectThumbnail = (idx) => {
    if (idx === activePhotoIndex) return;
    setDirection(idx > activePhotoIndex ? 1 : -1);
    setActivePhotoIndex(idx);
    setViewMode('photo');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex items-center justify-center p-0 sm:p-6 md:p-10 select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-6xl min-h-screen sm:min-h-0 bg-brand-deep border border-brand-mint/30 rounded-[4px] shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Top Bar with Mode Switcher */}
          <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 p-4 sm:p-6 border-b border-white/10 bg-brand-deep/95">
            <div>
              <h3 className="font-architectural text-sm font-bold text-white tracking-wider">
                {project.title}
              </h3>
            </div>

            {/* Interactive Viewport Mode Selector */}
            <div className="flex items-center gap-1.5 p-1 bg-black/50 border border-white/15 rounded-[4px] text-xs font-mono">
              <button
                type="button"
                onClick={() => setViewMode('photo')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all cursor-pointer ${
                  viewMode === 'photo'
                    ? 'bg-brand-mint text-brand-deep font-bold shadow-sm'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <Image className="w-3.5 h-3.5" />
                <span>{language === 'EN' ? 'PHOTO HD' : language === 'FR' ? 'PHOTO HD' : 'FOTO HD'}</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('cad')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all cursor-pointer ${
                  viewMode === 'cad'
                    ? 'bg-brand-mint text-brand-deep font-bold shadow-sm'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{language === 'EN' ? 'CAD BLUEPRINT' : language === 'FR' ? 'PLAN CAD' : 'PLANO CAD'}</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('360')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all cursor-pointer ${
                  viewMode === '360'
                    ? 'bg-brand-mint text-brand-deep font-bold shadow-sm'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>{language === 'EN' ? '360° TOUR' : language === 'FR' ? 'VUE 360°' : 'VISTA 360°'}</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onBookProject(project.title)}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-brand-mint text-brand-deep hover:bg-brand-mint-light transition-colors font-architectural text-xs tracking-wider font-semibold rounded-md shadow-sm"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{t('projects.bookAppointment')}</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors rounded-md"
                aria-label={language === 'EN' ? 'Close modal' : language === 'FR' ? 'Fermer' : 'Cerrar modal'}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Main Stage: Photo Lightbox OR CAD Blueprint OR 360 Panoramic */}
          <div className="relative aspect-[16/10] md:aspect-[16/9] bg-black flex items-center justify-center overflow-hidden">
            {viewMode === 'photo' && (
              <>
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={activePhotoIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 w-full h-full flex items-center justify-center"
                  >
                    <img
                      src={gallery[activePhotoIndex]}
                      alt={`${project.title} - ${activePhotoIndex + 1}`}
                      className="w-full h-full object-contain pointer-events-none select-none"
                      loading="eager"
                      decoding="sync"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevPhoto}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-brand-deep/80 hover:bg-brand-mint hover:text-brand-deep text-white border border-white/20 transition-colors rounded-[3px] cursor-pointer"
                      aria-label={language === 'EN' ? 'Previous photo' : language === 'FR' ? 'Photo précédente' : 'Foto anterior'}
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={handleNextPhoto}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-brand-deep/80 hover:bg-brand-mint hover:text-brand-deep text-white border border-white/20 transition-colors rounded-[3px] cursor-pointer"
                      aria-label={language === 'EN' ? 'Next photo' : language === 'FR' ? 'Photo suivante' : 'Siguiente foto'}
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </>
            )}

            {viewMode === 'cad' && (
              <ArchitecturalCadViewer
                projectTitle={project.title}
                area={project.area}
              />
            )}

            {viewMode === '360' && (
              <Panoramic360Viewer
                imageSrc={gallery[activePhotoIndex] || gallery[0]}
                projectTitle={project.title}
                onClose={() => setViewMode('photo')}
              />
            )}
          </div>

          {/* Thumbnails Row (Visible in Photo mode) */}
          {viewMode === 'photo' && gallery.length > 1 && (
            <div className="bg-brand-surface p-3 border-t border-b border-white/10 overflow-x-auto flex items-center gap-2">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectThumbnail(idx)}
                  className={`relative flex-shrink-0 w-16 h-12 overflow-hidden rounded-[2px] border transition-all duration-300 cursor-pointer ${
                    idx === activePhotoIndex
                      ? 'border-brand-mint scale-105 shadow-[0_0_10px_rgba(184,222,216,0.4)]'
                      : 'border-white/10 opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Architectural Dossier & Ficha Técnica */}
          <div className="p-6 sm:p-10 bg-brand-deep grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3 text-xs font-mono text-brand-mint">
                <MapPin className="w-4 h-4" />
                <span>{project.location}</span>
                <span className="text-white/20">|</span>
                <span>{t('projectModal.yearPrefix')} {project.year}</span>
                <span className="text-white/20">|</span>
                <span>{translateStatus ? translateStatus(project.status) : project.status}</span>
              </div>

              <h2 className="font-editorial-heading text-3xl sm:text-4xl text-white">
                {project.title}
              </h2>

              <p className="text-sm leading-relaxed text-white/80 font-body font-light">
                {translateProjectDescription ? translateProjectDescription(project.id, project.description) : project.description}
              </p>

              {/* Materiality */}
              <div className="pt-4 border-t border-white/10">
                <h4 className="font-architectural text-xs tracking-wider text-brand-mint mb-3">
                  {t('projectModal.materialityTitle')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.materials && project.materials.map((mat, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono text-white/80 bg-white/5 border border-white/10 px-3 py-1.5 rounded-[2px]"
                    >
                      {translateMaterial ? translateMaterial(mat) : mat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Specs & Direct Action */}
            <div className="bg-brand-surface p-6 border border-white/10 rounded-[3px] flex flex-col justify-between space-y-6">
              <div>
                <h4 className="font-architectural text-xs tracking-wider text-brand-mint mb-4 pb-2 border-b border-white/10">
                  {t('projectModal.architecturalSpecs')}
                </h4>
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-white/50">{t('projectModal.areaLabel')}:</span>
                    <span className="text-white font-semibold">{project.area}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">{t('projectModal.typeLabel')}:</span>
                    <span className="text-white">{translateCategory ? translateCategory(project.typology || project.category) : (project.typology || project.category)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">{t('projectModal.locationLabel')}:</span>
                    <span className="text-white text-right">{project.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">{t('projectModal.galleryLabel')}:</span>
                    <span className="text-brand-mint font-semibold">{gallery.length} {t('projectModal.hdTakes')}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                {/* 1. Technical Executive Dossier Generator */}
                <motion.button
                  whileHover={{ scale: 1.015, y: -1 }}
                  whileTap={{ scale: 0.985 }}
                  type="button"
                  onClick={() => setShowDossierPdf(true)}
                  className="w-full relative group overflow-hidden flex items-center justify-center gap-2.5 py-3 px-4 bg-brand-surface border border-brand-mint/40 hover:border-brand-mint text-brand-mint hover:text-white transition-all duration-300 font-architectural text-xs tracking-wider font-semibold rounded-md shadow-sm cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-mint/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
                  <FileText className="w-4 h-4 text-brand-mint transition-transform duration-300 group-hover:scale-110" />
                  <span>DESCARGAR FICHA TÉCNICA (PDF)</span>
                </motion.button>

                {/* 2. Interactive Ultra-Aesthetic Appointment Button (Replaces redundant Contact/WhatsApp in elegant outline style) */}
                <motion.button
                  whileHover={{ scale: 1.015, y: -1 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => onBookProject(project.title)}
                  className="w-full relative group overflow-hidden flex items-center justify-center gap-2.5 py-3.5 px-4 bg-white/[0.03] hover:bg-brand-mint/[0.08] border border-white/20 hover:border-brand-mint text-white hover:text-brand-mint transition-all duration-300 font-architectural text-xs tracking-wider font-semibold rounded-md cursor-pointer shadow-sm hover:shadow-[0_0_25px_rgba(184,222,216,0.22)]"
                >
                  {/* Subtle Interactive Sheen Beam */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-mint/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

                  <FileText className="w-4 h-4 text-brand-mint transition-transform duration-300 group-hover:scale-110" />
                  <span className="tracking-[0.12em]">{t('projectModal.bookMeetingBtn')}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-mint/60 group-hover:text-brand-mint group-hover:translate-x-1 transition-all duration-300" />
                </motion.button>

                {/* 3. Google Drive / Planos BIM Folder Link (Optional) */}
                {project.driveFolderUrl && (
                  <a
                    href={project.driveFolderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-brand-mint/40 text-white/80 hover:text-brand-mint text-[11px] font-mono tracking-wider rounded transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-brand-mint" />
                    <span>CARPETA GOOGLE DRIVE / PLANOS BIM ↗</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Instant Executive Dossier PDF Modal */}
      {showDossierPdf && (
        <ExecutiveDossierPdfModal
          project={project}
          onClose={() => setShowDossierPdf(false)}
          onBookProject={(title) => {
            setShowDossierPdf(false);
            onBookProject(title);
          }}
        />
      )}
    </AnimatePresence>
  );
};
