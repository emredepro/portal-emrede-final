"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, ChevronRight, ChevronLeft } from "lucide-react";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [isAdvanced, setIsAdvanced] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="min-h-screen bg-[#0f1015]" />;

  return (
    <main className="bg-[#0f1015] text-white overflow-x-hidden font-sora selection:bg-[#12f2f2] selection:text-black">
      
      {/* GSAP STYLE PROGRESS BAR */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-[#12f2f2] z-[120] origin-left" style={{ scaleX }} />

      <Header />

      {/* 1. HERO */}
      <Hero isAdvanced={isAdvanced} setIsAdvanced={setIsAdvanced} />

      {/* 2. SOBRE - SCROLL REVEAL */}
      <Sobre />

      {/* 3. CONSULTORIA - GSAP HORIZONTAL SLIDER */}
      <ConsultoriaHorizontal />

      {/* 4. SERVIÇOS - INERTIA EFFECT */}
      <ServicosInertia />

      {/* 5. HUB - VARKO MARQUEE NAMES */}
      <HubVarkoMarquee />

      {/* 6. CONTATO - GSAP MARQUEE */}
      <ContatoMarquee />

      <footer className="py-20 text-zinc-900 text-[10px] tracking-[0.8em] font-black text-center uppercase">
        © EMREDE PRO / TRANSMUTAÇÃO 2024
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@100;300;400;600;800&display=swap');
        html { scroll-behavior: smooth; }
        body { background: #0f1015; color: white; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        .varko-beam-overlay {
          position: absolute; inset: 0; border-radius: inherit; padding: 1px;
          background: conic-gradient(from var(--border-angle), transparent 20%, #12f2f2 50%, transparent 80%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude; animation: border-angle 4s linear infinite;
        }
        @property --border-angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
        @keyframes border-angle { from { --border-angle: 0deg; } to { --border-angle: 360deg; } }
      `}</style>
    </main>
  );
}

/* --- COMPONENTS --- */

function Header() {
  return (
    <header className="fixed top-8 z-[100] w-full flex justify-center px-6">
      <nav className="relative bg-zinc-950/80 border border-zinc-900 backdrop-blur-md rounded-full px-8 py-3 flex items-center gap-12 shadow-2xl group">
        <div className="varko-beam-overlay opacity-30 group-hover:opacity-100 transition-opacity"></div>
        <Image src="/Prancheta 6.png" alt="Logo" width={80} height={20} className="relative z-10" />
        <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500 relative z-10">
          {["Home", "Sobre", "Consultoria", "Serviços", "Hub", "Contato"].map(i => (
            <Link key={i} href={`#${i.toLowerCase()}`} className="hover:text-white transition-colors">{i}</Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

function Hero({ isAdvanced, setIsAdvanced }: any) {
  return (
    <section id="home" className="h-screen flex flex-col items-center justify-center relative px-6 overflow-hidden">
      <div className={`absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 transition-colors duration-1000 ${isAdvanced ? 'bg-red-900' : 'bg-cyan-500'}`} />
      <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 z-10">EMREDE <span className={isAdvanced ? 'text-red-700' : 'text-[#12f2f2]'}>PRO</span></h1>
      <p className="text-zinc-500 max-w-lg text-center text-lg font-light mb-12 z-10">Transmutando carreiras através de inteligência e dados.</p>
      
      <div onClick={() => setIsAdvanced(!isAdvanced)} className="w-64 h-16 bg-zinc-900/50 border border-zinc-800 rounded-full p-1 cursor-pointer relative flex items-center mb-10 z-10">
        <motion.div animate={{ x: isAdvanced ? 128 : 0 }} className={`w-32 h-14 rounded-full shadow-xl ${isAdvanced ? 'bg-red-800' : 'bg-[#12f2f2]'}`} />
        <div className="absolute inset-0 flex justify-around items-center font-bold text-[9px] uppercase tracking-widest pointer-events-none">
          <span className={!isAdvanced ? 'text-black' : 'text-zinc-500'}>Emergente</span>
          <span className={isAdvanced ? 'text-white' : 'text-zinc-500'}>Exponencial</span>
        </div>
      </div>

      <motion.div whileHover={{ scale: 1.02 }} className="relative z-10 group rounded-full overflow-hidden">
        <div className="varko-beam-overlay opacity-40"></div>
        <Link href="/login" className="px-12 py-5 bg-transparent border border-white/10 text-white rounded-full font-bold uppercase tracking-widest hover:bg-[#12f2f2] hover:text-black transition-all flex items-center gap-3">
          Iniciar SWOT <ArrowRight size={18} />
        </Link>
      </motion.div>
    </section>
  );
}

function Sobre() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3], [100, 0]);

  return (
    <section id="sobre" ref={ref} className="min-h-screen flex items-center justify-center px-6">
      <motion.div style={{ opacity, y }} className="max-w-5xl">
        <p className="text-3xl md:text-5xl font-light leading-[1.3] text-zinc-400">
          Trabalhamos lado a lado com artistas para <span className="text-white">potencializar sua música</span> e sua presença no mercado. Ajudamos a construir uma <span className="text-[#12f2f2]">identidade forte</span>, alcançar novos públicos e transformar ideias em projetos de alto impacto.
        </p>
      </motion.div>
    </section>
  );
}

function ConsultoriaHorizontal() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);
  
  const areas = [
    "Identidade Artística", "Engenharia de Repertório", "Gestão de Escala", "Branding Visual", "Marketing Digital", "Produção Audiovisual", "Direcionamento Fonográfico", "Distribuição Digital", "Otimização Streaming", "Gestão de Comunidade", "Identidade de Persona", "Ecossistema Online", "Performance ao Vivo", "Acordos Estratégicos", "Gestão de Turnês", "Imersão Profissional", "Licenciamento Sync", "Inteligência de Dados", "Networking", "Mentalidade Inovadora", "Maximização de Receitas"
  ];

  return (
    <section id="consultoria" ref={targetRef} className="relative h-[500vh] bg-zinc-950">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Barra de Progresso Superior do Slide */}
        <div className="absolute top-0 left-0 w-full h-1 bg-zinc-900 z-20">
          <motion.div style={{ scaleX: scrollYProgress }} className="h-full bg-[#12f2f2] origin-left" />
        </div>

        <motion.div style={{ x }} className="flex gap-8 px-[10vw]">
          {areas.map((area, i) => (
            <div key={i} className="min-w-[70vw] md:min-w-[45vw] h-[60vh] bg-zinc-900/50 border border-zinc-800 rounded-[40px] p-12 flex flex-col justify-between group relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-[2px] bg-[#12f2f2] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
               <span className="text-8xl font-black text-zinc-800/30 group-hover:text-[#12f2f2]/20 transition-colors">{(i+1).toString().padStart(2, '0')}</span>
               <h3 className="text-4xl md:text-5xl font-bold max-w-xs leading-tight uppercase italic">{area}</h3>
            </div>
          ))}
        </motion.div>

        {/* Footer do Slider */}
        <div className="absolute bottom-12 left-0 w-full px-[10vw] flex justify-between items-center">
           <div className="text-[10px] font-bold tracking-[0.5em] text-zinc-500 uppercase">Slide {Math.round(scrollYProgress.get()*21) + 1} / 21</div>
           <div className="flex gap-4">
              <div className="p-4 border border-zinc-800 rounded-full text-zinc-500"><ChevronLeft size={20} /></div>
              <div className="p-4 border border-zinc-800 rounded-full text-[#12f2f2]"><ChevronRight size={20} /></div>
           </div>
        </div>
      </div>
    </section>
  );
}

function ServicosInertia() {
  const servicos = [
    "Ensaio fotográfico", "Cobertura de show", "Filmagem Aérea", "Gravação de clipe", "Assessoria de evento", 
    "Direcionamento estratégico", "Mentorias", "Branding", "Produção musical", "Composição", 
    "Registro Musical", "Kit Digital", "Lançamento", "Gestão de Imagem", "Playlist", 
    "Conteúdo", "Redes Sociais", "Tráfego pago", "Funil", "Website"
  ];

  return (
    <section id="servicos" className="py-40 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {servicos.map((s, i) => (
          <InertiaItem key={i} index={i} text={s} />
        ))}
      </div>
    </section>
  );
}

function InertiaItem({ text, index }: any) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // O segredo da inércia: velocidades diferentes para cada item
  const y = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 50 : 150, index % 2 === 0 ? -50 : -150]);

  return (
    <motion.div ref={ref} style={{ y }} className="bg-zinc-900 border border-zinc-800 p-12 rounded-[40px] flex items-center justify-between group hover:border-[#12f2f2] transition-colors">
      <h4 className="text-2xl font-bold uppercase tracking-tighter">{text}</h4>
      <div className="w-10 h-10 border border-zinc-700 rounded-full flex items-center justify-center group-hover:bg-[#12f2f2] group-hover:text-black transition-all">
        <ArrowRight size={16} />
      </div>
    </motion.div>
  );
}

function HubVarkoMarquee() {
  const nomes = ["PICUS COMPANY", "GRÍBEL", "EMREDE HUB", "CULTURAL", "ACELERA", "PROJETO X", "ESTUDIO LAB"];
  
  return (
    <section id="hub" className="py-40 border-y border-zinc-900 overflow-hidden bg-zinc-950/50">
      <div className="flex whitespace-nowrap">
        {[1, 2].map((_, idx) => (
          <motion.div key={idx} animate={{ x: [0, "-100%"] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="flex">
            {nomes.concat(nomes).map((n, i) => (
              <div key={i} className="px-16 py-12 border-x border-zinc-900/50 flex items-center justify-center group cursor-crosshair">
                <span className="text-zinc-600 font-black tracking-[0.4em] text-xl group-hover:text-[#12f2f2] transition-colors">{n}</span>
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ContatoMarquee() {
  return (
    <section id="contato" className="py-20 overflow-hidden cursor-pointer">
      <div className="flex whitespace-nowrap">
        {[1, 2].map((_, idx) => (
          <motion.div key={idx} animate={{ x: [0, "-100%"] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="flex items-center">
            <h2 className="text-[12vw] font-black uppercase tracking-tighter leading-none px-10 text-transparent stroke-zinc-800 hover:text-[#12f2f2] hover:stroke-transparent transition-all duration-500" style={{ WebkitTextStroke: "1px #27272a" }}>
              @EMREDEPRO • PROJETOS MUSICAIS • 228802-3803 •
            </h2>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
