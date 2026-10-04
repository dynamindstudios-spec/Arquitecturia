import React, { useState } from 'react';
import { Shield, KeyRound, ArrowRight, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { BRANDING_DATA } from '../data/brandingData';
import { storageService } from '../services/storageService';

export const AdminLogin = ({ onLoginSuccess, onReturnHome }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const creds = storageService.getCredentials();
      if (
        username.trim().toLowerCase() === creds.username.toLowerCase() &&
        password === creds.password
      ) {
        storageService.setSession(username);
        onLoginSuccess();
      } else {
        setError('Credenciales inválidas. Usa por defecto: admin / 12345678');
        setLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-brand-deep flex items-center justify-center p-6 select-none">
      <div className="w-full max-w-md bg-brand-surface border border-brand-mint/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] p-8 sm:p-10 relative">
        {/* Top Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-deep border border-brand-mint text-brand-mint mb-4">
            <Lock className="w-5 h-5" />
          </div>

          <h2 className="font-editorial-heading text-2xl sm:text-3xl text-white">
            Panel Operativo
          </h2>
          <p className="font-mono text-xs text-brand-mint/80 mt-1 uppercase tracking-widest">
            ARQUITECTURIA · OPERATIONAL CORE DSB
          </p>
          <p className="text-[11px] font-mono text-white/40 mt-1">
            Módulo restringido para dirección de proyectos y control de atelier.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-900/30 border border-red-500/50 flex items-center gap-2 text-xs font-mono text-red-200">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-architectural tracking-wider text-brand-mint mb-1">
              USUARIO AUTORIZADO
            </label>
            <input
              type="text"
              required
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full bg-brand-deep border border-white/10 px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-brand-mint font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-architectural tracking-wider text-brand-mint mb-1">
              CONTRASEÑA MAESTRA
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-brand-deep border border-white/10 px-4 py-2.5 pr-10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-brand-mint font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="text-[10px] font-mono text-white/30 mt-1">
              Por defecto: admin / 12345678
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-mint text-brand-deep hover:bg-brand-mint-light transition-all font-architectural text-xs tracking-wider font-semibold disabled:opacity-50"
          >
            <Shield className="w-4 h-4" />
            <span>{loading ? 'AUTENTICANDO...' : 'INGRESAR AL PANEL'}</span>
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-white/10 text-center">
          <button
            onClick={onReturnHome}
            className="text-xs font-mono text-white/50 hover:text-brand-mint transition-colors"
          >
            ← Volver al sitio comercial
          </button>
        </div>
      </div>
    </div>
  );
};
