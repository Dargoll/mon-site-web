import { useTranslation } from "react-i18next";

const Flag: React.FC<{ code: "fr" | "en" | "zh" }> = ({ code }) => {
  const common = "w-6 h-4 rounded-sm shadow-sm ring-1 ring-black/10";
  switch (code) {
    case "fr":
      return (
        <svg viewBox="0 0 3 2" className={common} aria-hidden>
          <rect width="1" height="2" x="0" fill="#0055A4" />
          <rect width="1" height="2" x="1" fill="#FFFFFF" />
          <rect width="1" height="2" x="2" fill="#EF4135" />
        </svg>
      );
    case "en":
      return (
        <svg viewBox="0 0 60 30" className={common} aria-hidden>
          <clipPath id="u">
            <path d="M0,0 v30 h60 v-30 z" />
          </clipPath>
          <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFF" strokeWidth="6" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="3" />
          <path d="M30,0 v30 M0,15 h60" stroke="#FFF" strokeWidth="10" />
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
        </svg>
      );
    case "zh":
      return (
        <svg viewBox="0 0 30 20" className={common} aria-hidden>
          <rect width="30" height="20" fill="#EE1C25" />
          <g fill="#FFDE00">
            <polygon points="5,3 6,6 9,6 6.5,7.9 7.5,11 5,9.2 2.5,11 3.5,7.9 1,6 4,6" />
            <polygon points="10,2.5 10.7,3.5 12,3.3 11.2,4.2 11.6,5.4 10.6,4.8 9.6,5.4 10,4.2 9.2,3.3 10.4,3.5" />
            <polygon points="11.5,5.5 12.2,6.4 13.4,6.2 12.6,7.1 13,8.2 12,7.6 11,8.2 11.4,7.1 10.6,6.2 11.8,6.4" />
            <polygon points="11.5,9 12.2,10 13.4,9.8 12.6,10.7 13,11.8 12,11.2 11,11.8 11.4,10.7 10.6,9.8 11.8,10" />
            <polygon points="10,11.5 10.7,12.5 12,12.3 11.2,13.2 11.6,14.4 10.6,13.8 9.6,14.4 10,13.2 9.2,12.3 10.4,12.5" />
          </g>
        </svg>
      );
  }
};

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const languages: Array<{ code: "fr" | "en" | "zh"; label: string }> = [
    { code: "fr", label: "Français" },
    { code: "en", label: "English" },
    { code: "zh", label: "中文" }
  ];

  return (
    <div className="flex items-center gap-2">
      {languages.map((l) => {
        const active = i18n.language?.startsWith(l.code);
        return (
          <button
            key={l.code}
            onClick={() => i18n.changeLanguage(l.code)}
            title={l.label}
            aria-label={`Change language to ${l.label}`}
            className={`flex items-center justify-center p-1 rounded-md transition
              ${active ? "ring-2 ring-primary" : "ring-1 ring-border hover:ring-primary/60 opacity-80 hover:opacity-100"}`}
          >
            <Flag code={l.code} />
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
