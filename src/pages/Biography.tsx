import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TypingAnimation from "@/components/TypingAnimation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import heroBackground from "@/assets/hero-background-tech.jpg";
import Seo from "@/components/Seo";
import { useTranslation } from "react-i18next";

const Biography: React.FC = () => {
  const { t } = useTranslation();
  const [showAnimation, setShowAnimation] = useState(true);
  const [showBiography, setShowBiography] = useState(false);

  // ✅ On envoie des CLÉS i18n, pas des chaînes traduites
  const initializationMessages = [
    "bio.init.initData",
    "bio.init.loadCareer",
    "bio.init.parseRecords",
    "bio.init.compileAchievements",
    "bio.init.crossMedia",
    "bio.init.complete",
  ];

  const handleAnimationComplete = () => setShowAnimation(false);
  const handleShowBiography = () => setShowBiography(true);

  // SEO alternates (?lng=…)
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const alternates = [
    { hrefLang: "fr", href: `${origin}/biography?lng=fr` },
    { hrefLang: "en", href: `${origin}/biography?lng=en` },
    { hrefLang: "zh", href: `${origin}/biography?lng=zh` },
    { hrefLang: "x-default", href: `${origin}/biography` },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Seo
        title={t("seo.biographyTitle")}
        description={t("seo.biographyDescription")}
        path="/biography"
        image="/images/og/og-biography.jpg"
        alternates={alternates}
      />

      <Navigation />

      {/* Hero Section */}
      <div
        className="pt-20 pb-16 relative tech-grid"
        style={{
          backgroundImage: `linear-gradient(rgba(34, 40, 49, 0.85), rgba(34, 40, 49, 0.7)), url(${heroBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="scan-line absolute -top-8 left-0 right-0 h-0.5"></div>
            <div
              className="scan-line absolute -bottom-8 left-0 right-0 h-0.5"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-block border border-primary/30 rounded-lg px-4 py-2 mb-6 bg-primary/10 backdrop-blur-sm">
            <span className="text-primary text-sm font-mono uppercase tracking-wider">
              {t("bio.heroTag")}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary glow mb-4">
            {t("bio.heroTitle")}
          </h1>
          <p className="text-xl text-foreground/70 font-mono">
            {t("bio.heroSubtitle")}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="form-container">
            <div className="text-center">
              <div className="mb-8">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-primary/50">
                  <img
                    src="/lovable-uploads/9c6dd425-3a01-4e25-a2ef-ad3e9d0390bc.png"
                    alt={t("bio.avatarAlt")}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold text-primary mb-2 font-mono">
                  {t("bio.panelTitle")}
                </h2>
                <div className="text-accent text-sm font-mono mb-6">
                  {t("bio.statusLabel")}:{" "}
                  {showBiography ? t("bio.statusComplete") : t("bio.statusLoading")} |{" "}
                  {t("bio.progressLabel")}: {showBiography ? "100%" : "85%"}
                </div>
              </div>

              {showAnimation && (
                <TypingAnimation
                  messages={initializationMessages} // ✅ clés i18n
                  onComplete={handleAnimationComplete}
                  speed={30}
                />
              )}

              {!showAnimation && !showBiography && (
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 mb-8">
                  <div className="text-center">
                    <div className="text-primary font-mono text-sm mb-4">
                      {t("bio.init.ready")}
                    </div>
                    <Button
                      onClick={handleShowBiography}
                      className="bg-primary/20 border border-primary/50 text-primary hover:bg-primary/30 font-mono"
                      variant="outline"
                    >
                      {t("bio.showButton")}
                    </Button>
                  </div>
                </div>
              )}

              {showBiography && (
                <div className="bg-muted/50 border border-border rounded-lg p-8 text-left animate-fade-in">
                  <div className="prose prose-invert max-w-none">
                    <div className="text-foreground leading-relaxed whitespace-pre-line">
                      {[
                        t("bio.paragraph1"),
                        t("bio.paragraph2"),
                        t("bio.paragraph3"),
                        t("bio.paragraph4"),
                        t("bio.paragraph5"),
                      ].join("\n\n")}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Biography;
