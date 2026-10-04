import { useState, useEffect } from 'react';
import { i18n } from '../services/i18nService';

export const useTranslation = () => {
  const [lang, setLang] = useState(() => i18n.getLanguage());

  useEffect(() => {
    const handleLangChange = (e) => {
      setLang(e.detail.language);
    };
    window.addEventListener('arquitecturia-language-changed', handleLangChange);
    return () => {
      window.removeEventListener('arquitecturia-language-changed', handleLangChange);
    };
  }, []);

  return {
    t: (key) => i18n.t(key),
    translateCategory: (cat) => i18n.translateCategory(cat),
    translateStatus: (status) => i18n.translateStatus(status),
    translateMaterial: (material) => i18n.translateMaterial(material),
    translateProjectDescription: (id, fallback) => i18n.translateProjectDescription(id, fallback),
    language: lang,
    setLanguage: (newLang) => i18n.setLanguage(newLang),
    i18n
  };
};
