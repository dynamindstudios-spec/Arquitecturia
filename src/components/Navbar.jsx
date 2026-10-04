import React, { useState, useEffect } from 'react';
import { Menu, X, Compass, Settings, Globe, Sun, Layers } from 'lucide-react';
import { BRANDING_DATA } from '../data/brandingData';
import { useTranslation } from '../hooks/useTranslation';

export const Navbar = ({ 
  activeSection, 
  onNavigate, 
  onOpenBooking, 
  onReopenGate,
  onOpenSettings,
  onOpenBioclimatic,
  onOpenNsr10
}) => {
  const { t, language, setLanguage } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'proyectos', label: t('nav.projects') },
    { id: 'estudio', label: t('nav.pillars') },
    { id: 'contacto', label: t('nav.contact') }
  ];

  const handleItemClick = (id) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 select-none ${
        scrolled
          ? 'bg-brand-deep/95 backdrop-blur-md border-b border-brand-mint/15 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
          : 'bg-gradient-to-b from-brand-deep/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleItemClick('home')}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <img
            src="/logo-navbar.png"
            alt={t('brand.alt') || "ArquitecturIA Atelier"}
            className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="hidden sm:flex flex-col border-l border-brand-mint/20 pl-3">
            <span className="text-[11px] tracking-[0.25em] font-mono text-brand-mint uppercase font-bold leading-tight">
              {t('brand.group') || 'GRUPO'}
            </span>
            <span className="text-[10px] tracking-[0.2em] font-mono text-white/70 uppercase leading-tight mt-0.5">
              {t('brand.constructor') || 'CONSTRUCTOR'}
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`font-architectural text-xs tracking-architectural transition-colors duration-300 relative py-1 ${
                activeSection === item.id
                  ? 'text-brand-mint font-semibold'
                  : 'text-white/70 hover:text-brand-mint'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-brand-mint" />
              )}
            </button>
          ))}
        </nav>

        {/* Action Tools: Settings Gear & Acoustic Customizer */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            onClick={onOpenSettings}
            className="p-2.5 rounded-md text-white/60 hover:text-brand-mint hover:bg-white/5 border border-white/10 transition-colors cursor-pointer"
            title={t('nav.settingsTitle')}
            aria-label="Ajustes de entorno e idioma"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger & Controls */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={onOpenSettings}
            className="p-1.5 text-brand-mint border border-brand-mint/20 rounded-md"
            title={t('nav.settingsTitle')}
            aria-label="Ajustes de entorno e idioma"
          >
            <Settings className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-brand-mint focus:outline-none"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-deep/98 border-b border-brand-mint/20 px-6 py-8 flex flex-col space-y-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className="font-architectural text-left text-sm tracking-widest text-brand-mint hover:text-white py-2 border-b border-white/5"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
