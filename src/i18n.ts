import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import es from "@/locales/es/translation.json";
import pt from "@/locales/pt/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    es: {
      translation: es,
    },
    pt: {
      translation: pt,
    },
  },
  lng: "pt",
  fallbackLng: "es",
});

export default i18n;
