import React, { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { ProjectCard } from './components/ProjectCard';
import { DecipherText } from './components/DecipherText';
import { ScrollToTop } from './components/ScrollToTop';
import { InfiniteMarquee } from './components/InfiniteMarquee';
import { Magnetic } from './components/Magnetic';
import { SectionId } from './types';
import type { Project } from './types';
import { ChevronDown, Instagram, Linkedin, Mail, Twitter } from 'lucide-react';

const projects: Project[] = [
  {
    id: '1',
    title: 'The Silent Masquerade',
    category: 'Identidade Visual',
    image: 'https://picsum.photos/800/1000?grayscale&random=1',
    year: '2023',
    description: 'Um sistema de identidade visual para uma companhia de teatro de vanguarda underground focada em experiências de horror imersivo.'
  },
  {
    id: '2',
    title: 'Void Magazine',
    category: 'Editorial',
    image: 'https://picsum.photos/800/1000?grayscale&random=2',
    year: '2023',
    description: 'Direção de arte e design de layout para uma publicação trimestral explorando o niilismo na cultura digital moderna.'
  },
  {
    id: '3',
    title: 'Cryptic Glyphs',
    category: 'Tipografia',
    image: 'https://picsum.photos/800/1000?grayscale&random=3',
    year: '2024',
    description: 'Uma família tipográfica blackletter personalizada, projetada para uso em destaques de alto impacto em capas de álbuns de heavy metal.'
  },
  {
    id: '4',
    title: 'Nocturnal Spirits',
    category: 'Embalagem',
    image: 'https://picsum.photos/800/1000?grayscale&random=4',
    year: '2024',
    description: 'Design de rótulo e estética de garrafa para uma edição limitada de gin botânico com infusão de absinto.'
  }
];

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.HERO);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  // Form State
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const scrollToSection = (id: SectionId) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(id);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = Object.values(SectionId);
      for (const section of sections) {
        const element = document.getElementById(section as string);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3) {
            setActiveSection(section as SectionId);
          }
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const validate = () => {
    const newErrors = { name: '', email: '', message: '' };
    let isValid = true;

    if (!formState.name.trim()) {
      newErrors.name = 'IDENTIDADE_NECESSÁRIA';
      isValid = false;
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'FREQUÊNCIA_AUSENTE';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
       newErrors.email = 'COORDENADAS_INVÁLIDAS';
       isValid = false;
    }

    if (!formState.message.trim()) {
      newErrors.message = 'O_VAZIO_NAO_PODE_ESTAR_VAZIO';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      
      console.log("🔮 [OBSIDIAN] Iniciando ritual de transmissão...");

      try {
        const response = await fetch("https://formsubmit.co/ajax/vitoravian@uol.com.br", {
          method: "POST",
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            // Configurações do FormSubmit
            _subject: `[OBSIDIAN] Nova Invocação: ${formState.name}`,
            _template: 'box',
            _captcha: 'false', // Desativa captcha para fluxo mais limpo
            
            // Dados visíveis no e-mail
            Identidade: formState.name,
            Frequencia: formState.email,
            Mensagem: formState.message,
          })
        });

        // Tenta ler a resposta do servidor para debugging
        const result = await response.json();
        console.log("🔮 [OBSIDIAN] Resposta do Vazio:", result);

        if (response.ok) {
          console.log("✅ [OBSIDIAN] Transmissão aceita com sucesso.");
          setIsSuccess(true);
          setFormState({ name: '', email: '', message: '' });
          setTimeout(() => setIsSuccess(false), 5000);
        } else {
          console.error("❌ [OBSIDIAN] O Vazio rejeitou a transmissão. Status:", response.status);
          alert("Erro na transmissão. Verifique o console (F12) para detalhes.");
        }
      } catch (error) {
         console.error("❌ [OBSIDIAN] Erro de conexão com o éter:", error);
         alert("Falha na conexão. Tente novamente.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="relative min-h-screen bg-void text-bone overflow-hidden selection:bg-crimson/30">
      <CustomCursor />
      <ScrollToTop />
      
      {/* Global Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-40 bg-noise opacity-[0.03] mix-blend-overlay" />
      
      {/* Ambient Spotlight */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at ${50 + mousePos.x * 20}% ${50 + mousePos.y * 20}%, rgba(40, 40, 45, 0.4) 0%, rgba(5, 5, 5, 1) 60%)`
        }}
      />

      <Navigation activeSection={activeSection} scrollToSection={scrollToSection} />

      {/* HERO SECTION */}
      <section id={SectionId.HERO} className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 md:px-6 perspective-1000">
        <div className="relative z-10 text-center flex flex-col items-center w-full">
          <p className="font-serif text-crimson font-bold tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-base mb-4 md:mb-6 opacity-0 animate-fade-in drop-shadow-[0_0_10px_rgba(255,51,51,0.5)]">
            <DecipherText text="EST. MMXXIV" revealDelay={500} />
          </p>
          
          <div className="glitch-wrapper w-full">
             <h1 className="font-gothic text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] leading-[0.8] mb-4 mix-blend-difference hover:scale-105 transition-transform duration-700 text-bone glitch-text cursor-default">
              <div className="overflow-hidden">
                 <DecipherText text="ALQUIMIA" revealDelay={800} />
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-ghost to-ash block">
                 <DecipherText text="DIGITAL" revealDelay={1400} />
              </span>
            </h1>
          </div>
          
          <p className="font-sans text-ghost max-w-[90%] md:max-w-xl mx-auto mt-6 md:mt-8 text-sm sm:text-base md:text-xl leading-relaxed tracking-wide font-medium opacity-0 animate-slide-up-fade delay-[2000ms]">
            Tecendo a escuridão em narrativas visuais. Uma abordagem brutalista ao design gráfico moderno.
          </p>

          <Magnetic strength={0.6}>
            <button 
              onClick={() => scrollToSection(SectionId.WORK)}
              className="mt-12 md:mt-16 group flex flex-col items-center gap-4 text-ghost hover:text-crimson transition-colors duration-300 opacity-0 animate-fade-in delay-[2500ms] p-8"
            >
              <span className="font-serif text-[10px] md:text-xs tracking-widest uppercase font-bold group-hover:tracking-[0.25em] transition-all">Descer</span>
              <ChevronDown className="animate-bounce w-5 h-5 md:w-6 md:h-6" />
            </button>
          </Magnetic>
        </div>

        {/* Parallax Background Text - Hero */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-gothic text-white/5 whitespace-nowrap pointer-events-none select-none z-0"
          style={{ transform: `translate(-50%, calc(-50% + ${scrollY * 0.2}px))` }}
        >
          OBSIDIAN
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-crimson/30 to-transparent opacity-0 animate-fade-in delay-500" />
        <div className="absolute top-0 left-1/2 h-full w-[1px] bg-gradient-to-b from-transparent via-crimson/30 to-transparent opacity-0 animate-fade-in delay-500" />
      </section>

      <InfiniteMarquee text="ARTES DAS TREVAS // ELEGÂNCIA BRUTALISTA // DESIGN DO VAZIO //" />

      {/* WORK SECTION */}
      <section id={SectionId.WORK} className="relative py-20 md:py-32 z-10">
        {/* Full Screen Noise Overlay for Work Section */}
        <div className="absolute inset-0 bg-noise opacity-[0.06] pointer-events-none mix-blend-overlay z-0" />

        {/* Parallax Background Text - Work */}
        <div 
          className="absolute top-0 right-0 text-[15vw] font-gothic text-white/5 whitespace-nowrap pointer-events-none select-none z-0 leading-none"
          style={{ transform: `translateY(${ (scrollY - window.innerHeight) * 0.1 }px)` }}
        >
          CRIAÇÃO
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 md:mb-24 border-b border-ash pb-8 gap-4 md:gap-0">
            <div>
              <h2 className="font-gothic text-5xl sm:text-6xl md:text-7xl text-white drop-shadow-lg">
                <DecipherText text="Obra" revealDelay={300} trigger={activeSection === SectionId.WORK} />
              </h2>
              <p className="font-serif text-crimson mt-2 tracking-widest font-bold text-xs md:text-sm">TRABALHOS SELECIONADOS</p>
            </div>
            <div className="text-left md:text-right">
              <p className="font-sans text-ghost text-sm md:text-base font-medium">Explore o arquivo de experimentos visuais<br className="hidden md:block"/>e artes das trevas comerciais.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {projects.map((project, index) => (
              <div key={project.id} className={`${index % 2 !== 0 ? 'md:translate-y-24' : ''}`}>
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id={SectionId.ABOUT} className="relative py-20 md:py-32 bg-ash/5 z-10 overflow-hidden">
        <div 
          className="absolute bottom-0 left-0 text-[15vw] font-gothic text-white/5 whitespace-nowrap pointer-events-none select-none z-0 leading-none"
          style={{ transform: `translateY(${ (scrollY - window.innerHeight * 2) * -0.15 }px)` }}
        >
          ARQUITETO
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 relative">
             <div className="relative aspect-[3/4] border border-ash p-2 bg-void group overflow-hidden">
               <div className="absolute inset-0 bg-void/10 z-10 hover:bg-transparent transition-colors duration-500" />
               <img 
                src="https://picsum.photos/600/800?grayscale" 
                alt="Retrato" 
                className="w-full h-full object-cover filter contrast-125 sepia-[.1] group-hover:scale-105 transition-transform duration-700 ease-out"
               />
               {/* Corner Accents */}
               <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-crimson" />
               <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-crimson" />
               
               <div className="absolute -bottom-6 -right-6 w-24 h-24 border-2 border-crimson/80 flex items-center justify-center animate-spin-slow bg-void rounded-full scale-75 md:scale-100">
                  <div className="w-3 h-3 bg-crimson rounded-full shadow-[0_0_15px_#ff3333]" />
               </div>
             </div>
          </div>
          <div className="md:col-span-7">
            <h2 className="font-gothic text-4xl sm:text-5xl md:text-6xl mb-6 md:mb-8 leading-none text-white">
              O Arquiteto <br />
              <span className="text-crimson drop-shadow-[0_0_8px_rgba(255,51,51,0.4)]">
                 <DecipherText text="das Sombras" revealDelay={500} trigger={activeSection === SectionId.ABOUT} />
              </span>
            </h2>
            <div className="space-y-6 font-sans text-ghost leading-relaxed text-base md:text-lg font-medium">
              <p>
                Meu nome é Obsidian. Opero na interseção da estética gótica tradicional e da arquitetura web brutalista.
              </p>
              <p>
                Acredito que o design não deve ser apenas visto, mas sentido. Ele deve assombrar o espectador, deixando uma impressão duradoura de mistério e elegância. Com mais de uma década de experiência, removo o supérfluo para revelar o núcleo cru e sombrio da identidade de uma marca.
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-ash/50 pt-8">
               <div>
                 <h4 className="font-serif text-white mb-3 tracking-widest text-sm font-bold border-l-2 border-crimson pl-3">DISCIPLINAS</h4>
                 <ul className="text-ghost text-sm space-y-2 font-mono pl-3">
                   <li className="hover:text-crimson transition-colors cursor-crosshair">Direção de Arte</li>
                   <li className="hover:text-crimson transition-colors cursor-crosshair">Design UI/UX</li>
                   <li className="hover:text-crimson transition-colors cursor-crosshair">Identidade de Marca</li>
                   <li className="hover:text-crimson transition-colors cursor-crosshair">Ilustração</li>
                 </ul>
               </div>
               <div>
                 <h4 className="font-serif text-white mb-3 tracking-widest text-sm font-bold border-l-2 border-crimson pl-3">RECONHECIMENTO</h4>
                 <ul className="text-ghost text-sm space-y-2 font-mono pl-3">
                   <li className="hover:text-crimson transition-colors cursor-crosshair">Awwwards - SOTD</li>
                   <li className="hover:text-crimson transition-colors cursor-crosshair">Coletivo Dark Arts</li>
                   <li className="hover:text-crimson transition-colors cursor-crosshair">Destaque no Behance</li>
                 </ul>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id={SectionId.CONTACT} className="relative py-20 md:py-32 min-h-[80vh] flex flex-col justify-between px-6 md:px-12 z-10 border-t border-ash bg-void">
        {/* Full Screen Noise Overlay for Contact Section */}
        <div className="absolute inset-0 bg-noise opacity-[0.06] pointer-events-none mix-blend-overlay z-0" />
        
        <div className="max-w-4xl mx-auto w-full text-center relative z-10">
          <h2 className="font-gothic text-[3.5rem] sm:text-[5rem] md:text-[7rem] leading-none mb-4 hover:text-crimson transition-colors duration-500 cursor-default text-bone drop-shadow-xl break-words">
             <DecipherText text="Invoque-me" revealDelay={200} trigger={activeSection === SectionId.CONTACT} />
          </h2>
          <p className="font-serif text-ghost tracking-widest mb-12 md:mb-16 font-bold text-sm md:text-lg px-4">
            VOCÊ ESTÁ PRONTO PARA ABRAÇAR A ESCURIDÃO?
          </p>

          <form className="max-w-md mx-auto space-y-8 text-left" onSubmit={handleSubmit}>
            <div className="group relative">
              <label className="block font-mono text-xs text-crimson font-bold mb-2 group-hover:text-white transition-colors">
                IDENTIDADE {errors.name && <span className="text-crimson/70 ml-2 animate-pulse">[{errors.name}]</span>}
              </label>
              <input 
                name="name"
                value={formState.name}
                onChange={handleChange}
                type="text" 
                placeholder="Quem chama?" 
                className={`w-full bg-transparent border-b py-3 text-lg md:text-xl font-serif text-white focus:outline-none transition-colors placeholder:text-neutral-600 focus:placeholder:text-neutral-500 peer ${errors.name ? 'border-crimson' : 'border-ash focus:border-crimson'}`}
              />
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-crimson transition-all duration-500 peer-focus:w-full" />
            </div>
            
            <div className="group relative">
               <label className="block font-mono text-xs text-crimson font-bold mb-2 group-hover:text-white transition-colors">
                TRANSMISSÃO {errors.email && <span className="text-crimson/70 ml-2 animate-pulse">[{errors.email}]</span>}
              </label>
              <input 
                name="email"
                value={formState.email}
                onChange={handleChange}
                type="email" 
                placeholder="Onde responder?" 
                className={`w-full bg-transparent border-b py-3 text-lg md:text-xl font-serif text-white focus:outline-none transition-colors placeholder:text-neutral-600 focus:placeholder:text-neutral-500 peer ${errors.email ? 'border-crimson' : 'border-ash focus:border-crimson'}`}
              />
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-crimson transition-all duration-500 peer-focus:w-full" />
            </div>

            <div className="group relative">
               <label className="block font-mono text-xs text-crimson font-bold mb-2 group-hover:text-white transition-colors">
                MENSAGEM {errors.message && <span className="text-crimson/70 ml-2 animate-pulse">[{errors.message}]</span>}
              </label>
              <textarea 
                name="message"
                value={formState.message}
                onChange={handleChange}
                rows={3}
                placeholder="Fale o que pensa..." 
                className={`w-full bg-transparent border-b py-3 text-lg md:text-xl font-serif text-white focus:outline-none transition-colors placeholder:text-neutral-600 focus:placeholder:text-neutral-500 resize-none peer ${errors.message ? 'border-crimson' : 'border-ash focus:border-crimson'}`}
              />
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-crimson transition-all duration-500 peer-focus:w-full" />
            </div>
            
            <Magnetic strength={0.3} className="w-full">
              <button 
                disabled={isSubmitting}
                className={`relative w-full py-5 border border-ash group overflow-hidden transition-all duration-300 font-serif font-bold tracking-[0.2em] uppercase mt-8 text-sm md:text-base ${isSubmitting ? 'cursor-wait opacity-70' : 'hover:text-void text-ghost'}`}
              >
                <div className={`absolute inset-0 w-full h-full bg-crimson translate-y-full transition-transform duration-300 ease-in-out ${!isSubmitting && 'group-hover:translate-y-0'}`} />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                     <span className="animate-pulse">TRANSMITINDO...</span>
                  ) : isSuccess ? (
                     <DecipherText text="RITUAL CONCLUÍDO" revealDelay={0} />
                  ) : (
                     "Enviar para o Vazio"
                  )}
                </span>
              </button>
            </Magnetic>
            
            {isSuccess && (
                <p className="text-center text-crimson font-mono text-xs tracking-widest animate-fade-in mt-4">
                    SUA MENSAGEM FOI CONSUMIDA PELO VAZIO.
                </p>
            )}
          </form>
        </div>

        <footer className="w-full flex flex-col md:flex-row justify-between items-center pt-24 pb-8 border-t border-ash/20 mt-24 relative z-10">
           <div className="font-gothic text-xl md:text-2xl mb-4 md:mb-0 text-white">OBSIDIAN</div>
           
           <div className="flex space-x-6 md:space-x-8">
             <a href="#" className="text-ghost hover:text-crimson transition-colors hover:-translate-y-1 transform duration-300"><Instagram size={20} className="md:w-6 md:h-6" /></a>
             <a href="#" className="text-ghost hover:text-crimson transition-colors hover:-translate-y-1 transform duration-300"><Twitter size={20} className="md:w-6 md:h-6" /></a>
             <a href="#" className="text-ghost hover:text-crimson transition-colors hover:-translate-y-1 transform duration-300"><Linkedin size={20} className="md:w-6 md:h-6" /></a>
             <a href="#" className="text-ghost hover:text-crimson transition-colors hover:-translate-y-1 transform duration-300"><Mail size={20} className="md:w-6 md:h-6" /></a>
           </div>

           <div className="text-ghost text-[10px] md:text-xs font-mono mt-4 md:mt-0 opacity-70 text-center md:text-right">
             © MMXXIV. TODOS OS DIREITOS RESERVADOS.
           </div>
        </footer>
      </section>
    </div>
  );
};

export default App;