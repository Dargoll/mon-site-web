import { useState, useEffect } from 'react';

interface TypingAnimationProps {
  messages: string[];
  onComplete: () => void;
  speed?: number;
}

const TypingAnimation = ({ messages, onComplete, speed = 50 }: TypingAnimationProps) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentMessageIndex >= messages.length) {
      setIsComplete(true);
      setTimeout(onComplete, 1000);
      return;
    }

    const currentMessage = messages[currentMessageIndex];
    
    if (currentCharIndex < currentMessage.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + currentMessage[currentCharIndex]);
        setCurrentCharIndex(prev => prev + 1);
      }, speed);
      
      return () => clearTimeout(timeout);
    } else {
      // Move to next message after a pause
      const timeout = setTimeout(() => {
        setCurrentMessageIndex(prev => prev + 1);
        setCurrentText(prev => prev + '\n');
        setCurrentCharIndex(0);
      }, 800);
      
      return () => clearTimeout(timeout);
    }
  }, [currentMessageIndex, currentCharIndex, messages, speed, onComplete]);

  return (
    <div className="bg-muted/50 border border-border rounded-lg p-6 mb-8">
      <div className="text-left font-mono text-sm text-foreground/70 space-y-2">
        <pre className="whitespace-pre-wrap">
          {currentText}
          {!isComplete && <span className="animate-pulse text-primary">_</span>}
        </pre>
      </div>
    </div>
  );
};

export default TypingAnimation;