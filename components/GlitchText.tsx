import React, { useState, useEffect, useRef } from 'react';
import { GlitchTextProps } from '../types';

const CHARS = 'ᚠᚢᚦᚨᚱᚲᚺᚾᛁᛃᛈᛇᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '', as: Component = 'span' }) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<number | null>(null);

  const startScramble = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((_, index) => {
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

      iteration += 1 / 3;
    }, 30);
  };

  // Trigger once on mount for effect
  useEffect(() => {
    // Optional: auto glitch on mount
    // startScramble(); 
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  return (
    <Component 
      className={`relative inline-block ${className}`}
      onMouseEnter={startScramble}
    >
      {displayText}
    </Component>
  );
};

export default GlitchText;