import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "ml" | "en";

type Dictionary = Record<string, { en: string; ml: string }>;

const dict: Dictionary = {
  appName: { en: "Krishi Mithra", ml: "കൃഷി മിത്ര" },
  home: { en: "Home", ml: "ഹോം" },
  advisory: { en: "Advisory", ml: "ഉപദേശം" },
  community: { en: "Community", ml: "കമ്മ്യൂണിറ്റി" },
  marketplace: { en: "Marketplace", ml: "മാർക്കറ്റ്" },
  profile: { en: "Profile", ml: "പ്രൊഫൈൽ" },
  selectLanguage: { en: "Select Language", ml: "ഭാഷ തിരഞ്ഞെടുക്കൂ" },
  english: { en: "English", ml: "ഇംഗ്ലീഷ്" },
  malayalam: { en: "Malayalam", ml: "മലയാളം" },
  getStarted: { en: "Get Started", ml: "ആരംഭിക്കൂ" },
  greeting: { en: "Hello Rajan", ml: "ഹലോ രാജൻ" },
  todaysWeather: { en: "Today's weather is cloudy", ml: "ഇന്നത്തെ കാലാവസ്ഥ മേഘാവൃതമാണ്" },
  weatherAlert: { en: "Weather Alert", ml: "കാലാവസ്ഥ മുന്നറിയിപ്പ്" },
  pestAlert: { en: "Pest Alert", ml: "കീട മുന്നറിയിപ്പ്" },
  cropTip: { en: "Crop Tip", ml: "കൃഷി ടിപ്പ്" },
  marketPrice: { en: "Market Price", ml: "വിപണി വില" },
  speak: { en: "Speak", ml: "സംസാരിക്കൂ" },
};

const I18nContext = createContext<{
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: keyof typeof dict) => string;
}>({ lang: "ml", setLang: () => {}, t: (k) => dict[k].ml });

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() =>
    (localStorage.getItem("km_lang") as Language) || "ml",
  );

  useEffect(() => {
    localStorage.setItem("km_lang", lang);
    document.documentElement.lang = lang === "ml" ? "ml" : "en";
  }, [lang]);

  const t = useMemo(() => (key: keyof typeof dict) => dict[key][lang], [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => useContext(I18nContext);
