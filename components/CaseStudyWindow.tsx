import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import GlitchText from './GlitchText';

interface CaseStudyWindowProps {
  project: Project;
  onClose: () => void;
  fastBoot?: boolean;
}

const CaseStudyWindow: React.FC<CaseStudyWindowProps> = ({ project, onClose, fastBoot = false }) => {
  const [bootSequence, setBootSequence] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  // Função para pular a animação imediatamente
  const handleSkip = () => {
    setBootSequence(100);
  };

  useEffect(() => {
    // Simula sequência de boot/carregamento de arquivo
    const bootSteps = [
      { progress: 10, log: "SOLICITANDO PERMISSÃO DE ACESSO..." },
      { progress: 30, log: "DESCRIPTOGRAFANDO ARQUIVOS..." },
      { progress: 50, log: "MONTANDO VOLUME VIRTUAL..." },
      { progress: 70, log: "RENDERIZANDO ASSETS..." },
      { progress: 90, log: "SINCRONIZANDO..." },
      { progress: 100, log: "ACESSO CONCEDIDO." }
    ];

    let currentStep = 0;
    
    // Se fastBoot for true, reduz o tempo pela metade (ou mais rápido)
    const tickRate = fastBoot ? 80 : 200;

    const interval = setInterval(() => {
      // Verifica se a animação já foi concluída (ou pulada pelo usuário)
      if (currentStep >= bootSteps.length) {
        clearInterval(interval);
        return;
      }
      
      const step = bootSteps[currentStep];
      setLogs(prev => [...prev, `[${Date.now().toString().slice(-4)}] ${step.log}`]);
      setBootSequence(step.progress);
      currentStep++;
    }, tickRate);

    return () => clearInterval(interval);
  }, [fastBoot]); // Re-run se fastBoot mudar, embora na prática não deva mudar durante a montagem

  const isLoading = bootSequence < 100;

  return (
    <div className="fixed inset-0 z-[60] bg-black flex flex-col font-mono text-stone-300">
      {/* OS Header Bar */}
      <div className="flex justify-between items-center px-2 md:px-4 py-2 border-b border-stone-800 bg-stone-950 select-none shrink-0">
        <div className="flex items-center gap-2 text-[10px] md:text-xs tracking-widest overflow-hidden">
           <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-900 animate-pulse shrink-0"></div>
           <span className="truncate">KAOS_OS // {project.id}_SECURE.DAT</span>
        </div>
        <button 
          onClick={onClose}
          className="hover:bg-red-900 hover:text-white px-2 py-1 md:px-3 text-[10px] md:text-xs border border-transparent hover:border-red-700 transition-colors whitespace-nowrap ml-2"
        >
          [ X ] <span className="hidden md:inline">ENCERRAR</span>
        </button>
      </div>

      {isLoading ? (
        // Boot Sequence Screen (Clickable to skip)
        <div 
          onClick={handleSkip}
          className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 bg-black relative overflow-hidden cursor-pointer group"
          title="Clique para pular animação"
        >
           <div className="w-full max-w-lg font-mono text-xs md:text-sm">
             <div className="mb-4 border border-stone-800 p-1">
               <div 
                 className="h-2 md:h-4 bg-stone-200 transition-all duration-200 ease-linear"
                 style={{ width: `${bootSequence}%` }}
               ></div>
             </div>
             <div className="h-48 md:h-64 overflow-y-auto border border-stone-900 p-4 bg-stone-950/50 text-stone-500 font-mono text-[10px] leading-relaxed select-none">
               {logs.map((log, i) => (
                 <div key={i} className="mb-1">{log}</div>
               ))}
               <div className="animate-pulse">_</div>
             </div>
             
             {/* Skip Hint */}
             <div className="mt-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] uppercase tracking-widest text-stone-600 border border-stone-800 px-2 py-1 bg-stone-900/50">
                   [ Clique: Acesso Rápido ]
                </span>
             </div>
           </div>
           
           {/* Background Deco */}
           <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, #222 25%, #222 26%, transparent 27%, transparent 74%, #222 75%, #222 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, #222 25%, #222 26%, transparent 27%, transparent 74%, #222 75%, #222 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }}></div>
        </div>
      ) : (
        // Content Loaded Screen
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-stone-950 animate-in fade-in zoom-in-95 duration-500">
          <div className="max-w-7xl mx-auto">
            {/* Project Header */}
            <header className="relative h-[40vh] md:h-[60vh] overflow-hidden border-b border-stone-800">
              <img src={project.imageUrl} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 p-4 md:p-16 w-full">
                <h1 className="text-5xl md:text-9xl font-serif font-black text-stone-100 mix-blend-screen mb-2 md:mb-4 tracking-tighter leading-none break-words">
                   {project.title}
                </h1>
                <div className="flex flex-wrap gap-2 md:gap-4 text-[10px] md:text-xs font-mono text-red-500 uppercase tracking-widest">
                  {project.tags.map(tag => <span key={tag} className="border border-red-900 px-2 py-1 bg-red-950/20">{tag}</span>)}
                </div>
              </div>
            </header>

            {/* Case Study Content */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 p-4 md:p-16">
              
              {/* Sidebar Info - No Mobile, aparece primeiro mas sem sticky para não ocupar tela */}
              <aside className="md:col-span-4 space-y-6 md:space-y-8 md:sticky md:top-8 h-fit order-2 md:order-1">
                <div className="border border-stone-800 p-4 md:p-6 bg-black/50 backdrop-blur-sm">
                  <h3 className="text-stone-500 text-xs mb-4 uppercase tracking-[0.2em]">Metadados</h3>
                  <div className="space-y-3 md:space-y-4 text-xs md:text-sm font-mono text-stone-300">
                    <div className="flex justify-between border-b border-stone-900 pb-2">
                      <span>CLIENTE:</span>
                      <span className="text-stone-500">[CONFIDENCIAL]</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-900 pb-2">
                      <span>ANO:</span>
                      <span>{project.year}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-900 pb-2">
                      <span>FUNÇÃO:</span>
                      <span>{project.role}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-900 pb-2">
                      <span>STATUS:</span>
                      <span className="text-green-500 animate-pulse">● DEPLOYED</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 md:p-6 border border-dashed border-stone-800 text-[10px] md:text-xs text-justify text-stone-600 font-mono hidden md:block">
                   AVISO: Renderização de alta densidade.
                </div>
              </aside>

              {/* Main Text */}
              <article className="md:col-span-8 space-y-8 md:space-y-12 order-1 md:order-2">
                <div>
                  <h2 className="text-2xl md:text-3xl font-serif mb-4 md:mb-6 text-stone-200">
                    <GlitchText text="EXECUÇÃO DO CONCEITO" />
                  </h2>
                  <p className="text-base md:text-lg leading-relaxed text-stone-400 font-serif">
                    {project.description} O desafio era desconstruir a barreira entre o usuário e a máquina. Utilizamos shaders customizados em WebGL para simular a decadência digital, criando uma metáfora visual para a obsolescência programada da sociedade moderna.
                  </p>
                  <p className="mt-4 text-base md:text-lg leading-relaxed text-stone-400 font-serif">
                    Cada interação foi micro-animada para fornecer feedback tátil, quase visceral. O sistema de cores foi restrito a tons de cinza e um vermelho de alerta, maximizando o contraste e a hierarquia visual brutalista.
                  </p>
                </div>

                {/* Mockup Images Grid */}
                <div className="grid grid-cols-1 gap-4 md:gap-8">
                  <div className="aspect-video bg-stone-900 border border-stone-800 relative group overflow-hidden">
                     {/* Imagem principal do mockup sem filtros obstrutivos */}
                     <img src={`https://picsum.photos/1200/800?random=${project.id}1`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 md:gap-8">
                    <div className="aspect-square bg-stone-900 border border-stone-800 relative group overflow-hidden">
                       <img src={`https://picsum.photos/800/800?random=${project.id}2`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                    </div>
                    <div className="aspect-square bg-stone-900 border border-stone-800 relative group overflow-hidden">
                       <img src={`https://picsum.photos/800/800?random=${project.id}3`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                    </div>
                  </div>
                </div>

                <div className="border-t border-stone-800 pt-8 md:pt-12 mt-8 md:mt-12">
                   <h3 className="text-lg md:text-xl font-mono mb-4 text-stone-500">>> CONCLUSÃO DO SISTEMA</h3>
                   <p className="text-sm md:text-base text-stone-400">
                     O projeto resultou em um aumento de 300% no engajamento do culto digital da marca. A estética rúnica se tornou a nova linguagem visual padrão para o setor.
                   </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseStudyWindow;