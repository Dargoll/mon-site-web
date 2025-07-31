import { useState, useEffect } from 'react';

interface LoadingBarProps {
  onComplete: () => void;
  duration?: number;
}

const LoadingBar = ({ onComplete, duration = 2000 }: LoadingBarProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progressPercent = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(progressPercent);
      
      if (progressPercent < 100) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(onComplete, 200);
      }
    };
    
    requestAnimationFrame(animate);
  }, [duration, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary mb-2 font-mono">
          INITIALIZING SYSTEM
        </h2>
        <p className="text-foreground/70 font-mono text-sm">
          Loading UNSA Police Network...
        </p>
      </div>
      
      <div className="w-80 bg-muted/30 rounded-full h-2 overflow-hidden border border-border/30">
        <div 
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="text-center">
        <span className="text-primary font-mono text-sm">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};

export default LoadingBar;