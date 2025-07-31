import { Link } from 'react-router-dom';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroBackground from "@/assets/hero-background-tech.jpg";
import DouYin from "@/assets/Douyin.jpg";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Requête API - RER B",
      description: "Création d'une requête API pour connaître le passage de mon prochain RER !",
      image: "https://i.imgur.com/fItZa1h.pngh",
      link: "/projet-rer"
    },
    {
      id: 2,
      title: "Chaîne TikTok - Humour_PN",
      description: "Mise en place d'une chaîne TikTok autour de l'humour spécifique à la PN !",
      image: "https://i.imgur.com/8mJXnwr.png",
      link: "https://www.tiktok.com/@humour_police"
    },
    {
      id: 3,
      title: "La langue Chinoise",
      description: "Apprentissage de cette langue au travers de voyages !",
      image: DouYin,
      link: "https://v.douyin.com/fHI1-35cIbE"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div 
        className="pt-20 pb-16 relative tech-grid"
        style={{
          backgroundImage: `linear-gradient(rgba(34, 40, 49, 0.85), rgba(34, 40, 49, 0.7)), url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Animated scanning lines around title */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="scan-line absolute -top-8 left-0 right-0 h-0.5"></div>
            <div className="scan-line absolute -bottom-8 left-0 right-0 h-0.5" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-block border border-primary/30 rounded-lg px-4 py-2 mb-6 bg-primary/10 backdrop-blur-sm">
            <span className="text-primary text-sm font-mono uppercase tracking-wider">
              DOSSIERS ACTIFS
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary glow mb-4">
            PROJETS & PASSIONS
          </h1>
          <p className="text-xl text-foreground/70 font-mono">
            &gt; Découvrez mes projets et passions !
          </p>
        </div>
      </div>
      
      {/* Projects Section */}
      <div className="flex-1 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => {
              // On définit le contenu de la carte pour ne pas le répéter
              const CardContent = (
                <>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-4">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </>
              );

              // On retourne un <Link> si le lien existe, sinon une simple <div>
              return project.link ? (
                <Link
                  key={project.id}
                  to={project.link}
                  className="project-card block transition-transform duration-300 hover:scale-105"
                >
                  {CardContent}
                </Link>
              ) : (
                <div
                  key={project.id}
                  className="project-card"
                >
                  {CardContent}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Projects;