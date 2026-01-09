import React, { useEffect, useState, useRef } from 'react';

interface DecipherTextProps {
  text: string;
  className?: string;
  revealDelay?: number;
  trigger?: boolean;
}

const CHARS = '†‡§¶ΓΔΘΞΠΣΦΨΩabcdef0123456789';

export const DecipherText: React.FC<DecipherTextProps> = ({ 
  text, 
  className = '', 
  revealDelay = 0,
  trigger = true 
}) => {
  const [displayText, setDisplayText] = useState('');
  const intervalRef = useRef<number | null>(null);
  // Removed unused iterationRef

  useEffect(() => {
    if (!trigger) return;

    // Start with empty or scrambled state
    const startDelay = setTimeout(() => {
      let iteration = 0;
      
      if (intervalRef.current) clearInterval(intervalRef.current);
      
      intervalRef.current = window.setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((_, index) => { // Changed 'letter' to '_' since it was unused
              if (index < iteration) {
                return text[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );

        if (iteration >= text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }

        iteration += 1 / 3; // Controls speed of reveal
      }, 30);
    }, revealDelay);

    return () => {
      clearTimeout(startDelay);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, trigger, revealDelay]);

  return <span className={className}>{displayText}</span>;
};