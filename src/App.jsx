import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArchitecturalPreloader } from './components/ArchitecturalPreloader';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AtelierManifesto } from './components/AtelierManifesto';
import { ContactSection } from './components/ContactSection';
import { AtmosphericBackdrop } from './components/AtmosphericBackdrop';
import { AmbientCursorGlow } from './components/AmbientCursorGlow';
import { ArchitecturalNoiseOverlay } from './components/ArchitecturalNoiseOverlay';
import { ArchitecturalPageTransition } from './components/ArchitecturalPageTransition';
import { FloatingSocialButton } from './components/FloatingSocialButton';
import { FloatingConciergeOrb } from './components/FloatingConciergeOrb';
import { GlobalSettingsModal } from './components/GlobalSettingsModal';
import { storageService } from './services/storageService';
import { atmosphereService } from './services/atmosphereService';

// Code-Splitting Dinámico: Módulos secundarios de carga diferida (React.lazy)
const AdminDashboard = React.lazy(() => import('./admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const AdminLogin = React.lazy(() => import('./admin/AdminLogin').then(m => ({ default: m.AdminLogin })));
const ClientProjectTracker = React.lazy(() => import('./pages/ClientProjectTracker').then(m => ({ default: m.ClientProjectTracker })));
const InvestmentSimulator = React.lazy(() => import('./components/InvestmentSimulator').then(m => ({ default: m.InvestmentSimulator })));

const LazyModuleFallback = () => (
  <div className="flex items-center justify-center p-8 font-mono text-xs text-brand-mint/70 bg-brand-deep/80 rounded border border-white/10 my-4">
    <span className="w-2 h-2 rounded-full bg-brand-mint animate-ping mr-2.5"></span>
    <span className="uppercase tracking-widest text-[10px]">Cargando módulo de alta ingeniería...</span>
  </div>
);

export const App = () => {
  // Automatic architectural loading state: false by default, resolves automatically in ~1.8s
  const [hasEntered, setHasEntered] = useState(false);
  const [currentRoute, setCurrentRoute] = useState('home'); // home, proyectos, simulador, estudio, contacto, dsb
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [bookingProjectPreselect, setBookingProjectPreselect] = useState('');
  const [adminSession, setAdminSession] = useState(() => storageService.getSession());

  // Initialize and hydrate active atmosphere tokens on mount (using official public atmosphere from CMS)
  useEffect(() => {
    const publicAtmosphere = storageService.getPublicAtmosphere();
    atmosphereService.applyAtmosphere(publicAtmosphere || 'zen', false);
  }, []);

  // Listen to hash changes for multi-page routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
      if (hash === 'dsb' || hash === 'admin') {
        setCurrentRoute('dsb');
        setHasEntered(true); // Direct admin access
      } else if (hash === 'proyectos' || hash === 'projects') {
        setCurrentRoute('proyectos');
      } else if (hash === 'simulador') {
        setCurrentRoute('simulador');
      } else if (hash === 'estudio' || hash === 'nosotros' || hash === 'pilares' || hash === 'pillars') {
        setCurrentRoute('estudio');
      } else if (hash === 'contacto' || hash === 'contact') {
        setCurrentRoute('contacto');
      } else if (hash === 'seguimiento' || hash === 'tracking' || hash === 'obras') {
        setCurrentRoute('seguimiento');
        setHasEntered(true);
      } else {
        setCurrentRoute('home');
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash when navigating internally
  const handleNavigate = (route) => {
    setCurrentRoute(route);
    if (route === 'home') {
      window.location.hash = '/';
    } else {
      window.location.hash = `/${route}`;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleOpenBooking = (projectName = '') => {
    setBookingProjectPreselect(projectName);
    handleNavigate('contacto');
  };

  // If in DSB Admin route (Isolated, zero links in client view)
  if (currentRoute === 'dsb') {
    if (!adminSession) {
      return (
        <React.Suspense fallback={<LazyModuleFallback />}>
          <AdminLogin
            onLoginSuccess={() => setAdminSession(storageService.getSession())}
            onReturnHome={() => handleNavigate('home')}
          />
        </React.Suspense>
      );
    }
    return (
      <React.Suspense fallback={<LazyModuleFallback />}>
        <AdminDashboard
          onLogout={() => {
            storageService.clearSession();
            setAdminSession(null);
            handleNavigate('home');
          }}
          onReturnHome={() => handleNavigate('home')}
        />
      </React.Suspense>
    );
  }

  return (
    <div className="relative min-h-screen bg-brand-deep text-white font-body selection:bg-brand-mint selection:text-brand-deep">
      {/* 0. Dynamic Atmospheric Backdrop (Lighting & Ambient Glow synced with Active Atmosphere) */}
      <AtmosphericBackdrop />

      {/* 0.1 Ambient Cursor Glow Cinemático (Resorte elástico a 60 FPS) */}
      <AmbientCursorGlow />

      {/* 0.2 Architectural Noise Film Grain (Textura táctil de plano/concreto a 60 FPS) */}
      <ArchitecturalNoiseOverlay />

      {/* 1. High-Status Automated Architectural Preloader */}
      <AnimatePresence>
        {!hasEntered && (
          <ArchitecturalPreloader onComplete={() => setHasEntered(true)} />
        )}
      </AnimatePresence>

      {/* 2. Client Frontoffice (Visible after clicking ENTRAR) */}
      {hasEntered && (
        <div className="flex flex-col min-h-screen relative z-10">
          {/* Top Navbar */}
          <Navbar
            activeSection={currentRoute}
            onNavigate={handleNavigate}
            onOpenBooking={() => handleOpenBooking()}
            onOpenSettings={() => setSettingsModalOpen(true)}
          />

          {/* Dynamic Multi-Page Views (Direct, Zero-Race-Condition Mounting) */}
          <main className="flex-1">
            {currentRoute === 'home' && (
              <HomePage
                onNavigateProjects={() => handleNavigate('proyectos')}
                onOpenBooking={handleOpenBooking}
              />
            )}

            {currentRoute === 'proyectos' && (
              <ProjectsPage onBookProject={handleOpenBooking} />
            )}

            {currentRoute === 'simulador' && (
              <div className="pt-24">
                <React.Suspense fallback={<LazyModuleFallback />}>
                  <InvestmentSimulator onOpenBooking={handleOpenBooking} />
                </React.Suspense>
              </div>
            )}

            {currentRoute === 'estudio' && (
              <div className="pt-24">
                <AtelierManifesto />
              </div>
            )}

            {currentRoute === 'contacto' && (
              <div className="pt-24">
                <ContactSection initialProject={bookingProjectPreselect} />
              </div>
            )}

            {currentRoute === 'seguimiento' && (
              <React.Suspense fallback={<LazyModuleFallback />}>
                <ClientProjectTracker onReturnHome={() => handleNavigate('home')} />
              </React.Suspense>
            )}
          </main>

          {/* Footer with Zero DSB references */}
          <Footer
            onNavigate={handleNavigate}
          />

          {/* Permanent Floating Stack: Clean Socials on Bottom-Left */}
          <FloatingSocialButton />

          {/* Permanent Floating Stack: Architectural Concierge on Bottom-Right with S Monogram */}
          <FloatingConciergeOrb
            onNavigateContact={() => handleNavigate('contacto')}
            onNavigateProjects={() => handleNavigate('proyectos')}
          />

          {/* Global Settings Modal (3 Ambient Soundscapes & Language) */}
          <GlobalSettingsModal
            isOpen={settingsModalOpen}
            onClose={() => setSettingsModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
};
