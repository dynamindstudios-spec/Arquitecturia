import React, { useState, useEffect } from 'react';
import { Palette, RotateCcw, Check, Sparkles, Sliders } from 'lucide-react';
import { atmosphereService, ATMOSPHERE_EXPERIENCES } from '../services/atmosphereService';

// Recommended harmonious architectural swatches tuned to ArquitecturIA's brand gamut
const RECOMMENDED_GAMUTS = {
  zen: [
    { name: 'Menta Nórdico (ADN)', hex: '#b8ded8', isDefault: true },
    { name: 'Menta Salvia', hex: '#9bb8b2' },
    { name: 'Menta Ártico', hex: '#c5ece5' },
    { name: 'Celadón Mineral', hex: '#8cb5ac' },
    { name: 'Hielo Glaciar', hex: '#a8d5e2' },
    { name: 'Gris Platino', hex: '#cbd5e1' }
  ],
  sunset: [
    { name: 'Oro Bruñido (ADN)', hex: '#d4af37', isDefault: true },
    { name: 'Bronce Teka', hex: '#c5a880' },
    { name: 'Ámbar Cordillera', hex: '#d99b42' },
    { name: 'Terracota Noble', hex: '#b37d61' },
    { name: 'Cobre Ahumado', hex: '#c07a52' },
    { name: 'Madera Roble', hex: '#b08968' }
  ],
  forest: [
    { name: 'Esmeralda Andina (ADN)', hex: '#10b981', isDefault: true },
    { name: 'Verde Salento', hex: '#059669' },
    { name: 'Pino Silvestre', hex: '#3b7a57' },
    { name: 'Musgo Neblinoso', hex: '#52796f' },
    { name: 'Eucalipto Andino', hex: '#2d6a4f' },
    { name: 'Bambú Guardarraya', hex: '#6b9080' }
  ]
};

export const LiveThemeCustomizer = () => {
  const [atmospheres, setAtmospheres] = useState(() => atmosphereService.getAvailable());
  const [activeTab, setActiveTab] = useState('zen');
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const handleUpdate = () => {
      setAtmospheres(atmosphereService.getAvailable());
    };
    window.addEventListener('arquitecturia-atmosphere-change', handleUpdate);
    return () => window.removeEventListener('arquitecturia-atmosphere-change', handleUpdate);
  }, []);

  const showFeedback = (msg) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 2400);
  };

  const handleColorChange = (atmosphereId, newHex) => {
    atmosphereService.updateAtmosphereColor(atmosphereId, newHex);
    setAtmospheres(atmosphereService.getAvailable());
    showFeedback(`Tono actualizado para atmósfera ${atmosphereId.toUpperCase()}`);
  };

  const handleResetSingle = (atmosphereId) => {
    atmosphereService.resetAtmosphereColor(atmosphereId);
    setAtmospheres(atmosphereService.getAvailable());
    showFeedback(`Atmósfera ${atmosphereId.toUpperCase()} restablecida a su color original`);
  };

  const handleResetAll = () => {
    atmosphereService.resetAllAtmosphereColors();
    setAtmospheres(atmosphereService.getAvailable());
    showFeedback('Todas las atmósferas restablecidas al ADN original');
  };

  const currentAtmosphere = atmospheres.find(a => a.id === activeTab) || atmospheres[0];
  const defaultHex = atmosphereService.getDefaultColor(activeTab);
  const isModified = currentAtmosphere.accentHex.toLowerCase() !== defaultHex.toLowerCase();
  const gamuts = RECOMMENDED_GAMUTS[activeTab] || [];

  return (
    <div className="bg-brand-surface border border-white/10 p-6 rounded-lg space-y-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded bg-brand-mint/10 border border-brand-mint/30 text-brand-mint">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-architectural text-sm font-bold text-white tracking-wider">
                PERSONALIZADOR DE TONALIDADES POR AMBIENTE
              </h3>
              <span className="px-2 py-0.5 text-[9px] font-mono rounded bg-brand-mint/15 text-brand-mint font-semibold">
                GAMA EXPANDIDA
              </span>
            </div>
            <p className="text-[11px] font-mono text-white/50 mt-0.5">
              Personaliza el color de cada ambiente con libertad. Los colores originales de marca se conservan siempre como respaldo.
            </p>
          </div>
        </div>

        <button
          onClick={handleResetAll}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-white/20 hover:border-white text-xs font-mono text-white/70 hover:text-white transition-colors cursor-pointer self-start sm:self-auto"
          title="Restablecer todas las atmósferas al diseño original de fábrica"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restablecer Todo</span>
        </button>
      </div>

      {/* Atmosphere Selector Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {atmospheres.map((atm) => {
          const isSelected = activeTab === atm.id;
          const origHex = atmosphereService.getDefaultColor(atm.id);
          const hasCustom = atm.accentHex.toLowerCase() !== origHex.toLowerCase();

          return (
            <button
              key={atm.id}
              onClick={() => setActiveTab(atm.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded text-xs font-architectural tracking-wider transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-white/10 border-white/40 text-white shadow-lg'
                  : 'bg-black/30 border-white/10 text-white/50 hover:text-white hover:border-white/25'
              }`}
            >
              <span
                className="w-3.5 h-3.5 rounded-full border border-white/30 shadow-sm"
                style={{ backgroundColor: atm.accentHex }}
              />
              <span className="font-semibold">{atm.name}</span>
              {hasCustom && (
                <span className="w-1.5 h-1.5 rounded-full bg-brand-mint animate-pulse" title="Tono personalizado activo" />
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback Toast */}
      {feedback && (
        <div className="flex items-center gap-2 p-3 bg-brand-mint/15 border border-brand-mint/40 rounded text-xs font-mono text-brand-mint animate-fade-in">
          <Check className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Main Color Customizer Stage for Selected Atmosphere */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Col: Live Color Picker & Hex Input */}
        <div className="lg:col-span-5 bg-black/40 border border-white/10 p-5 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-brand-mint uppercase font-semibold">
              COLOR ACTIVO · {currentAtmosphere.name}
            </span>
            {isModified ? (
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-400/15 text-amber-300 border border-amber-400/30">
                PERSONALIZADO
              </span>
            ) : (
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/60">
                ORIGINAL ADN
              </span>
            )}
          </div>

          {/* Color Preview Block & Native Color Picker */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="color"
                value={currentAtmosphere.accentHex}
                onChange={(e) => handleColorChange(activeTab, e.target.value)}
                className="w-16 h-16 rounded cursor-pointer border border-white/20 bg-transparent p-0 overflow-hidden"
                title="Pulsar para abrir selector de color libre"
              />
              <Sliders className="w-4 h-4 text-white/70 absolute bottom-1.5 right-1.5 pointer-events-none drop-shadow" />
            </div>

            <div className="flex-1 space-y-1">
              <label className="block text-[10px] font-mono text-white/50 uppercase">
                Código Hexadecimal:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={currentAtmosphere.accentHex}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val.startsWith('#') && val.length <= 7) {
                      handleColorChange(activeTab, val);
                    }
                  }}
                  className="w-full bg-brand-surface border border-white/20 px-3 py-2 text-sm font-mono text-white rounded focus:outline-none focus:border-brand-mint"
                  placeholder="#b8ded8"
                />
              </div>
            </div>
          </div>

          {/* Reset to Single Default Button */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/40">
              <span>Original:</span>
              <span className="font-semibold text-white/70">{defaultHex}</span>
              <span className="w-2.5 h-2.5 rounded-full inline-block ml-1 border border-white/20" style={{ backgroundColor: defaultHex }} />
            </div>

            {isModified && (
              <button
                onClick={() => handleResetSingle(activeTab)}
                className="flex items-center gap-1 text-[11px] font-mono text-brand-mint hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Restablecer a Original</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Col: Recommended Harmonious Brand Gamut Swatches */}
        <div className="lg:col-span-7 bg-black/40 border border-white/10 p-5 rounded-lg space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-mint" />
            <h4 className="text-xs font-architectural text-white font-bold tracking-wider">
              GAMAS ARQUITECTÓNICAS AFINES RECOMENDADAS
            </h4>
          </div>
          <p className="text-[11px] font-mono text-white/50">
            Tonalidades curadas por el equipo de diseño que armonizan perfectamente con la materialidad de ArquitecturIA (concreto, teka, cristal y acero).
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
            {gamuts.map((swatch) => {
              const isActiveSwatch = currentAtmosphere.accentHex.toLowerCase() === swatch.hex.toLowerCase();
              return (
                <button
                  key={swatch.hex}
                  type="button"
                  onClick={() => handleColorChange(activeTab, swatch.hex)}
                  className={`p-2.5 rounded border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                    isActiveSwatch
                      ? 'border-brand-mint bg-brand-mint/15 shadow-[0_0_12px_rgba(184,222,216,0.2)]'
                      : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full shrink-0 border border-white/30 shadow-inner"
                    style={{ backgroundColor: swatch.hex }}
                  />
                  <div className="overflow-hidden">
                    <p className="text-[11px] font-mono text-white truncate font-medium">
                      {swatch.name}
                    </p>
                    <p className="text-[9px] font-mono text-white/40">
                      {swatch.hex}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
