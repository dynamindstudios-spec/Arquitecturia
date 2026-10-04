import React, { useState } from 'react';
import { ArrowRight, FileText } from 'lucide-react';
import { Reveal } from './Reveal';
import { AnimatedPriceCounter } from './AnimatedPriceCounter';
import { ExecutiveDossierPdfModal } from './ExecutiveDossierPdfModal';
import { useTranslation } from '../hooks/useTranslation';

export const InvestmentSimulator = ({ onOpenBooking }) => {
  const { t } = useTranslation();
  const [typology, setTypology] = useState('Residencial');
  const [area, setArea] = useState(380);
  const [finishLevel, setFinishLevel] = useState('signature'); // high, signature, ultra
  const [downPaymentPercent, setDownPaymentPercent] = useState(30);
  const [showDossierPdf, setShowDossierPdf] = useState(false);

  // Price per m² according to typology and finish
  const pricePerM2Map = {
    high: { Residencial: 4800000, Turismo: 5400000, Comercial: 5100000 },
    signature: { Residencial: 6200000, Turismo: 6900000, Comercial: 6500000 },
    ultra: { Residencial: 8200000, Turismo: 9100000, Comercial: 8600000 }
  };

  const currentPricePerM2 = pricePerM2Map[finishLevel][typology];
  const totalCost = area * currentPricePerM2;
  const downPayment = totalCost * (downPaymentPercent / 100);
  const remaining = totalCost - downPayment;
  const monthlyInstallment = remaining / 24; // 24 months construction term
  const projectedAppreciation = totalCost * 0.28; // 28% estimated capital gain
  const estimatedDeliveryValue = totalCost + projectedAppreciation;

  const formatCOP = (val) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section id="simulador" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
      <Reveal direction="up">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="font-editorial-heading text-4xl sm:text-5xl md:text-6xl text-white mb-4">
            {t('simulator.title')}
          </h2>
          <p className="font-body text-xs sm:text-sm text-white/70 leading-relaxed font-light">
            {t('simulator.subtitle')}
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <Reveal direction="left" delay={0.2} className="lg:col-span-7 bg-brand-surface p-6 sm:p-10 border border-white/10 rounded-[4px] space-y-8">
          {/* 1. Typology */}
          <div>
            <label className="block text-xs font-architectural tracking-wider text-brand-mint mb-3">
              {t('simulator.step1')}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'Residencial', label: t('simulator.typologyRes') },
                { id: 'Turismo', label: t('simulator.typologyTour') },
                { id: 'Comercial', label: t('simulator.typologyComm') }
              ].map((tItem) => (
                <button
                  key={tItem.id}
                  onClick={() => setTypology(tItem.id)}
                  className={`p-3 text-center border font-architectural text-[11px] sm:text-xs rounded-[3px] transition-all ${
                    typology === tItem.id
                      ? 'border-brand-mint bg-brand-mint/10 text-brand-mint font-semibold shadow-[0_0_10px_rgba(184,222,216,0.2)]'
                      : 'border-white/10 text-white/60 hover:text-white hover:border-white/30'
                  }`}
                >
                  {tItem.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Target Area Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-architectural tracking-wider text-brand-mint">
                {t('simulator.step2')}
              </label>
              <span className="font-mono text-base text-brand-mint font-semibold">
                {area} m²
              </span>
            </div>
            <input
              type="range"
              min={150}
              max={1200}
              step={10}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="w-full h-1.5 bg-brand-deep rounded-none appearance-none cursor-pointer accent-brand-mint"
            />
            <div className="flex justify-between text-[10px] font-mono text-white/40 mt-1">
              <span>{t('simulator.compactVilla')}</span>
              <span>{t('simulator.signatureResidence')}</span>
              <span>{t('simulator.masterplan')}</span>
            </div>
          </div>

          {/* 3. Finish Level */}
          <div>
            <label className="block text-xs font-architectural tracking-wider text-brand-mint mb-3">
              {t('simulator.step3')}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'high', title: t('simulator.specHigh'), desc: t('simulator.specHighDesc') },
                { id: 'signature', title: t('simulator.specSignature'), desc: t('simulator.specSignatureDesc') },
                { id: 'ultra', title: t('simulator.specUltra'), desc: t('simulator.specUltraDesc') }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFinishLevel(f.id)}
                  className={`p-3 text-left border rounded-[3px] transition-all ${
                    finishLevel === f.id
                      ? 'border-brand-mint bg-brand-mint/10 text-white'
                      : 'border-white/10 text-white/60 hover:border-white/30'
                  }`}
                >
                  <div className={`text-xs font-architectural ${finishLevel === f.id ? 'text-brand-mint font-semibold' : 'text-white'}`}>
                    {f.title}
                  </div>
                  <div className="text-[10px] font-body text-white/50 mt-1 leading-snug font-light">
                    {f.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Down Payment Percentage */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-architectural tracking-wider text-brand-mint">
                {t('simulator.step4')}
              </label>
              <span className="font-mono text-sm text-brand-mint font-semibold">
                {downPaymentPercent}%
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[30, 40, 50].map((p) => (
                <button
                  key={p}
                  onClick={() => setDownPaymentPercent(p)}
                  className={`py-2 text-center border font-mono text-xs rounded-md ${
                    downPaymentPercent === p
                      ? 'border-brand-mint bg-brand-mint text-brand-deep font-bold'
                      : 'border-white/10 text-white/60 hover:text-white'
                  }`}
                >
                  {p}% {t('simulator.initialPct')}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Results Card Column */}
        <Reveal direction="right" delay={0.3} className="lg:col-span-5 bg-brand-deep p-6 sm:p-10 border border-brand-mint/30 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.8)] space-y-6">
          <div className="border-b border-brand-mint/20 pb-4">
            <span className="text-[10px] font-mono tracking-widest text-brand-mint uppercase">
              {t('simulator.estProjection')}
            </span>
            <div className="font-editorial-heading text-3xl sm:text-4xl text-white mt-1">
              <AnimatedPriceCounter value={totalCost} />
            </div>
            <div className="text-xs font-mono text-white/50 mt-1">
              {t('simulator.equivCost')}{' '}
              <AnimatedPriceCounter value={currentPricePerM2} suffix={` ${t('simulator.perM2')}`} />
            </div>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-white/60">{t('simulator.downPayment')} ({downPaymentPercent}%):</span>
              <span className="text-white font-semibold">
                <AnimatedPriceCounter value={downPayment} />
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-white/60">{t('simulator.financedBalance')}:</span>
              <span className="text-white">
                <AnimatedPriceCounter value={remaining} />
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-white/60">{t('simulator.monthlyFee')}:</span>
              <span className="text-brand-mint font-semibold">
                <AnimatedPriceCounter value={monthlyInstallment} suffix={` ${t('simulator.perMonth')}`} />
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-white/60">{t('simulator.capitalGain')}:</span>
              <span className="text-emerald-400 font-semibold">
                <AnimatedPriceCounter value={projectedAppreciation} prefix="+" />
              </span>
            </div>

            <div className="flex justify-between items-center pt-2 text-white">
              <span className="font-architectural text-xs tracking-wider">{t('simulator.deliveryValue')}:</span>
              <span className="font-bold text-sm text-brand-mint">
                <AnimatedPriceCounter value={estimatedDeliveryValue} />
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 space-y-3">
            <button
              type="button"
              onClick={() => setShowDossierPdf(true)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-brand-surface border border-brand-mint/50 hover:border-brand-mint text-brand-mint hover:text-white transition-all font-architectural text-xs tracking-wider font-semibold rounded-md shadow-sm cursor-pointer"
            >
              <FileText className="w-4 h-4 text-brand-mint" />
              <span>DESCARGAR DOSSIER DE ESTRUCTURACIÓN (PDF)</span>
            </button>

            <button
              onClick={() => onOpenBooking(`Simulación ${typology} ${area}m²`)}
              className="w-full flex items-center justify-center gap-2 py-4 bg-brand-mint text-brand-deep hover:bg-brand-mint-light transition-all font-architectural text-xs tracking-wider font-semibold rounded-md shadow-[0_0_20px_rgba(184,222,216,0.3)] cursor-pointer"
            >
              <span>{t('simulator.requestStructure')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] font-mono text-white/40 text-center leading-normal">
              {t('simulator.disclaimerBottom')}
            </p>
          </div>
        </Reveal>
      </div>

      {/* Instant Executive Dossier PDF Modal for Simulator */}
      {showDossierPdf && (
        <ExecutiveDossierPdfModal
          investmentData={{
            typologyLabel: `${typology} (${finishLevel === 'ultra' ? 'Ultra Lujo' : finishLevel === 'signature' ? 'Signature' : 'Alto Estatus'})`,
            area,
            totalFormatted: formatCOP(totalCost),
            costM2Formatted: `${formatCOP(currentPricePerM2)} / m²`,
            downPaymentFormatted: `${formatCOP(downPayment)} (${downPaymentPercent}%)`
          }}
          onClose={() => setShowDossierPdf(false)}
          onBookProject={(title) => {
            setShowDossierPdf(false);
            onOpenBooking(title);
          }}
        />
      )}
    </section>
  );
};
