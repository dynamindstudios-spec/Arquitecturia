import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, Globe, Share2, Bot, Shield, CheckCircle2, Save, Plus, Trash2, 
  RefreshCw, MessageCircle, Instagram, Phone, MapPin, Linkedin, Sparkles, Send
} from 'lucide-react';
import { storageService } from '../services/storageService';
import { atmosphereService } from '../services/atmosphereService';
import { LiveThemeCustomizer } from './LiveThemeCustomizer';

export const AdminSettingsHub = ({ onShowFeedback }) => {
  const [subTab, setSubTab] = useState('atmospheres'); // atmospheres, cms, socials, chatbot, security

  // =========================================================================
  // State: Public Atmosphere
  // =========================================================================
  const [publicAtmosphere, setPublicAtmosphere] = useState(() => storageService.getPublicAtmosphere());

  // =========================================================================
  // State: CMS Data
  // =========================================================================
  const [cmsData, setCmsData] = useState(() => storageService.getCms());

  // =========================================================================
  // State: Social Links
  // =========================================================================
  const [socialLinks, setSocialLinks] = useState(() => storageService.getSocialLinks());

  // =========================================================================
  // State: Chatbot Settings & Live Simulator
  // =========================================================================
  const [chatbotSettings, setChatbotSettings] = useState(() => storageService.getChatbotSettings());
  const [newFaqQuestion, setNewFaqQuestion] = useState('');
  const [newFaqAnswer, setNewFaqAnswer] = useState('');
  const [simTestInput, setSimTestInput] = useState('');
  const [simChatLog, setSimChatLog] = useState([
    { sender: 'bot', text: chatbotSettings.welcomeMessage || 'Hola, soy tu Concierge Arquitectónico ArquitecturIA.' }
  ]);

  // =========================================================================
  // State: Master Security Credentials
  // =========================================================================
  const [newUsername, setNewUsername] = useState('admin');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [credsMsg, setCredsMsg] = useState({ text: '', type: '' });

  // =========================================================================
  // Handlers
  // =========================================================================
  const handleSetAtmosphere = (themeId) => {
    setPublicAtmosphere(themeId);
    storageService.setPublicAtmosphere(themeId);
    atmosphereService.applyAtmosphere(themeId, false);
    onShowFeedback(`Atmósfera oficial del Index fijada a: ${themeId.toUpperCase()}`);
  };

  const handleSaveCms = (e) => {
    e.preventDefault();
    storageService.saveCms(cmsData);
    onShowFeedback('¡Textos y titulares del CMS actualizados en la web!');
  };

  const handleSaveSocials = (e) => {
    e.preventDefault();
    storageService.saveSocialLinks(socialLinks);
    onShowFeedback('¡Canales oficiales y redes sociales sincronizados!');
  };

  const handleSaveChatbot = (e) => {
    e.preventDefault();
    storageService.saveChatbotSettings(chatbotSettings);
    onShowFeedback('¡Entrenamiento y conocimiento del Concierge guardados!');
  };

  const handleAddFaq = () => {
    if (!newFaqQuestion.trim() || !newFaqAnswer.trim()) return;
    const newFaq = {
      id: `faq-${Date.now()}`,
      question: newFaqQuestion.trim(),
      answer: newFaqAnswer.trim()
    };
    const updated = {
      ...chatbotSettings,
      faqs: [...(chatbotSettings.faqs || []), newFaq]
    };
    setChatbotSettings(updated);
    storageService.saveChatbotSettings(updated);
    setNewFaqQuestion('');
    setNewFaqAnswer('');
    onShowFeedback('Nueva pregunta frecuente agregada al entrenamiento.');
  };

  const handleDeleteFaq = (faqId) => {
    const updated = {
      ...chatbotSettings,
      faqs: (chatbotSettings.faqs || []).filter(f => f.id !== faqId)
    };
    setChatbotSettings(updated);
    storageService.saveChatbotSettings(updated);
    onShowFeedback('Pregunta frecuente eliminada.');
  };

  const handleTestChatbot = (e) => {
    e.preventDefault();
    if (!simTestInput.trim()) return;

    const userText = simTestInput.trim();
    const updatedLog = [...simChatLog, { sender: 'user', text: userText }];
    setSimChatLog(updatedLog);
    setSimTestInput('');

    setTimeout(() => {
      let botResponse = '';
      const lower = userText.toLowerCase();

      // Check custom FAQs first
      const matchedFaq = (chatbotSettings.faqs || []).find(f => 
        lower.includes(f.question.toLowerCase().slice(0, 15)) ||
        f.question.toLowerCase().includes(lower)
      );

      if (matchedFaq) {
        botResponse = matchedFaq.answer;
      } else if (lower.includes('costo') || lower.includes('metro') || lower.includes('m2') || lower.includes('precio')) {
        botResponse = `Nuestros proyectos se estructuran entre $${(chatbotSettings.costPerM2Min / 1000000).toFixed(1)}M y $${(chatbotSettings.costPerM2Max / 1000000).toFixed(1)}M COP por m² según nivel de especificación técnica y materiales de autor.`;
      } else if (lower.includes('cita') || lower.includes('analisis') || lower.includes('agendar')) {
        botResponse = 'Con gusto coordinamos una Cita para Análisis de Proyecto. Puedes agendarla de inmediato y recibirás enlace de Google Meet y confirmación automática por WhatsApp.';
      } else {
        botResponse = `${chatbotSettings.systemPrompt ? 'Según los principios de ArquitecturIA: ' : ''}Estructuramos proyectos residenciales, turísticos y comerciales en el Quindío. Puedes agendar tu Cita de Análisis para evaluar tu lote y programa de áreas.`;
      }

      setSimChatLog(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 450);
  };

  const handleUpdateCreds = (e) => {
    e.preventDefault();
    const current = storageService.getCredentials();
    if (currentPassword !== current.password) {
      setCredsMsg({ text: 'La contraseña actual no es correcta.', type: 'error' });
      return;
    }
    if (newPassword.length < 6) {
      setCredsMsg({ text: 'La nueva contraseña debe tener mínimo 6 caracteres.', type: 'error' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setCredsMsg({ text: 'Las nuevas contraseñas no coinciden.', type: 'error' });
      return;
    }

    storageService.updateCredentials(newUsername, newPassword);
    setCredsMsg({ text: '¡Credenciales actualizadas exitosamente!', type: 'success' });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    onShowFeedback('Credenciales maestras actualizadas.');
  };

  return (
    <div className="space-y-8">
      {/* Settings Master Header */}
      <div className="border-b border-white/10 pb-6">
        <span className="text-[10px] font-mono text-brand-mint tracking-widest uppercase font-bold">
          HUB CENTRALIZADO DE CONFIGURACIÓN OPERATIVA
        </span>
        <h2 className="font-editorial-heading text-3xl sm:text-4xl text-white mt-1">
          Configuración del Sistema
        </h2>
        <p className="text-xs font-mono text-white/50 mt-1 max-w-2xl">
          Gobierna la identidad visual del index, los contenidos del CMS, los canales de atención, el entrenamiento del Asesor Virtual y la seguridad maestra en un solo panel de control.
        </p>

        {/* Unified Subtabs Navigation Bar */}
        <div className="flex flex-wrap items-center gap-2 mt-6 p-1.5 bg-brand-surface border border-white/10 rounded-lg">
          {[
            { id: 'atmospheres', label: 'Atmósferas & Tokens', icon: Palette },
            { id: 'cms', label: 'CMS & Zonas Web', icon: Globe },
            { id: 'socials', label: 'Canales Oficiales & Redes', icon: Share2 },
            { id: 'chatbot', label: 'Entrenador del Chatbot', icon: Bot },
            { id: 'security', label: 'Seguridad Master', icon: Shield }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = subTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSubTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-md font-architectural text-xs tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-brand-mint text-brand-deep font-bold shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subtab Content Panels with Smooth Motion Transition */}
      <AnimatePresence mode="wait">
        {/* ========================================================================= */}
        {/* SUBTAB 1: ATMÓSFERAS & TOKENS EN CALIENTE */}
        {/* ========================================================================= */}
        {subTab === 'atmospheres' && (
          <motion.div
            key="atmospheres"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {/* Public Default Atmosphere Selector */}
            <div className="bg-brand-surface border border-white/10 p-6 rounded-lg space-y-4 shadow-xl">
              <div className="border-b border-white/10 pb-3">
                <span className="text-[10px] font-mono text-brand-mint uppercase font-bold">
                  DIRECCIÓN DE ARTE & ATMÓSFERA OFICIAL DEL INDEX
                </span>
                <h3 className="font-editorial-heading text-2xl text-white mt-0.5">
                  Atmósfera Predeterminada para Visitantes Públicos
                </h3>
                <p className="text-xs font-mono text-white/50 mt-1">
                  Define el universo sensorial y la iluminación ambiental que experimenta cualquier cliente al entrar a la web.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {atmosphereService.getAvailable().map((atm) => {
                  const isCurrent = publicAtmosphere === atm.id;
                  const colorBg = atm.id === 'zen' 
                    ? 'from-[#0a0a0a] to-[#0f1f1d]' 
                    : atm.id === 'sunset' 
                    ? 'from-[#0a0a0a] to-[#26170d]' 
                    : 'from-[#0a0a0a] to-[#071f16]';
                  const tag = atm.id === 'zen' ? 'Rigor Arquitectónico' : atm.id === 'sunset' ? 'Teka & Cordillera' : 'Salento & Bio-Zen';
                  return (
                    <button
                      key={atm.id}
                      type="button"
                      onClick={() => handleSetAtmosphere(atm.id)}
                      className={`p-4 rounded-lg text-left border transition-all bg-gradient-to-br ${colorBg} ${
                        isCurrent
                          ? 'border-brand-mint shadow-[0_0_20px_rgba(184,222,216,0.3)] ring-1 ring-brand-mint'
                          : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-black/40 text-white/70">
                          {tag}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] font-mono font-bold text-brand-mint flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> OFICIAL
                          </span>
                        )}
                      </div>

                      <h4 className="font-architectural text-xs font-bold text-white mb-1">
                        {atm.name}
                      </h4>
                      <p className="text-[11px] font-mono text-white/60 leading-relaxed mb-3">
                        {atm.description || atm.subtitle}
                      </p>

                      <div className="flex items-center gap-2 pt-2 border-t border-white/10 text-[10px] font-mono">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: atm.accentHex }} />
                        <span className="text-white/50">{atm.accentHex}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Palette & Token Customizer */}
            <LiveThemeCustomizer />
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* SUBTAB 2: CMS & ZONAS DE LA PÁGINA */}
        {/* ========================================================================= */}
        {subTab === 'cms' && (
          <motion.div
            key="cms"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="max-w-4xl space-y-6"
          >
            <form onSubmit={handleSaveCms} className="space-y-6 bg-brand-surface p-6 sm:p-8 rounded-lg border border-white/10 font-mono text-xs shadow-xl">
              <div className="border-b border-white/10 pb-3">
                <h3 className="font-architectural text-sm font-bold text-white tracking-wider">
                  TEXTOS DEL HERO & DECLARACIONES EDITORIALES
                </h3>
                <p className="text-[11px] text-white/50 mt-0.5">
                  Actualiza los titulares principales del sitio web sin requerir despliegues de código.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-mint mb-1.5">TITULAR PRINCIPAL HERO:</label>
                  <input
                    type="text"
                    value={cmsData.heroTitle || ''}
                    onChange={(e) => setCmsData({ ...cmsData, heroTitle: e.target.value })}
                    className="w-full bg-brand-deep border border-white/15 px-3 py-2.5 text-white rounded-md focus:border-brand-mint"
                  />
                </div>

                <div>
                  <label className="block text-brand-mint mb-1.5">SUBTÍTULO HERO:</label>
                  <input
                    type="text"
                    value={cmsData.heroSubtitle || ''}
                    onChange={(e) => setCmsData({ ...cmsData, heroSubtitle: e.target.value })}
                    className="w-full bg-brand-deep border border-white/15 px-3 py-2.5 text-white rounded-md focus:border-brand-mint"
                  />
                </div>
              </div>

              <div>
                <label className="block text-brand-mint mb-1.5">TAGLINE / PROPÓSITO CENTRAL:</label>
                <textarea
                  rows={2}
                  value={cmsData.tagline || ''}
                  onChange={(e) => setCmsData({ ...cmsData, tagline: e.target.value })}
                  className="w-full bg-brand-deep border border-white/15 p-3 text-white rounded-md focus:border-brand-mint leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-brand-mint mb-1.5">TEXTO PILARES DE CREACIÓN:</label>
                <textarea
                  rows={2}
                  value={cmsData.pillarsSubhead || ''}
                  onChange={(e) => setCmsData({ ...cmsData, pillarsSubhead: e.target.value })}
                  className="w-full bg-brand-deep border border-white/15 p-3 text-white rounded-md focus:border-brand-mint leading-relaxed"
                />
              </div>

              <div className="flex justify-end pt-3 border-t border-white/10">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-brand-mint text-brand-deep font-architectural text-xs font-bold tracking-wider rounded-md hover:bg-brand-mint-light transition-all shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>GUARDAR CAMBIOS EN EL CMS</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* SUBTAB 3: CANALES OFICIALES & REDES */}
        {/* ========================================================================= */}
        {subTab === 'socials' && (
          <motion.div
            key="socials"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="max-w-4xl space-y-6"
          >
            <form onSubmit={handleSaveSocials} className="space-y-6 bg-brand-surface p-6 sm:p-8 rounded-lg border border-white/10 font-mono text-xs shadow-xl">
              <div className="border-b border-white/10 pb-3">
                <h3 className="font-architectural text-sm font-bold text-white tracking-wider">
                  CANALES DE CONTACTO & BOTONES FLOTANTES
                </h3>
                <p className="text-[11px] text-white/50 mt-0.5">
                  Los enlaces configurados aquí se reflejan instantáneamente en el botón flotante de redes, Navbar y Footer.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-mint mb-1.5 flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>ENLACE WHATSAPP CONCIERGE:</span>
                  </label>
                  <input
                    type="text"
                    value={socialLinks.whatsappUrl || ''}
                    onChange={(e) => setSocialLinks({ ...socialLinks, whatsappUrl: e.target.value })}
                    className="w-full bg-brand-deep border border-white/15 px-3 py-2.5 text-white rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-brand-mint mb-1.5 flex items-center gap-1.5">
                    <Instagram className="w-3.5 h-3.5 text-[#DD2A7B]" />
                    <span>URL DE INSTAGRAM OFICIAL:</span>
                  </label>
                  <input
                    type="text"
                    value={socialLinks.instagramUrl || ''}
                    onChange={(e) => setSocialLinks({ ...socialLinks, instagramUrl: e.target.value })}
                    className="w-full bg-brand-deep border border-white/15 px-3 py-2.5 text-white rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-brand-mint mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-brand-mint" />
                    <span>TELÉFONO DE ATENCIÓN / PBX:</span>
                  </label>
                  <input
                    type="text"
                    value={socialLinks.phone || ''}
                    onChange={(e) => setSocialLinks({ ...socialLinks, phone: e.target.value })}
                    className="w-full bg-brand-deep border border-white/15 px-3 py-2.5 text-white rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-brand-mint mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-red-400" />
                    <span>ENLACE GOOGLE MAPS / GPS:</span>
                  </label>
                  <input
                    type="text"
                    value={socialLinks.mapsUrl || ''}
                    onChange={(e) => setSocialLinks({ ...socialLinks, mapsUrl: e.target.value })}
                    className="w-full bg-brand-deep border border-white/15 px-3 py-2.5 text-white rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-brand-mint mb-1.5 flex items-center gap-1.5">
                    <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                    <span>PERFIL LINKEDIN / EMPRESARIAL:</span>
                  </label>
                  <input
                    type="text"
                    value={socialLinks.linkedinUrl || ''}
                    onChange={(e) => setSocialLinks({ ...socialLinks, linkedinUrl: e.target.value })}
                    className="w-full bg-brand-deep border border-white/15 px-3 py-2.5 text-white rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-brand-mint mb-1.5">SEDE PRINCIPAL / CIUDAD:</label>
                  <input
                    type="text"
                    value={socialLinks.address || ''}
                    onChange={(e) => setSocialLinks({ ...socialLinks, address: e.target.value })}
                    className="w-full bg-brand-deep border border-white/15 px-3 py-2.5 text-white rounded-md"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-3 border-t border-white/10">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-brand-mint text-brand-deep font-architectural text-xs font-bold tracking-wider rounded-md hover:bg-brand-mint-light transition-all shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>SINCRONIZAR REDES & CANALES</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* SUBTAB 4: ENTRENADOR DEL CHATBOT / CONCIERGE ARQUITECTÓNICO */}
        {/* ========================================================================= */}
        {subTab === 'chatbot' && (
          <motion.div
            key="chatbot"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Left Column: Trainer Form & FAQs */}
            <div className="lg:col-span-7 space-y-6">
              <form onSubmit={handleSaveChatbot} className="space-y-6 bg-brand-surface p-6 sm:p-8 rounded-lg border border-white/10 font-mono text-xs shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <h3 className="font-architectural text-sm font-bold text-white tracking-wider flex items-center gap-2">
                      <Bot className="w-4 h-4 text-brand-mint" />
                      <span>CONFIGURACIÓN DEL CONCIERGE VIRTUAL</span>
                    </h3>
                    <p className="text-[11px] text-white/50 mt-0.5">
                      Define la personalidad, parámetros de costo y directivas del asistente web.
                    </p>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer text-xs">
                    <span className="text-white/60">Activo:</span>
                    <input
                      type="checkbox"
                      checked={chatbotSettings.enabled !== false}
                      onChange={(e) => setChatbotSettings({ ...chatbotSettings, enabled: e.target.checked })}
                      className="w-4 h-4 rounded border-white/20 text-brand-mint focus:ring-brand-mint"
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-brand-mint mb-1.5">NOMBRE VISUAL DEL AGENTE:</label>
                  <input
                    type="text"
                    value={chatbotSettings.agentName || ''}
                    onChange={(e) => setChatbotSettings({ ...chatbotSettings, agentName: e.target.value })}
                    className="w-full bg-brand-deep border border-white/15 px-3 py-2.5 text-white rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-brand-mint mb-1.5">MENSAJE DE BIENVENIDA:</label>
                  <textarea
                    rows={2}
                    value={chatbotSettings.welcomeMessage || ''}
                    onChange={(e) => setChatbotSettings({ ...chatbotSettings, welcomeMessage: e.target.value })}
                    className="w-full bg-brand-deep border border-white/15 p-3 text-white rounded-md leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-brand-mint mb-1.5">PROMPT DEL SISTEMA / PERSONALIDAD:</label>
                  <textarea
                    rows={3}
                    value={chatbotSettings.systemPrompt || ''}
                    onChange={(e) => setChatbotSettings({ ...chatbotSettings, systemPrompt: e.target.value })}
                    placeholder="Describe el tono, vocabulario y principios que debe seguir el bot..."
                    className="w-full bg-brand-deep border border-white/15 p-3 text-white rounded-md leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-brand-mint mb-1.5">COSTO MÍNIMO ESTIMADO POR M² (COP):</label>
                    <input
                      type="number"
                      value={chatbotSettings.costPerM2Min || 4800000}
                      onChange={(e) => setChatbotSettings({ ...chatbotSettings, costPerM2Min: Number(e.target.value) })}
                      className="w-full bg-brand-deep border border-white/15 px-3 py-2 text-white rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-brand-mint mb-1.5">COSTO MÁXIMO ESTIMADO POR M² (COP):</label>
                    <input
                      type="number"
                      value={chatbotSettings.costPerM2Max || 8200000}
                      onChange={(e) => setChatbotSettings({ ...chatbotSettings, costPerM2Max: Number(e.target.value) })}
                      className="w-full bg-brand-deep border border-white/15 px-3 py-2 text-white rounded-md"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-3 border-t border-white/10">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 bg-brand-mint text-brand-deep font-architectural text-xs font-bold tracking-wider rounded-md hover:bg-brand-mint-light transition-all shadow-lg"
                  >
                    <Save className="w-4 h-4" />
                    <span>GUARDAR ENTRENAMIENTO</span>
                  </button>
                </div>
              </form>

              {/* FAQ Knowledge Base Builder */}
              <div className="bg-brand-surface p-6 sm:p-8 rounded-lg border border-white/10 font-mono text-xs space-y-4 shadow-xl">
                <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                  <h4 className="font-architectural text-xs font-bold text-white tracking-wider">
                    PREGUNTAS FRECUENTES & RESPUESTAS DEL CONCIERGE ({chatbotSettings.faqs?.length || 0})
                  </h4>
                  <span className="text-[10px] text-brand-mint">Base de Conocimiento</span>
                </div>

                {/* FAQ List */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {(chatbotSettings.faqs || []).map((faq) => (
                    <div key={faq.id} className="p-3 bg-brand-deep border border-white/10 rounded-md flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <span className="font-bold text-white block">Q: {faq.question}</span>
                        <p className="text-[11px] text-white/60 leading-relaxed">A: {faq.answer}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteFaq(faq.id)}
                        className="p-1 hover:bg-red-950/40 text-red-400 border border-red-500/20 rounded"
                        title="Eliminar pregunta"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add New FAQ Form */}
                <div className="pt-3 border-t border-white/10 space-y-3">
                  <span className="text-[11px] font-bold text-brand-mint uppercase block">
                    + Añadir Nueva Pregunta & Respuesta:
                  </span>
                  <input
                    type="text"
                    value={newFaqQuestion}
                    onChange={(e) => setNewFaqQuestion(e.target.value)}
                    placeholder="Pregunta del cliente (Ej: ¿Hacen obras fuera de Armenia?)"
                    className="w-full bg-brand-deep border border-white/15 px-3 py-2 text-white rounded-md"
                  />
                  <textarea
                    rows={2}
                    value={newFaqAnswer}
                    onChange={(e) => setNewFaqAnswer(e.target.value)}
                    placeholder="Respuesta oficial que emitirá el Concierge..."
                    className="w-full bg-brand-deep border border-white/15 p-2.5 text-white rounded-md leading-relaxed"
                  />
                  <button
                    type="button"
                    onClick={handleAddFaq}
                    className="px-4 py-2 bg-brand-mint/10 border border-brand-mint/40 hover:bg-brand-mint hover:text-brand-deep text-brand-mint text-xs font-architectural tracking-wider font-bold rounded-md transition-colors flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>AÑADIR A LA BASE DE CONOCIMIENTO</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Live Chatbot Simulator */}
            <div className="lg:col-span-5 bg-brand-surface p-6 rounded-lg border border-brand-mint/30 shadow-2xl flex flex-col justify-between max-h-[680px]">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-architectural text-xs font-bold text-white tracking-wider">
                      SIMULADOR DE CONCIERGE EN VIVO
                    </span>
                  </div>
                  <button
                    onClick={() => setSimChatLog([{ sender: 'bot', text: chatbotSettings.welcomeMessage || 'Hola, soy tu Concierge Arquitectónico.' }])}
                    className="p-1 hover:bg-white/10 text-white/50 hover:text-white rounded"
                    title="Reiniciar chat"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[10px] font-mono text-white/40 mt-1">
                  Prueba las respuestas del asistente con las reglas que acabas de entrenar.
                </p>

                {/* Messages Window */}
                <div className="mt-4 space-y-3 font-mono text-xs max-h-96 overflow-y-auto pr-1">
                  {simChatLog.map((msg, i) => (
                    <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-3 rounded-md leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-brand-mint text-brand-deep font-semibold'
                          : 'bg-brand-deep border border-white/15 text-white/90 font-light'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Input */}
              <form onSubmit={handleTestChatbot} className="pt-4 border-t border-white/10 flex items-center gap-2 mt-4">
                <input
                  type="text"
                  value={simTestInput}
                  onChange={(e) => setSimTestInput(e.target.value)}
                  placeholder="Pregúntale al bot..."
                  className="flex-1 bg-brand-deep border border-white/15 px-3 py-2 text-xs font-mono text-white rounded-md focus:outline-none focus:border-brand-mint"
                />
                <button
                  type="submit"
                  className="p-2 bg-brand-mint text-brand-deep hover:bg-brand-mint-light rounded-md transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* SUBTAB 5: SEGURIDAD MASTER */}
        {/* ========================================================================= */}
        {subTab === 'security' && (
          <motion.div
            key="security"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="max-w-xl bg-brand-surface p-6 sm:p-8 rounded-lg border border-white/10 font-mono text-xs space-y-6 shadow-xl"
          >
            <div className="border-b border-white/10 pb-3">
              <h3 className="font-architectural text-sm font-bold text-white tracking-wider flex items-center gap-2">
                <Shield className="w-4 h-4 text-brand-mint" />
                <span>SEGURIDAD & CREDENCIALES MAESTRAS</span>
              </h3>
              <p className="text-[11px] text-white/50 mt-0.5">
                Actualiza el usuario y contraseña del acceso restringido al DSB.
              </p>
            </div>

            {credsMsg.text && (
              <div className={`p-3 text-xs font-mono rounded-md border ${
                credsMsg.type === 'error'
                  ? 'bg-red-900/30 border-red-500 text-red-200'
                  : 'bg-emerald-900/30 border-emerald-500 text-emerald-200'
              }`}>
                {credsMsg.text}
              </div>
            )}

            <form onSubmit={handleUpdateCreds} className="space-y-4">
              <div>
                <label className="block text-brand-mint mb-1">USUARIO ADMINISTRADOR:</label>
                <input
                  type="text"
                  required
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full bg-brand-deep border border-white/15 px-3 py-2 text-white rounded-md"
                />
              </div>

              <div>
                <label className="block text-brand-mint mb-1">CONTRASEÑA ACTUAL:</label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-brand-deep border border-white/15 px-3 py-2 text-white rounded-md"
                />
              </div>

              <div>
                <label className="block text-brand-mint mb-1">NUEVA CONTRASEÑA (MÍN. 6 CARACTERES):</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-brand-deep border border-white/15 px-3 py-2 text-white rounded-md"
                />
              </div>

              <div>
                <label className="block text-brand-mint mb-1">CONFIRMAR NUEVA CONTRASEÑA:</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-brand-deep border border-white/15 px-3 py-2 text-white rounded-md"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-mint text-brand-deep font-architectural text-xs font-bold rounded-md hover:bg-brand-mint-light transition-colors shadow-lg"
              >
                GUARDAR NUEVAS CREDENCIALES
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
