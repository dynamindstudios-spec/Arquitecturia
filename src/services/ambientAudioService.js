// Ambient Audio Service using Web Audio API for 3 procedural soundscapes
// Zero external MP3 files, 100% reactive, ultra-lightweight

let audioCtx = null;
let activeSourceNode = null;
let gainNode = null;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gainNode.connect(audioCtx.destination);
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

export const ambientAudioService = {
  stop: () => {
    if (activeSourceNode) {
      try {
        activeSourceNode.stop();
        activeSourceNode.disconnect();
      } catch (e) {
        // ignore
      }
      activeSourceNode = null;
    }
  },

  setVolume: (val) => { // 0 to 1
    if (gainNode && audioCtx) {
      gainNode.gain.setValueAtTime(val * 0.25, audioCtx.currentTime);
    }
  },

  playZenSolfeggio: () => {
    initAudio();
    ambientAudioService.stop();

    // 528 Hz Solfeggio tone with gentle vibrato and soft overtone
    const osc = audioCtx.createOscillator();
    const lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(528, audioCtx.currentTime);

    lfo.frequency.setValueAtTime(0.2, audioCtx.currentTime); // 0.2 Hz slow breath
    lfoGain.gain.setValueAtTime(2.5, audioCtx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, audioCtx.currentTime);

    osc.connect(filter);
    filter.connect(gainNode);

    osc.start();
    lfo.start();

    activeSourceNode = {
      stop: () => {
        try {
          osc.stop();
          lfo.stop();
        } catch (e) {}
      }
    };
  },

  playRainSound: () => {
    initAudio();
    ambientAudioService.stop();

    // Pink / White noise generator with low-pass filtering simulating rain on glass
    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99 * b0 + white * 0.05;
      b1 = 0.95 * b1 + white * 0.08;
      b2 = 0.90 * b2 + white * 0.12;
      output[i] = (b0 + b1 + b2) * 0.5;
    }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, audioCtx.currentTime);
    filter.Q.setValueAtTime(0.8, audioCtx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(gainNode);

    whiteNoise.start();
    activeSourceNode = whiteNoise;
  },

  playWindSound: () => {
    initAudio();
    ambientAudioService.stop();

    // Low resonance mountain breeze
    const bufferSize = audioCtx.sampleRate * 3;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.4;
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(280, audioCtx.currentTime);

    noise.connect(filter);
    filter.connect(gainNode);

    noise.start();
    activeSourceNode = noise;
  }
};
