import { useState } from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroBackground from "@/assets/hero-background-tech.jpg";
import cnewsInterview from "@/assets/cnews-guet-apens.png";
import crsDeployment from "@/assets/Cnews-Mantes-la-Jolie.png";
import publicEventsSecurity from "@/assets/Cnews-debordements.png";
import municipalPolice from "@/assets/Cnews-PM.png";
import DZMafia from "@/assets/Cnews-DZMAFIA.png";
import Orange from "@/assets/Cnews-Orange.png";
import { Play, Calendar, Clock, Tv, ChevronDown, ChevronUp } from "lucide-react";

const MediaInterventions = () => {
  const interventions = [
      {
      id: 5,
      title: "La carte noire de la France orange mécanique",
      channel: "CNEWS",
      date: "28 Juillet 2025",
      duration: "À déterminer",
      description: "Loïc Walder : « Il y a une désinhibition de la violence. Aujourd'hui, porter un uniforme, c'est être une cible»",
      thumbnail: Orange,
      type: "Interview",
      link: "https://x.com/CNEWS/status/1949745978929455355"
      },
      {
      id: 5,
      title: "La DZ Mafia, une menace majeure pour la France",
      channel: "CNEWS",
      date: "22 Juillet 2025",
      duration: "À déterminer",
      description: "Loïc Walder : « Notre filière judiciaire est en souffrance !»",
      thumbnail: DZMafia,
      type: "Interview",
      link: "https://x.com/UNSAPOLICE/status/1947651203703148764"
    },
    {
      id: 1,
      title: "Une course poursuite suivie d'un guet-apens",
      channel: "CNEWS",
      date: "13 Juillet 2025",
      duration: "À déterminer",
      description: "Loïc Walder : « Certains discours encouragent ces guets-apens contre la police »",
      thumbnail: cnewsInterview,
      type: "Interview",
      link: "https://x.com/CNEWS/status/1944400900182753379"
    },
    {
      id: 2,
      title: "La CRS 8 déployée à Mantes-la-Jolie",
      channel: "CNEWS",
      date: "12 Juillet 2025",
      duration: "À déterminer",
      description: "Loïc Walder : « Aujourd'hui, on est confronté à des jeunes qui sont bercés par des discours anti-police »",
      thumbnail: crsDeployment,
      type: "Interview",
      link: "https://x.com/CNEWS/status/1944151251643457582"
    },
    {
      id: 3,
      title: "Fêtes, commémorations : des débordements assurés ?",
      channel: "Europe 1",
      date: "11 Juillet 2025",
      duration: "À déterminer",
      description: "Loïc Walder : « Prétendre que l'on pourra tout éviter, ce n'est pas réaliste »",
      thumbnail: publicEventsSecurity,
      type: "Interview",
      link: "https://x.com/Europe1/status/1943704894898110623"
    },
    {
      id: 4,
      title: "LFI : La Police Municipale n'a pas besoin d'être armée",
      channel: "UNSA Police",
      date: "7 Juillet 2025",
      duration: "À déterminer",
      description: "Loïc Walder : « Ce sont des propos qui sont complètement inconscients »",
      thumbnail: municipalPolice,
      type: "Interview",
      link: "https://x.com/UNSAPOLICE/status/1942283954070892561"
    }
  ];

  const [showAll, setShowAll] = useState(false);

  const recentInterventions = interventions.slice(0, 4);
  const olderInterventions = interventions.slice(4);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Débat": return "text-accent";
      case "Interview": return "text-primary";
      case "Reportage": return "text-secondary-foreground";
      default: return "text-foreground";
    }
  };

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
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="scan-line absolute -top-8 left-0 right-0 h-0.5"></div>
            <div className="scan-line absolute -bottom-8 left-0 right-0 h-0.5" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-block border border-primary/30 rounded-lg px-4 py-2 mb-6 bg-primary/10 backdrop-blur-sm">
            <span className="text-primary text-sm font-mono uppercase tracking-wider">
              ARCHIVES MÉDIATIQUES
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary glow mb-4">
            INTERVENTIONS TV
          </h1>
          <p className="text-xl text-foreground/70 font-mono">
            &gt; Communications publiques et débats télévisés
          </p>
        </div>
      </div>
      
      {/* Interventions Section */}
      <div className="flex-1 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Affiche les 4 interventions les plus récentes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {recentInterventions.map((intervention) => (
              <div 
                key={intervention.id} 
                className="project-card group cursor-pointer"
                onClick={() => intervention.link && window.open(intervention.link, '_blank')}
              >
                <div className="relative">
                  <img 
                    src={intervention.thumbnail} 
                    alt={intervention.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-background/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-primary/90 rounded-full p-4 hover:bg-primary transition-colors">
                      <Play className="h-8 w-8 text-primary-foreground fill-current" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className={`bg-card/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-mono uppercase tracking-wider ${getTypeColor(intervention.type)}`}>
                      {intervention.type}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Tv className="h-4 w-4 text-primary" />
                    <span className="text-sm text-primary font-mono">{intervention.channel}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {intervention.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {intervention.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-foreground/70 font-mono">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{intervention.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{intervention.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Section pour afficher les anciennes interventions */}
          {olderInterventions.length > 0 && (
            <>
              <div className="text-center mt-12">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center gap-2 font-mono text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  {showAll ? 'Voir moins' : 'Voir les anciennes interventions'}
                  {showAll ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>

              {showAll && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 animate-fade-in">
                  {olderInterventions.map((intervention) => (
                    <div 
                      key={intervention.id} 
                      className="project-card group cursor-pointer"
                      onClick={() => intervention.link && window.open(intervention.link, '_blank')}
                    >
                      <div className="relative">
                        <img 
                          src={intervention.thumbnail} 
                          alt={intervention.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-background/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-primary/90 rounded-full p-4 hover:bg-primary transition-colors">
                            <Play className="h-8 w-8 text-primary-foreground fill-current" />
                          </div>
                        </div>
                        <div className="absolute top-4 left-4">
                          <span className={`bg-card/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-mono uppercase tracking-wider ${getTypeColor(intervention.type)}`}>
                            {intervention.type}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Tv className="h-4 w-4 text-primary" />
                          <span className="text-sm text-primary font-mono">{intervention.channel}</span>
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {intervention.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {intervention.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-foreground/70 font-mono">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{intervention.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{intervention.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Coming Soon Section */}
          <div className="mt-16">
            <div className="form-container">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Tv className="h-8 w-8 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-primary mb-4 font-mono">
                  PROCHAINES INTERVENTIONS
                </h2>
                <div className="bg-muted/50 border border-border rounded-lg p-6">
                  <div className="text-left font-mono text-sm text-foreground/70 space-y-2">
                    <div>&gt; Programmation en cours...</div>
                    <div>&gt; Synchronisation avec les chaînes nationales...</div>
                    <div>&gt; Mise à jour du planning médiatique...</div>
                    <div className="text-primary">&gt; <span className="animate-pulse">Standby for updates_</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MediaInterventions;