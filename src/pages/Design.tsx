import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroBackground from "@/assets/hero-background-tech.jpg";
import Seo from "@/components/Seo";
import { useTranslation } from "react-i18next";

const Design: React.FC = () => {
  const { t } = useTranslation();

  const ogImage = "/images/og/og-design.jpg";
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const alternates = [
    { hrefLang: "fr", href: `${origin}/projet-design?lng=fr` },
    { hrefLang: "en", href: `${origin}/projet-design?lng=en` },
    { hrefLang: "zh", href: `${origin}/projet-design?lng=zh` },
    { hrefLang: "x-default", href: `${origin}/projet-design` }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Seo
        title={t("seo.designTitle")}
        description={t("seo.designDescription")}
        path="/projet-design"
        image={ogImage}
        alternates={alternates}
      />

      <Navigation />

      {/* Hero */}
      <div
        className="pt-20 pb-16 relative tech-grid"
        style={{
          backgroundImage: `linear-gradient(rgba(34, 40, 49, 0.85), rgba(34, 40, 49, 0.7)), url(${heroBackground})`,
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

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-block border border-primary/30 rounded-lg px-4 py-2 mb-6 bg-primary/10 backdrop-blur-sm">
            <span className="text-primary text-sm font-mono uppercase tracking-wider">
              {t("design.heroTag")}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary glow mb-4">
            {t("design.title")}
          </h1>
          <p className="text-xl text-foreground/70 font-mono">
            {t("design.subtitle")}
          </p>
        </div>
      </div>

      {/* Section texte seule */}
      <section className="py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("design.intro")}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Design;
