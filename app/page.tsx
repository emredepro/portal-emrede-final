"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
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

      {/* 3. CONSULTORIA - GSAP HORIZONTAL SCROLL SECTION */}
      <ConsultoriaHorizontal />

      {/* 4. SERVIÇOS - INERTIA PARALLAX */}
      <ServicosInertia />

      {/* 5. HUB - VARKO GRID (NOMES) */}
      <HubVarko />

      {/* 6. CONTATO - GSAP MARQUEE */}
      <ContatoMarquee />

      <footer className="py-20 text-zinc-900 text-[10px] tracking-[0.8em] font-black text-center uppercase">
        © EMREDE PRO / TRANSMUTAÇÃO CONSTANTE
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
    <header className="fixed top-6 z-[100] w-full flex justify-center px-4">
      <nav className="relative bg-zinc-950/80 border border-zinc-800 rounded-full px-8 py-3 flex items-center gap-10 group">
        <div className="varko-beam-overlay opacity-30 group-hover:opacity-100 transition-opacity"></div>
        <Image src="/Prancheta 6.png" alt="Logo" width={90} height={24} className="h-6 w-auto object-contain" priority />
        <div className="hidden md:flex gap-6 text-[10px] uppercase tracking-widest font-bold text-zinc-500">
          {["Home", "Sobre", "Consultoria", "Serviços", "Hub", "Contato"].map(i => (
            <Link key={i} href={`#${i.toLowerCase()}`} className="hover:text-white transition-colors">{i}</Link>
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
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-6">EMREDE <span style={{ color: isAdvanced ? colors.vinho : colors.azul }}>PRO</span></h1>
      
      <div onClick={() => setIsAdvanced(!isAdvanced)} className="w-80 h-20 bg-zinc-900 border border-zinc-800 rounded-full p-2 cursor-pointer relative flex items-center mb-12">
        <motion.div animate={{ x: isAdvanced ? 156 : 0 }} style={{ backgroundColor: isAdvanced ? colors.vinho : colors.azul }} className="absolute w-[150px] h-16 rounded-full shadow-lg" />
        <div className="flex justify-around w-full z-10 font-bold text-[10px] uppercase tracking-widest">
          <span className={!isAdvanced ? "text-black" : "text-zinc-500"}>Emergente</span>
          <span className={isAdvanced ? "text-white" : "text-zinc-600"}>Exponencial</span>
        </div>
      </div>

      <motion.div whileHover={{ scale: 1.05 }} className="relative rounded-full p-[1px] overflow-hidden group">
        <div className="varko-beam-overlay opacity-60"></div>
        <Link href="#servicos" className="relative flex items-center gap-3 bg-transparent hover:bg-[#12f2f2] text-white hover:text-black px-12 py-5 rounded-full font-bold text-xl border border-white/10 transition-all">Iniciar Análise SWOT <ArrowRight /></Link>
      </motion.div>
    </section>
  );
}

function SobreSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.8, 0.9], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.1, 0.3], [100, 0]);

  return (
    <section id="sobre" ref={ref} className="min-h-[150vh] flex items-center justify-center px-6">
      <motion.div style={{ opacity, y }} className="max-w-4xl text-center">
        <p className="text-2xl md:text-4xl font-light leading-relaxed text-zinc-400">
          Trabalhamos lado a lado com artistas para <span className="text-white font-medium">potencializar sua música</span> e sua presença no mercado. Com estratégias personalizadas, ajudamos a construir uma identidade forte, alcançar novos públicos e posicionar seu trabalho de forma profissional.
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
    "Identidade e Posicionamento Artístico", "Engenharia de Repertório", "Planejamento de Carreira", "Branding Artístico", "Marketing Digital", "Produção Audiovisual", "Direcionamento Fonográfico", "Distribuição Digital", "Streaming Optimization", "Gestão de Comunidade", "Estética de Persona", "Ecossistema Online", "Performance ao Vivo", "Acordos Estratégicos", "Gestão de Turnês", "Imersão Profissional", "Licenciamento Sync", "Análise de Dados", "Networking Estratégico", "Mentalidade Inovadora", "Maximização de Receitas"
  ];

  return (
    <section ref={targetRef} id="consultoria" className="relative h-[600vh] bg-zinc-950">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-10 px-[10vw]">
          {areas.map((area, i) => (
            <div key={i} className="min-w-[70vw] md:min-w-[45vw] h-[60vh] bg-zinc-900 border border-zinc-800 rounded-[40px] p-12 flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1 bg-[#12f2f2] w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              <span className="text-9xl font-black text-zinc-800/20">{(i+1).toString().padStart(2, '0')}</span>
              <h3 className="text-3xl md:text-5xl font-bold uppercase italic leading-tight">{area}</h3>
            </div>
          ))}
        </motion.div>
        
        <div className="absolute bottom-10 left-0 w-full px-[10vw] flex justify-between items-center text-zinc-500 font-bold text-[10px] tracking-widest">
          <span>DESLIZE PARA EXPLORAR</span>
          <div className="flex gap-4">
            <ChevronLeft size={24} className="opacity-20" /> <ChevronRight size={24} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicosInertia() {
  const servicos = [
    "Ensaio fotográfico", "Cobertura de show", "Filmagem Aérea", "Gravação de clipe", "Assessoria de evento", 
    "Direcionamento estratégico", "Mentorias", "Branding & ID", "Produção musical", "Composição", 
    "Registro Musical", "Kit Digital", "Lançamento", "Gestão de Imagem", "Playlist", 
    "Conteúdo", "Redes Sociais", "Tráfego pago", "Funil", "Website"
  ];

  return (
    <section id="servicos" className="py-40 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
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
  const y = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 0 : 100, index % 2 === 0 ? 0 : -100]);

  return (
    <motion.div ref={ref} style={{ y }} className="bg-zinc-900 border border-zinc-800 p-12 rounded-[40px] aspect-video flex flex-col justify-end group relative overflow-hidden">
      <div className="varko-beam-overlay opacity-0 group-hover:opacity-40 transition-opacity"></div>
      <span className="text-[10px] font-mono text-[#12f2f2] mb-4 opacity-50">#{(index+1).toString().padStart(2, '0')}</span>
      <h4 className="text-3xl font-bold uppercase tracking-tighter">{text}</h4>
    </motion.div>
  );
}

function HubVarko() {
  const marcas = ["PICUS COMPANY", "GRÍBEL", "EMREDE HUB", "CULTURAL", "ACELERA", "PROJETO X", "ESTUDIO", "LAB"];
  return (
    <section id="hub" className="py-40 bg-zinc-950 border-y border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-900 border border-zinc-900 overflow-hidden rounded-[40px]">
          {marcas.map((marca, i) => (
            <div key={i} className="bg-[#0f1015] p-16 flex items-center justify-center group relative">
              <div className="varko-beam-overlay opacity-0 group-hover:opacity-30 transition-opacity"></div>
              <span className="text-zinc-700 font-bold tracking-[0.4em] uppercase text-xs group-hover:text-white transition-colors">{marca}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContatoMarquee() {
  return (
    <section id="contato" className="py-20 overflow-hidden border-b border-zinc-900">
      <div className="flex whitespace-nowrap">
        {[1, 2].map((_, idx) => (
          <motion.div key={idx} animate={{ x: [0, "-100%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="flex">
            <h2 className="text-[12vw] font-black uppercase tracking-tighter leading-none px-10 text-transparent opacity-20 hover:opacity-100 hover:text-[#12f2f2] transition-all duration-700" style={{ WebkitTextStroke: "1.5px #3f3f46" }}>
              @EMREDEPRO • PROJETOS MUSICAIS • 228802-3803 •
            </h2>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
