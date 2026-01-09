import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DecipherText } from './DecipherText';
import { useAudio } from './AudioProvider';

export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const { initializeAudio } = useAudio();

  useEffect(() => {
    // Simulate loading
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Random increments for organic feel
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => setShowButton(true), 500);
    }
  }, [progress]);

  const handleEnter = () => {
    initializeAudio();
    onComplete();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-void flex flex-col items-center justify-center overflow-hidden"
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
    >
      {/* Background Graphic */}
      <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
        <div className="w-[60vw] h-[60vw] border border-ash rounded-full animate-spin-slow" />
        <div className="absolute w-[40vw] h-[40vw] border border-crimson rounded-full animate-reverse-spin" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="font-gothic text-6xl md:text-9xl text-bone mb-8">
          {progress < 100 ? (
            <span>{Math.min(progress, 99).toString().padStart(2, '0')}</span>
          ) : (
            <span className="text-crimson">100</span>
          )}
          <span className="text-xl md:text-3xl ml-2 text-ash">%</span>
        </div>

        <div className="h-1 w-64 bg-ash/20 rounded-full overflow-hidden mb-8">
          <motion.div 
            className="h-full bg-crimson"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="h-12 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!showButton ? (
               <motion.div
                 key="loading"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="font-mono text-xs text-ghost tracking-widest"
               >
                 <DecipherText text="CARREGANDO AS SOMBRAS..." revealDelay={0} />
               </motion.div>
            ) : (
              <motion.button
                key="enter"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, letterSpacing: '0.3em' }}
                onClick={handleEnter}
                className="font-serif text-crimson text-sm md:text-base tracking-[0.2em] font-bold border-b border-crimson pb-1 hover:text-white hover:border-white transition-all duration-300 uppercase cursor-pointer"
              >
                Entrar no Vazio
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Footer Text */}
      <div className="absolute bottom-8 font-mono text-[10px] text-ash tracking-widest">
        OBSIDIAN PORTFOLIO // MMXXIV
      </div>
    </motion.div>
  );
};