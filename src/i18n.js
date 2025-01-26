import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpBackend) // Load translation files
  .use(LanguageDetector) // Detect user's language
  .use(initReactI18next) // Bind i18next to React
  .init({
    fallbackLng: "en", // Default language
    debug: true, // Enable debug mode
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // Path to translation files
    },
  });

export default i18n;
