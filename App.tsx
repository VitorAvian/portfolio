import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import ProjectGallery from './components/ProjectGallery';
import Magnetic from './components/Magnetic';
import GlitchText from './components/GlitchText';
import InfiniteMarquee from './components/InfiniteMarquee';
import { NAV_ITEMS } from './constants';

// CONFIGURAÇÃO DO PORTAL DE COMUNICAÇÃO
// Utilizando FormSubmit.co - Não requer cadastro prévio.
// A primeira submissão enviará um email de confirmação para ativar o endpoint.
const FORM_ENDPOINT = "https://formsubmit.co/vitoravian@uol.com.br"; 

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    // Lock scroll when loading
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';

      // Setup Intersection Observer apenas quando o carregamento terminar e o DOM estiver pronto
      const observerOptions = {
        root: null,
        // Dispara quando a seção está no meio da tela (margem negativa topo/baixo)
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0
      };

      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, observerOptions);

      // Observa as seções baseadas nos itens de navegação
      NAV_ITEMS.forEach((item) => {
        const sectionId = item.href.replace('#', '');
        const element = document.getElementById(sectionId);
        if (element) {
          observer.observe(element);
        }
      });

      return () => observer.disconnect();
    }
  }, [loading]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    
    // Configurações ocultas para o FormSubmit.co
    formData.append("_subject", "Nova Invocação Digital [KAOS NYMPH]");
    formData.append("_template", "table");
    formData.append("_captcha", "false"); 

    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error('Falha na conexão com o servidor.');
      }
    } catch (error) {
      console.error("Erro no ritual de envio:", error);
      alert("O canal de comunicação está instável. Se for a primeira vez, verifique seu email para ativar o FormSubmit.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
  };

  if (loading) {
    return <Preloader onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="relative min-h-screen bg-black text-stone-200 cursor-crosshair">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 bg-noise pointer-events-none opacity-40 mix-blend-overlay"></div>
      
      {/* Header / Nav */}
      <header className="fixed top-0 left-0 w-full z-40 px-6 py-6 md:py-8 flex justify-between items-center bg-black/80 backdrop-blur-md border-b border-stone-800/50 text-stone-200 transition-all duration-300">
        <Magnetic>
          <a href="#" className="font-serif text-2xl font-black tracking-tighter hover:tracking-widest transition-all duration-500">
            KAOS_NYMPH
          </a>
        </Magnetic>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-12 font-mono text-xs tracking-widest uppercase">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <Magnetic key={item.label}>
                <a href={item.href} className="group relative overflow-hidden inline-block">
                  <span className={`block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${isActive ? '-translate-y-full' : 'group-hover:-translate-y-full'}`}>
                    {item.label}
                  </span>
                  <span className={`absolute top-0 left-0 block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] text-red-500 ${isActive ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'}`}>
                    {item.label}
                  </span>
                </a>
              </Magnetic>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden font-mono text-xs uppercase z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '[ FECHAR ]' : '[ MENU ]'}
        </button>
      </header>

      {/* Mobile Nav Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-black flex flex-col items-center justify-center gap-8 md:hidden">
           {NAV_ITEMS.map((item) => (
             <a 
              key={item.label} 
              href={item.href} 
              onClick={() => setMenuOpen(false)}
              className={`font-serif text-3xl transition-all ${activeSection === item.href ? 'text-red-500 italic' : 'text-stone-300 hover:text-stone-100 hover:italic'}`}
             >
               {item.label}
             </a>
           ))}
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center px-4 overflow-hidden pt-20">
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif font-black mb-6 leading-none tracking-tighter mix-blend-difference">
            <span className="block hover:skew-x-12 transition-transform duration-700 cursor-default">DIGITAL</span>
            <span className="block text-transparent stroke-text hover:text-stone-200 transition-colors duration-500 cursor-default" style={{ WebkitTextStroke: '1px #e7e5e4' }}>BRUTALISM</span>
          </h1>
          
          <div className="max-w-xl mx-auto mt-8 font-mono text-xs md:text-sm text-stone-500 leading-relaxed uppercase tracking-wider">
            <GlitchText text="Identidade visual forjada no vazio." />
            <br />
            <span className="mt-2 block">
              Design gótico para a era da fibra ótica.
            </span>
          </div>
        </div>
        
        {/* Decorative Runes Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] opacity-[0.03] pointer-events-none font-serif select-none animate-spin-slow">
           ᛟ
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
           <div className="w-[1px] h-24 bg-gradient-to-b from-stone-200 to-transparent animate-pulse"></div>
        </div>
      </section>

      {/* Marquee 1: Hero -> Gallery */}
      <InfiniteMarquee />

      {/* Project Gallery */}
      <ProjectGallery />

      {/* Marquee 2: Gallery -> About (Reverse) */}
      <InfiniteMarquee reverse className="border-t border-stone-900" />

      {/* About Section */}
      <section id="about" className="py-24 px-4 md:px-8 bg-stone-950 relative scroll-mt-32">
        <div className="container mx-auto flex flex-col md:flex-row gap-16 items-center">
           <div className="w-full md:w-1/2 relative">
             <div className="absolute inset-0 border border-stone-800 rotate-3 transform"></div>
             <div className="absolute inset-0 border border-red-900 -rotate-2 transform mix-blend-color-dodge opacity-50"></div>
             <img 
               src="https://picsum.photos/600/800?grayscale" 
               alt="Creator" 
               className="w-full relative z-10 grayscale contrast-125 hover:contrast-150 transition-all duration-700 hover:grayscale-0"
             />
           </div>
           
           <div className="w-full md:w-1/2">
             <h2 className="text-4xl md:text-6xl font-serif mb-8">
               <GlitchText text="A ORIGEM" />
             </h2>
             <div className="space-y-6 font-mono text-stone-400 text-sm md:text-base leading-relaxed text-justify">
               <p>
                 Não sou apenas um designer. Sou um arqueólogo de futuros perdidos.
                 Meu trabalho reside na intersecção entre o misticismo antigo e a tecnologia brutal.
               </p>
               <p className="pl-8 border-l-2 border-red-900 text-stone-300 italic">
                 "O caos não é um poço, é uma escada feita de pixels mortos e pedra rúnica."
               </p>
               <p>
                 Especializado em identidades visuais que perturbam, interfaces que contam histórias e experiências web que parecem rituais.
               </p>
             </div>
             
             <div className="mt-12 grid grid-cols-2 gap-4 font-mono text-xs uppercase tracking-widest text-stone-600">
               <div>Location: [REDACTED]</div>
               <div>Status: ONLINE</div>
               <div>System: KAOS_OS</div>
               <div>Entity: HUMAN</div>
             </div>
           </div>
        </div>
      </section>

      {/* Marquee 3: About -> Contact */}
      <InfiniteMarquee className="border-t border-stone-900" />

      {/* Contact Section */}
      <section id="contact" className="min-h-[80vh] flex flex-col justify-center items-center py-24 px-4 relative overflow-hidden scroll-mt-32">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-stone-900 to-black opacity-50 z-0"></div>
        
        <div className="relative z-10 w-full max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-7xl font-serif mb-4 text-stone-100">
              <GlitchText text="INVOQUE-ME" />
            </h2>
            <p className="font-mono text-stone-500 text-xs tracking-[0.3em] uppercase">
              Inicie o protocolo de conexão
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center animate-[fadeIn_1s_ease-out] border border-stone-800 bg-black/50 backdrop-blur-sm p-12">
               <div className="mb-6">
                 <span className="text-6xl text-stone-600 block mb-4 animate-pulse">ᛟ</span>
                 <h3 className="text-2xl md:text-3xl font-serif text-stone-200 tracking-widest leading-relaxed">
                   O RITUAL FOI CONCLUÍDO
                 </h3>
               </div>
               <p className="font-mono text-stone-500 mb-12 text-sm uppercase tracking-widest">
                 A Entidade entrará em contato.
               </p>
               <button 
                 onClick={resetForm}
                 className="group relative px-6 py-3 bg-transparent border border-stone-800 text-stone-500 font-mono text-[10px] uppercase tracking-widest hover:border-stone-400 hover:text-stone-300 transition-all duration-300"
               >
                 <span className="relative z-10">[ Reiniciar Protocolo ]</span>
               </button>
            </div>
          ) : (
            <form 
              className={`space-y-8 transition-all duration-700 ${isSubmitting ? 'opacity-50 pointer-events-none grayscale blur-sm' : 'opacity-100'}`} 
              onSubmit={handleSubmit}
            >
              <div className="group relative">
                <input 
                  type="text" 
                  name="name"
                  id="name"
                  required 
                  className="w-full bg-transparent border-b border-stone-800 py-4 text-xl font-serif text-stone-300 focus:outline-none focus:border-stone-100 transition-all duration-500 peer placeholder-transparent focus:blur-[0.5px] focus:tracking-widest"
                  placeholder="Seu Nome"
                />
                <label htmlFor="name" className="absolute left-0 top-4 text-stone-600 font-mono text-xs uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-stone-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-stone-600 cursor-text">
                  Identificação da Entidade
                </label>
              </div>

              <div className="group relative">
                <input 
                  type="email" 
                  name="email"
                  id="email"
                  required 
                  className="w-full bg-transparent border-b border-stone-800 py-4 text-xl font-serif text-stone-300 focus:outline-none focus:border-stone-100 transition-all duration-500 peer placeholder-transparent focus:blur-[0.5px] focus:tracking-widest"
                  placeholder="Email"
                />
                <label htmlFor="email" className="absolute left-0 top-4 text-stone-600 font-mono text-xs uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-stone-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-stone-600 cursor-text">
                  Canal de Frequência (Email)
                </label>
              </div>

              <div className="group relative">
                <textarea 
                  rows={4}
                  name="message"
                  id="message"
                  required 
                  className="w-full bg-transparent border-b border-stone-800 py-4 text-xl font-serif text-stone-300 focus:outline-none focus:border-stone-100 transition-all duration-500 peer placeholder-transparent resize-none focus:blur-[0.5px] focus:tracking-widest"
                  placeholder="Mensagem"
                ></textarea>
                <label htmlFor="message" className="absolute left-0 top-4 text-stone-600 font-mono text-xs uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-stone-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-stone-600 cursor-text">
                  Propósito do Ritual
                </label>
              </div>

              <div className="pt-8 text-center">
                <Magnetic strength={50}>
                  <button 
                    disabled={isSubmitting} 
                    type="submit"
                    className="relative px-12 py-4 bg-stone-100 text-black font-mono font-bold uppercase tracking-widest overflow-hidden group hover:text-white transition-colors disabled:cursor-wait"
                  >
                     <span className="relative z-10 group-hover:mix-blend-difference">
                        {isSubmitting ? 'Sincronizando Frequências...' : 'Enviar Transmissão'}
                     </span>
                     {/* Loading Bar Effect */}
                     <div className={`absolute inset-0 bg-stone-900 transform origin-left transition-transform duration-300 ease-out ${isSubmitting ? 'scale-x-100 duration-[2000ms] ease-linear' : 'scale-x-0 group-hover:scale-x-100'}`}></div>
                  </button>
                </Magnetic>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Marquee 4: Contact -> Footer (Reverse) */}
      <InfiniteMarquee reverse className="border-t border-stone-900" />

      <footer className="py-8 border-t border-stone-900 text-center">
        <p className="font-mono text-[10px] text-stone-700 uppercase tracking-widest">
          © 2024 Kaos Nymph. Todos os direitos reservados no abismo.
        </p>
      </footer>
    </div>
  );
};

export default App;