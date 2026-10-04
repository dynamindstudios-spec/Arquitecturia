// Atmosphere Service: Unifies visual color palette tokens & procedural Web Audio soundscapes
// Allows seamless live switching between 3 distinct architectural brand experiences

import { ambientAudioService } from './ambientAudioService';

export const ATMOSPHERE_EXPERIENCES = [
  {
    id: 'zen',
    name: 'Concreto & Menta Pura',
    subtitle: 'Estudio de Arquitectura · Rigor & Serenidad',
    badge: 'ADN ARQUITECTURIA · DEFAULT',
    description: 'Frecuencia Solfeggio 528 Hz para enfoque y calma con acentos de menta arquitectónica sobre concreto visto.',
    soundType: 'zen',
    soundLabel: 'Frecuencia 528 Hz',
    previewColors: ['#0a0a0a', '#181818', '#b8ded8'],
    accentHex: '#b8ded8',
    tokens: {
      '--brand-deep': '#0a0a0a',
      '--brand-dark': '#141414',
      '--brand-surface': '#181818',
      '--brand-surface-hover': '#242424',
      '--brand-mint': '#b8ded8',
      '--brand-mint-light': '#d3ece7',
      '--brand-mint-dark': '#8cb8b0',
      '--brand-bronze': '#c5a880',
      '--border-subtle': 'rgba(184, 222, 216, 0.15)',
      '--border-strong': 'rgba(184, 222, 216, 0.35)'
    }
  },
  {
    id: 'sunset',
    name: 'Atardecer Cafetero & Teka Noble',
    subtitle: 'Luxury Sunset · Madera Noble & Bronce',
    badge: 'CÁLIDA & PATRIMONIAL',
    description: 'Brisa andina de cordillera con tonalidades doradas, carpintería de teka curada y mármol travertino cálido.',
    soundType: 'wind',
    soundLabel: 'Brisa Andina',
    previewColors: ['#0e0b08', '#1f1913', '#d4af37'],
    accentHex: '#d4af37',
    tokens: {
      '--brand-deep': '#0e0b08',
      '--brand-dark': '#18130e',
      '--brand-surface': '#1f1913',
      '--brand-surface-hover': '#2c231b',
      '--brand-mint': '#d4af37', // Acento Oro / Bronce cálido
      '--brand-mint-light': '#f3e5ab',
      '--brand-mint-dark': '#aa820a',
      '--brand-bronze': '#e5b869',
      '--border-subtle': 'rgba(212, 175, 55, 0.20)',
      '--border-strong': 'rgba(212, 175, 55, 0.45)'
    }
  },
  {
    id: 'forest',
    name: 'Bosque de Niebla & Esmeralda Andina',
    subtitle: 'Bio-Zen · Salento & Ecoturismo de Autor',
    badge: 'BIOFILIA & NATURALEZA',
    description: 'Lluvia serena sobre cubiertas vegetales y niebla de la cordillera con esmeralda colombiana luminosa.',
    soundType: 'rain',
    soundLabel: 'Lluvia Serena',
    previewColors: ['#060f0b', '#10241b', '#10b981'],
    accentHex: '#10b981',
    tokens: {
      '--brand-deep': '#060f0b',
      '--brand-dark': '#0b1913',
      '--brand-surface': '#10241b',
      '--brand-surface-hover': '#183628',
      '--brand-mint': '#10b981', // Acento Esmeralda Andina
      '--brand-mint-light': '#6ee7b7',
      '--brand-mint-dark': '#047857',
      '--brand-bronze': '#34d399',
      '--border-subtle': 'rgba(16, 185, 129, 0.20)',
      '--border-strong': 'rgba(16, 185, 129, 0.45)'
    }
  }
];

function hexToRgba(hex, alpha = 1) {
  try {
    let clean = hex.replace('#', '');
    if (clean.length === 3) clean = clean.split('').map(c => c + c).join('');
    const bigint = parseInt(clean, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } catch {
    return hex;
  }
}

export const atmosphereService = {
  getCustomColors: () => {
    try {
      const data = localStorage.getItem('arquitecturia_custom_atmosphere_colors');
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  getAvailable: () => {
    const customColors = atmosphereService.getCustomColors();
    return ATMOSPHERE_EXPERIENCES.map((exp) => {
      const customHex = customColors[exp.id];
      if (!customHex) return exp;

      return {
        ...exp,
        accentHex: customHex,
        previewColors: [exp.previewColors[0], exp.previewColors[1], customHex],
        tokens: {
          ...exp.tokens,
          '--brand-mint': customHex,
          '--border-subtle': hexToRgba(customHex, 0.16),
          '--border-strong': hexToRgba(customHex, 0.38)
        }
      };
    });
  },

  getCurrentId: () => {
    try {
      return localStorage.getItem('arquitecturia_atmosphere_id') || 'zen';
    } catch {
      return 'zen';
    }
  },

  getCurrent: () => {
    const list = atmosphereService.getAvailable();
    const id = atmosphereService.getCurrentId();
    return list.find(exp => exp.id === id) || list[0];
  },

  updateAtmosphereColor: (atmosphereId, newHex) => {
    try {
      const current = atmosphereService.getCustomColors();
      current[atmosphereId] = newHex;
      localStorage.setItem('arquitecturia_custom_atmosphere_colors', JSON.stringify(current));
      
      // If currently active atmosphere is the one modified, re-apply immediately
      if (atmosphereService.getCurrentId() === atmosphereId) {
        atmosphereService.applyAtmosphere(atmosphereId, false);
      } else {
        window.dispatchEvent(new CustomEvent('arquitecturia-atmosphere-change', { detail: atmosphereService.getCurrentId() }));
      }
    } catch (e) {
      console.warn('Error saving custom atmosphere color:', e);
    }
  },

  resetAtmosphereColor: (atmosphereId) => {
    try {
      const current = atmosphereService.getCustomColors();
      delete current[atmosphereId];
      localStorage.setItem('arquitecturia_custom_atmosphere_colors', JSON.stringify(current));

      if (atmosphereService.getCurrentId() === atmosphereId) {
        atmosphereService.applyAtmosphere(atmosphereId, false);
      } else {
        window.dispatchEvent(new CustomEvent('arquitecturia-atmosphere-change', { detail: atmosphereService.getCurrentId() }));
      }
    } catch (e) {
      console.warn('Error resetting atmosphere color:', e);
    }
  },

  resetAllAtmosphereColors: () => {
    try {
      localStorage.removeItem('arquitecturia_custom_atmosphere_colors');
      atmosphereService.applyAtmosphere(atmosphereService.getCurrentId(), false);
    } catch (e) {
      console.warn('Error resetting all atmosphere colors:', e);
    }
  },

  getDefaultColor: (atmosphereId) => {
    const base = ATMOSPHERE_EXPERIENCES.find(e => e.id === atmosphereId);
    return base ? base.accentHex : '#b8ded8';
  },

  isAudioEnabled: () => {
    try {
      return localStorage.getItem('arquitecturia_audio_enabled') === 'true';
    } catch {
      return false;
    }
  },

  getVolume: () => {
    try {
      const v = localStorage.getItem('arquitecturia_audio_volume');
      return v !== null ? parseFloat(v) : 0.6;
    } catch {
      return 0.6;
    }
  },

  applyAtmosphere: (id, playAudio = false) => {
    const list = atmosphereService.getAvailable();
    const experience = list.find(exp => exp.id === id) || list[0];
    const root = document.documentElement;

    // 1. Inject CSS Variables dynamically into DOM :root
    Object.entries(experience.tokens).forEach(([cssVar, value]) => {
      root.style.setProperty(cssVar, value);
    });

    try {
      localStorage.setItem('arquitecturia_atmosphere_id', experience.id);
      window.dispatchEvent(new CustomEvent('arquitecturia-atmosphere-change', { detail: experience.id }));
    } catch (e) {}

    // 2. Audio playback management
    if (playAudio) {
      atmosphereService.playAudioFor(experience.id);
    }

    return experience;
  },

  playAudioFor: (id) => {
    const experience = ATMOSPHERE_EXPERIENCES.find(exp => exp.id === id) || ATMOSPHERE_EXPERIENCES[0];
    const vol = atmosphereService.getVolume();
    ambientAudioService.setVolume(vol);

    if (experience.soundType === 'zen') {
      ambientAudioService.playZenSolfeggio();
    } else if (experience.soundType === 'wind') {
      ambientAudioService.playWindSound();
    } else if (experience.soundType === 'rain') {
      ambientAudioService.playRainSound();
    }

    try {
      localStorage.setItem('arquitecturia_audio_enabled', 'true');
    } catch (e) {}
  },

  stopAudio: () => {
    ambientAudioService.stop();
    try {
      localStorage.setItem('arquitecturia_audio_enabled', 'false');
    } catch (e) {}
  },

  setVolume: (val) => {
    ambientAudioService.setVolume(val);
    try {
      localStorage.setItem('arquitecturia_audio_volume', String(val));
    } catch (e) {}
  }
};
