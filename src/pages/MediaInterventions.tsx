import { useMemo, useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import heroBackground from "@/assets/hero-background-tech.jpg";
import cnewsInterview from "@/assets/cnews-guet-apens.png";
import crsDeployment from "@/assets/Cnews-Mantes-la-Jolie.png";
import publicEventsSecurity from "@/assets/Cnews-debordements.png";
import municipalPolice from "@/assets/Cnews-PM.png";
import DZMafia from "@/assets/Cnews-DZMAFIA.png";
import Orange from "@/assets/Cnews-Orange.png";
import { Play, Calendar, Clock, Tv, ChevronDown, ChevronUp } from "lucide-react";
import Seo from "@/components/Seo";
import { useTranslation } from "react-i18next";

type Kind = "interview" | "debate" | "report";

type Intervention = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  channel: string;       // nom propre (non traduit)
  dateISO: string;       // ex: "2025-07-28"
  durationKey?: string;  // ex: "media.durationTBD"
  type: Kind;
  thumbnail: string;
  link?: string;         // externe (X/Twitter, etc.)
};

const getTypeColor = (type: Kind) => {
  switch (type) {
    case "debate":
      return "text-accent";
    case "interview":
      return "text-primary";
    case "report":
      return "text-secondary-foreground";
    default:
      return "text-foreground";
  }
};

const formatDate = (iso: string, lang: string) => {
  const d = new Date(iso);
  // mapping simple pour locales
  const locale = lang.startsWith("zh") ? "zh-CN" : lang.startsWith("en") ? "en-GB" : "fr-FR";
  return new Intl.DateTimeFormat(locale, { day: "2-digit", month: "long", year: "numeric" }).format(d);
};

const MediaInterventions: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [showAll, setShowAll] = useState(false);

  const [navH, setNavH] = useState(0);
useEffect(() => {
  const update = () => {
    const el = document.querySelector("nav");
    setNavH(el ? el.getBoundingClientRect().height : 0);
  };
  update();
  window.addEventListener("resize", update);
  return () => window.removeEventListener("resize", update);
}, []);

  // Données (les contenus textuels passent par i18n)
  const interventions: Intervention[] = useMemo(
    () => [
      {
        id: "orange",
        titleKey: "media.items.orange.title",
        descriptionKey: "media.items.orange.desc",
        channel: "CNEWS",
        dateISO: "2025-07-28",
        durationKey: "media.durationTBD",
        type: "interview",
        thumbnail: Orange,
        link: "https://x.com/CNEWS/status/1949745978929455355"
      },
      {
        id: "dzmafia",
        titleKey: "media.items.dzmafia.title",
        descriptionKey: "media.items.dzmafia.desc",
        channel: "CNEWS",
        dateISO: "2025-07-22",
        durationKey: "media.durationTBD",
        type: "interview",
        thumbnail: DZMafia,
        link: "https://x.com/UNSAPOLICE/status/1947651203703148764"
      },
      {
        id: "guet-apens",
        titleKey: "media.items.guetApens.title",
        descriptionKey: "media.items.guetApens.desc",
        channel: "CNEWS",
        dateISO: "2025-07-13",
        durationKey: "media.durationTBD",
        type: "interview",
        thumbnail: cnewsInterview,
        link: "https://x.com/CNEWS/status/1944400900182753379"
      },
      {
        id: "mantes",
        titleKey: "media.items.mantes.title",
        descriptionKey: "media.items.mantes.desc",
        channel: "CNEWS",
        dateISO: "2025-07-12",
        durationKey: "media.durationTBD",
        type: "interview",
        thumbnail: crsDeployment,
        link: "https://x.com/CNEWS/status/1944151251643457582"
      },
      {
        id: "europe1",
        titleKey: "media.items.europe1.title",
        descriptionKey: "media.items.europe1.desc",
        channel: "Europe 1",
        dateISO: "2025-07-11",
        durationKey: "media.durationTBD",
        type: "interview",
        thumbnail: publicEventsSecurity,
        link: "https://x.com/Europe1/status/1943704894898110623"
      },
      {
        id: "pm",
        titleKey: "media.items.pm.title",
        descriptionKey: "media.items.pm.desc",
        channel: "UNSA Police",
        dateISO: "2025-07-07",
        durationKey: "media.durationTBD",
        type: "interview",
        thumbnail: municipalPolice,
        link: "https://x.com/UNSAPOLICE/status/1942283954070892561"
      }
    ],
    []
  );

  // Les 4 plus récentes en premier
  const recentInterventions = interventions.slice(0, 4);
  const olderInterventions = interventions.slice(4);

  // SEO alternates (?lng=…)
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const alternates = [
    { hrefLang: "fr", href: `${origin}/media?lng=fr` },
    { hrefLang: "en", href: `${origin}/media?lng=en` },
    { hrefLang: "zh", href: `${origin}/media?lng=zh` },
    { hrefLang: "x-default", href: `${origin}/media` }
  ];

  // Composant carte (accessible + clique sur toute la carte)
  const Card = (it: Intervention) => {
    const date = formatDate(it.dateISO, i18n.language || "fr");
    const typeLabel = t(`media.types.${it.type}`);
    const durationLabel = it.durationKey ? t(it.durationKey) : "";
    const title = t(it.titleKey);
    const desc = t(it.descriptionKey);

    return (
      <a
        key={it.id}
        href={it.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${title} ${t("common.openInNewTab")}`}
        className="project-card group block"
      >
        <div className="relative">
          <img
            src={it.thumbnail}
            alt={title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-primary/90 rounded-full p-4 hover:bg-primary transition-colors">
              <Play className="h-8 w-8 text-primary-foreground fill-current" />
            </div>
          </div>
          <div className="absolute top-4 left-4">
            <span
              className={`bg-card/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-mono uppercase tracking-wider ${getTypeColor(it.type)}`}
            >
              {typeLabel}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Tv className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-mono">{it.channel}</span>
          </div>
          <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">{desc}</p>
          <div className="flex items-center gap-4 text-sm text-foreground/70 font-mono">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{durationLabel}</span>
            </div>
          </div>
        </div>
      </a>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Seo
        title={t("seo.mediaTitle")}
        description={t("seo.mediaDescription")}
        path="/media"
        image="/images/og/og-media.jpg"
        alternates={alternates}
      />

      <Navigation />

{/* Hero */}
<div
  className={`
    relative
    -mx-4 sm:-mx-6
    h-[40vh] md:h-[34vh] lg:h-[30vh]
    flex items-center justify-center
    tech-grid
  `}
  style={{
    marginTop: -navH,
    paddingTop: navH,
    backgroundImage: `linear-gradient(rgba(34,40,49,0.85), rgba(34,40,49,0.7)), url(${heroBackground})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}
>
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="relative">
      <div className="scan-line absolute -top-8 left-0 right-0 h-0.5"></div>
      <div className="scan-line absolute -bottom-8 left-0 right-0 h-0.5" style={{ animationDelay: "2s" }}></div>
    </div>
  </div>

  <div
    className="max-w-4xl mx-auto px-6 text-center relative z-10"
    style={{ transform: `translateY(calc(-${navH / 2}px + 10px))` }}
  >
    <div className="inline-block border border-primary/30 rounded-lg px-4 py-2 mb-6 bg-primary/10 backdrop-blur-sm">
      <span className="text-primary text-sm font-mono uppercase tracking-wider">
        {t("media.heroTag")}
      </span>
    </div>
    <h1 className="text-4xl md:text-5xl font-bold text-primary glow mb-4">
      {t("media.title")}
    </h1>
    <p className="text-xl text-foreground/70 font-mono">
      {t("media.subtitle")}
    </p>
  </div>
</div>

      {/* Interventions Section */}
      <div className="flex-1 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* 4 plus récentes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {recentInterventions.map(Card)}
          </div>

          {/* Anciennes */}
          {olderInterventions.length > 0 && (
            <>
              <div className="text-center mt-12">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center gap-2 font-mono text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  {showAll ? t("media.showLess") : t("media.showOlder")}
                  {showAll ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>

              {showAll && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 animate-fade-in">
                  {olderInterventions.map(Card)}
                </div>
              )}
            </>
          )}

          {/* Coming Soon */}
          <div className="mt-16">
            <div className="form-container">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Tv className="h-8 w-8 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-primary mb-4 font-mono">
                  {t("media.comingNext")}
                </h2>
                <div className="bg-muted/50 border border-border rounded-lg p-6">
                  <div className="text-left font-mono text-sm text-foreground/70 space-y-2">
                    <div>&gt; {t("media.queue.programming")}</div>
                    <div>&gt; {t("media.queue.sync")}</div>
                    <div>&gt; {t("media.queue.update")}</div>
                    <div className="text-primary">
                      &gt; <span className="animate-pulse">{t("media.queue.standby")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaInterventions;
