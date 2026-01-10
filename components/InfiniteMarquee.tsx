import React from 'react';

interface InfiniteMarqueeProps {
  className?: string;
  reverse?: boolean;
}

const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = ({ className = '', reverse = false }) => {
  const content = "DIGITAL • DARKNESS • RUNE • SYSTEM • VOID • KAOS • GLITCH • ABYSS • ";
  
  return (
    <div className={`relative flex overflow-hidden w-full py-12 select-none pointer-events-none opacity-40 mix-blend-screen z-0 ${className}`}>
      {/* Container de duplicação para loop perfeito */}
      <div className="flex w-full">
        <div 
          className="flex min-w-full shrink-0 items-center justify-around gap-8 animate-marquee" 
          style={{ animationDirection: reverse ? 'reverse' : 'normal' }}
        >
           <span 
             className="text-5xl md:text-7xl font-serif font-black text-transparent whitespace-nowrap" 
             style={{ WebkitTextStroke: '1px #d6d3d1' }}
           >
             {content}
           </span>
        </div>
        <div 
          className="flex min-w-full shrink-0 items-center justify-around gap-8 animate-marquee" 
          style={{ animationDirection: reverse ? 'reverse' : 'normal' }}
        >
           <span 
             className="text-5xl md:text-7xl font-serif font-black text-transparent whitespace-nowrap" 
             style={{ WebkitTextStroke: '1px #d6d3d1' }}
           >
             {content}
           </span>
        </div>
      </div>
      
      {/* Vinheta lateral para suavizar a entrada/saída */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black pointer-events-none"></div>
    </div>
  );
};

export default InfiniteMarquee;