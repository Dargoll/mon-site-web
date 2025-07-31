
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import LoadingBar from "@/components/LoadingBar";
import AnimatedCounter from "@/components/AnimatedCounter";
import TypingDecode from "@/components/TypingDecode";
import heroBackground from "@/assets/hero-background-tech.jpg";

const Homepage = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showMainContent, setShowMainContent] = useState(false);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setTimeout(() => setShowMainContent(true), 300);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      {/* Loading Screen */}
      {showIntro && (
        <div className="flex-1 flex items-center justify-center relative">
          <div className="relative z-10 text-center px-6 max-w-4xl">
            <LoadingBar 
              onComplete={handleIntroComplete}
              duration={3000}
            />
          </div>
        </div>
      )}

      {/* Hero Section */}
      {!showIntro && (
        <div 
          className={`flex-1 flex items-center justify-center relative transition-opacity duration-500 ${showMainContent ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backgroundImage: `linear-gradient(rgba(34, 40, 49, 0.9), rgba(34, 40, 49, 0.7)), url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Content */}
          <div className="relative z-10 text-center px-6 max-w-5xl">
            <div className="mb-8">
              <div className="inline-block border border-primary/30 rounded-lg px-4 py-2 mb-6 bg-primary/10 backdrop-blur-sm animate-fade-in">
                <span className="text-primary text-sm font-mono uppercase tracking-wider">
                  SYSTEM ACTIVATED
                </span>
              </div>
            </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            <TypingDecode 
              text="Loïc WALDER"
              duration={3000}
              delay={500}
            />
          </h1>
          
          <div className="border-l-4 border-primary pl-6 mb-8">
            <h2 className="text-xl md:text-2xl font-medium text-foreground/90 mb-2">
              NATIONAL DELEGATE UNSA POLICE
            </h2>
            <div className="text-primary font-mono text-sm">
              ID: 001 | STATUS: ACTIVE | CLEARANCE: NATIONAL
            </div>
          </div>
          
          <p className="text-lg md:text-xl text-foreground/70 mb-12 max-w-3xl mx-auto font-mono">
            &gt; MISSION: Security and justice for all citizens
            <span className="animate-pulse text-primary">_</span>
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link 
              to="/biography" 
              className="btn-hero group"
            >
              <span className="mr-2">&gt;</span>
              ACCESS PROFILE
              <span className="ml-2 group-hover:translate-x-1 transition-transform">[ENTER]</span>
            </Link>
            <Link 
              to="/media" 
              className="btn-hero-secondary group"
            >
              <span className="mr-2">@</span>
              ACCESS MEDIA
              <span className="ml-2 group-hover:translate-x-1 transition-transform">[TV]</span>
            </Link>
          </div>
          
          {/* Technical Stats with Animated Counters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4 hover:bg-card/70 hover:border-primary/50 transition-all duration-300 hover:scale-105">
              <div className="text-primary text-2xl font-bold font-mono">
                24/7
              </div>
              <div className="text-sm text-foreground/70 uppercase tracking-wide">Availability</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4 hover:bg-card/70 hover:border-primary/50 transition-all duration-300 hover:scale-105">
              <div className="text-primary text-2xl font-bold font-mono">
                <AnimatedCounter end={100} suffix="%" duration={2500} />
              </div>
              <div className="text-sm text-foreground/70 uppercase tracking-wide">Commitment</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4 hover:bg-card/70 hover:border-primary/50 transition-all duration-300 hover:scale-105">
              <div className="text-primary text-2xl font-bold font-mono">
                ∞
              </div>
              <div className="text-sm text-foreground/70 uppercase tracking-wide">Determination</div>
            </div>
          </div>
          </div>
          
          {/* Floating Button */}
          <a 
            href="https://www.unsapolice.com/adherez-renouvelez-en-ligne/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-floating group"
          >
            <span className="mr-2">⚡</span>
            JOIN UNSA Police
            <span className="ml-2 group-hover:rotate-90 transition-transform">[+]</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default Homepage;
