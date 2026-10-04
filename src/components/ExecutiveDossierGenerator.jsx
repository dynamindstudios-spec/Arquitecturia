import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { dossierPdfService } from '../services/dossierPdfService';

/**
 * ExecutiveDossierGenerator.jsx
 * ArquitecturIA Atelier · Cuaderno de Obra & Memoria Técnica BIM de 8 Páginas
 * Renderiza un documento editorial de alta resolución optimizado para visualización y @media print (A4).
 */
export default function ExecutiveDossierGenerator({ isOpen, onClose, leadData }) {
  const contentRef = useRef(null);
  const dossier = dossierPdfService.buildDossierPayload(leadData || {});

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-black/85 backdrop-blur-md p-2 sm:p-6 print:p-0 print:bg-white print:static print:z-auto">
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            @page { size: A4 portrait; margin: 0; }
            body { background: #fff !important; color: #000 !important; }
            .a4-page-break { page-break-after: always !important; break-after: page !important; }
          }
        `}} />

        {/* Barra de herramientas flotante (Oculta en impresión) */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[130] flex items-center gap-3 bg-[#161616]/95 border border-[#333] px-5 py-2.5 rounded-full shadow-2xl backdrop-blur-md print:hidden"
        >
          <div className="flex items-center gap-2 pr-3 border-r border-[#333]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#aaa]">Dossier BIM · 8 Páginas</span>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-[#d4af37] hover:bg-[#c5a028] text-black font-semibold text-xs tracking-wider uppercase px-4 py-1.5 rounded-full transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Imprimir / Guardar PDF
          </button>

          <button
            onClick={onClose}
            className="text-[#888] hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            title="Cerrar ventana"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>

        {/* Contenedor Imprimible de 8 Páginas (Formato A4 Suizo) */}
        <div 
          ref={contentRef} 
          className="w-full max-w-[210mm] mt-16 mb-12 space-y-8 print:space-y-0 print:m-0 print:w-full print:max-w-none text-[#222]"
        >
          {/* ========================================================================= */}
          {/* PÁGINA 1: PORTADA EDITORIAL */}
          {/* ========================================================================= */}
          <div className="bg-[#fcfbf9] min-h-[297mm] p-12 sm:p-16 flex flex-col justify-between border border-[#e5e0d8] shadow-2xl relative print:border-none print:shadow-none print:min-h-screen a4-page-break break-after-page print:page-break-after-always">
            {/* Header Portada */}
            <div className="flex items-start justify-between border-b border-[#333] pb-6">
              <div>
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#666]">Expediente Técnico de Viabilidad</span>
                <h2 className="text-xl font-bold tracking-tight text-[#111] uppercase mt-1">ARQUITECTURIA ATELIER</h2>
              </div>
              <div className="text-right font-mono text-[11px] text-[#666]">
                <p className="font-semibold text-[#111]">{dossier.metadata.radId}</p>
                <p>{dossier.metadata.dateStr}</p>
              </div>
            </div>

            {/* Centro Editorial */}
            <div className="my-auto py-12 space-y-6">
              <div className="inline-block px-3 py-1 bg-[#111] text-[#fcfbf9] font-mono text-[10px] uppercase tracking-widest">
                Documento Reservado · Uso Exclusivo de Proyecto
              </div>
              <h1 className="text-4xl sm:text-5xl font-serif text-[#111] leading-[1.15] tracking-tight">
                {dossier.page1_cover.title}
              </h1>
              <p className="text-lg text-[#555] font-light max-w-xl leading-relaxed">
                {dossier.page1_cover.subtitle}
              </p>

              <div className="pt-8 border-t border-[#ddd] grid grid-cols-2 gap-6 text-sm">
                <div>
                  <span className="font-mono text-[10px] uppercase text-[#777] block">Titular del Proyecto</span>
                  <span className="font-serif text-lg text-[#111] font-semibold">{dossier.metadata.clientName}</span>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase text-[#777] block">Emplazamiento Territorial</span>
                  <span className="font-serif text-lg text-[#111] font-semibold">{dossier.page2_territory.lotLocation}</span>
                </div>
              </div>
            </div>

            {/* Footer Portada */}
            <div className="border-t border-[#333] pt-6 flex items-end justify-between text-xs font-mono text-[#666]">
              <div>
                <p>Armenia, Quindío · Cordillera Central</p>
                <p>Coordenadas: {dossier.metadata.gps} · {dossier.metadata.altitude}</p>
              </div>
              <div className="text-right">
                <p>Norma Sísmica Colombiana NSR-10 · Título A-K</p>
                <p className="font-bold text-[#111]">Pág. 01 / 08</p>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* PÁGINA 2: TERRITORIO Y GEOTECNIA */}
          {/* ========================================================================= */}
          <div className="bg-[#fcfbf9] min-h-[297mm] p-12 sm:p-16 flex flex-col justify-between border border-[#e5e0d8] shadow-2xl relative print:border-none print:shadow-none print:min-h-screen a4-page-break break-after-page print:page-break-after-always">
            <div>
              <div className="flex justify-between items-baseline border-b border-[#ddd] pb-4 mb-8">
                <span className="font-mono text-xs uppercase tracking-widest text-[#777]">{dossier.page2_territory.title}</span>
                <span className="font-mono text-xs text-[#999]">{dossier.metadata.radId}</span>
              </div>

              <h2 className="text-2xl font-serif font-bold text-[#111] mb-6">Diagnóstico Geotécnico & Vulnerabilidad Sísmica</h2>
              
              <div className="grid grid-cols-2 gap-6 mb-8 text-sm">
                <div className="bg-white p-5 border border-[#e0dad0]">
                  <span className="font-mono text-[10px] uppercase text-[#777] block mb-1">Estratigrafía del Suelo</span>
                  <p className="font-semibold text-[#111]">{dossier.page2_territory.soilType}</p>
                  <p className="text-xs text-[#666] mt-2">Suelo volcánico de alta porosidad con susceptibilidad a degradación por escorrentía rápida.</p>
                </div>
                <div className="bg-white p-5 border border-[#e0dad0]">
                  <span className="font-mono text-[10px] uppercase text-[#777] block mb-1">Capacidad Portante Estimada</span>
                  <p className="font-semibold text-[#111] font-mono">{dossier.page2_territory.bearingCapacity}</p>
                  <p className="text-xs text-[#666] mt-2">Requiere cimentación corrida con vigas de amarre perimetrales profundas.</p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-[#444] leading-relaxed">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#111] font-bold">Parámetros de Aceleración Sísmica (NSR-10 Título A)</h3>
                <div className="border border-[#e0dad0] overflow-hidden">
                  <table className="w-full text-left font-mono text-xs">
                    <thead className="bg-[#f2efe9] text-[#333]">
                      <tr>
                        <th className="p-3 border-b border-[#ddd]">Variable</th>
                        <th className="p-3 border-b border-[#ddd]">Valor Normativo</th>
                        <th className="p-3 border-b border-[#ddd]">Criterio de Diseño</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#eee]">
                      <tr>
                        <td className="p-3">Aa (Aceleración pico horizontal)</td>
                        <td className="p-3 font-bold text-[#111]">0.25 g</td>
                        <td className="p-3 text-[#666]">Zona de Amenaza Sísmica Alta</td>
                      </tr>
                      <tr>
                        <td className="p-3">Av (Aceleración pico vertical)</td>
                        <td className="p-3 font-bold text-[#111]">0.25 g</td>
                        <td className="p-3 text-[#666]">Respuesta a ondas superficiales cordilleranas</td>
                      </tr>
                      <tr>
                        <td className="p-3">Coeficiente de Importancia (I)</td>
                        <td className="p-3 font-bold text-[#111]">1.00</td>
                        <td className="p-3 text-[#666]">Grupo de Uso I (Vivienda Unifamiliar)</td>
                      </tr>
                      <tr>
                        <td className="p-3">Deriva Máxima de Entrepiso</td>
                        <td className="p-3 font-bold text-emerald-800">≤ 1.0%</td>
                        <td className="p-3 text-[#666]">Control de deformación inelástica severa</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-[#666] italic mt-4">
                  * Nota: El estudio geotécnico definitivo en obra requerirá mínimo 3 sondeos a percusión con SPT hasta estrato competente.
                </p>
              </div>
            </div>

            <div className="border-t border-[#ddd] pt-4 flex justify-between text-xs font-mono text-[#888]">
              <span>ARQUITECTURIA · DEPARTAMENTO DE INGENIERÍA ESTRUCTURAL</span>
              <span>Pág. 02 / 08</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* PÁGINA 3: PROGRAMA ARQUITECTÓNICO & BALANCE DE ÁREAS */}
          {/* ========================================================================= */}
          <div className="bg-[#fcfbf9] min-h-[297mm] p-12 sm:p-16 flex flex-col justify-between border border-[#e5e0d8] shadow-2xl relative print:border-none print:shadow-none print:min-h-screen a4-page-break break-after-page print:page-break-after-always">
            <div>
              <div className="flex justify-between items-baseline border-b border-[#ddd] pb-4 mb-8">
                <span className="font-mono text-xs uppercase tracking-widest text-[#777]">{dossier.page3_program.title}</span>
                <span className="font-mono text-xs text-[#999]">{dossier.metadata.radId}</span>
              </div>

              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-[#111]">Distribución Paramétrica de Superficies</h2>
                  <p className="text-sm text-[#666]">Configuración de recintos para {dossier.metadata.clientName}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs text-[#777] uppercase block">Área Total Construida</span>
                  <span className="font-mono text-3xl font-bold text-[#111]">{dossier.page3_program.totalArea}</span>
                </div>
              </div>

              <div className="border border-[#e0dad0] overflow-hidden mb-8">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-[#f2efe9] text-[#333]">
                    <tr>
                      <th className="p-3.5 border-b border-[#ddd]">Ambiente Funcional</th>
                      <th className="p-3.5 border-b border-[#ddd] text-right">Metraje (m²)</th>
                      <th className="p-3.5 border-b border-[#ddd] text-right">% Huella</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eee] text-sm">
                    {dossier.page3_program.areas.map((row, idx) => (
                      <tr key={idx} className="hover:bg-white/50">
                        <td className="p-3.5 text-[#222] font-sans font-medium">{row.space}</td>
                        <td className="p-3.5 text-right font-mono font-bold text-[#111]">{row.m2}</td>
                        <td className="p-3.5 text-right font-mono text-[#666]">{row.pct}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-white p-6 border border-[#e0dad0] space-y-3">
                <h4 className="font-mono text-xs uppercase tracking-wider text-[#111] font-bold">Criterio de Zonificación & Privacidad</h4>
                <p className="text-xs text-[#555] leading-relaxed font-sans">
                  El esquema arquitectónico segrega las áreas sociales (volúmenes de doble altura con orientación hacia el paisaje cordillerano) de las alas de descanso privadas. Las galerías de circulación integran patios interiores de ventilación pasiva, permitiendo una transición climática amortiguada sin recurrir a equipos de aire acondicionado mecánicos.
                </p>
              </div>
            </div>

            <div className="border-t border-[#ddd] pt-4 flex justify-between text-xs font-mono text-[#888]">
              <span>ARQUITECTURIA · PROGRAMACIÓN ESPACIAL</span>
              <span>Pág. 03 / 08</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* PÁGINA 4: ESPECIFICACIONES DE MATERIALES NOBLES */}
          {/* ========================================================================= */}
          <div className="bg-[#fcfbf9] min-h-[297mm] p-12 sm:p-16 flex flex-col justify-between border border-[#e5e0d8] shadow-2xl relative print:border-none print:shadow-none print:min-h-screen a4-page-break break-after-page print:page-break-after-always">
            <div>
              <div className="flex justify-between items-baseline border-b border-[#ddd] pb-4 mb-8">
                <span className="font-mono text-xs uppercase tracking-widest text-[#777]">{dossier.page4_envelope.title}</span>
                <span className="font-mono text-xs text-[#999]">{dossier.metadata.radId}</span>
              </div>

              <h2 className="text-2xl font-serif font-bold text-[#111] mb-6">Paleta Material Autóctona & Desempeño Térmico</h2>

              <div className="space-y-4">
                {dossier.page4_envelope.materials.map((mat, idx) => (
                  <div key={idx} className="bg-white p-5 border border-[#e0dad0] flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1">
                      <span className="font-mono text-xs font-bold text-[#997a15] uppercase tracking-wider">{mat.name}</span>
                      <p className="text-xs text-[#444] font-sans leading-relaxed">{mat.specs}</p>
                    </div>
                    <div className="sm:text-right shrink-0">
                      <span className="font-mono text-[10px] text-[#888] uppercase block">Origen & Trazabilidad</span>
                      <span className="font-mono text-xs font-medium text-[#111] bg-[#f4f1ec] px-2 py-1 rounded inline-block mt-0.5">
                        {mat.origin}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-5 bg-[#faf7f2] border-l-4 border-[#d4af37] text-xs text-[#555] leading-relaxed">
                <strong className="text-[#111] font-mono uppercase block mb-1">Compromiso de Baja Huella de Carbono</strong>
                Todos los agregados pétreos provienen de canteras certificadas en la cuenca del Río La Vieja, y el 100% de la madera estructural o de recubrimiento cuenta con salvoconducto de movilización expedido por la Corporación Autónoma Regional del Quindío (CRQ).
              </div>
            </div>

            <div className="border-t border-[#ddd] pt-4 flex justify-between text-xs font-mono text-[#888]">
              <span>ARQUITECTURIA · ESPECIFICACIONES CONSTRUCTIVAS</span>
              <span>Pág. 04 / 08</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* PÁGINA 5: CRONOGRAMA & TÍTULOS NSR-10 */}
          {/* ========================================================================= */}
          <div className="bg-[#fcfbf9] min-h-[297mm] p-12 sm:p-16 flex flex-col justify-between border border-[#e5e0d8] shadow-2xl relative print:border-none print:shadow-none print:min-h-screen a4-page-break break-after-page print:page-break-after-always">
            <div>
              <div className="flex justify-between items-baseline border-b border-[#ddd] pb-4 mb-8">
                <span className="font-mono text-xs uppercase tracking-widest text-[#777]">{dossier.page5_nsr10.title}</span>
                <span className="font-mono text-xs text-[#999]">{dossier.metadata.radId}</span>
              </div>

              <h2 className="text-2xl font-serif font-bold text-[#111] mb-6">Secuencia Constructiva & Hitos de Inspección Técnica</h2>

              <div className="space-y-4 mb-8">
                {dossier.page5_nsr10.milestones.map((m, idx) => (
                  <div key={idx} className="bg-white p-4 border border-[#e0dad0] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="w-8 h-8 rounded-full bg-[#111] text-[#fcfbf9] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        0{idx + 1}
                      </span>
                      <div>
                        <h4 className="font-serif font-bold text-sm text-[#111]">{m.phase}</h4>
                        <p className="font-mono text-[11px] text-[#666]">{m.nsr10Chapter}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-xs font-bold text-[#111] bg-[#f2efe9] px-3 py-1 rounded">
                        {m.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white p-5 border border-[#e0dad0]">
                <h4 className="font-mono text-xs uppercase tracking-wider text-[#111] font-bold mb-2">Comité Técnico Asignado</h4>
                <div className="grid grid-cols-2 gap-4 text-xs font-mono text-[#555]">
                  <div>
                    <span className="text-[#888] block">Dirección de Proyecto:</span>
                    <strong className="text-[#111]">Atelier ArquitecturIA</strong>
                  </div>
                  <div>
                    <span className="text-[#888] block">Ingeniería Estructural NSR-10:</span>
                    <strong className="text-[#111]">Especialista Calculista Certificado</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[#ddd] pt-4 flex justify-between text-xs font-mono text-[#888]">
              <span>ARQUITECTURIA · PROGRAMACIÓN DE OBRA</span>
              <span>Pág. 05 / 08</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* PÁGINA 6: FLUJO DE CAJA & ESTRUCTURACIÓN FINANCIERA */}
          {/* ========================================================================= */}
          <div className="bg-[#fcfbf9] min-h-[297mm] p-12 sm:p-16 flex flex-col justify-between border border-[#e5e0d8] shadow-2xl relative print:border-none print:shadow-none print:min-h-screen a4-page-break break-after-page print:page-break-after-always">
            <div>
              <div className="flex justify-between items-baseline border-b border-[#ddd] pb-4 mb-8">
                <span className="font-mono text-xs uppercase tracking-widest text-[#777]">{dossier.page6_budget.title}</span>
                <span className="font-mono text-xs text-[#999]">{dossier.metadata.radId}</span>
              </div>

              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-[#111]">Inversión Estimada & Hitos Fiduciarios</h2>
                  <p className="text-sm text-[#666]">Rango Paramétrico de Ejecución Integral</p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs text-[#777] uppercase block">Presupuesto Objetivo</span>
                  <span className="font-mono text-xl font-bold text-[#997a15]">{dossier.page6_budget.tier}</span>
                </div>
              </div>

              <div className="border border-[#e0dad0] overflow-hidden mb-8">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-[#f2efe9] text-[#333]">
                    <tr>
                      <th className="p-3.5 border-b border-[#ddd]">Concepto de Desembolso</th>
                      <th className="p-3.5 border-b border-[#ddd] text-right">% Cuota</th>
                      <th className="p-3.5 border-b border-[#ddd]">Condición de Giro</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eee] text-xs">
                    {dossier.page6_budget.breakdown.map((row, idx) => (
                      <tr key={idx} className="hover:bg-white/50">
                        <td className="p-3.5 font-sans font-medium text-[#222]">{row.concept}</td>
                        <td className="p-3.5 text-right font-mono font-bold text-[#111]">{row.pct}</td>
                        <td className="p-3.5 text-[#666]">{row.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-5 bg-white border border-[#e0dad0] text-xs text-[#555] space-y-2">
                <p className="font-mono uppercase font-bold text-[#111]">Modalidad de Contratación: Administración Delegada con Honorarios Fijos</p>
                <p>
                  Transparencia radical: todos los pagos a proveedores de concreto, acero y mano de obra se auditan a libro abierto con corte quincenal de nómina e informes fotográficos de avance.
                </p>
              </div>
            </div>

            <div className="border-t border-[#ddd] pt-4 flex justify-between text-xs font-mono text-[#888]">
              <span>ARQUITECTURIA · MODELADO ECONÓMICO</span>
              <span>Pág. 06 / 08</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* PÁGINA 7: ESTUDIO SOLAR & BIOCLIMÁTICA */}
          {/* ========================================================================= */}
          <div className="bg-[#fcfbf9] min-h-[297mm] p-12 sm:p-16 flex flex-col justify-between border border-[#e5e0d8] shadow-2xl relative print:border-none print:shadow-none print:min-h-screen a4-page-break break-after-page print:page-break-after-always">
            <div>
              <div className="flex justify-between items-baseline border-b border-[#ddd] pb-4 mb-8">
                <span className="font-mono text-xs uppercase tracking-widest text-[#777]">{dossier.page7_solar.title}</span>
                <span className="font-mono text-xs text-[#999]">{dossier.metadata.radId}</span>
              </div>

              <h2 className="text-2xl font-serif font-bold text-[#111] mb-6">Orientación Solar, Vientos Anabáticos & Sombra Proyectada</h2>

              <div className="grid grid-cols-2 gap-6 mb-8 text-xs font-mono">
                <div className="bg-white p-5 border border-[#e0dad0]">
                  <span className="text-[#888] block uppercase text-[10px]">Heliodón Armenia (Lat 4.54°N)</span>
                  <p className="text-sm font-bold text-[#111] mt-1">{dossier.page7_solar.azimuthWinter}</p>
                  <p className="text-[#666] font-sans text-xs mt-2">Protección mediante aleros de 2.20 m con inclinación descendente de 12°.</p>
                </div>
                <div className="bg-white p-5 border border-[#e0dad0]">
                  <span className="text-[#888] block uppercase text-[10px]">Ventilación Convectiva Cruzada</span>
                  <p className="text-sm font-bold text-[#111] mt-1">{dossier.page7_solar.ventilationAxis}</p>
                  <p className="text-[#666] font-sans text-xs mt-2">Refrigeración pasiva por efecto chimenea en coronamiento cenital.</p>
                </div>
              </div>

              <div className="bg-white p-6 border border-[#e0dad0] space-y-4">
                <h4 className="font-mono text-xs uppercase tracking-wider text-[#111] font-bold">Simulación de Confort Higrotérmico</h4>
                <div className="h-40 bg-[#f4f1ec] border border-[#e0dad0] flex items-center justify-center text-center p-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-[#777]">Diagrama de Trayectoria Solar Quindío</span>
                    <p className="font-serif text-lg text-[#111]">Zona de Confort Natural: 19°C – 23°C (94% del año)</p>
                    <p className="text-xs text-[#666] font-mono">Cero necesidad de climatización forzada · Huella Térmica Neutra</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[#ddd] pt-4 flex justify-between text-xs font-mono text-[#888]">
              <span>ARQUITECTURIA · ANÁLISIS SOLAR BIOCLIMÁTICO</span>
              <span>Pág. 07 / 08</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* PÁGINA 8: CIERRE EJECUTIVO, RADICACIÓN & FIRMAS */}
          {/* ========================================================================= */}
          <div className="bg-[#fcfbf9] min-h-[297mm] p-12 sm:p-16 flex flex-col justify-between border border-[#e5e0d8] shadow-2xl relative print:border-none print:shadow-none print:min-h-screen">
            <div>
              <div className="flex justify-between items-baseline border-b border-[#ddd] pb-4 mb-8">
                <span className="font-mono text-xs uppercase tracking-widest text-[#777]">{dossier.page8_signoff.title}</span>
                <span className="font-mono text-xs text-[#999]">{dossier.metadata.radId}</span>
              </div>

              <h2 className="text-2xl font-serif font-bold text-[#111] mb-6">Declaración de Viabilidad & Sello de Autenticidad</h2>

              <div className="bg-white p-6 border border-[#e0dad0] mb-8 space-y-4 text-xs font-sans text-[#444] leading-relaxed">
                <p>
                  El presente documento certifica que el anteproyecto radicado bajo el código <strong>{dossier.metadata.radId}</strong> ha sido pre-calificado favorablemente por el equipo técnico de ArquitecturIA Atelier. La solución volumétrica planteada responde rigurosamente a las condiciones geográficas y morfológicas del Quindío, respetando la totalidad de los parámetros de sismorresistencia NSR-10.
                </p>
                <p className="font-mono text-[11px] text-[#666]">
                  Hash de Verificación Técnica: <span className="font-bold text-[#111]">{dossier.page8_signoff.hash}</span>
                </p>
              </div>

              {/* Bloque de Firmas */}
              <div className="grid grid-cols-2 gap-12 pt-8 border-t border-[#ddd]">
                <div className="space-y-4">
                  <div className="h-16 border-b border-[#333] flex items-end pb-2">
                    <span className="font-serif italic text-lg text-[#111]">Atelier ArquitecturIA</span>
                  </div>
                  <div>
                    <p className="font-mono text-xs font-bold text-[#111]">Dirección de Proyectos</p>
                    <p className="font-mono text-[10px] text-[#777]">ArquitecturIA Atelier S.A.S.</p>
                    <p className="font-mono text-[10px] text-[#777]">Matrícula Profesional Vigente</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="h-16 border-b border-[#333] flex items-end pb-2">
                    <span className="font-serif italic text-lg text-[#111]">{dossier.metadata.clientName}</span>
                  </div>
                  <div>
                    <p className="font-mono text-xs font-bold text-[#111]">Titular / Inversionista</p>
                    <p className="font-mono text-[10px] text-[#777]">Aceptación de Estudio Preliminar</p>
                    <p className="font-mono text-[10px] text-[#777]">Fecha: {dossier.metadata.dateStr}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[#333] pt-6 flex items-end justify-between text-xs font-mono text-[#666]">
              <div>
                <p>ArquitecturIA Atelier · Armenia, Quindío</p>
                <p>www.arquitecturia.co · contacto@arquitecturia.co</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-[#111] block">EXPEDIENTE COMPLETO · 8 PÁGINAS</span>
                <span>Pág. 08 / 08</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
