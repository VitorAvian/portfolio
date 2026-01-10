import React, { useState, useRef } from 'react';
import { Project } from '../types';
import GlitchText from './GlitchText';
import CaseStudyWindow from './CaseStudyWindow';
import { PROJECTS } from '../constants';

// Simple close icon
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// Componente Wrapper para Efeito 3D Tilt
const TiltCard = ({ 
  children, 
  onClick, 
  onMouseEnter, 
  onMouseLeave,
  className = ""
}: { 
  children: React.ReactNode; 
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calcula rotação (max 15 graus)
    // Eixo Y do mouse controla rotação X (tilt vertical)
    // Eixo X do mouse controla rotação Y (tilt horizontal)
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    // Aplica transformação com transição rápida (0.1s) para suavizar (efeito lerp via CSS)
    cardRef.current.style.transition = 'transform 0.1s ease-out';
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    
    // Atualiza posição do Glare
    if (glareRef.current) {
        glareRef.current.style.opacity = '1';
        glareRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15) 0%, transparent 70%)`;
    }
  };

  const handleMouseLeaveLocal = () => {
    if (!cardRef.current) return;
    
    // Retorno suave à posição original
    cardRef.current.style.transition = 'transform 0.5s ease-out';
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    
    if (glareRef.current) {
        glareRef.current.style.opacity = '0';
    }
    
    if (onMouseLeave) onMouseLeave();
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeaveLocal}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
      {/* Camada de Glare */}
      <div 
        ref={glareRef}
        className="absolute inset-0 pointer-events-none z-50 mix-blend-overlay rounded-sm transition-opacity duration-300"
        style={{ opacity: 0 }} 
      />
    </div>
  );
};

const ProjectGallery: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);
  const [hasViewedAnyProject, setHasViewedAnyProject] = useState(false);

  const handleOpenCaseStudy = () => {
    setIsCaseStudyOpen(true);
    // Marca que o usuário já iniciou uma leitura, tornando as próximas mais rápidas
    if (!hasViewedAnyProject) {
      setHasViewedAnyProject(true);
    }
  };

  const handleCloseCaseStudy = () => {
    setIsCaseStudyOpen(false);
    // Opcional: Se quiser fechar o modal anterior também, descomente abaixo
    // setSelectedProject(null); 
  };

  return (
    <section id="projects" className="min-h-screen py-16 md:py-24 relative overflow-hidden scroll-mt-32">
      {/* Background Noise/Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-xs md:text-base font-mono text-stone-500 mb-8 md:mb-12 tracking-widest uppercase border-b border-stone-800 pb-4">
          Arquivos Recuperados
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {PROJECTS.map((project, index) => (
            <TiltCard 
              key={project.id}
              className="group cursor-pointer relative"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative overflow-hidden aspect-[4/3] bg-stone-900 mb-4 border border-stone-800 transition-all duration-500 group-hover:border-stone-100 transform-style-3d">
                {/* Imagem Padrão Limpa */}
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay simples de cor ao hover (opcional, mantendo sutileza) */}
                <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-transparent transition-colors duration-300"></div>
                
                <div className="absolute bottom-0 left-0 p-4 bg-black/80 backdrop-blur-sm w-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:block z-10">
                   <p className="font-mono text-xs text-stone-400">ABRIR ARQUIVO_</p>
                </div>
              </div>

              <div className="flex items-baseline justify-between border-b border-stone-800 pb-2 group-hover:border-stone-500 transition-colors transform-style-3d">
                <h3 className="text-xl md:text-3xl font-serif text-stone-100">
                  <span className="mr-2 md:mr-4 text-[10px] md:text-xs font-mono text-stone-600 align-middle">0{index + 1}</span>
                  <GlitchText text={project.title} />
                </h3>
                <span className="font-mono text-[10px] md:text-xs text-stone-500">{project.year}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2 transform-style-3d">
                {project.tags.map(tag => (
                   <span key={tag} className="text-[10px] uppercase tracking-wider border border-stone-800 px-2 py-0.5 text-stone-500 group-hover:text-stone-300 group-hover:border-stone-600 transition-colors">
                     {tag}
                   </span>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Project Summary Modal */}
      {selectedProject && !isCaseStudyOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/90 backdrop-blur-lg md:p-4 animate-in fade-in duration-300">
          <div className="relative w-full max-w-5xl bg-stone-950 border-t md:border border-stone-800 h-[90dvh] md:h-auto md:max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl shadow-black flex flex-col md:block">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-stone-900/80 backdrop-blur-md hover:bg-stone-100 hover:text-black transition-colors border border-stone-700 rounded-full"
            >
              <CloseIcon />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 flex-1">
              <div className="h-[35vh] md:h-auto overflow-hidden border-b md:border-b-0 md:border-r border-stone-800 relative shrink-0">
                 <img src={selectedProject.imageUrl} alt={selectedProject.title} className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-stone-950 to-transparent md:hidden opacity-50"></div>
              </div>
              
              <div className="p-6 md:p-12 flex flex-col justify-between h-full">
                <div className="overflow-y-auto md:overflow-visible pr-2 md:pr-0">
                   <h2 className="text-3xl md:text-6xl font-serif mb-2 text-white leading-none">{selectedProject.title}</h2>
                   <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6 md:mb-8 text-[10px] md:text-xs font-mono text-stone-500 border-b border-stone-800 pb-6 md:pb-8 uppercase tracking-wider">
                     <span>ROLE: {selectedProject.role}</span>
                     <span>YEAR: {selectedProject.year}</span>
                     <span>ID: {selectedProject.id}</span>
                   </div>
                   
                   <p className="text-base md:text-xl text-stone-300 leading-relaxed font-serif">
                     {selectedProject.description}
                   </p>
                   
                   <p className="mt-4 md:mt-6 text-xs md:text-sm text-stone-500 font-mono">
                     Esta identidade visual foi forjada nas profundezas de algoritmos proibidos, misturando a brutalidade da pedra rúnica com a efemeridade do pixel.
                   </p>
                </div>

                <div className="mt-8 md:mt-12 sticky bottom-0 md:relative bg-stone-950 pt-4 md:pt-0 pb-2 md:pb-0 z-10">
                  <button 
                    onClick={handleOpenCaseStudy}
                    className="group w-full py-3 md:py-4 border border-stone-600 hover:bg-stone-100 hover:text-black hover:border-stone-100 transition-all duration-300 flex items-center justify-center gap-2 font-mono uppercase tracking-widest text-xs md:text-sm relative overflow-hidden"
                  >
                    <span className="relative z-10 group-hover:animate-pulse">Iniciar Protocolo</span>
                    <span className="relative z-10 group-hover:translate-x-1 transition-transform">→</span>
                    
                    {/* Background slide effect */}
                    <div className="absolute inset-0 bg-stone-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-0"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full OS Window for Case Study */}
      {selectedProject && isCaseStudyOpen && (
        <CaseStudyWindow 
          project={selectedProject} 
          onClose={handleCloseCaseStudy}
          fastBoot={hasViewedAnyProject}
        />
      )}
    </section>
  );
};

export default ProjectGallery;