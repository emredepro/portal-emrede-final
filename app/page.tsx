"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [isAdvanced, setIsAdvanced] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div className="min-h-screen bg-[#0f1015]" />;

  return (
    <main className="bg-[#0f1015] text-white overflow-x-hidden font-sora">
      
      {/* GSAP STYLE PROGRESS BAR */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-[#12f2f2] z-[120] origin-left" style={{ scaleX }} />

      <Header />

      {/* 1. HERO */}
      <Hero isAdvanced={isAdvanced} setIsAdvanced={setIsAdvanced} />

      {/* 2. SOBRE - SCROLL REVEAL */}
      <SobreSection />

      {/* 3. CONSULTORIA - HORIZONTAL SCROLL (IGUAL AO GSAP TEMPLATE) */}
      <ConsultoriaHorizontal />

      {/* 4. SERVIÇOS - INERTIA PARALLAX */}
      <ServicosInertia />

      {/* 5. HUB - VARKO GRID (NOMES) */}
      <HubVarko />

      {/* 6. CONTATO - GSAP MARQUEE GIGANTE */}
      <ContatoMarquee />

      <footer className="py-20 text-zinc-900 text-[10px] tracking-[0.8em] font-black text-center uppercase border-t border-zinc-900/30">
        © EMREDE PRO / TRANSMUTAÇÃO 2026
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@100;300;400;600;800&display=swap');
        html { scroll-behavior: smooth; }
        body { background: #0f1015; margin: 0; -webkit-font-smoothing: antialiased; }
        
        .varko-beam-overlay {
          position: absolute; inset: 0; border-radius: inherit; padding: 1.5px;
          background: conic-gradient(from var(--border-angle), transparent 20%, #12f2f2 50%, transparent 80%) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude; animation: border-angle 4s linear infinite;
        }
        @property --border-angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
        @keyframes border-angle { from { --border-angle: 0deg; } to { --border-angle: 360deg; } }
      `}</style>
    </main>
  );
}

function Header() {
  return (
    <header className="fixed top-8 z-[100] w-full flex justify-center px-4">
      <nav className="relative bg-zinc-950/80 border border-zinc-800 backdrop-blur-md rounded-full px-8 py-3 flex items-center gap-10 group">
        <div className="varko-beam-overlay opacity-30 group-hover:opacity-100 transition-opacity"></div>
        <Image src="/Prancheta 6.png" alt="Logo" width={90} height={24} className="h-6 w-auto object-contain" priority />
        <div className="hidden md:flex gap-6 text-[10px] uppercase tracking-widest font-bold text-zinc-500 relative z-10">
          {["Home", "Sobre", "Consultoria", "Serviços", "Hub", "Contato"].map(i => (
            <Link key={i} href={`#${i.toLowerCase().replace('ç', 'c')}`} className="hover:text-white transition-colors">{i}</Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

function Hero({ isAdvanced, setIsAdvanced }: any) {
  const colors = { azul: "#12f2f2", vinho: "#8e1e44" };
  return (
    <section id="home" className="h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      <motion.div animate={{ backgroundColor: isAdvanced ? colors.vinho : colors.azul, opacity: 0.15 }} className="absolute w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none" />
      <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 z-10 uppercase italic">EMREDE <span style={{ color: isAdvanced ? colors.vinho : colors.azul }}>PRO</span></h1>
      
      <div onClick={() => setIsAdvanced(!isAdvanced)} className="w-80 h-20 bg-zinc-900 border border-zinc-800 rounded-full p-2 cursor-pointer relative flex items-center mb-12 z-10">
        <motion.div animate={{ x: isAdvanced ? 156 : 0 }} style={{ backgroundColor: isAdvanced ? colors.vinho : colors.azul }} className="absolute w-[150px] h-16 rounded-full shadow-lg" />
        <div className="flex justify-around w-full z-10 font-bold text-[10px] uppercase tracking-widest">
          <span className={!isAdvanced ? "text-black" : "text-zinc-500"}>Emergente</span>
          <span className={isAdvanced ? "text-white" : "text-zinc-600"}>Exponencial</span>
        </div>
      </div>

      <motion.div whileHover={{ scale: 1.05 }} className="relative z-10 rounded-full p-[1px] overflow-hidden group">
        <div className="varko-beam-overlay opacity-50"></div>
        <Link href="#servicos" className="px-12 py-5 bg-transparent border border-white/10 text-white rounded-full font-bold uppercase tracking-widest hover:bg-[#12f2f2] hover:text-black transition-all flex items-center gap-3">
          Iniciar Análise SWOT <ArrowRight size={18} />
        </Link>
      </motion.div>
    </section>
  );
}

function SobreSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.4], [100, 0]);

  return (
    <section id="sobre" ref={ref} className="min-h-screen flex items-center justify-center px-6 py-40">
      <motion.div style={{ opacity, y }} className="max-w-4xl text-center">
        <p className="text-3xl md:text-5xl font-light leading-tight text-zinc-400">
          Trabalhamos lado a lado com artistas para <span className="text-white font-medium">potencializar sua música</span> e sua presença no mercado. Com estratégias personalizadas, ajudamos a construir uma identidade forte.
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
    "Identidade Artística", "Engenharia de Repertório", "Gestão de Escala", "Branding Artístico", "Marketing Digital", "Produção Audiovisual", "Direcionamento Fonográfico", "Distribuição Digital", "Otimização Streaming", "Gestão de Comunidade", "Estética de Persona", "Ecossistema Online", "Performance ao Vivo", "Acordos Estratégicos", "Gestão de Turnês", "Imersão Profissional", "Licenciamento Sync", "Análise de Dados", "Networking Estratégico", "Mentalidade Inovadora", "Maximização de Receitas"
  ];

  return (
    <section ref={targetRef} className="relative h-[600vh] bg-zinc-950">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-10 px-[10vw]">
          {areas.map((area, i) => (
            <div key={i} className="min-w-[80vw] md:min-w-[45vw] h-[60vh] bg-zinc-900 border border-zinc-800 rounded-[40px] p-12 flex flex-col justify-between group relative">
              <div className="absolute top-0 left-0 h-1 bg-[#12f2f2] w-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
              <span className="text-9xl font-black text-zinc-800/20">{(i+1).toString().padStart(2, '0')}</span>
              <h3 className="text-4xl md:text-6xl font-black uppercase italic leading-none">{area}</h3>
            </div>
          ))}
        </motion.div>
        
        <div className="absolute bottom-10 left-0 w-full px-[10vw] flex justify-between items-center text-zinc-600 font-bold text-[10px] tracking-[0.5em]">
          <span>SCROLL PARA NAVEGAR</span>
          <div className="flex gap-6 items-center">
            <ChevronLeft className="opacity-30" />
            <div className="w-40 h-[1px] bg-zinc-800 relative">
               <motion.div style={{ scaleX: scrollYProgress }} className="absolute inset-0 bg-[#12f2f2] origin-left" />
            </div>
            <ChevronRight />
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicosInertia() {
  const servicos = [
    "Ensaio fotográfico", "Cobertura de show", "Filmagem Aérea", "Gravação de clipe", "Assessoria de evento", 
    "Direcionamento estratégico", "Mentorias", "Branding & Visual", "Produção musical", "Composição", 
    "Registro Musical", "Kit Digital", "Lançamento", "Gestão de Imagem", "Playlist", 
    "Conteúdo", "Redes Sociais", "Tráfego pago", "Funil", "Website"
  ];

  return (
    <section id="servicos" className="py-40 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-40">
      {servicos.map((s, i) => (
        <InertiaCard key={i} text={s} index={i} />
      ))}
    </section>
  );
}

function InertiaCard({ text, index }: any) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Inércia real: velocidades diferentes baseadas no index
  const y = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 0 : 150, index % 2 === 0 ? 0 : -150]);

  return (
    <motion.div ref={ref} style={{ y }} className="bg-zinc-900 border border-zinc-800 p-16 rounded-[40px] aspect-video flex flex-col justify-end group relative overflow-hidden">
      <div className="varko-beam-overlay opacity-0 group-hover:opacity-40 transition-opacity"></div>
      <h4 className="text-4xl font-black uppercase tracking-tighter italic leading-none">{text}</h4>
    </motion.div>
  );
}

function HubVarko() {
  const marcas = ["PICUS COMPANY", "GRÍBEL", "EMREDE HUB", "CULTURAL", "ACELERA", "PROJETO X", "ESTUDIO", "LAB"];
  return (
    <section id="hub" className="py-40 border-y border-zinc-900 bg-zinc-950/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-900 border border-zinc-900 overflow-hidden rounded-[40px]">
          {marcas.map((marca, i) => (
            <div key={i} className="bg-[#0f1015] p-20 flex items-center justify-center group relative overflow-hidden">
              <div className="varko-beam-overlay opacity-0 group-hover:opacity-30 transition-opacity"></div>
              <span className="text-zinc-700 font-bold tracking-[0.4em] uppercase text-[10px] group-hover:text-white transition-colors">{marca}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContatoMarquee() {
  return (
    <section id="contato" className="py-20 overflow-hidden border-b border-zinc-900 cursor-pointer">
      <div className="flex whitespace-nowrap">
        {[1, 2].map((_, idx) => (
          <motion.div key={idx} animate={{ x: [0, "-100%"] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="flex">
            <h2 className="text-[15vw] font-black uppercase tracking-tighter leading-none px-10 text-transparent opacity-10 hover:opacity-100 hover:text-[#12f2f2] transition-all duration-700" style={{ WebkitTextStroke: "1.5px #27272a" }}>
              @EMREDEPRO • PROJETOS MUSICAIS • 228802-3803 •
            </h2>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
