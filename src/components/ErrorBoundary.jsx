import React from 'react';
import { AlertTriangle, RefreshCw, Home, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * ErrorBoundary Táctico
 * ArquitecturIA Atelier · Aislamiento y Resiliencia en UI
 * Evita la pantalla en negro (crash) capturando excepciones no controladas,
 * desplegando una pantalla de recuperación editorial y permitiendo el retorno seguro.
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showTechnicalDetails: Boolean(import.meta.env?.DEV)
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ArquitecturIA Tactical Error Boundary]:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null, showTechnicalDetails: false });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleReturnHome = () => {
    window.location.hash = '/';
    this.handleReset();
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.handleReset);
      }

      return (
        <div className="min-h-screen bg-brand-deep text-white font-body flex items-center justify-center p-6 relative overflow-hidden select-none">
          {/* Subtle architectural grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(184, 222, 216, 0.6) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(184, 222, 216, 0.6) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          />

          <div className="relative z-10 max-w-xl w-full bg-brand-surface border border-brand-mint/30 rounded-[4px] p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.9)] space-y-6">
            {/* Header with Monogram & Badge */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-mint/10 border border-brand-mint/30 rounded-[2px] flex items-center justify-center text-brand-mint">
                  <AlertTriangle className="w-5 h-5 text-brand-mint" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-brand-mint uppercase block">
                    SISTEMA DE RESILIENCIA TÁCTICA
                  </span>
                  <h2 className="font-architectural text-sm font-bold text-white tracking-wider">
                    ARQUITECTURIA ATELIER
                  </h2>
                </div>
              </div>

              <span className="text-[10px] font-mono px-2 py-0.5 bg-red-950/60 border border-red-500/30 text-red-300 rounded-[2px]">
                RECUPERACIÓN ACTIVA
              </span>
            </div>

            {/* Error Message Body */}
            <div className="space-y-3">
              <h3 className="font-editorial-heading text-2xl sm:text-3xl text-white">
                Interrupción en el Renderizado Espacial
              </h3>
              <p className="font-body text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                Un componente visual ha registrado un conflicto no previsto. El núcleo operativo de la plataforma
                permanece seguro y la integridad de tus datos no ha sufrido alteraciones.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReset}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-mint text-brand-deep hover:bg-brand-mint-light transition-all font-architectural text-xs tracking-wider font-bold rounded-[3px] shadow-[0_0_20px_rgba(184,222,216,0.3)] cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>REINTENTAR COMPONENTE</span>
              </button>

              <button
                type="button"
                onClick={this.handleReturnHome}
                className="flex items-center justify-center gap-2 px-5 py-3.5 border border-white/20 hover:border-brand-mint text-white hover:text-brand-mint transition-all font-architectural text-xs tracking-wider rounded-[3px] cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>PORTAL PRINCIPAL</span>
              </button>
            </div>

            {/* Collapsible Technical Telemetry */}
            <div className="border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={() => this.setState({ showTechnicalDetails: !this.state.showTechnicalDetails })}
                className="flex items-center justify-between w-full text-[11px] font-mono text-white/40 hover:text-brand-mint transition-colors cursor-pointer"
              >
                <span>Diagnóstico técnico del error</span>
                {this.state.showTechnicalDetails ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>

              {this.state.showTechnicalDetails && (
                <div className="mt-3 p-3 bg-brand-deep border border-white/10 rounded-[3px] overflow-x-auto text-[10px] font-mono text-white/60 space-y-1">
                  <div className="text-red-400 font-bold">
                    {this.state.error?.toString()}
                  </div>
                  {this.state.errorInfo?.componentStack && (
                    <pre className="whitespace-pre-wrap text-white/40 max-h-36 overflow-y-auto">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
