import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroBackground from "@/assets/hero-background-tech.jpg";

type Tool = string;

interface GalleryItem {
  id: number;
  title: string;
  caption: string;
  src: string;
}

const tools: Tool[] = [
  "Figma",
  "Illustrator",
  "Photoshop",
  "After Effects",
  "Tailwind CSS",
  "shadcn/ui",
  "Framer Motion",
];

const gallery: GalleryItem[] = [
  {
    id: 1,
    title: "UI Dashboard minimaliste",
    caption: "Palette froide, cards arrondies, lisibilité prioritaire",
    src: "/images/design/ui-dashboard.jpg",
  },
  {
    id: 2,
    title: "Landing page produit",
    caption: "Hero impactant, hiérarchie typographique claire",
    src: "/images/design/landing-produit.jpg",
  },
  {
    id: 3,
    title: "Affiche événementielle",
    caption: "Composition forte, contraste et rythme",
    src: "/images/design/affiche-event.jpg",
  },
  {
    id: 4,
    title: "Logo & identité",
    caption: "Simplicité, mémorisation, déclinaisons",
    src: "/images/design/brand-logo.jpg",
  },
  {
    id: 5,
    title: "Mockups réseaux sociaux",
    caption: "Formats adaptatifs, cohérence visuelle",
    src: "/images/design/social-mockups.jpg",
  },
  {
    id: 6,
    title: "Refonte page article",
    caption: "Lecture confortable, composants réutilisables",
    src: "/images/design/article-refonte.jpg",
  },
];

const Design: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero */}
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
              Studio de création
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary glow mb-4">
            Design & Graphisme
          </h1>
          <p className="text-xl text-foreground/70 font-mono">
            &gt; Moderniser, épurer, raconter par l’image et l’interface.
          </p>
        </div>
      </div>

      {/* Intro */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            J’aime transformer une idée en expérience visuelle : UI claires,
            identités percutantes, compositions équilibrées. Je conçois des
            interfaces web modernes, des visuels pour les réseaux, des affiches,
            et des systèmes graphiques cohérents — avec un soin particulier pour
            la lisibilité et le détail.
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {tools.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full border border-border/60 bg-card text-sm"
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
            >
              Me contacter
            </Link>
            <a
              href="/documents/portfolio.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl border border-border bg-card hover:bg-accent/20 transition"
            >
              Voir le portfolio PDF
            </a>
          </div>
        </div>
      </section>

      {/* Galerie */}
      <section className="pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-primary mb-6">Exemples récents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {gallery.map((item) => (
              <figure
                key={item.id}
                className="project-card block rounded-2xl border border-border/50 bg-card shadow-sm hover:shadow-lg transition-transform duration-300 hover:scale-[1.02]"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/images/placeholder-project.jpg";
                  }}
                  className="w-full h-56 object-cover rounded-t-2xl"
                />
                <figcaption className="p-5">
                  <div className="text-base font-semibold text-primary mb-1">
                    {item.title}
                  </div>
                  <p className="text-sm text-muted-foreground">{item.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Méthodo */}
      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            {
              t: "Écoute & intention",
              d: "Comprendre les usages, définir le ton et le niveau de modernité attendu.",
            },
            {
              t: "Exploration & maquettes",
              d: "Moodboards, variantes typographiques, grilles, prototypes rapides.",
            },
            {
              t: "Finition & déploiement",
              d: "Systèmes réutilisables, assets optimisés, transmission propre.",
            },
          ].map((b, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border/50 bg-card p-5 shadow-sm"
            >
              <div className="text-primary font-semibold mb-2">{b.t}</div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {b.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Design;
