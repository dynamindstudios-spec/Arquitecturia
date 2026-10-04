// Servicio de Audio Procedural Web Audio API
// ArquitecturIA Atelier · Paisaje Sonoro Bioclimático del Eje Cafetero
// Cero archivos externos · Síntesis procedural pura a 60 FPS

class ProceduralAudioService {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isMuted = false;
    this.isPlaying = false;
    
    // Nodos de sintetizadores
    this.windGain = null;
    this.windFilter = null;
    this.windSource = null;
    
    this.birdsTimer = null;
    this.cricketsGain = null;
    this.cricketsOsc = null;
  }

  // Inicializar contexto bajo interacción del usuario (cumplimiento estricto navegador)
  initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return null;
      this.ctx = new AudioContextClass();
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    return this.ctx;
  }

  // 1. Sintetizador de Brisa de Cordillera (Ruido Rosa con Filtro Resonante)
  startWind(intensity = 0.5) {
    if (!this.initContext() || this.windSource) return;

    // Buffer de ruido rosa procedural (2 segundos en bucle)
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.11; // normalizar
      b6 = white * 0.115926;
    }

    this.windSource = this.ctx.createBufferSource();
    this.windSource.buffer = noiseBuffer;
    this.windSource.loop = true;

    // Filtro paso-banda modelador del viento cordillerano
    this.windFilter = this.ctx.createBiquadFilter();
    this.windFilter.type = 'bandpass';
    this.windFilter.frequency.setValueAtTime(380, this.ctx.currentTime);
    this.windFilter.Q.setValueAtTime(1.8, this.ctx.currentTime);

    this.windGain = this.ctx.createGain();
    const gainVal = Math.min(Math.max(intensity * 0.25, 0.05), 0.35);
    this.windGain.gain.setValueAtTime(gainVal, this.ctx.currentTime);

    this.windSource.connect(this.windFilter);
    this.windFilter.connect(this.windGain);
    this.windGain.connect(this.masterGain);

    this.windSource.start();
  }

  // Modular intensidad del viento en tiempo real
  updateWind(intensity) {
    if (!this.windFilter || !this.windGain || !this.ctx) return;
    const now = this.ctx.currentTime;
    const freq = 240 + intensity * 600;
    const gain = 0.04 + intensity * 0.28;
    this.windFilter.frequency.linearRampToValueAtTime(freq, now + 0.3);
    this.windGain.gain.linearRampToValueAtTime(gain, now + 0.3);
  }

  // 2. Sintetizador de Trinar de Aves Cordilleranas (Quindío Mañanero)
  playBirdChirp() {
    if (!this.initContext() || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    
    // Frecuencias características de colibríes y azulejos andinos
    const baseFreq = 2600 + Math.random() * 800;
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq + 1200 + Math.random() * 600, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(baseFreq - 300, now + 0.16);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  // 3. Sintetizador de Grillos Andinos (Atardecer & Noche)
  startCrickets() {
    if (!this.initContext() || this.cricketsOsc) return;

    const now = this.ctx.currentTime;
    this.cricketsOsc = this.ctx.createOscillator();
    this.cricketsGain = this.ctx.createGain();

    this.cricketsOsc.type = 'triangle';
    this.cricketsOsc.frequency.setValueAtTime(4600, now);

    // Modulador de amplitud LFO para el chirrido
    const lfo = this.ctx.createOscillator();
    lfo.type = 'square';
    lfo.frequency.setValueAtTime(8, now); // 8 pulsos por segundo

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(0.025, now);

    lfo.connect(lfoGain.gain);
    this.cricketsOsc.connect(this.cricketsGain);
    this.cricketsGain.connect(this.masterGain);

    this.cricketsGain.gain.setValueAtTime(0.025, now);
    this.cricketsOsc.start(now);
  }

  stopCrickets() {
    if (this.cricketsOsc) {
      try {
        this.cricketsOsc.stop();
        this.cricketsOsc.disconnect();
      } catch (e) {}
      this.cricketsOsc = null;
      this.cricketsGain = null;
    }
  }

  // 4. Adaptación del Paisaje Sonoro según la Hora Solar (06:00 a 18:00)
  updateSolarTimeAtmosphere(solarHour) {
    if (!this.isPlaying || this.isMuted) return;

    // Viento suave siempre activo
    const windIntensity = 0.3 + Math.sin((solarHour - 6) / 12 * Math.PI) * 0.4;
    this.updateWind(windIntensity);

    // Aves activas preferentemente entre 06:00 y 10:30, y 15:30 y 17:30
    if ((solarHour >= 6 && solarHour <= 10.5) || (solarHour >= 15.5 && solarHour <= 17.5)) {
      if (!this.birdsTimer) {
        this.birdsTimer = setInterval(() => {
          if (this.isPlaying && !this.isMuted && Math.random() > 0.4) {
            this.playBirdChirp();
          }
        }, 2200);
      }
    } else {
      if (this.birdsTimer) {
        clearInterval(this.birdsTimer);
        this.birdsTimer = null;
      }
    }

    // Grillos activos al amanecer temprano (06:00-06:30) y al caer la tarde (17:30-18:00)
    if (solarHour <= 6.5 || solarHour >= 17.5) {
      this.startCrickets();
    } else {
      this.stopCrickets();
    }
  }

  // Activar toda la atmósfera
  startAtmosphere(solarHour = 10) {
    this.initContext();
    this.isPlaying = true;
    this.startWind(0.4);
    this.updateSolarTimeAtmosphere(solarHour);
  }

  // Detener atmósfera
  stopAtmosphere() {
    this.isPlaying = false;
    if (this.birdsTimer) {
      clearInterval(this.birdsTimer);
      this.birdsTimer = null;
    }
    this.stopCrickets();
    if (this.windSource) {
      try {
        this.windSource.stop();
        this.windSource.disconnect();
      } catch (e) {}
      this.windSource = null;
    }
  }

  // Mute / Unmute
  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const target = this.isMuted ? 0 : 0.35;
      this.masterGain.gain.linearRampToValueAtTime(target, this.ctx.currentTime + 0.1);
    }
    return this.isMuted;
  }
}

export const proceduralAudioService = new ProceduralAudioService();
