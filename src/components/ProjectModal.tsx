import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';
import { DecipherText } from './DecipherText';
import { useAudio } from './AudioProvider';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { playClick, playHover } = useAudio();

  useEffect(() => {
    // Lock scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-void/95 backdrop-blur-sm p-4 md:p-8"
      onClick={onClose}
    >
      <motion.div
        layoutId={`project-container-${project.id}`}
        className="relative w-full max-w-6xl h-[90vh] bg-ash/10 border border-ash/30 flex flex-col md:flex-row overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={() => { playClick(); onClose(); }}
          onMouseEnter={playHover}
          className="absolute top-4 right-4 z-50 p-2 bg-void border border-ash text-crimson hover:bg-crimson hover:text-white transition-colors duration-300 rounded-full"
        >
          <X size={24} />
        </button>

        {/* Image Side */}
        <motion.div 
          className="w-full md:w-1/2 h-[40%] md:h-full relative overflow-hidden"
        >
           <motion.img 
             layoutId={`project-image-${project.id}`}
             src={project.image} 
             alt={project.title}
             className="w-full h-full object-cover filter grayscale contrast-125"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-80" />
        </motion.div>

        {/* Content Side */}
        <div className="w-full md:w-1/2 h-[60%] md:h-full p-8 md:p-12 flex flex-col justify-between overflow-y-auto custom-scrollbar">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="font-mono text-crimson text-xs border border-crimson px-2 py-1">{project.year}</span>
              <span className="font-serif text-ghost text-xs tracking-widest uppercase">{project.category}</span>
            </motion.div>

            <motion.h2 
              layoutId={`project-title-${project.id}`}
              className="font-gothic text-4xl sm:text-5xl md:text-7xl text-bone leading-none mb-8"
            >
              {project.title}
            </motion.h2>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-6 font-sans text-ghost/80 text-lg leading-relaxed"
            >
              <p>{project.description}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-ash/20">
                 <div>
                    <h4 className="font-serif text-white text-sm font-bold mb-2">CLIENTE</h4>
                    <p className="font-mono text-xs">Entidade Confidencial</p>
                 </div>
                 <div>
                    <h4 className="font-serif text-white text-sm font-bold mb-2">SERVIÇOS</h4>
                    <p className="font-mono text-xs">Direção de Arte, Web Design</p>
                 </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="pt-8 md:pt-12"
          >
             <a href="#" className="inline-flex items-center gap-2 font-serif text-crimson hover:text-white transition-colors duration-300 text-lg tracking-widest uppercase group">
               <DecipherText text="Ver Projeto Completo" revealDelay={0} />
               <ArrowUpRight className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
             </a>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};