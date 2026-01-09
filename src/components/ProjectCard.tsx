import React, { useState } from 'react';
import type { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';
import { DecipherText } from './DecipherText';
import { motion } from 'framer-motion';
import { useAudio } from './AudioProvider';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { playHover, playClick } = useAudio();

  const handleMouseEnter = () => {
    setIsHovered(true);
    playHover();
  };

  const handleClick = () => {
    playClick();
    onClick();
  };

  return (
    <motion.div 
      layoutId={`project-container-${project.id}`}
      className="group relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden border border-ash bg-void cursor-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Background Image - Slower, moody zoom effect */}
      <motion.div 
        layoutId={`project-image-${project.id}`}
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out group-hover:scale-110 filter grayscale brightness-50 group-hover:grayscale-[0.2] group-hover:brightness-100"
        style={{ backgroundImage: `url(${project.image})` }}
      />
      
      {/* Overlay Gradient - Ensures text readability on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-transparent opacity-60 group-hover:opacity-90 transition-all duration-700" />

      {/* Content Container */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
        
        {/* Top Number - Slides down from top */}
        <div className="absolute top-6 right-6 font-serif text-crimson text-lg md:text-xl font-bold opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out shadow-black drop-shadow-md">
          No. 0{index + 1}
        </div>

        {/* Text Content - Staggered entrance from bottom */}
        <div className="relative">
          {/* Category & Year */}
          <p className="font-serif text-crimson text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-out">
            {project.category} — {project.year}
          </p>

          {/* Title - Fixed to be opacity-0 initially */}
          <motion.h3 
            layoutId={`project-title-${project.id}`}
            className="font-gothic text-3xl sm:text-4xl md:text-5xl text-bone mb-3 md:mb-4 leading-none translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-75 ease-out drop-shadow-lg"
          >
            <DecipherText 
              text={project.title} 
              trigger={isHovered} 
              revealDelay={100} 
            />
          </motion.h3>

          {/* Decorative Line - Expands smoothly */}
          <div className="h-[1px] bg-crimson mb-4 md:mb-5 w-0 group-hover:w-full transition-all duration-1000 delay-150 ease-in-out opacity-60" />
          
          {/* Description & Icon */}
          <div className="flex items-end justify-between translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-200 ease-out">
            <p className="font-sans text-xs sm:text-sm md:text-base text-ghost/90 line-clamp-3 max-w-[85%] font-medium leading-relaxed drop-shadow-md">
              {project.description}
            </p>
            <div className="text-bone hover:text-crimson transition-colors duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1">
              <ArrowUpRight size={20} className="md:w-7 md:h-7" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};