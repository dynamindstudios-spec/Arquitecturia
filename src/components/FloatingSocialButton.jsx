import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Phone, Instagram, MapPin, MessageCircle, X } from 'lucide-react';
import { storageService } from '../services/storageService';
import { useTranslation } from '../hooks/useTranslation';

export const FloatingSocialButton = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [linksData, setLinksData] = useState(() => storageService.getSocialLinks());

  useEffect(() => {
    const handleUpdate = () => {
      setLinksData(storageService.getSocialLinks());
    };
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('arquitecturia-socials-updated', handleUpdate);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('arquitecturia-socials-updated', handleUpdate);
    };
  }, []);

  const socialLinks = [
    {
      id: 'whatsapp',
      label: t('social.whatsapp') || 'WhatsApp Concierge',
      icon: MessageCircle,
      href: linksData.whatsappUrl || 'https://wa.me/573008902400',
      hoverClass: 'hover:bg-[#25D366] hover:text-black hover:border-[#25D366] hover:shadow-[0_0_20px_rgba(37,211,102,0.5)]'
    },
    {
      id: 'instagram',
      label: t('social.instagram') || 'Instagram Oficial',
      icon: Instagram,
      href: linksData.instagramUrl || 'https://instagram.com/arquitecturia.studio',
      hoverClass: 'hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:text-white hover:border-[#DD2A7B] hover:shadow-[0_0_20px_rgba(221,42,123,0.5)]'
    },
    {
      id: 'phone',
      label: t('social.phone') || 'Llamar a PBX',
      icon: Phone,
      href: `tel:${linksData.phone || '+57 300 890 2400'}`,
      hoverClass: 'hover:bg-brand-mint hover:text-brand-deep hover:border-brand-mint hover:shadow-[0_0_20px_rgba(184,222,216,0.5)]'
    },
    {
      id: 'maps',
      label: t('social.location') || 'Ubicación Armenia',
      icon: MapPin,
      href: linksData.mapsUrl || 'https://maps.google.com/?q=Armenia,+Quindio,+Colombia',
      hoverClass: 'hover:bg-[#EA4335] hover:text-white hover:border-[#EA4335] hover:shadow-[0_0_20px_rgba(234,67,53,0.5)]'
    }
  ];

  return (
    <div
      className="fixed bottom-6 left-6 z-40 flex flex-col items-start select-none no-print"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Expanded Floating Icon Stack (Zero text labels, only icons that light up on hover) */}
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col-reverse items-center gap-3 mb-3 pl-1">
            {socialLinks.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15, scale: 0.6 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.6 }}
                  transition={{
                    type: 'spring',
                    stiffness: 450,
                    damping: 24,
                    delay: index * 0.035
                  }}
                  className="relative group flex items-center justify-center"
                >
                  {/* Subtle Tooltip on Hover to the right */}
                  <span className="absolute left-14 sm:left-16 px-3 py-1.5 rounded-md bg-brand-deep/95 backdrop-blur-md text-[11px] font-mono font-medium text-brand-mint border border-brand-mint/30 shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap tracking-wider">
                    {item.label}
                  </span>

                  {/* Icon Button */}
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-brand-surface/95 border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md shadow-xl ${item.hoverClass}`}
                  >
                    <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform duration-200" />
                  </a>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Main Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('social.ariaTrigger') || "Canales oficiales y redes sociales"}
        className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-brand-surface/98 border border-brand-mint/60 text-brand-mint shadow-[0_8px_25px_rgba(0,0,0,0.8)] hover:shadow-[0_10px_30px_rgba(184,222,216,0.35)] flex items-center justify-center cursor-pointer backdrop-blur-md transition-all group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-5 h-5 text-white" strokeWidth={2.2} />
            </motion.div>
          ) : (
            <motion.div
              key="share"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="flex items-center justify-center text-brand-mint group-hover:text-white transition-colors"
            >
              <Share2 className="w-5 h-5" strokeWidth={2.2} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
