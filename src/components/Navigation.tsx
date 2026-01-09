import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { SectionId } from '../types';
import { Magnetic } from './Magnetic';

interface NavigationProps {
  activeSection: SectionId;
  scrollToSection: (id: SectionId) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeSection, scrollToSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { id: SectionId.HERO, label: 'Altar' },
    { id: SectionId.WORK, label: 'Criações' },
    { id: SectionId.ABOUT, label: 'O Artista' },
    { id: SectionId.CONTACT, label: 'Invocar' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-[60] border-b transition-[padding,background-color,border-color] duration-500 pointer-events-none ${
          isScrolled || isMobileMenuOpen
            ? 'bg-void/95 backdrop-blur-md border-ash/50 py-3 md:py-4'
            : 'bg-transparent border-transparent py-4 md:py-8'
        }`}
      >
        {/* Header Content - Enable pointer events for interactive elements */}
        <div className="relative max-w-7xl mx-auto px-6 flex justify-between items-center pointer-events-auto">
          {/* Logo */}
          <Magnetic strength={0.3}>
            <div 
              onClick={() => {
                scrollToSection(SectionId.HERO);
                setIsMobileMenuOpen(false);
              }}
              className="font-gothic text-2xl md:text-4xl tracking-widest cursor-pointer hover:text-crimson transition-colors duration-300 text-bone drop-shadow-md select-none p-2"
            >
              OBSIDIAN
            </div>
          </Magnetic>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Magnetic key={link.id} strength={0.4}>
                <button
                  onClick={() => scrollToSection(link.id)}
                  className={`font-serif text-sm tracking-[0.2em] uppercase relative group transition-colors duration-300 px-4 py-2 ${
                    activeSection === link.id ? 'text-crimson' : 'text-ghost hover:text-white'
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 w-full h-[1px] bg-crimson transform transition-transform duration-300 origin-right ${activeSection === link.id ? 'scale-x-100 origin-left' : 'scale-x-0 group-hover:scale-x-100 group-hover:origin-left'}`} />
                </button>
              </Magnetic>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white hover:text-crimson transition-colors focus:outline-none p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* 
         Mobile Menu Overlay 
         Z-index 55 keeps it under the nav (z-60) but over page content.
      */}
      <div
        className={`fixed inset-0 w-screen h-screen bg-void z-[55] flex flex-col items-center justify-center transition-all duration-700 cubic-bezier(0.7, 0, 0.3, 1) ${
          isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto translate-y-0 clip-path-open' 
            : 'opacity-0 pointer-events-none -translate-y-[10%] clip-path-closed'
        }`}
        style={{
          top: 0,
          left: 0,
        }}
      >
        {/* Background Grain for the Menu */}
        <div className="absolute inset-0 opacity-[0.05] bg-noise pointer-events-none" />

        <div className="flex flex-col space-y-8 md:space-y-12 text-center relative z-10">
          {navLinks.map((link, index) => (
            <button
              key={link.id}
              onClick={() => {
                scrollToSection(link.id);
                setIsMobileMenuOpen(false);
              }}
              className="font-gothic text-4xl sm:text-5xl md:text-6xl text-bone hover:text-crimson transition-all duration-500 transform"
              style={{ 
                transitionDelay: isMobileMenuOpen ? `${150 + index * 100}ms` : '0ms',
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)'
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
        
        <div 
          className="absolute bottom-12 text-crimson font-serif text-xs md:text-sm tracking-[0.4em] uppercase transition-opacity duration-1000 delay-500"
          style={{ opacity: isMobileMenuOpen ? 1 : 0 }}
        >
          Est. MMXXIV
        </div>
      </div>
    </>
  );
};