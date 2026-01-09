import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled past 80% of the viewport (exiting Hero)
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-40 p-4 border border-ash bg-void/90 text-crimson transition-all duration-500 ease-out backdrop-blur-sm group
        ${isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'}
        hover:border-crimson hover:bg-ash/10 hover:shadow-[0_0_20px_rgba(255,51,51,0.15)]
      `}
      aria-label="Subir ao topo"
    >
      <div className="relative">
        <ArrowUp size={24} className="transition-transform duration-500 group-hover:-translate-y-1" />
        
        {/* Gothic Corner Accents - Reveal on Hover */}
        <div className="absolute -top-3 -left-3 w-2 h-2 border-t border-l border-crimson opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-top-2 group-hover:-left-2" />
        <div className="absolute -top-3 -right-3 w-2 h-2 border-t border-r border-crimson opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-top-2 group-hover:-right-2" />
        <div className="absolute -bottom-3 -left-3 w-2 h-2 border-b border-l border-crimson opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-bottom-2 group-hover:-left-2" />
        <div className="absolute -bottom-3 -right-3 w-2 h-2 border-b border-r border-crimson opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-bottom-2 group-hover:-right-2" />
      </div>
    </button>
  );
};