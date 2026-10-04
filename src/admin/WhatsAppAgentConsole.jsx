import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Bot, 
  User, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  RefreshCw, 
  Sparkles, 
  ShieldAlert, 
  ExternalLink,
  MessageCircle,
  HelpCircle,
  Smartphone
} from 'lucide-react';
import { whatsappAgentService } from '../services/whatsappAgentService';
import { storageService } from '../services/storageService';

export const WhatsAppAgentConsole = ({ onAppointmentChanged }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      time: '08:00 AM',
      text: '🏛️ *ArquitecturIA Atelier · Asistente WhatsApp Activo*\n\nHola, soy el agente técnico automatizado del Atelier. Estoy programado para calificar requerimientos de lote, verificar disponibilidad en tiempo real, agendar citas técnicas o cancelar agendas previas.'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [context, setContext] = useState({ step: 'idle', leadData: { name: 'Dr. Roberto Gómez', phone: '+57 312 456 7890' } });
  const [isTyping, setIsTyping] = useState(false);
  const [actionHistory, setActionHistory] = useState([
    { id: 1, time: '08:00 AM', type: 'INIT', desc: 'Motor WhatsApp Bot enlazado con la base de datos' }
  ]);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      time: timeNow,
      text
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const result = whatsappAgentService.processMessage(text, context);
      setIsTyping(false);

      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        time: botTime,
        text: result.reply,
        actionTaken: result.actionTaken
      };

      setMessages(prev => [...prev, botMsg]);
      setContext(result.nextContext || { step: 'idle' });

      // Registrar auditoría si hubo acción
      if (result.actionTaken) {
        setActionHistory(prev => [
          {
            id: Date.now(),
            time: botTime,
            type: result.actionTaken,
            desc: `Acción ejecutada: ${result.actionTaken}`
          },
          ...prev.slice(0, 7)
        ]);

        if (onAppointmentChanged) {
          onAppointmentChanged();
        }
      }
    }, 600);
  };

  const quickPrompts = [
    { label: '📅 ¿Tienen disponibilidad?', text: 'Hola, ¿tienen disponibilidad de citas para esta semana?' },
    { label: '🏡 Agendar con Lote Propio', text: 'Tengo un lote propio escriturado en Circasia de 2.000m² y deseo agendar una cita' },
    { label: '❌ Cancelar mi Cita', text: 'Deseo cancelar mi cita de análisis de proyecto' },
    { label: '💰 Consultar Costos m²', text: '¿Cuánto cuesta el metro cuadrado de construcción campestre?' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* 1. Left Column: Smartphone Simulator */}
      <div className="lg:col-span-7 flex justify-center">
        <div className="w-full max-w-[420px] bg-[#121b22] border-2 border-[#2a3942] rounded-[32px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col h-[680px] ring-1 ring-white/10">
          
          {/* Smartphone Header Bar */}
          <div className="bg-[#202c33] px-4 py-3 border-b border-[#2a3942] flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-brand-surface border border-brand-mint/40 flex items-center justify-center overflow-hidden">
                  <img src="/logo sin fondo.png" alt="ArquitecturIA" className="w-8 h-8 object-contain" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#25D366] border border-[#202c33]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-xs tracking-wide">ArquitecturIA Atelier</span>
                  <span className="text-[10px] bg-[#25D366]/20 text-[#25D366] px-1.5 py-0.2 rounded font-mono">OFICIAL</span>
                </div>
                <span className="text-[10px] text-[#8696a0] block">En línea · Bot Autónomo 24/7</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/573002596855"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 hover:bg-white/10 rounded-full text-[#8696a0] hover:text-[#25D366] transition-colors"
                title="Abrir WhatsApp Web Real"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Prompts Strip */}
          <div className="bg-[#1f2c34] px-3 py-2 border-b border-[#2a3942] flex items-center gap-1.5 overflow-x-auto text-[10px] font-mono">
            <span className="text-[#8696a0] whitespace-nowrap pl-1">Pruebas:</span>
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(p.text)}
                className="px-2.5 py-1 rounded bg-[#2a3942] hover:bg-[#374248] text-brand-mint whitespace-nowrap border border-white/5 transition-all cursor-pointer"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* WhatsApp Message Flow */}
          <div 
            className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs"
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(18,27,34,0.95), #0b141a)',
              backgroundSize: '100% 100%'
            }}
          >
            {messages.map((m) => {
              const isUser = m.sender === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-lg leading-relaxed shadow-md text-xs relative ${
                      isUser
                        ? 'bg-[#005c4b] text-[#e9edef] rounded-tr-none'
                        : 'bg-[#202c33] text-[#d1d7db] rounded-tl-none border border-white/5'
                    }`}
                  >
                    <div className="whitespace-pre-line font-light">
                      {m.text}
                    </div>

                    {/* Badge de acción tomada */}
                    {m.actionTaken && (
                      <div className="mt-2 pt-1.5 border-t border-white/10 flex items-center gap-1 text-[10px] font-mono text-brand-mint font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Sincronizado en base de datos ({m.actionTaken})</span>
                      </div>
                    )}

                    <div className="text-right text-[9px] text-white/40 mt-1 font-mono">
                      {m.time}
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-1.5 bg-[#202c33] text-[#8696a0] px-3.5 py-2 rounded-lg max-w-[120px] text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8696a0] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#8696a0] animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#8696a0] animate-bounce [animation-delay:0.4s]" />
                <span className="text-[10px] ml-1">Escribiendo...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Smartphone Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="bg-[#202c33] p-2.5 border-t border-[#2a3942] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Escribe un mensaje de prueba al bot..."
              className="flex-1 bg-[#2a3942] border border-transparent focus:border-[#00a884] text-xs text-[#e9edef] placeholder-[#8696a0] px-3.5 py-2 rounded-md outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-full bg-[#00a884] hover:bg-[#008f70] text-black disabled:opacity-40 transition-all cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* 2. Right Column: Telemetry, Rules & Audit Log */}
      <div className="lg:col-span-5 space-y-5">
        <div className="bg-brand-surface p-5 border border-white/10 rounded-lg shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-brand-mint" />
              <h3 className="font-architectural text-sm font-bold text-white uppercase tracking-wider">
                Motor del Agente WhatsApp
              </h3>
            </div>
            <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 rounded font-bold">
              ESTADO: EN LÍNEA
            </span>
          </div>

          <p className="text-xs text-white/70 font-light leading-relaxed">
            Este simulador interactúa directamente con el núcleo de datos del Atelier. Puedes pedirle que agende, consulte o cancele citas, y verás cómo el sistema actualiza la agenda automáticamente.
          </p>

          {/* Reglas Operativas Activas */}
          <div className="space-y-2 font-mono text-[11px]">
            <span className="text-white/40 uppercase block text-[10px] tracking-wider">
              Capacidades Autónomas Activadas:
            </span>
            <div className="p-2.5 bg-brand-deep/80 rounded border border-white/5 flex items-start gap-2 text-white/80">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-mint shrink-0 mt-0.5" />
              <span><strong>Calificación de Lote:</strong> Pregunta si el cliente tiene lote propio, ubicación, topografía y área proyectada.</span>
            </div>
            <div className="p-2.5 bg-brand-deep/80 rounded border border-white/5 flex items-start gap-2 text-white/80">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-mint shrink-0 mt-0.5" />
              <span><strong>Agendamiento en Caliente:</strong> Asigna fecha, hora y genera sala de Google Meet automáticamente en el Dashboard.</span>
            </div>
            <div className="p-2.5 bg-brand-deep/80 rounded border border-white/5 flex items-start gap-2 text-white/80">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-mint shrink-0 mt-0.5" />
              <span><strong>Cancelación Autónoma:</strong> Detecta si el cliente desea cancelar y actualiza el estado a "Cancelada" de inmediato.</span>
            </div>
            <div className="p-2.5 bg-brand-deep/80 rounded border border-white/5 flex items-start gap-2 text-white/80">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-mint shrink-0 mt-0.5" />
              <span><strong>Costos Paramétricos NSR-10:</strong> Informa rangos de $4.8M a $8.2M COP/m² según especificación.</span>
            </div>
          </div>
        </div>

        {/* Live Action History Log */}
        <div className="bg-brand-surface p-5 border border-white/10 rounded-lg shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-architectural text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-mint" />
              <span>Bitácora de Acciones en Tiempo Real</span>
            </span>
            <span className="text-[10px] font-mono text-white/40">{actionHistory.length} eventos</span>
          </div>

          <div className="space-y-2 max-h-[220px] overflow-y-auto font-mono text-[10px]">
            {actionHistory.map((item) => (
              <div 
                key={item.id} 
                className="p-2 bg-brand-deep/90 border border-white/5 rounded flex items-center justify-between gap-3 text-white/75"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-mint" />
                  <span className="truncate">{item.desc}</span>
                </div>
                <span className="text-white/40 shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
