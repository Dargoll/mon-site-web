import { useState, useEffect } from 'react';

interface TypingDecodeProps {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
}

const TypingDecode = ({ text, className = "", duration = 2000, delay = 0 }: TypingDecodeProps) => {
  const [displayText, setDisplayText] = useState('');
  const [isDecoding, setIsDecoding] = useState(false);

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÖÜÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÙÚÛÝ0123456789!@#$%^&*()';

  useEffect(() => {
    const startDecoding = () => {
      setIsDecoding(true);
      const textArray = text.split('');
      const finalArray = [...textArray];
      let currentArray = textArray.map(() => 
        characters[Math.floor(Math.random() * characters.length)]
      );
      
      setDisplayText(currentArray.join(''));
      
      const iterations = 20; // Number of scrambling iterations
      const iterationDuration = duration / iterations;
      
      let currentIteration = 0;
      
      const interval = setInterval(() => {
        currentIteration++;
        
        // Calculate how many characters should be "resolved" by now
        const resolvedCount = Math.floor((currentIteration / iterations) * textArray.length);
        
        currentArray = textArray.map((char, index) => {
          if (index < resolvedCount) {
            return finalArray[index]; // Show final character
          } else if (char === ' ') {
            return ' '; // Keep spaces as spaces
          } else {
            return characters[Math.floor(Math.random() * characters.length)]; // Random character
          }
        });
        
        setDisplayText(currentArray.join(''));
        
        if (currentIteration >= iterations) {
          clearInterval(interval);
          setDisplayText(text); // Ensure final text is exactly correct
          setIsDecoding(false);
        }
      }, iterationDuration);
      
      return () => clearInterval(interval);
    };

    const timer = setTimeout(startDecoding, delay);
    return () => clearTimeout(timer);
  }, [text, duration, delay, characters]);

  return (
    <span className={`${className} inline-block`} style={{ minWidth: 'fit-content' }}>
      {displayText}
    </span>
  );
};

export default TypingDecode;