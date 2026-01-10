import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const RUNES = ['ᛟ', 'ᛞ', 'ᛝ', 'ᛚ', 'ᛗ', 'ᛖ', 'ᛒ', 'ᛏ', 'ᛊ', 'ᛉ', 'ᛇ', 'ᛈ', 'ᛃ', 'ᛁ', 'ᚾ', 'ᚺ', 'ᚲ'];

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('INICIALIZANDO O VAZIO...');
  const [rune, setRune] = useState('');

  useEffect(() => {
    // Muito mais rápido: 15ms de intervalo e incrementa 2% por vez
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400); // Delay menor antes de abrir
          return 100;
        }
        return prev + 2;
      });
      
      setRune(RUNES[Math.floor(Math.random() * RUNES.length)]);
    }, 15);

    // Troca de texto mais frenética
    const textTimer = setInterval(() => {
      const phrases = [
        "CALIBRANDO SOMBRAS...",
        "DECIFRANDO RUNAS...",
        "CARREGANDO ARQUIVOS OMITIDOS...",
        "CONECTANDO AO SUBMUNDO DIGITAL..."
      ];
      setText(phrases[Math.floor(Math.random() * phrases.length)]);
    }, 250);

    return () => {
      clearInterval(timer);
      clearInterval(textTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-stone-300 font-mono">
      <div className="w-full max-w-md px-8">
        <div className="flex justify-between mb-2 text-xs md:text-sm tracking-widest">
          <span>{text}</span>
          <span className="font-bold text-stone-500">{Math.min(100, progress).toString(16).toUpperCase().padStart(2, '0')}%</span>
        </div>
        
        <div className="relative h-1 w-full bg-stone-900 overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-stone-100 transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-8 text-center">
          <span className="text-4xl md:text-6xl animate-pulse text-stone-600 font-serif">
            {rune}
          </span>
        </div>
        
        <div className="absolute bottom-10 left-0 w-full text-center text-[10px] text-stone-700 uppercase tracking-[0.5em]">
          Kaos Nymph System v.1.0.4
        </div>
      </div>
    </div>
  );
};

export default Preloader;