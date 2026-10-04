import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX, SlidersHorizontal, Check, CloudRain, Wind, Mountain, Palette, Sun } from 'lucide-react';
import { atmosphereService, ATMOSPHERE_EXPERIENCES } from '../services/atmosphereService';
import { LANGUAGES } from '../services/i18nService';
import { useTranslation } from '../hooks/useTranslation';

export const GlobalSettingsModal = ({ isOpen, onClose }) => {
  const { t, language, setLanguage } = useTranslation();
  const [activeTab, setActiveTab] = useState('ambient'); // 'ambient' | 'lang'
  const [selectedAtmosphere, setSelectedAtmosphere] = useState(() => atmosphereService.getCurrentId());
  const [isAudioPlaying, setIsAudioPlaying] = useState(() => atmosphereService.isAudioEnabled());
  const [volume, setVolume] = useState(() => atmosphereService.getVolume());

  // Sync state on open
  useEffect(() => {
    if (isOpen) {
      setSelectedAtmosphere(atmosphereService.getCurrentId());
      setIsAudioPlaying(atmosphereService.isAudioEnabled());
      setVolume(atmosphereService.getVolume());
    }
  }, [isOpen]);

  const handleSelectExperience = (expId) => {
    setSelectedAtmosphere(expId);
    // Apply visual tokens and optionally audio if enabled
    atmosphereService.applyAtmosphere(expId, isAudioPlaying);
  };

  const handleToggleAudio = () => {
    if (isAudioPlaying) {
      atmosphereService.stopAudio();
      setIsAudioPlaying(false);
    } else {
      atmosphereService.playAudioFor(selectedAtmosphere);
      setIsAudioPlaying(true);
    }
  };

  const handleVolumeChange = (newVol) => {
    setVolume(newVol);
    atmosphereService.setVolume(newVol);
  };

  const handleSelectLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="relative w-full max-w-lg bg-brand-deep border border-brand-mint/40 rounded-[4px] shadow-2xl overflow-hidden flex flex-col z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-brand-surface">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-[3px] bg-brand-mint/15 text-brand-mint flex items-center justify-center border border-brand-mint/30">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-architectural text-xs font-bold text-white tracking-wider">
                    {t('settings.modalTitle')}
                  </h3>
                  <div className="text-[11px] font-mono text-brand-mint/80 flex items-center gap-2">
                    <span>{t('settings.modalSubtitle')}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-[2px] text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Cerrar ajustes"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-white/10 bg-brand-deep text-xs font-architectural">
              <button
                onClick={() => setActiveTab('ambient')}
                className={`flex-1 py-3 text-center transition-colors border-b-2 flex items-center justify-center gap-2 ${
                  activeTab === 'ambient'
                    ? 'border-brand-mint text-brand-mint font-bold bg-brand-surface/40'
                    : 'border-transparent text-white/60 hover:text-white'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>{t('settings.tabAmbient')}</span>
              </button>

              <button
                onClick={() => setActiveTab('lang')}
                className={`flex-1 py-3 text-center transition-colors border-b-2 ${
                  activeTab === 'lang'
                    ? 'border-brand-mint text-brand-mint font-bold bg-brand-surface/40'
                    : 'border-transparent text-white/60 hover:text-white'
                }`}
              >
                {t('settings.tabLang')} ({language})
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 space-y-6">
              {/* Tab 1: 3 Ambientaciones y Paletas */}
              {activeTab === 'ambient' && (
                <div className="space-y-5">
                  <p className="text-xs font-body text-white/70 font-light">
                    {t('settings.ambientDesc')}
                  </p>

                  <div className="space-y-3">
                    {atmosphereService.getAvailable().map((exp) => {
                      const isSelected = selectedAtmosphere === exp.id;
                      const Icon = exp.id === 'zen' ? Mountain : exp.id === 'sunset' ? Sun : CloudRain;

                      return (
                        <button
                          key={exp.id}
                          onClick={() => handleSelectExperience(exp.id)}
                          className={`w-full p-4 rounded-[3px] border text-left transition-all flex flex-col gap-2 relative group cursor-pointer ${
                            isSelected
                              ? 'border-brand-mint bg-brand-surface/90 shadow-[0_0_20px_rgba(184,222,216,0.18)] ring-1 ring-brand-mint/50'
                              : 'border-white/10 hover:border-white/30 bg-brand-surface/40 text-white/70'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-8 h-8 rounded-[3px] flex items-center justify-center border"
                                style={{
                                  backgroundColor: exp.previewColors[1],
                                  borderColor: exp.accentHex,
                                  color: exp.accentHex
                                }}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-xs font-architectural font-bold text-white flex items-center gap-2">
                                  <span>{exp.name}</span>
                                  <span
                                    className="text-[9px] font-mono px-1.5 py-0.5 rounded-[2px] uppercase font-semibold"
                                    style={{
                                      backgroundColor: `${exp.accentHex}20`,
                                      color: exp.accentHex
                                    }}
                                  >
                                    {exp.badge}
                                  </span>
                                </div>
                                <div className="text-[11px] font-mono text-white/50 mt-0.5">
                                  {exp.subtitle}
                                </div>
                              </div>
                            </div>

                            {/* Color Swatch Previews */}
                            <div className="flex items-center gap-1.5">
                              {exp.previewColors.map((col, cIdx) => (
                                <span
                                  key={cIdx}
                                  className="w-3.5 h-3.5 rounded-full border border-white/30 shadow-sm"
                                  style={{ backgroundColor: col }}
                                  title={col}
                                />
                              ))}
                              {isSelected && (
                                <div
                                  className="w-5 h-5 rounded-full flex items-center justify-center ml-2 border"
                                  style={{
                                    backgroundColor: exp.accentHex,
                                    borderColor: exp.accentHex,
                                    color: '#0a0a0a'
                                  }}
                                >
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                </div>
                              )}
                            </div>
                          </div>

                          <p className="text-[11px] font-body text-white/60 font-light pl-11">
                            {exp.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Audio Controls Box */}
                  <div className="p-4 rounded-[3px] bg-brand-surface/70 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-architectural text-white">
                        <Volume2 className="w-4 h-4 text-brand-mint" />
                        <span>{t('settings.soundscapeTitle')}</span>
                      </div>

                      <button
                        onClick={handleToggleAudio}
                        className={`px-3 py-1 rounded-[2px] text-xs font-mono font-bold tracking-wider transition-all flex items-center gap-1.5 cursor-pointer border ${
                          isAudioPlaying
                            ? 'bg-brand-mint text-brand-deep border-brand-mint shadow-[0_0_12px_rgba(184,222,216,0.3)]'
                            : 'bg-white/5 text-white/60 border-white/20 hover:text-white'
                        }`}
                      >
                        {isAudioPlaying ? (
                          <>
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>{t('settings.soundActive')}</span>
                          </>
                        ) : (
                          <>
                            <VolumeX className="w-3.5 h-3.5" />
                            <span>{t('settings.soundMuted')}</span>
                          </>
                        )}
                      </button>
                    </div>

                    {isAudioPlaying && (
                      <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                        <span className="text-[10px] font-mono text-white/40">{t('settings.volumeLabel')}</span>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={volume}
                          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                          className="flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-brand-mint"
                        />
                        <span className="text-[10px] font-mono text-brand-mint w-8 text-right font-bold">
                          {Math.round(volume * 100)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 2: Idioma */}
              {activeTab === 'lang' && (
                <div className="space-y-4">
                  <p className="text-xs font-body text-white/70 font-light">
                    {t('settings.langDesc')}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      onClick={() => handleSelectLanguage('ES')}
                      className={`p-3.5 rounded-[3px] border text-left transition-all flex items-center justify-between ${
                        language === 'ES'
                          ? 'border-brand-mint bg-brand-mint/10 text-white shadow-[0_0_15px_rgba(184,222,216,0.2)]'
                          : 'border-white/10 hover:border-white/30 text-white/70 bg-brand-surface'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-architectural font-bold flex items-center gap-1.5">
                          <span>🇨🇴</span>
                          <span>Español</span>
                        </div>
                        <div className="text-[10px] font-mono text-white/50 mt-0.5">Oficial (CO)</div>
                      </div>
                      {language === 'ES' && <Check className="w-4 h-4 text-brand-mint" />}
                    </button>

                    <button
                      onClick={() => handleSelectLanguage('EN')}
                      className={`p-3.5 rounded-[3px] border text-left transition-all flex items-center justify-between ${
                        language === 'EN'
                          ? 'border-brand-mint bg-brand-mint/10 text-white shadow-[0_0_15px_rgba(184,222,216,0.2)]'
                          : 'border-white/10 hover:border-white/30 text-white/70 bg-brand-surface'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-architectural font-bold flex items-center gap-1.5">
                          <span>🇺🇸</span>
                          <span>English</span>
                        </div>
                        <div className="text-[10px] font-mono text-white/50 mt-0.5">International</div>
                      </div>
                      {language === 'EN' && <Check className="w-4 h-4 text-brand-mint" />}
                    </button>

                    <button
                      onClick={() => handleSelectLanguage('FR')}
                      className={`p-3.5 rounded-[3px] border text-left transition-all flex items-center justify-between ${
                        language === 'FR'
                          ? 'border-brand-mint bg-brand-mint/10 text-white shadow-[0_0_15px_rgba(184,222,216,0.2)]'
                          : 'border-white/10 hover:border-white/30 text-white/70 bg-brand-surface'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-architectural font-bold flex items-center gap-1.5">
                          <span>🇫🇷</span>
                          <span>Français</span>
                        </div>
                        <div className="text-[10px] font-mono text-white/50 mt-0.5">Europe / Canada</div>
                      </div>
                      {language === 'FR' && <Check className="w-4 h-4 text-brand-mint" />}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer with Affirmative CTA */}
            <div className="px-6 py-4 border-t border-white/10 bg-brand-surface flex items-center justify-between">
              <span className="text-[10px] font-mono text-white/40">
                {t('settings.realtimeNotice')}
              </span>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-brand-mint text-brand-deep hover:bg-brand-mint-light transition-all font-architectural text-xs tracking-wider font-bold rounded-[3px] shadow-[0_0_15px_rgba(184,222,216,0.3)] cursor-pointer"
              >
                {t('settings.confirmBtn')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
