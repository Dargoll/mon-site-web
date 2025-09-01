import { Link } from "react-router-dom";
import { useState } from "react";
import LoadingBar from "@/components/LoadingBar";
import AnimatedCounter from "@/components/AnimatedCounter";
import TypingDecode from "@/components/TypingDecode";
import heroBackground from "@/assets/hero-background-tech.jpg";
import Seo from "@/components/Seo";
import { useTranslation } from "react-i18next";

const Homepage: React.FC = () => {
  const { t } = useTranslation();
  const [showIntro, setShowIntro] = useState(true);
  const [showMainContent, setShowMainContent] = useState(false);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setTimeout(() => setShowMainContent(true), 300);
  };

  return (
    <>
      <Seo
        title={t("seo.homepageTitle")}
        description={t("seo.homepageDescription")}
        path="/"
      />

      {/* Écran de chargement : full-bleed sous la nav */}
      {showIntro && (
        <section
          className="
            relative
            -mt-24 md:-mt-28
            -mx-4 sm:-mx-6
            -mb-4
            min-h-[calc(100dvh-6rem)] md:min-h-[calc(100dvh-7rem)]
            flex items-center justify-center
            bg-background
          "
          style={{
            // annule le padding-bottom de .page (safe-area inclus)
            marginBottom: "calc(-1 * var(--safe-bottom, 0px))",
          }}
        >
          <div className="relative z-10 text-center px-6 max-w-4xl w-full pt-24 md:pt-28">
            <LoadingBar onComplete={handleIntroComplete} duration={3000} />
          </div>
        </section>
      )}

      {/* Hero : full-bleed + fond qui couvre */}
      {!showIntro && (
        <section
          className={`
            relative
            -mt-24 md:-mt-28
            -mx-4 sm:-mx-6
            -mb-4
            min-h-[calc(100dvh-6rem)] md:min-h-[calc(100dvh-7rem)]
            flex items-center justify-center
            overflow-hidden
            transition-opacity duration-500
            ${showMainContent ? "opacity-100" : "opacity-0"}
          `}
          style={{
            backgroundImage: `linear-gradient(rgba(34,40,49,0.9), rgba(34,40,49,0.7)), url(${heroBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            // annule le padding-bottom de .page (safe-area inclus)
            marginBottom: "calc(-1 * var(--safe-bottom, 0px))",
          }}
        >
          <div className="relative z-10 w-full pt-24 md:pt-28 text-center px-6 max-w-5xl mx-auto">
            <div className="mb-8">
              <div className="inline-block border border-primary/30 rounded-lg px-4 py-2 mb-6 bg-primary/10 backdrop-blur-sm animate-fade-in">
                <span className="text-primary text-sm font-mono uppercase tracking-wider">
                  {t("home.system")}
                </span>
              </div>
            </div>

            <h1 className="h1-fluid md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              <TypingDecode text={t("home.title")} duration={3000} delay={500} />
            </h1>

            <div className="border-l-4 border-primary pl-6 mb-8">
              <h2 className="text-xl md:text-2xl font-medium text-foreground/90 mb-2">
                {t("home.role")}
              </h2>
              <div className="text-primary font-mono text-sm">{t("home.idline")}</div>
            </div>

            <p className="text-lg md:text-xl text-foreground/70 mb-12 max-w-3xl mx-auto font-mono">
              {t("home.mission")}
              <span className="animate-pulse text-primary">_</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link to="/biography" className="btn-hero group">
                <span className="mr-2">&gt;</span>
                {t("home.btnProfile")}
                <span className="ml-2 group-hover:translate-x-1 transition-transform">[ENTER]</span>
              </Link>
              <Link to="/media" className="btn-hero-secondary group">
                <span className="mr-2">@</span>
                {t("home.btnMedia")}
                <span className="ml-2 group-hover:translate-x-1 transition-transform">[TV]</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4 hover:bg-card/70 hover:border-primary/50 transition-all duration-300 hover:scale-105">
                <div className="text-primary text-2xl font-bold font-mono">24/7</div>
                <div className="text-sm text-foreground/70 uppercase tracking-wide">
                  {t("home.statAvailability")}
                </div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4 hover:bg-card/70 hover:border-primary/50 transition-all duration-300 hover:scale-105">
                <div className="text-primary text-2xl font-bold font-mono">
                  <AnimatedCounter end={100} suffix="%" duration={2500} />
                </div>
                <div className="text-sm text-foreground/70 uppercase tracking-wide">
                  {t("home.statCommitment")}
                </div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4 hover:bg-card/70 hover:border-primary/50 transition-all duration-300 hover:scale-105">
                <div className="text-primary text-2xl font-bold font-mono">∞</div>
                <div className="text-sm text-foreground/70 uppercase tracking-wide">
                  {t("home.statDetermination")}
                </div>
              </div>
            </div>
          </div>

          <a
            href="https://www.unsapolice.com/adherez-renouvelez-en-ligne/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-floating group"
            style={{ marginBottom: "var(--safe-bottom, 0px)" }}
          >
            <span className="mr-2">⚡</span>
            {t("home.ctaJoin")}
            <span className="ml-2 group-hover:rotate-90 transition-transform">[+]</span>
          </a>
        </section>
      )}
    </>
  );
};

export default Homepage;
