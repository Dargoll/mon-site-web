import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroBackground from "@/assets/hero-background-tech.jpg";
import DouYin from "@/assets/Douyin.jpg";
import Seo from "@/components/Seo";
import { useTranslation } from "react-i18next";

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  link?: string;
};

const isExternal = (href = "") =>
  /^(https?:)?\/\//i.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const { title, description, image, link } = project;
  const inner = (
    <>
      <img
        src={image}
        alt={title}
        loading="lazy"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = "/images/placeholder-project.jpg";
        }}
        className="w-full h-48 object-cover rounded-t-2xl"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </>
  );
  const className =
    "project-card block rounded-2xl border border-border/50 bg-card shadow-sm hover:shadow-lg transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

  if (!link) return <div className={className}>{inner}</div>;

  return isExternal(link) ? (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${title} (opens in a new tab)`}
      className={className}
    >
      {inner}
    </a>
  ) : (
    <Link to={link} className={className} aria-label={title}>
      {inner}
    </Link>
  );
};

const Projects: React.FC = () => {
  const { t } = useTranslation();

  const projects: Project[] = [
    {
      id: 1,
      title: t("projects.cards.designTitle"),
      description: t("projects.cards.designDesc"),
      image: "https://i.imgur.com/RaYM1PL.png",
      link: "/projet-design"
    },
    {
      id: 2,
      title: t("projects.cards.tiktokTitle"),
      description: t("projects.cards.tiktokDesc"),
      image: "https://i.imgur.com/8mJXnwr.png",
      link: "https://www.tiktok.com/@humour_police"
    },
    {
      id: 3,
      title: t("projects.cards.chineseTitle"),
      description: t("projects.cards.chineseDesc"),
      image: DouYin,
      link: "https://v.douyin.com/fHI1-35cIbE"
    }
  ];

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const alternates = [
    { hrefLang: "fr", href: `${origin}/projects?lng=fr` },
    { hrefLang: "en", href: `${origin}/projects?lng=en` },
    { hrefLang: "zh", href: `${origin}/projects?lng=zh` },
    { hrefLang: "x-default", href: `${origin}/projects` }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Seo
        title={t("seo.projectsTitle")}
        description={t("seo.projectsDescription")}
        path="/projects"
        image="/images/og/og-projects.jpg"
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
              DOSSIERS ACTIFS
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary glow mb-4">
            {t("projects.title")}
          </h1>
          <p className="text-xl text-foreground/70 font-mono">
            {t("projects.subtitle")}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Projects;
