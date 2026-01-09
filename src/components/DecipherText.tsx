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
  const iterationRef = useRef(0);

  useEffect(() => {
    if (!trigger) return;

    // Start with empty or scrambled state
    const startDelay = setTimeout(() => {
      let iteration = 0;
      
      clearInterval(intervalRef.current as number);
      
      intervalRef.current = window.setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );

        if (iteration >= text.length) {
          clearInterval(intervalRef.current as number);
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