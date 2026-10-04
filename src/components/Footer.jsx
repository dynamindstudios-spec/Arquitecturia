import React from 'react';
import { Compass, Instagram, Mail, Phone, ArrowUp } from 'lucide-react';
import { BRANDING_DATA } from '../data/brandingData';
import { useTranslation } from '../hooks/useTranslation';

export const Footer = ({ onNavigate, onReopenGate }) => {
  const { t, language } = useTranslation();

  const quoteTranslated = {
    ES: 'Construimos no para el presente inmediato, sino para la memoria del paisaje.',
    EN: 'We build not for the fleeting present, but for the enduring memory of the landscape.',
    FR: 'Nous bâtissons non pour l’immédiat éphémère, mais pour la mémoire durable du paysage.'
  }[language] || BRANDING_DATA.quote;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-deep border-t border-brand-mint/15 pt-16 pb-12 px-6 md:px-12 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <img
              src={BRANDING_DATA.logos.mint}
              alt="ArquitecturIA"
              className="h-12 w-auto object-contain"
            />
            <p className="font-body text-xs sm:text-sm text-white/70 max-w-sm leading-relaxed italic">
              "{quoteTranslated}"
            </p>
            <div className="text-[11px] font-mono text-brand-mint/70">
              {language === 'EN' ? 'Armenia, Quindío, Colombia · Central Mountain Range' : language === 'FR' ? 'Armenia, Quindío, Colombie · Cordillère Centrale' : 'Armenia, Quindío, Colombia · Cordillera Central'}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3 font-architectural text-xs tracking-wider">
            <span className="text-[10px] font-mono text-brand-mint/60 block uppercase">
              {t('footer.navTitle')}
            </span>
            <div>
              <button
                onClick={() => onNavigate('home')}
                className="text-white/70 hover:text-brand-mint transition-colors py-1 block"
              >
                {t('footer.navHome')}
              </button>
              <button
                onClick={() => onNavigate('proyectos')}
                className="text-white/70 hover:text-brand-mint transition-colors py-1 block"
              >
                {t('footer.navProjects')}
              </button>
              <button
                onClick={() => onNavigate('estudio')}
                className="text-white/70 hover:text-brand-mint transition-colors py-1 block"
              >
                {t('footer.navManifesto')}
              </button>
              <button
                onClick={() => onNavigate('contacto')}
                className="text-white/70 hover:text-brand-mint transition-colors py-1 block"
              >
                {t('footer.navContact')}
              </button>
              <button
                onClick={() => onNavigate('seguimiento')}
                className="text-brand-mint/80 hover:text-brand-mint transition-colors py-1 flex items-center gap-1.5 mt-1"
              >
                <span>SEGUIMIENTO DE OBRA</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </button>
            </div>
          </div>

          {/* Contact Direct */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs">
            <span className="text-[10px] font-mono text-brand-mint/60 block uppercase">
              {t('footer.supportTitle')}
            </span>
            <div className="space-y-2 text-white/70">
              <p>Email: <a href={`mailto:${BRANDING_DATA.contact.email}`} className="text-white hover:text-brand-mint">{BRANDING_DATA.contact.email}</a></p>
              <p>PBX: <a href={BRANDING_DATA.contact.whatsappUrl} className="text-white hover:text-brand-mint">{BRANDING_DATA.contact.phoneDisplay}</a></p>
              <p>Instagram: <a href={BRANDING_DATA.contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-brand-mint hover:underline">{BRANDING_DATA.contact.instagramHandle}</a></p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <div>
            © {new Date().getFullYear()} ARQUITECTURIA ATELIER S.A.S. {t('footer.allRightsReserved')}
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-brand-mint transition-colors uppercase tracking-wider text-[11px]"
          >
            <span>{t('footer.backToTop')}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
