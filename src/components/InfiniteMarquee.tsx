import React from 'react';
import { Cross } from 'lucide-react';

interface InfiniteMarqueeProps {
  text: string;
}

export const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = ({ text }) => {
  // Split text to create variety or repeat it cleanly
  const items = [text, text, text, text];

  return (
    <div className="relative flex overflow-hidden py-4 md:py-6 bg-void border-y border-ash/30 select-none z-20 group">
      {/* Container 1 */}
      <div className="animate-marquee flex min-w-full shrink-0 items-center justify-around gap-6 md:gap-12 px-6">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-6 md:gap-12">
            <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-gothic text-ash/40 font-bold tracking-widest uppercase hover:text-crimson/50 transition-colors duration-500 whitespace-nowrap">
              {item}
            </span>
            <Cross className="text-crimson/30 w-4 h-4 md:w-6 md:h-6 rotate-45" strokeWidth={3} />
          </div>
        ))}
      </div>

      {/* Container 2 (Duplicate for seamless loop) */}
      <div className="animate-marquee flex min-w-full shrink-0 items-center justify-around gap-6 md:gap-12 px-6">
        {items.map((item, i) => (
          <div key={`dup-${i}`} className="flex items-center gap-6 md:gap-12">
            <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-gothic text-ash/40 font-bold tracking-widest uppercase hover:text-crimson/50 transition-colors duration-500 whitespace-nowrap">
              {item}
            </span>
            <Cross className="text-crimson/30 w-4 h-4 md:w-6 md:h-6 rotate-45" strokeWidth={3} />
          </div>
        ))}
      </div>
      
      {/* Vignette effect on edges to soften the entrance/exit */}
      <div className="absolute inset-y-0 left-0 w-12 md:w-24 bg-gradient-to-r from-void to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-void to-transparent z-10 pointer-events-none" />
    </div>
  );
};