import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

export const CategoryFilter = ({ categories, activeCategory, onSelectCategory, projectCounts = {} }) => {
  const { t, translateCategory } = useTranslation();

  const getCategoryLabel = (cat) => {
    switch (cat) {
      case 'Todos': return t('projects.categories.all');
      case 'Residencial': return t('projects.categories.residential');
      case 'Turismo': return t('projects.categories.hospitality');
      case 'Comercial': return t('projects.categories.commercial');
      default: return translateCategory ? translateCategory(cat) : cat;
    }
  };

  return (
    <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 py-4 select-none">
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        const count = projectCounts[cat];

        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`group relative px-4 sm:px-6 py-2.5 font-architectural text-xs tracking-architectural transition-all duration-300 flex items-center gap-2 border ${
              isActive
                ? 'bg-brand-mint text-brand-deep border-brand-mint font-semibold shadow-[0_0_15px_rgba(184,222,216,0.25)]'
                : 'bg-brand-surface/80 text-white/70 border-white/10 hover:border-brand-mint/40 hover:text-white'
            }`}
          >
            <span>{getCategoryLabel(cat)}</span>
            {count !== undefined && (
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 transition-colors ${
                  isActive
                    ? 'bg-brand-deep text-brand-mint'
                    : 'bg-white/10 text-brand-mint/80 group-hover:bg-brand-mint/20'
                }`}
              >
                {count}
              </span>
            )}

            {/* Architectural corner tick */}
            {isActive && (
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-brand-deep" />
            )}
          </button>
        );
      })}
    </div>
  );
};
