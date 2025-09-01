import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

type TypingAnimationProps = {
  /** Tableau de CLÉS i18n (ex: ["bio.init.initData", "bio.init.loadCareer", ...]) */
  messages: string[];
  /** Vitesse de frappe (ms par caractère) */
  speed?: number;
  /** Temps d'attente entre deux lignes (ms) */
  lineDelay?: number;
  /** Callback quand toutes les lignes sont terminées */
  onComplete?: () => void;
  /** Classe CSS optionnelle */
  className?: string;
};

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  messages,
  speed = 30,
  lineDelay = 600,
  onComplete,
  className
}) => {
  const { t, i18n } = useTranslation();

  // Indice de la ligne en cours et nombre de caractères “tapés” pour cette ligne
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  // Pour éviter les effets concurrents
  const timerRef = useRef<number | null>(null);
  const linePauseRef = useRef<number | null>(null);

  // On mémorise les traductions courantes pour toutes les clés
  // -> se met à jour automatiquement quand i18n.language change
  const lines = useMemo(() => messages.map((k) => t(k)), [messages, t, i18n.language]);

  // Clamp du charIndex si la longueur de la traduction courante change (changement de langue)
  useEffect(() => {
    const current = lines[lineIndex] ?? "";
    if (charIndex > current.length) {
      setCharIndex(current.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines, lineIndex]);

  // Typing effect
  useEffect(() => {
    // Nettoyage des timers précédents
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (linePauseRef.current) {
      window.clearTimeout(linePauseRef.current);
      linePauseRef.current = null;
    }

    const typeNext = () => {
      const currentLine = lines[lineIndex] ?? "";
      if (charIndex < currentLine.length) {
        setCharIndex((c) => c + 1);
      } else {
        // Ligne terminée → on attend un peu puis on passe à la suivante
        if (lineIndex < lines.length - 1) {
          if (!linePauseRef.current) {
            linePauseRef.current = window.setTimeout(() => {
              setLineIndex((i) => i + 1);
              setCharIndex(0);
              linePauseRef.current = null;
            }, lineDelay);
          }
        } else {
          // Tout est fini
          onComplete?.();
        }
      }
    };

    // Lance l'intervalle de frappe
    timerRef.current = window.setInterval(typeNext, speed);

    // Cleanup
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      if (linePauseRef.current) window.clearTimeout(linePauseRef.current);
      timerRef.current = null;
      linePauseRef.current = null;
    };
  }, [lines, lineIndex, charIndex, speed, lineDelay, onComplete]);

  return (
    <div className={className ?? "text-left font-mono text-sm text-foreground/80 space-y-2"}>
      {lines.map((full, i) => {
        const content =
          i < lineIndex
            ? full // lignes terminées (retraduites automatiquement)
            : i === lineIndex
            ? full.slice(0, charIndex) // ligne en cours
            : ""; // lignes à venir

        return (
          <div key={`${i}-${full.slice(0, 10)}`}>
            {content}
            {i === lineIndex && <span className="animate-pulse text-primary">_</span>}
          </div>
        );
      })}
    </div>
  );
};

export default TypingAnimation;
