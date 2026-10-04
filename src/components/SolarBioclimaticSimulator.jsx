import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, Moon, Wind, Compass, Volume2, VolumeX, RotateCcw, 
  Sparkles, Layers, ShieldCheck, Activity, Info, X, ChevronRight, Sliders
} from 'lucide-react';
import { proceduralAudioService } from '../services/proceduralAudioService';
import { useTranslation } from '../hooks/useTranslation';

// Parámetros geográficos de Armenia, Quindío
const LATITUDE_ARMENIA = 4.5428; // 4°32'N

export const SolarBioclimaticSimulator = ({ isOpen = true, onClose }) => {
  const { language } = useTranslation();
  const canvasRef = useRef(null);
  
  // Estados del Simulador
  const [solarHour, setSolarHour] = useState(10.5); // 10:30 AM
  const [season, setSeason] = useState('equinox'); // 'equinox', 'solstice_june', 'solstice_dec'
  const [audioActive, setAudioActive] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [activeTab, setActiveTab] = useState('sun'); // 'sun' | 'wind' | 'thermal'

  // Partículas de viento
  const windParticlesRef = useRef([]);

  // 1. Cálculo trigonométrico de la posición del sol
  const calculateSolarAngles = (hour, seasonType) => {
    // Ángulo horario (H): 15° por hora respecto al mediodía (12:00 = 0°)
    const H = (hour - 12) * 15 * (Math.PI / 180);
    
    // Declinación solar aproximada por estación
    let declinationDeg = 0;
    if (seasonType === 'solstice_june') declinationDeg = 23.45;
    if (seasonType === 'solstice_dec') declinationDeg = -23.45;
    const delta = declinationDeg * (Math.PI / 180);

    const latRad = LATITUDE_ARMENIA * (Math.PI / 180);

    // Altura solar (alfa)
    const sinAlpha = Math.sin(latRad) * Math.sin(delta) + Math.cos(latRad) * Math.cos(delta) * Math.cos(H);
    const alpha = Math.asin(Math.max(-1, Math.min(1, sinAlpha))); // radianes

    // Azimut solar (gamma)
    const cosGamma = (Math.sin(alpha) * Math.sin(latRad) - Math.sin(delta)) / (Math.cos(alpha) * Math.cos(latRad) || 0.0001);
    let gamma = Math.acos(Math.max(-1, Math.min(1, cosGamma)));
    if (H < 0) gamma = 2 * Math.PI - gamma;

    const altitudeDeg = Math.max(0, alpha * (180 / Math.PI));
    const azimuthDeg = gamma * (180 / Math.PI);

    return { altitudeDeg, azimuthDeg, alpha, gamma };
  };

  const solarData = calculateSolarAngles(solarHour, season);

  // 2. Telemetría Térmica Paramétrica
  const exteriorTemp = Math.round((17 + Math.sin((solarHour - 6) / 12 * Math.PI) * 10.5) * 10) / 10;
  const comfortTemp = Math.round((20.8 + Math.sin((solarHour - 6) / 12 * Math.PI) * 1.3) * 10) / 10;
  const solarRadiation = Math.round(Math.max(0, Math.sin(solarData.alpha) * 980));
  const passiveThermalDamping = Math.round(68 + Math.cos(solarData.alpha) * 18);
  const windVelocity = (1.4 + Math.sin((solarHour - 6) / 12 * Math.PI) * 2.2).toFixed(1);

  // Iniciar partículas de viento
  useEffect(() => {
    const particles = [];
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * 800,
        y: Math.random() * 500,
        speed: 1.5 + Math.random() * 2,
        length: 20 + Math.random() * 30,
        opacity: 0.15 + Math.random() * 0.35
      });
    }
    windParticlesRef.current = particles;
  }, []);

  // Sincronización del Audio Procedural con el tiempo solar
  useEffect(() => {
    if (audioActive) {
      proceduralAudioService.updateSolarTimeAtmosphere(solarHour);
    }
  }, [solarHour, audioActive]);

  const toggleAudio = () => {
    if (!audioActive) {
      proceduralAudioService.startAtmosphere(solarHour);
      setAudioActive(true);
    } else {
      proceduralAudioService.stopAtmosphere();
      setAudioActive(false);
    }
  };

  useEffect(() => {
    return () => {
      proceduralAudioService.stopAtmosphere();
    };
  }, []);

  // 3. Renderizado en Canvas del Modelo Bioclimático & Sombras Arrojadas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;
      const cx = w * 0.5;
      const cy = h * 0.58;

      // Atmósfera de cielo según la hora solar
      const skyGradient = ctx.createLinearGradient(0, 0, 0, h);
      if (solarHour < 7 || solarHour > 17.2) {
        // Amanecer / Atardecer
        skyGradient.addColorStop(0, '#101B20');
        skyGradient.addColorStop(0.5, '#1B2E33');
        skyGradient.addColorStop(1, '#273837');
      } else {
        // Mediodía / Mañana diáfana
        skyGradient.addColorStop(0, '#0D171A');
        skyGradient.addColorStop(0.6, '#132124');
        skyGradient.addColorStop(1, '#1A2929');
      }
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, w, h);

      // Retícula de terreno topográfico sutil
      ctx.strokeStyle = 'rgba(184, 222, 216, 0.05)';
      ctx.lineWidth = 1;
      const gridStep = 40;
      for (let x = -w; x < w * 2; x += gridStep) {
        ctx.beginPath();
        ctx.moveTo(x, h * 0.5);
        ctx.lineTo(x + w * 0.4, h);
        ctx.stroke();
      }

      // Trayectoria de Sombras Matemáticas
      // Ángulo de sombra en plano de suelo
      const shadowLength = Math.max(15, Math.min(180, (1 / (Math.tan(solarData.alpha) || 0.1)) * 40));
      const shadowAngle = solarData.gamma + Math.PI; // Opuesto a la dirección del sol
      const shadowX = Math.cos(shadowAngle) * shadowLength;
      const shadowY = Math.sin(shadowAngle) * (shadowLength * 0.45); // Proyección axonométrica

      // 1. Sombra Arrojada de la Residencia (Polígono dinámico)
      ctx.save();
      ctx.fillStyle = 'rgba(7, 14, 16, 0.65)';
      ctx.beginPath();
      ctx.moveTo(cx - 140, cy + 20);
      ctx.lineTo(cx + 140, cy + 20);
      ctx.lineTo(cx + 140 + shadowX, cy + 20 + shadowY);
      ctx.lineTo(cx - 140 + shadowX, cy + 20 + shadowY);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // 2. Cimientos y Plataforma Flotante de Concreto
      ctx.fillStyle = '#1D2A2A';
      ctx.beginPath();
      ctx.moveTo(cx - 150, cy + 20);
      ctx.lineTo(cx, cy + 60);
      ctx.lineTo(cx + 150, cy + 20);
      ctx.lineTo(cx, cy - 20);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = 'rgba(184, 222, 216, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 3. Volúmenes Habitables de Concreto Visto Fenólico
      // Muro izquierdo
      ctx.fillStyle = '#2A3C39';
      ctx.beginPath();
      ctx.moveTo(cx - 130, cy + 10);
      ctx.lineTo(cx, cy + 45);
      ctx.lineTo(cx, cy - 55);
      ctx.lineTo(cx - 130, cy - 90);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = 'rgba(184, 222, 216, 0.4)';
      ctx.stroke();

      // Muro derecho (iluminación solar variable)
      const sunShade = Math.sin(solarData.alpha) * 0.25;
      ctx.fillStyle = `rgba(50, 72, 68, ${0.75 + sunShade})`;
      ctx.beginPath();
      ctx.moveTo(cx, cy + 45);
      ctx.lineTo(cx + 130, cy + 10);
      ctx.lineTo(cx + 130, cy - 90);
      ctx.lineTo(cx, cy - 55);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Ventanales Piso-Techo y Patio Interior
      ctx.fillStyle = 'rgba(184, 222, 216, 0.22)';
      ctx.fillRect(cx - 90, cy - 40, 60, 65);
      ctx.fillRect(cx + 30, cy - 40, 60, 65);
      ctx.strokeStyle = 'rgba(184, 222, 216, 0.8)';
      ctx.strokeRect(cx - 90, cy - 40, 60, 65);
      ctx.strokeRect(cx + 30, cy - 40, 60, 65);

      // 4. Cubierta Monolítica con Vuelos en Voladizo (Aleros de 1.80m)
      ctx.fillStyle = '#213331';
      ctx.beginPath();
      ctx.moveTo(cx - 160, cy - 95);
      ctx.lineTo(cx, cy - 45);
      ctx.lineTo(cx + 160, cy - 95);
      ctx.lineTo(cx, cy - 145);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#B8DED8';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Sombra propia arrojada por el alero sobre la fachada
      const overhangShadowDepth = Math.max(8, Math.sin(solarData.alpha) * 35);
      ctx.fillStyle = 'rgba(6, 12, 14, 0.55)';
      ctx.beginPath();
      ctx.moveTo(cx - 130, cy - 90);
      ctx.lineTo(cx, cy - 55);
      ctx.lineTo(cx, cy - 55 + overhangShadowDepth);
      ctx.lineTo(cx - 130, cy - 90 + overhangShadowDepth);
      ctx.closePath();
      ctx.fill();

      // 5. Partículas de Ventilación Cruzada Convectiva (Vientos Cordilleranos)
      if (activeTab === 'wind' || activeTab === 'thermal') {
        ctx.strokeStyle = 'rgba(184, 222, 216, 0.45)';
        ctx.lineWidth = 1.5;
        windParticlesRef.current.forEach(p => {
          p.x += p.speed * (parseFloat(windVelocity) * 0.7);
          p.y += Math.sin(p.x * 0.02) * 0.8;
          if (p.x > w + 40) {
            p.x = -40;
            p.y = h * 0.4 + Math.random() * 120;
          }

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.length, p.y);
          ctx.stroke();
        });
      }

      // 6. Representación Visual del Astro Solar / Arco Cenital
      const sunDistance = 220;
      const sunScreenX = cx + Math.cos(solarData.gamma) * sunDistance;
      const sunScreenY = cy - 80 - Math.sin(solarData.alpha) * (sunDistance * 0.85);

      if (solarData.altitudeDeg > 0) {
        // Resplandor Solar
        const sunGlow = ctx.createRadialGradient(sunScreenX, sunScreenY, 4, sunScreenX, sunScreenY, 45);
        sunGlow.addColorStop(0, 'rgba(255, 235, 170, 0.95)');
        sunGlow.addColorStop(0.3, 'rgba(184, 222, 216, 0.45)');
        sunGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = sunGlow;
        ctx.beginPath();
        ctx.arc(sunScreenX, sunScreenY, 45, 0, Math.PI * 2);
        ctx.fill();

        // Núcleo Solar
        ctx.fillStyle = '#FFF8E7';
        ctx.beginPath();
        ctx.arc(sunScreenX, sunScreenY, 9, 0, Math.PI * 2);
        ctx.fill();

        // Rayo conductor hacia el alero
        ctx.strokeStyle = 'rgba(255, 235, 170, 0.12)';
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.moveTo(sunScreenX, sunScreenY);
        ctx.lineTo(cx, cy - 95);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [solarHour, season, activeTab, solarData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto select-none">
      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative w-full max-w-5xl bg-brand-deep border border-brand-mint/35 rounded-xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden text-white flex flex-col my-auto max-h-[95vh]"
      >
        {/* Header Superior Táctico */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-brand-surface/70">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-mint/15 text-brand-mint border border-brand-mint/30 rounded-md">
              <Sun className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-wider text-brand-mint uppercase font-bold">
                  SIMULADOR BIOCLIMÁTICO 3D · HELIODÓN SOLAR
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 bg-brand-mint/10 text-brand-mint rounded border border-brand-mint/30">
                  LAT 4.54° N · ARMENIA
                </span>
              </div>
              <h3 className="font-editorial-heading text-lg sm:text-2xl text-white">
                Física Solar & Confort Pasivo Cordillerano
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              onClick={toggleAudio}
              className={`p-2 rounded-md border text-xs font-mono flex items-center gap-1.5 transition-all ${
                audioActive 
                  ? 'bg-brand-mint text-brand-deep font-bold border-brand-mint shadow-[0_0_15px_rgba(184,222,216,0.3)]'
                  : 'bg-brand-surface border-white/10 text-white/60 hover:text-white'
              }`}
              title="Activar Paisaje Sonoro Procedural (Aves y Brisa del Quindío)"
            >
              {audioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{audioActive ? 'Audio ON' : 'Audio OFF'}</span>
            </button>

            {/* Close Button */}
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Cuerpo Principal: Canvas Interactivo + HUD Lateral */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 min-h-0 overflow-y-auto">
          {/* Columna Izquierda / Central: Canvas Visualizador */}
          <div className="lg:col-span-8 relative bg-black/60 flex flex-col items-center justify-center p-3 sm:p-5 border-b lg:border-b-0 lg:border-r border-white/10">
            {/* Canvas Axonométrico */}
            <div className="relative w-full aspect-[16/10] max-h-[440px] rounded-lg overflow-hidden border border-white/10 shadow-2xl">
              <canvas
                ref={canvasRef}
                width={800}
                height={500}
                className="w-full h-full object-cover"
              />

              {/* Overlay de Telemetría Flotante */}
              <div className="absolute top-3 left-3 bg-brand-deep/85 backdrop-blur-md p-2.5 rounded border border-white/15 font-mono text-[10px] space-y-1">
                <div className="text-brand-mint font-bold flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5" />
                  <span>AZIMUT: {Math.round(solarData.azimuthDeg)}° · ALTITUD: {Math.round(solarData.altitudeDeg)}°</span>
                </div>
                <div className="text-white/60">
                  SOMBRA ALERO: {solarHour >= 11 && solarHour <= 13 ? 'Protección Cenital 100%' : 'Atenuación Lateral'}
                </div>
              </div>

              {/* Control de Capas en Pantalla */}
              <div className="absolute bottom-3 left-3 flex gap-1.5 bg-brand-deep/90 backdrop-blur-md p-1 rounded border border-white/15 text-[10px] font-mono">
                <button
                  onClick={() => setActiveTab('sun')}
                  className={`px-2 py-1 rounded transition-colors ${activeTab === 'sun' ? 'bg-brand-mint text-brand-deep font-bold' : 'text-white/60 hover:text-white'}`}
                >
                  ☀️ Heliodón
                </button>
                <button
                  onClick={() => setActiveTab('wind')}
                  className={`px-2 py-1 rounded transition-colors ${activeTab === 'wind' ? 'bg-brand-mint text-brand-deep font-bold' : 'text-white/60 hover:text-white'}`}
                >
                  🍃 Vientos
                </button>
                <button
                  onClick={() => setActiveTab('thermal')}
                  className={`px-2 py-1 rounded transition-colors ${activeTab === 'thermal' ? 'bg-brand-mint text-brand-deep font-bold' : 'text-white/60 hover:text-white'}`}
                >
                  🌡️ Confort
                </button>
              </div>
            </div>

            {/* Slider de Hora Solar Táctico */}
            <div className="w-full mt-4 bg-brand-surface/90 border border-white/10 p-4 rounded-lg space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-brand-mint font-bold flex items-center gap-1.5">
                  <Sun className="w-4 h-4" />
                  HORA SOLAR DEL QUINDÍO:
                </span>
                <span className="text-lg font-bold text-white bg-brand-deep px-3 py-0.5 rounded border border-brand-mint/40">
                  {Math.floor(solarHour).toString().padStart(2, '0')}:{Math.round((solarHour % 1) * 60).toString().padStart(2, '0')} {solarHour < 12 ? 'AM' : 'PM'}
                </span>
              </div>

              <input
                type="range"
                min="6"
                max="18"
                step="0.25"
                value={solarHour}
                onChange={(e) => setSolarHour(parseFloat(e.target.value))}
                className="w-full accent-brand-mint h-2 bg-brand-deep rounded cursor-pointer"
              />

              <div className="flex justify-between text-[10px] font-mono text-white/40">
                <span>06:00 AM (Amanecer)</span>
                <span>12:00 M (Cenit 90°)</span>
                <span>18:00 PM (Ocaso)</span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Parámetros Bioclimáticos & Métricas */}
          <div className="lg:col-span-4 p-4 sm:p-5 flex flex-col justify-between space-y-4 bg-brand-surface/40">
            {/* 1. Selector de Estación */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider block">
                DECLINACIÓN ESTACIONAL:
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'equinox', label: 'Equinoccio', sub: 'Marzo / Sep' },
                  { id: 'solstice_june', label: 'Solsticio', sub: 'Junio (+23°)' },
                  { id: 'solstice_dec', label: 'Solsticio', sub: 'Diciembre (-23°)' }
                ].map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSeason(s.id)}
                    className={`p-2 rounded text-center font-mono text-[10px] border transition-all ${
                      season === s.id
                        ? 'bg-brand-mint text-brand-deep font-bold border-brand-mint shadow-md'
                        : 'bg-brand-deep border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    <span className="block font-semibold">{s.label}</span>
                    <span className="text-[8px] opacity-75 block">{s.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Tarjetas de Métricas en Tiempo Real */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-mono text-brand-mint uppercase tracking-wider font-bold block">
                TELEMETRÍA TÉRMICA EN VIVO:
              </span>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-brand-deep p-3 rounded border border-white/10">
                  <span className="text-[9px] font-mono text-white/50 block">EXTERIOR</span>
                  <span className="text-xl font-bold font-editorial-heading text-amber-300">
                    {exteriorTemp}°C
                  </span>
                  <span className="text-[9px] font-mono text-white/40 block mt-0.5">Radiación: {solarRadiation} W/m²</span>
                </div>

                <div className="bg-brand-deep p-3 rounded border border-emerald-500/30">
                  <span className="text-[9px] font-mono text-emerald-400 block">INTERIOR PASIVO</span>
                  <span className="text-xl font-bold font-editorial-heading text-emerald-300">
                    {comfortTemp}°C
                  </span>
                  <span className="text-[9px] font-mono text-emerald-400/80 block mt-0.5">Confort sin A/A</span>
                </div>
              </div>

              <div className="bg-brand-deep p-3 rounded border border-white/10 space-y-1.5 font-mono text-xs">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-white/70">Atenuación Aleros 1.80m:</span>
                  <span className="text-brand-mint font-bold">-{passiveThermalDamping}% Calórico</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-brand-mint h-full rounded-full transition-all duration-300"
                    style={{ width: `${passiveThermalDamping}%` }}
                  />
                </div>
                <span className="text-[9px] text-white/40 block">
                  Los aleros monolíticos impiden el ingreso de radiación directa al ventanal piso-techo.
                </span>
              </div>

              <div className="bg-brand-deep p-3 rounded border border-white/10 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Wind className="w-4 h-4 text-sky-400" />
                  <div>
                    <span className="text-white/80 block text-[11px]">Brisa de Cordillera:</span>
                    <span className="text-[9px] text-white/40">Efecto chimenea en patio</span>
                  </div>
                </div>
                <span className="text-sm font-bold text-sky-300">{windVelocity} m/s</span>
              </div>
            </div>

            {/* 3. Botón de Conclusión Técnica */}
            <div className="pt-2 border-t border-white/10">
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="w-full py-2.5 px-3 bg-brand-surface hover:bg-brand-surface/80 border border-brand-mint/40 text-brand-mint text-xs font-mono rounded flex items-center justify-between transition-colors"
              >
                <span>{showExplanation ? 'Ocultar Fundamento' : 'Ver Fundamento Bioclimático'}</span>
                <ChevronRight className={`w-4 h-4 transition-transform ${showExplanation ? 'rotate-90' : ''}`} />
              </button>

              {showExplanation && (
                <p className="mt-2 text-[10px] font-mono text-white/60 leading-relaxed bg-brand-deep p-2.5 rounded border border-white/5 animate-fade-in">
                  En el Quindío (latitud 4.5° N), el concreto visto fenólico actúa como acumulador de calor diurno y disipador nocturno. Combinado con aleros de 1.80 m y ventilación convectiva, se prescinde en un 100% de sistemas de aire acondicionado.
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
