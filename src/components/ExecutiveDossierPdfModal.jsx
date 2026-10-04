import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Download, Share2, ShieldCheck, MapPin, Ruler, Layers, Calendar, CheckCircle2, Compass } from 'lucide-react';
import { BRANDING_DATA } from '../data/brandingData';
import { useTranslation } from '../hooks/useTranslation';

export const ExecutiveDossierPdfModal = ({ 
  project = null, 
  investmentData = null, 
  onClose,
  onBookProject
}) => {
  const { t, language, translateCategory, translateMaterial } = useTranslation();
  const printAreaRef = useRef(null);

  if (!project && !investmentData) return null;

  const handlePrint = () => {
    window.print();
  };

  // Determine active data source (either project or custom simulator payload)
  const title = project?.title || (investmentData ? `Estructuración Patrimonial · ${investmentData.typologyLabel || 'Proyecto a Medida'}` : 'Dossier Técnico');
  const location = project?.location || 'Armenia / Eje Cafetero, Quindío';
  const area = project?.area || (investmentData?.area ? `${investmentData.area} m²` : '350 m²');
  const typology = project?.typology || project?.category || investmentData?.typologyLabel || 'Residencial Campestre de Alta Gama';
  const year = project?.year || '2024 - 2026';
  const image = project?.coverLocal || '/extracted/arquitecturia/assets/hero-residence-1.jpg';
  const materials = project?.materials || ['Concreto Visto Fenólico', 'Teka Curada de Origen', 'Vidrio Acústico Laminado', 'Piedra Laja Natural'];
  const dossierCode = `SIM-DOS-${(project?.id || 'EST').toUpperCase()}-${new Date().getFullYear()}`;

  // Parametric cost estimate if not provided directly
  const totalCost = investmentData?.totalFormatted || '$1.850.000.000 COP';
  const costM2 = investmentData?.costM2Formatted || '$5.280.000 COP / m²';
  const downPayment = investmentData?.downPaymentFormatted || '$555.000.000 COP (30%)';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex items-center justify-center p-2 sm:p-6 md:p-10 select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="relative w-full max-w-4xl bg-brand-deep border border-brand-mint/30 rounded-[4px] shadow-2xl overflow-hidden flex flex-col my-auto"
        >
          {/* Top Bar Controls (Hidden in Print Mode) */}
          <div className="no-print flex items-center justify-between p-4 sm:p-5 bg-brand-surface border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-mint animate-pulse" />
              <div>
                <span className="font-architectural text-xs font-bold text-white tracking-wider block">
                  DOSSIER TÉCNICO EJECUTIVO
                </span>
                <span className="font-mono text-[10px] text-brand-mint">
                  DOCUMENTO OFICIAL LISTO PARA IMPRESIÓN / EXPORTACIÓN PDF
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-brand-mint text-brand-deep hover:bg-brand-mint-light transition-all font-architectural text-xs font-bold rounded-md shadow-md cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>DESCARGAR / IMPRIMIR PDF</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Document Sheet (Optimized for Screen Preview + Clean Print output) */}
          <div 
            ref={printAreaRef}
            className="printable-dossier p-6 sm:p-12 bg-white text-zinc-900 font-sans space-y-8 max-h-[80vh] overflow-y-auto print:max-h-none print:overflow-visible print:p-0 print:m-0"
          >
            {/* Header: Corporate Atelier ArquitecturIA */}
            <div className="border-b-2 border-zinc-900 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-zinc-900 text-white font-serif font-black flex items-center justify-center text-lg rounded-xs">
                    S
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 uppercase font-serif">
                      ArquitecturIA Atelier
                    </h1>
                    <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block">
                      DIRECCIÓN DE ARQUITECTURA & ESTRUCTURACIÓN PATRIMONIAL
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-zinc-600 font-mono">
                  Sede Atelier: Armenia, Quindío · Eje Cafetero, Colombia · NIT 901.482.910-3
                </p>
              </div>

              <div className="sm:text-right font-mono text-xs">
                <span className="text-[10px] text-zinc-400 block uppercase">CÓDIGO DE EXPEDIENTE:</span>
                <span className="font-bold text-zinc-900 tracking-wider text-sm">{dossierCode}</span>
                <span className="text-[10px] text-zinc-500 block mt-0.5">
                  Fecha de Emisión: {new Date().toLocaleDateString(language === 'EN' ? 'en-US' : language === 'FR' ? 'fr-FR' : 'es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
            </div>

            {/* Title & Core Overview */}
            <div className="space-y-2">
              <div className="inline-block px-2.5 py-1 bg-zinc-100 text-zinc-800 text-[10px] font-mono tracking-widest uppercase font-bold border border-zinc-200">
                MEMORIA TÉCNICA DESCRIPTIVA
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-zinc-900 tracking-tight">
                {title}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-600 pt-1">
                <span className="flex items-center gap-1 font-semibold text-zinc-800">
                  <MapPin className="w-3.5 h-3.5 text-zinc-900" />
                  {location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-semibold text-zinc-800">
                  <Ruler className="w-3.5 h-3.5 text-zinc-900" />
                  {area}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-zinc-700">
                  <Layers className="w-3.5 h-3.5 text-zinc-900" />
                  {typology}
                </span>
              </div>
            </div>

            {/* Master Photo / Render */}
            <div className="aspect-[16/8] sm:aspect-[16/7] w-full overflow-hidden rounded-xs border border-zinc-300 relative bg-zinc-100">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-zinc-900/80 text-white text-[9px] font-mono px-2 py-0.5 rounded-xs">
                REGISTRO VISUAL OFICIAL · ARQUITECTURIA
              </div>
            </div>

            {/* Technical Rigor & Bioclimatic Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xs space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-zinc-900" />
                  RIGOR ESTRUCTURAL & NORMA SISMORRESISTENTE
                </h3>
                <ul className="text-xs text-zinc-700 space-y-2 leading-relaxed">
                  <li><strong>Normativa:</strong> 100% Conforme Código NSR-10 Colombiano.</li>
                  <li><strong>Cimentación:</strong> Zapatas aisladas y vigas de amarre continuas con concreto de alta resistencia ($f'c \ge 28\text{ MPa}$).</li>
                  <li><strong>Bioclimática:</strong> Orientación solar pasiva, ventilación cruzada y manejo térmico de cordillera.</li>
                  <li><strong>Sostenibilidad:</strong> Captación pluvial y bajo impacto en escorrentía superficial.</li>
                </ul>
              </div>

              <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xs space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1.5 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-zinc-900" />
                  ESPECIFICACIÓN MATERIAL NOBLE DE AUTOR
                </h3>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {materials.map((mat, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono bg-white border border-zinc-300 text-zinc-800 px-2.5 py-1 rounded-xs"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-zinc-600 leading-relaxed font-light mt-2">
                  Acabados monolíticos seleccionados para alta perdurabilidad en clima de trópico alto, con envejecimiento noble y bajo costo de mantenimiento.
                </p>
              </div>
            </div>

            {/* Financial & Parametric Investment Summary */}
            <div className="p-5 border-2 border-zinc-900 rounded-xs space-y-4">
              <div className="flex justify-between items-center border-b border-zinc-200 pb-2">
                <span className="font-mono text-xs uppercase font-bold text-zinc-900 tracking-wider">
                  ESTRUCTURACIÓN FINANCIERA & PROYECCIÓN ESTIMADA (COP)
                </span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Valores Paramétricos 2024-2026</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block">INVERSIÓN TOTAL PROYECTADA:</span>
                  <span className="text-lg font-bold text-zinc-900">{totalCost}</span>
                </div>

                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block">VALOR ESTIMADO POR M²:</span>
                  <span className="text-sm font-semibold text-zinc-800">{costM2}</span>
                </div>

                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block">CUOTA INICIAL PLAN DE OBRA:</span>
                  <span className="text-sm font-semibold text-zinc-800">{downPayment}</span>
                </div>
              </div>

              <div className="text-[10px] text-zinc-500 font-mono pt-2 border-t border-zinc-200">
                * Nota: Presupuesto preliminar estructurado según estándares de obra civil de ArquitecturIA. El presupuesto definitivo se suscribe tras levantamiento topográfico y estudio de mecánica de suelos.
              </div>
            </div>

            {/* Official Architectural Signature & QR Seal */}
            <div className="pt-8 border-t border-zinc-300 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6 text-center sm:text-left">
              <div>
                <div className="w-48 border-b-2 border-zinc-900 pb-1 mb-2 font-serif text-lg italic text-zinc-800">
                  ArquitecturIA Atelier
                </div>
                <span className="text-xs font-mono font-bold text-zinc-900 block">
                  DIRECCIÓN DE ARQUITECTURA & CONSTRUCCIÓN
                </span>
                <span className="text-[10px] font-mono text-zinc-500 block">
                  Consejo Profesional Nacional de Arquitectura y Profesiones Auxiliares
                </span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-zinc-100 border border-zinc-200 rounded-xs text-left">
                <div className="w-12 h-12 bg-zinc-900 text-white flex items-center justify-center font-mono text-[8px] p-1 text-center font-bold">
                  SELLO DIGITAL ARQUITECTURIA
                </div>
                <div className="text-[10px] font-mono text-zinc-600">
                  <span className="font-bold text-zinc-900 block">DOCUMENTO CERTIFICADO</span>
                  <span>Verificación Técnica Oficial</span>
                  <span className="block text-zinc-500 mt-0.5">contacto@arquitecturia.co</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Footer for Screen (no-print) */}
          <div className="no-print p-4 sm:p-5 bg-brand-surface border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs font-mono text-white/60">
              ¿Deseas formalizar la viabilidad de este dossier para tu terreno?
            </p>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {onBookProject && (
                <button
                  onClick={() => {
                    onClose();
                    onBookProject(title);
                  }}
                  className="flex-1 sm:flex-none px-6 py-2.5 bg-brand-mint text-brand-deep hover:bg-brand-mint-light font-architectural text-xs font-bold rounded-md transition-colors"
                >
                  AGENDAR ANÁLISIS DE ESTE PROYECTO
                </button>
              )}

              <button
                onClick={onClose}
                className="px-5 py-2.5 border border-white/20 hover:border-brand-mint text-white hover:text-brand-mint font-architectural text-xs rounded-md transition-colors"
              >
                CERRAR
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
