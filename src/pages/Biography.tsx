
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TypingAnimation from "@/components/TypingAnimation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import heroBackground from "@/assets/hero-background-tech.jpg";

const Biography = () => {
  const [showAnimation, setShowAnimation] = useState(true);
  const [showBiography, setShowBiography] = useState(false);
  
  const initializationMessages = [
    "> Initializing biographical data...",
    "> Loading career history...",
    "> Parsing UNSA Police records...",
    "> Compiling achievements...",
    "> Cross-referencing media appearances...",
    "> Data collection complete. Press to display profile."
  ];

  const handleAnimationComplete = () => {
    setShowAnimation(false);
  };

  const handleShowBiography = () => {
    setShowBiography(true);
  };

  const biographyText = `Loïc Walder is a French police officer and an active trade unionist, serving as National Delegate for Communication at UNSA Police, one of the major unions representing law enforcement professionals in France. Based in Paris, he brings both field experience and strategic communication expertise to his role.

Loïc began his career within the French National Police, developing a strong operational background before turning his focus to the defense of officers' rights and interests. His union involvement reflects a deep commitment to improving working conditions, protecting police officers, and promoting institutional transparency.

In his current position, he is responsible for overseeing internal and external communication strategies, media relations, and the union's digital presence. He plays a key role in shaping UNSA Police's public messaging, ensuring that the voices of police officers are clearly heard across all platforms.

Loïc is also known for his ability to combine serious advocacy with creative communication, often leveraging modern formats — such as digital storytelling and humor — to engage a wider audience and foster unity among officers.

Driven by values of justice, professionalism, and solidarity, Loïc Walder continues to be a strong voice for law enforcement personnel, advocating for pragmatic reforms, technical competence, and respect for the police profession.`;

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
              USER PROFILE
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary glow mb-4">
            BIOGRAPHICAL DATA
          </h1>
          <p className="text-xl text-foreground/70 font-mono">
            &gt; Professional background analysis in progress...
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
                    alt="Loïc Walder Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold text-primary mb-2 font-mono">
                  PROFILE INITIALIZATION
                </h2>
                <div className="text-accent text-sm font-mono mb-6">
                  STATUS: {showBiography ? 'COMPLETE' : 'LOADING...'} | PROGRESS: {showBiography ? '100%' : '85%'}
                </div>
              </div>
              
              {showAnimation && (
                <TypingAnimation 
                  messages={initializationMessages}
                  onComplete={handleAnimationComplete}
                  speed={30}
                />
              )}
              
              {!showAnimation && !showBiography && (
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 mb-8">
                  <div className="text-center">
                    <div className="text-primary font-mono text-sm mb-4">
                      &gt; Data collection complete. Press to display profile.
                    </div>
                    <Button 
                      onClick={handleShowBiography}
                      className="bg-primary/20 border border-primary/50 text-primary hover:bg-primary/30 font-mono"
                      variant="outline"
                    >
                      DISPLAY BIOGRAPHICAL DATA
                    </Button>
                  </div>
                </div>
              )}
              
              {showBiography && (
                <div className="bg-muted/50 border border-border rounded-lg p-8 text-left animate-fade-in">
                  <div className="prose prose-invert max-w-none">
                    <div className="text-foreground leading-relaxed whitespace-pre-line">
                      {biographyText}
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
