"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { ArrowRight, Menu, X, List, Grid3X3, ChevronRight, ChevronLeft } from "lucide-react";

export default function HomePage() {
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Scroll Progress para Barra de Leitura e Efeitos
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const colors = { bg: "#0f1015", azulNeon: "#12f2f2", vinho: "#8e1e44" };

  if (!mounted) return <div className="min-h-screen bg-[#0f1015]" />;

  return (
    <main className="bg-[#0f1015] text-white overflow-x-hidden font-sora selection:bg-zinc-700">
      
      {/* BARRA DE PROGRESSO GSAP STYLE */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#12f2f2] z-[110] origin-left" style={{ scaleX }} />

      {/* MENU - BORDA + FIBRA ÓTICA AZUL */}
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* 1. HERO SECTION */}
      <Hero isAdvanced={isAdvanced} setIsAdvanced={setIsAdvanced} colors={colors} />

      {/* 2. SOBRE - SCROLL TRIGGER */}
      <SobreSection />

      {/* 3. CONSULTORIA & MENTORIA - SLIDER HORIZONTAL */}
      <ConsultoriaSlider />

      {/* 4. SERVIÇOS - INERTIA PARALLAX */}
      <ServicosParallax viewMode={viewMode} setViewMode={setViewMode} />

      {/* 5. HUB - ESTILO VARKO (NOMES) */}
      <HubSection />

      {/* 6. CONTATO - MARQUEE INFINITO */}
      <ContatoMarquee />

      <footer className="py-10 text-zinc-800 text-[10px] tracking-[0.5em] uppercase font-bold text-center border-t border-zinc-900">
        © {new Date().getFullYear()} EMREDE PRO / TRANSMUTAÇÃO CONSTANTE
      </footer>

      {/* ESTILOS GLOBAIS ANIMADOS */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@100;300;400;600;800&display=swap');
        html { scroll-behavior: smooth; }
        body { background: #0f1015; margin: 0; -webkit-font-smoothing: antialiased; }
        .varko-beam-overlay {
          position: absolute; inset: 0; border-radius: inherit; padding: 1.5px;
          background: linear-gradient(transparent, transparent) padding-box,
                      conic-gradient(from var(--border-angle), transparent 20%, #12f2f2 50%, transparent 80%) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          pointer-events: none; z-index: 5; animation: border-angle 4s linear infinite;
        }
        @property --border-angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
        @keyframes border-angle { from { --border-angle: 0deg; } to { --border-angle: 360deg; } }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}

/* --- COMPONENTES AUXILIARES --- */

function Header({ isMenuOpen, setIsMenuOpen }: any) {
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const headerY = useTransform(scrollY, [0, 80], [-20, 0]);

  return (
    <motion.header style={{ opacity: headerOpacity, y: headerY }} className="fixed top-6 z-[100] w-full max-w-5xl px-4 left-1/2 -translate-x-1/2">
      <nav className="relative bg-zinc-950/90 border border-zinc-800 rounded-full px-8 py-3 flex items-center justify-between shadow-2xl overflow-hidden group">
        <div className="varko-beam-overlay opacity-50 group-hover:opacity-100 transition-opacity"></div>
        <Link href="/" className="relative z-10"><Image src="/Prancheta 6.png" alt="Emrede Pro" width={90} height={24} className="h-6 w-auto object-contain" priority /></Link>
        <ul className="hidden xl:flex gap-6 text-[10px] uppercase tracking-widest font-bold text-zinc-500 relative z-10">
          {["Home", "Sobre", "Consultoria", "Serviços", "Hub", "Contato"].map((item) => (
            <li key={item}><Link href={`#${item.toLowerCase().replace('ç', 'c')}`} className="hover:text-white transition-colors">{item}</Link></li>
          ))}
        </ul>
        <button className="xl:hidden relative z-10" onClick={() => setIsMenuOpen(!isMenuOpen)}><Menu className="w-6 h-6 text-zinc-400" /></button>
      </nav>
    </motion.header>
  );
}

function Hero({ isAdvanced, setIsAdvanced, colors }: any) {
  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center relative px-6">
      <motion.div animate={{ backgroundColor: isAdvanced ? colors.vinho : colors.azulNeon, opacity: 0.15 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none" />
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-6 relative z-10">EMREDE <span style={{ color: isAdvanced ? colors.vinho : colors.azulNeon }}>PRO</span></h1>
      <p className="text-zinc-500 text-lg md:text-xl max-w-xl mb-12 font-light relative z-10">Tecnologia para <span className="text-white">transmutar</span> carreiras musicais.</p>
      
      <div onClick={() => setIsAdvanced(!isAdvanced)} className="w-80 h-20 bg-zinc-900 border border-zinc-800 rounded-full p-2 cursor-pointer relative flex items-center mb-12 z-10">
        <motion.div animate={{ x: isAdvanced ? 156 : 0 }} style={{ backgroundColor: isAdvanced ? colors.vinho : colors.azulNeon }} className="absolute w-[150px] h-16 rounded-full" />
        <div className="flex justify-around w-full z-10 font-bold text-[10px] uppercase tracking-widest"><span className={!isAdvanced ? "text-black" : "text-zinc-500"}>Emergente</span><span className={isAdvanced ? "text-white" : "text-zinc-600"}>Exponencial</span></div>
      </div>

      <motion.div whileHover={{ scale: 1.05 }} className="relative z-10 rounded-full p-[1px] overflow-hidden group">
        <div className="varko-beam-overlay opacity-60"></div>
        <Link href="#servicos" className="relative flex items-center gap-3 bg-transparent hover:bg-[#12f2f2] text-white hover:text-black px-12 py-5 rounded-full font-bold text-xl border border-white/10 transition-all">Iniciar Análise SWOT <ArrowRight /></Link>
      </motion.div>
    </section>
  );
}

function SobreSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section id="sobre" ref={ref} className="py-32 px-6 max-w-4xl mx-auto border-t border-zinc-900">
      <motion.div initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
        <h2 className="text-zinc-600 text-sm uppercase tracking-[0.4em] mb-8">Sobre a Transmutação /</h2>
        <p className="text-2xl md:text-3xl font-light leading-relaxed text-zinc-300">
          Trabalhamos lado a lado com artistas para <span className="text-white font-medium">potencializar sua música</span> e sua presença no mercado. 
          Com estratégias personalizadas, ajudamos a construir uma identidade forte, alcançar novos públicos e posicionar seu trabalho de forma profissional.
        </p>
        <p className="text-lg md:text-xl font-light leading-relaxed text-zinc-500 mt-8">
          Seja você um cantor, produtor ou banda, oferecemos suporte completo, desde a criação de conteúdo até campanhas de divulgação. 
          Mais que uma agência, somos um hub que impulsiona projetos, unindo criatividade, gestão e inovação para transformar ideias em projetos de alto impacto.
        </p>
      </motion.div>
    </section>
  );
}

function ConsultoriaSlider() {
  const areas = [
    "Identidade e Posicionamento de Marca Artística", "Engenharia de Repertório e Produto Musical", "Planejamento de Carreira e Gestão de Escala", 
    "Branding, Posicionamento e Identidade Visual", "Estratégias de Promoção e Marketing Digital", "Produção Musical e Audiovisual", 
    "Direcionamento Fonográfico e Lançamento", "Estratégias de Lançamento e Distribuição Digital", "Direcionamento e Otimização para Streaming", 
    "Desenvolvimento e Gestão de Comunidade", "Estética e Identidade Visual de Persona", "Gestão de Presença e Ecossistema Online", 
    "Performance e Experiência ao Vivo", "Gestão de Acordos e Negociações Estratégicas", "Gestão de Agenda e Turnês", 
    "Desenvolvimento e Imersão Profissional", "Licenciamento e Sincronização Musical (Sync)", "Análise de Dados e Inteligência de Métricas", 
    "Networking Estratégico e Conexões de Mercado", "Mentalidade Empreendedora e Inovação", "Diversificação e Maximização de Receitas"
  ];
  
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollTo = dir === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      sliderRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="consultoria" className="py-32 bg-zinc-950/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter italic uppercase">Consultoria <span className="text-zinc-800">& Mentoria</span></h2>
          <p className="text-zinc-500 mt-4 tracking-widest text-[10px] uppercase">21 Áreas de Imersão Estratégica</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => scroll('left')} className="p-4 border border-zinc-800 rounded-full hover:bg-white hover:text-black transition-all"><ChevronLeft /></button>
          <button onClick={() => scroll('right')} className="p-4 border border-zinc-800 rounded-full hover:bg-white hover:text-black transition-all"><ChevronRight /></button>
        </div>
      </div>
      
      <div ref={sliderRef} className="flex gap-6 overflow-x-auto px-6 md:px-[calc(50vw-600px)] hide-scrollbar snap-x snap-mandatory">
        {areas.map((area, i) => (
          <div key={i} className="min-w-[300px] md:min-w-[400px] aspect-[4/5] bg-zinc-900 border border-zinc-800 rounded-[40px] p-10 flex flex-col justify-between snap-center group hover:border-[#12f2f2] transition-colors">
            <span className="text-zinc-700 font-mono text-4xl group-hover:text-[#12f2f2] transition-colors">{(i+1).toString().padStart(2, '0')}</span>
            <h3 className="text-2xl font-bold leading-tight">{area}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServicosParallax({ viewMode, setViewMode }: any) {
  const servicos = [
    "Ensaio fotográfico", "Cobertura de show/evento", "Filmagem Aérea", "Gravação de clipe", "Assessoria de evento", 
    "Direcionamento estratégico", "Mentorias", "Branding & Identidade", "Produção musical", "Composição", 
    "Registro Musical", "Kit de Distribuição", "Lançamento Digital", "Gestão de Imagem", "Gestão de playlist", 
    "Produção de conteúdo", "Gestão de redes", "Tráfego pago", "Funil de audiência", "Criação de website"
  ];

  return (
    <section id="servicos" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-20">
        <h2 className="text-4xl font-bold uppercase tracking-tighter italic">Serviços / <span className="text-zinc-700 text-2xl not-italic">Full Stack</span></h2>
        <div className="flex bg-zinc-900 rounded-full p-1 border border-zinc-800">
          <button onClick={() => setViewMode('list')} className={`px-4 py-2 rounded-full text-[9px] uppercase font-bold transition-all ${viewMode === 'list' ? 'bg-zinc-800' : 'text-zinc-500'}`}><List size={14}/></button>
          <button onClick={() => setViewMode('grid')} className={`px-4 py-2 rounded-full text-[9px] uppercase font-bold transition-all ${viewMode === 'grid' ? 'bg-white text-black' : 'text-zinc-500'}`}><Grid3X3 size={14}/></button>
        </div>
      </div>

      <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'}`}>
        {servicos.map((servico, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl hover:bg-zinc-800/50 transition-all flex flex-col justify-between group"
          >
            <span className="text-[10px] font-mono text-[#12f2f2] opacity-40 group-hover:opacity-100 transition-opacity">#{i+1}</span>
            <h4 className="text-sm font-bold uppercase tracking-widest mt-4">{servico}</h4>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function HubSection() {
  const marcas = ["PICUS COMPANY", "GRÍBEL", "EMREDE HUB", "CULTURAL", "ACELERA", "PROJETO X", "ESTUDIO", "LAB"];

  return (
    <section id="hub" className="py-32 border-y border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-[10px] uppercase tracking-[0.6em] text-zinc-600 mb-20 text-center italic">Hub de Conexões / Parceiros</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-900 border border-zinc-900 rounded-[40px] overflow-hidden">
          {marcas.map((marca, i) => (
            <div key={i} className="bg-[#0f1015] p-16 flex items-center justify-center group relative overflow-hidden">
              <div className="absolute inset-0 varko-beam-overlay opacity-0 group-hover:opacity-30 transition-opacity"></div>
              <span className="text-zinc-600 font-bold tracking-[0.3em] uppercase text-sm group-hover:text-white transition-colors">{marca}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContatoMarquee() {
  return (
    <section id="contato" className="py-24 overflow-hidden border-b border-zinc-900">
      <div className="flex whitespace-nowrap">
        {[1, 2, 3, 4].map((_, i) => (
          <motion.div 
            key={i}
            animate={{ x: [0, -100 + "%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="flex items-center gap-20 pr-20"
          >
            <span className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-zinc-900 hover:text-[#12f2f2] transition-colors cursor-default">@emredepro</span>
            <span className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-zinc-900">•</span>
            <span className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-zinc-900 hover:text-[#12f2f2] transition-colors cursor-default">Projetos Musicais</span>
            <span className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-zinc-900">•</span>
            <span className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-zinc-900 hover:text-[#12f2f2] transition-colors cursor-default">228802-3803</span>
            <span className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-zinc-900">•</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
