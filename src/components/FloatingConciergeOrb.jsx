import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Building2, Volume2, VolumeX, Mic, MicOff, Sparkles, MessageSquare, Radio } from 'lucide-react';
import { PROJECTS_DATA } from '../data/projectsData';
import { storageService } from '../services/storageService';
import { useTranslation } from '../hooks/useTranslation';
import { ArchitecturalVoiceOrb } from './ArchitecturalVoiceOrb';
import { VoiceSoundwaveVisualizer } from './VoiceSoundwaveVisualizer';

export const FloatingConciergeOrb = ({ onNavigateContact, onNavigateProjects, onOpenBooking }) => {
  const { t, language, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleGoToContact = () => {
    if (synthRef.current) synthRef.current.cancel();
    setIsOpen(false);
    if (onNavigateContact) {
      onNavigateContact();
    } else if (onOpenBooking) {
      onOpenBooking();
    } else {
      window.location.hash = '/contacto';
    }
  };
  const [botSettings, setBotSettings] = useState(() => storageService.getChatbotSettings());
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  
  // Voice states (TTS & STT)
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [availableVoices, setAvailableVoices] = useState([]);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  const messagesEndRef = useRef(null);
  const activeUtteranceRef = useRef(null);

  // Pre-load voices on mount and listen to voiceschanged
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) {
        setAvailableVoices(v);
      }
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Subtle architectural chime using Web Audio API
  const playArchitecturalChime = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, ctx.currentTime); // Solfeggio 528 Hz (Transformation / Clarity)
      osc.frequency.exponentialRampToValueAtTime(792, ctx.currentTime + 0.18);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.36);
    } catch (e) {}
  };

  // Text-To-Speech Synthesis with Voice Profile Matching & Bulletproof Audio Engine
  const speakText = (text) => {
    if (!isVoiceEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;

    try {
      // Ensure audio context is active (fixes Chromium background pause bug)
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.cancel();

      // Play soft chime before speaking
      playArchitecturalChime();

      // Sanitize text: remove markdown symbols, asterisks, URLs so it reads naturally
      const cleanText = text
        .replace(/[*_#`~[\]]/g, '')
        .replace(/https?:\/\/\S+/g, 'enlace web de Google Meet')
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = i18n.getSpeechLang();
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // Select preferred voice if available
      const voicesList = availableVoices.length > 0 ? availableVoices : window.speechSynthesis.getVoices();
      if (voicesList.length > 0) {
        const prefix = utterance.lang.slice(0, 2);
        const naturalVoice = voicesList.find(v => 
          v.lang.toLowerCase().startsWith(prefix.toLowerCase()) && 
          (v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('Online') || v.name.includes('Sabina') || v.name.includes('Google') || v.name.includes('Premium'))
        ) || voicesList.find(v => v.lang.toLowerCase().startsWith(prefix.toLowerCase()));

        if (naturalVoice) utterance.voice = naturalVoice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
      };
      utterance.onend = () => {
        setIsSpeaking(false);
        activeUtteranceRef.current = null;
      };
      utterance.onerror = (e) => {
        console.warn('[SpeechSynthesis notice]:', e);
        setIsSpeaking(false);
        activeUtteranceRef.current = null;
      };

      // Persistent reference prevents V8 engine garbage collection mid-speech
      activeUtteranceRef.current = utterance;

      // Delay execution slightly to allow cancel() cleanup to flush on Chromium
      setTimeout(() => {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
        window.speechSynthesis.speak(utterance);
      }, 50);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
      setIsSpeaking(false);
    }
  };

  // Toggle voice recognition (Microphone)
  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert(language === 'EN' ? 'Voice recognition is not supported in this browser.' : language === 'FR' ? 'La reconnaissance vocale n’est pas supportée sur ce navigateur.' : 'El reconocimiento de voz no es compatible con este navegador.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        if (synthRef.current) synthRef.current.cancel();
        recognitionRef.current.lang = i18n.getSpeechLang();
        recognitionRef.current.start();
      } catch (e) {
        setIsListening(false);
      }
    }
  };

  // Quick suggestions generated from translations or custom FAQs
  const quickQuestions = (botSettings.faqs && botSettings.faqs.length > 0 && language === 'ES')
    ? botSettings.faqs.slice(0, 4).map(f => ({ label: f.question.slice(0, 26) + (f.question.length > 26 ? '...' : ''), query: f.question }))
    : [
        { label: t('concierge.quick1') || '¿Cómo radicar un proyecto?', query: t('concierge.quick1') || '¿Cómo radicar mi proyecto en contacto?' },
        { label: t('concierge.quick2') || '¿Cuánto cuesta construir por m²?', query: t('concierge.quick2') || '¿Cuánto cuesta construir por m²?' },
        { label: t('concierge.quick3') || 'Proyectos de Renta Turística', query: t('concierge.quick3') || 'Proyectos de Renta Turística' },
        { label: t('concierge.quick4') || 'Calificar en Contacto', query: t('concierge.quick4') || '¿Cómo funciona la calificación de lote y terreno?' }
      ];

  const handleSend = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { sender: 'user', text, timestamp: currentTime };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      let reply = '';
      const lower = text.toLowerCase();

      // Check trained FAQs if in ES
      const matchedFaq = (language === 'ES' && botSettings.faqs)
        ? botSettings.faqs.find(f => 
            lower.includes(f.question.toLowerCase().slice(0, 15)) ||
            f.question.toLowerCase().includes(lower)
          )
        : null;

      if (matchedFaq) {
        reply = matchedFaq.answer;
      } else if (lower.includes('cita') || lower.includes('analisis') || lower.includes('agendar') || lower.includes('meeting') || lower.includes('rendez-vous') || lower.includes('book') || lower.includes('contacto') || lower.includes('calificar')) {
        reply = t('concierge.replyCita') || 'Para estructurar tu proyecto y evaluar si cuentas con lote propio, topografía y presupuesto, puedes ingresar directamente a nuestra sección de Contacto usando el botón "IR A CONTACTO" aquí abajo o navegando en el menú. Allí radicaremos tu ficha de comisiones para la dirección técnica.';
      } else if (lower.includes('costo') || lower.includes('metro') || lower.includes('m2') || lower.includes('precio') || lower.includes('cost') || lower.includes('price') || lower.includes('coût')) {
        reply = t('concierge.replyCosto') || 'El valor por m² se estructura según topografía, especificación bioclimática y nivel de acabados. En promedio oscila entre $2.8M y $4.2M COP/m². Puedes simularlo en nuestro Simulador de Inversión o pasar a Contacto para calificar tu terreno.';
      } else if (lower.includes('turist') || lower.includes('suite') || lower.includes('renta') || lower.includes('hotel') || lower.includes('hospitality') || lower.includes('hôtelier')) {
        reply = t('concierge.replyTurismo') || 'Diseñamos y construimos eco-resorts y suites de renta corta optimizadas para alta ocupación y retorno operativo en el Eje Cafetero. Puedes calificar tu predio en la sección de Contacto.';
      } else if (lower.includes('nogales') || lower.includes('casa 49') || lower.includes('santa clara') || lower.includes('mirum') || lower.includes('obras') || lower.includes('works') || lower.includes('projets')) {
        reply = t('concierge.replyProjects') || 'Contamos con 24 obras maestras residenciales, campestres e institucionales. Puedes explorar la colección completa en nuestro catálogo fotográfico de alta resolución.';
      } else {
        reply = t('concierge.replyDefault') || 'En ArquitecturIA materializamos arquitectura de alto valor técnico y bioclimático en el Eje Cafetero. Puedes explorar nuestro catálogo de 24 obras o ingresar a Contacto para estructurar tu terreno.';
      }

      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages((prev) => [...prev, { sender: 'concierge', text: reply, timestamp: botTime }]);
      speakText(reply);
    }, 450);
  };

  // Determine current active orb state
  const orbState = isSpeaking ? 'speaking' : isListening ? 'listening' : 'idle';

  return (
    <>
      {/* Floating Trigger Orb (Bottom Right) with Kinetic Gyroscopic Aura */}
      <div className="fixed bottom-6 right-6 z-40 select-none">
        <div className="relative group">
            {/* Tooltip on Hover */}
            <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap bg-brand-deep/95 border border-brand-mint/40 px-3.5 py-1.5 rounded-[4px] text-xs font-architectural text-brand-mint shadow-2xl backdrop-blur-md">
              <span className="font-bold">{t('concierge.agentBadge')}</span>
              <span className="text-white/40 mx-1.5">•</span>
              <span className="text-white/80 font-mono text-[10px]">{t('concierge.activeVoice')}</span>
            </div>

            <div
              onClick={() => {
                if (isOpen && synthRef.current) synthRef.current.cancel();
                const nextOpen = !isOpen;
                setIsOpen(nextOpen);
                if (nextOpen && typeof window !== 'undefined' && window.speechSynthesis) {
                  window.speechSynthesis.resume();
                  const welcomeMsg = messages[0]?.text;
                  if (welcomeMsg) {
                    setTimeout(() => speakText(welcomeMsg), 260);
                  }
                }
              }}
              className="cursor-pointer"
            >
              {isOpen ? (
                <button
                  className="w-13 h-13 rounded-full bg-brand-deep border border-brand-mint/50 text-white flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.9)] hover:border-brand-mint transition-all cursor-pointer"
                  aria-label="Cerrar Concierge"
                >
                  <X className="w-5 h-5 text-brand-mint" strokeWidth={2.5} />
                </button>
              ) : (
                <ArchitecturalVoiceOrb
                  state={orbState}
                  size="sm"
                />
              )}
            </div>
          </div>
        </div>

        {/* Concierge Dialog Window with Living Kinetic Stage */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.94 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="fixed bottom-24 right-4 sm:right-6 z-50 w-[94vw] sm:w-[440px] max-h-[640px] bg-brand-deep/96 backdrop-blur-3xl border border-brand-mint/40 shadow-[0_25px_70px_rgba(0,0,0,0.95)] rounded-[6px] ring-1 ring-white/10 flex flex-col overflow-hidden select-none"
            >
              {/* 1. Kinetic Orb Stage & Header */}
              <div className="relative p-5 bg-gradient-to-b from-brand-surface via-brand-surface/90 to-brand-deep border-b border-white/10 flex flex-col gap-3">
                {/* Top Bar: Telemetry + Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-mint animate-pulse" />
                    <span className="text-[10px] font-mono tracking-widest text-brand-mint uppercase font-semibold">
                      CORTEX VOICE AGENT
                    </span>
                    <span className="text-white/20 text-[10px]">|</span>
                    <span className="text-[10px] font-mono text-white/50">{language}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isVoiceEnabled && (
                      <button
                        onClick={() => {
                          const testMsg = language === 'EN' 
                            ? 'ArquitecturIA architectural voice agent ready.' 
                            : language === 'FR' 
                            ? 'Agent vocal d\'architecture ArquitecturIA prêt.' 
                            : 'Agente de voz arquitectónico ArquitecturIA en línea.';
                          speakText(testMsg);
                        }}
                        className="flex items-center gap-1 px-2 py-1 rounded-[3px] border border-brand-mint/40 text-[9px] font-mono text-brand-mint hover:bg-brand-mint/15 transition-colors cursor-pointer"
                        title={language === 'EN' ? 'Test voice synthesis' : language === 'FR' ? 'Tester la voix' : 'Probar síntesis de voz'}
                      >
                        <Sparkles className="w-3 h-3 text-brand-mint" />
                        <span>{language === 'EN' ? 'TEST' : language === 'FR' ? 'TEST' : 'PROBAR VOZ'}</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        if (isSpeaking && synthRef.current) synthRef.current.cancel();
                        setIsVoiceEnabled(!isVoiceEnabled);
                      }}
                      className={`p-1.5 rounded-[3px] border transition-colors cursor-pointer ${
                        isVoiceEnabled
                          ? 'border-brand-mint/40 text-brand-mint bg-brand-mint/10'
                          : 'border-white/10 text-white/40 hover:text-white'
                      }`}
                      title={isVoiceEnabled ? t('concierge.muteTooltip') : t('concierge.unmuteTooltip')}
                    >
                      {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => {
                        if (synthRef.current) synthRef.current.cancel();
                        setIsOpen(false);
                      }}
                      className="p-1.5 text-white/50 hover:text-white rounded-[3px] hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Center Stage: Living Voice Orb + Soundwave Spectrum */}
                <div className="flex items-center justify-between gap-4 pt-1">
                  <div className="flex items-center gap-3.5">
                    {/* The Living Kinetic Orb */}
                    <ArchitecturalVoiceOrb
                      state={orbState}
                      size="md"
                      onClick={toggleListening}
                    />

                    <div>
                      <h4 className="font-editorial-heading text-lg sm:text-xl text-white leading-tight">
                        {t('concierge.title')}
                      </h4>
                      <div className="text-[11px] font-mono mt-0.5 flex items-center gap-1.5">
                        {isListening ? (
                          <span className="text-amber-300 font-bold flex items-center gap-1">
                            <Radio className="w-3 h-3 animate-spin" />
                            <span>{t('concierge.listeningStatus')}</span>
                          </span>
                        ) : isSpeaking ? (
                          <span className="text-brand-mint font-semibold flex items-center gap-1">
                            <Sparkles className="w-3 h-3 animate-pulse" />
                            <span>{t('concierge.speakingStatus')}</span>
                          </span>
                        ) : (
                          <span className="text-white/60">
                            {t('concierge.subtitle')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Real-time Dynamic Soundwave Visualizer */}
                  <div className="hidden sm:block">
                    <VoiceSoundwaveVisualizer
                      isActive={isSpeaking}
                      isListening={isListening}
                      barsCount={12}
                    />
                  </div>
                </div>
              </div>

              {/* 2. Messages Stream */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5 max-h-[300px] min-h-[220px] bg-brand-deep/80">
                {messages.map((m, idx) => {
                  const isUser = m.sender === 'user';
                  return (
                    <div
                      key={idx}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[88%] p-3.5 rounded-[4px] leading-relaxed text-xs transition-all ${
                          isUser
                            ? 'bg-brand-mint text-brand-deep font-semibold shadow-md'
                            : 'bg-brand-surface/90 border border-white/10 text-white/90 font-light shadow-sm'
                        }`}
                      >
                        <p className="font-body text-xs sm:text-[13px] leading-relaxed">
                          {m.text}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-1 px-1">
                        {m.timestamp && (
                          <span className="text-[9px] font-mono text-white/30">
                            {m.timestamp}
                          </span>
                        )}
                        {!isUser && isVoiceEnabled && (
                          <button
                            onClick={() => speakText(m.text)}
                            className="text-white/30 hover:text-brand-mint p-0.5 rounded cursor-pointer transition-colors"
                            title={language === 'EN' ? 'Replay audio' : language === 'FR' ? 'Réécouter' : 'Reproducir audio'}
                          >
                            <Volume2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* 3. Quick Suggestions Carousel Strip */}
              <div className="px-3.5 py-2.5 bg-brand-surface/70 border-t border-white/10 overflow-x-auto flex items-center gap-2">
                <span className="text-[10px] font-mono text-white/40 uppercase whitespace-nowrap pl-1">
                  {t('concierge.suggestionsLabel')}
                </span>
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q.query)}
                    className="px-2.5 py-1 text-[10px] font-mono bg-white/5 hover:bg-brand-mint/20 border border-white/10 hover:border-brand-mint/50 text-brand-mint rounded-[3px] whitespace-nowrap transition-all cursor-pointer"
                  >
                    {q.label}
                  </button>
                ))}
              </div>

              {/* 4. Direct Action Portal */}
              <div className="px-3.5 py-2.5 bg-brand-deep border-t border-white/10 flex gap-2.5">
                <button
                  onClick={handleGoToContact}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-brand-mint text-brand-deep font-architectural text-xs font-bold tracking-wider rounded-[3px] hover:bg-brand-mint-light transition-all shadow-[0_0_15px_rgba(184,222,216,0.2)] cursor-pointer"
                  title="Ir a la zona de contacto y calificación"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{language === 'EN' ? 'GO TO CONTACT' : language === 'FR' ? 'ALLER À CONTACT' : 'IR A CONTACTO'}</span>
                </button>

                <button
                  onClick={() => {
                    if (synthRef.current) synthRef.current.cancel();
                    setIsOpen(false);
                    onNavigateProjects();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-white/20 hover:border-brand-mint text-white hover:text-brand-mint font-architectural text-xs tracking-wider rounded-[3px] transition-colors cursor-pointer"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{language === 'EN' ? 'CATALOG' : language === 'FR' ? 'CATALOGUE' : 'CATÁLOGO'}</span>
                </button>
              </div>

              {/* 5. Input Bar with High-Grade Mic Controls */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="p-3 bg-brand-surface border-t border-white/10 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={isListening ? t('concierge.micListeningPlaceholder') : t('concierge.inputPlaceholder')}
                  className="flex-1 bg-brand-deep border border-white/15 px-3.5 py-2.5 text-xs font-mono text-white placeholder-white/40 focus:outline-none focus:border-brand-mint rounded-[3px] transition-colors"
                />

                {/* Voice Input Mic Button with Radiant Pulse */}
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`p-2.5 rounded-[3px] border transition-all cursor-pointer ${
                    isListening
                      ? 'bg-amber-400 text-black border-amber-300 animate-pulse shadow-[0_0_16px_rgba(251,191,36,0.8)]'
                      : 'bg-white/5 border-white/15 text-white/70 hover:text-brand-mint hover:border-brand-mint/50'
                  }`}
                  title={t('concierge.micTooltip')}
                  aria-label="Hablar al agente"
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className={`p-2.5 rounded-[3px] transition-all cursor-pointer ${
                    inputText.trim()
                      ? 'bg-brand-mint text-brand-deep hover:bg-brand-mint-light shadow-md'
                      : 'bg-white/10 text-white/30 cursor-not-allowed'
                  }`}
                  aria-label="Enviar mensaje"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
