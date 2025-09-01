import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// ✅ imports ES des JSON (pas de require)
import fr from "./locales/fr/translation.json";
import en from "./locales/en/translation.json";
import zh from "./locales/zh/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { fr: { translation: fr }, en: { translation: en }, zh: { translation: zh } },

    // 👉 Si rien n'est trouvé, on part en FR
    fallbackLng: "fr",

    // 👉 On limite aux langues gérées + on tolère en-* (nonExplicit)
    supportedLngs: ["fr", "en", "zh"],
    nonExplicitSupportedLngs: true,

    // 👉 Détection + persistance (querystring > localStorage > navigateur)
    detection: {
      order: ["querystring", "localStorage", "navigator"],
      lookupQuerystring: "lng",
      caches: ["localStorage"],
      // clé utilisée dans localStorage
      lookupLocalStorage: "i18nextLng"
    },

    interpolation: { escapeValue: false },
    debug: false
  });

export default i18n;
