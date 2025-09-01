import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface LoadingBarProps {
  onComplete: () => void;
  duration?: number;
  // (optionnel) override des libellés si tu veux custom par page
  titleKey?: string;
  subtitleKey?: string;
}

const LoadingBar: React.FC<LoadingBarProps> = ({
  onComplete,
  duration = 2000,
  titleKey = "loading.title",
  subtitleKey = "loading.subtitle",
}) => {
  const { t } = useTranslation();
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
          {t(titleKey)}
        </h2>
        <p className="text-foreground/70 font-mono text-sm">
          {t(subtitleKey)}
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
