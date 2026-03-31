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
      {/* BARRA DE PROGRESSO GSAP */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-[#12f2f2] z-[120] origin-left" style={{ scaleX }} />

      <Header />

      {/* 1. HERO */}
      <Hero isAdvanced={isAdvanced} setIsAdvanced={setIsAdvanced} />

      {/* 2. SOBRE - REVEAL STYLE */}
      <Sobre />

      {/* 3. CONSULTORIA - HORIZONTAL SCROLL REAL */}
      <ConsultoriaHorizontal />

      {/* 4. SERVIÇOS - INERTIA PARALLAX */}
      <ServicosInertia />

      {/* 5. HUB - VARKO STYLE MARQUEE */}
      <HubMarquee />

      {/* 6. CONTATO - GSAP STYLE MARQUEE */}
      <ContatoMarquee />

      <footer className="py-20 text-zinc-900 text-[10px] tracking-[0.8em] font-black text-center uppercase">
        © EMREDE PRO / TRANSMUTAÇÃO CONSTANTE
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@100;300;400;600;800&display=swap');
        html { scroll-behavior: smooth; }
        body { background: #0f1015; margin: 0; -webkit-font-smoothing: antialiased; }
        
        .varko-beam-overlay {
          position: absolute; inset: 0; border-radius: inherit; padding: 1px;
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

/* --- SEÇÕES --- */

function Header() {
  return (
    <header className="fixed top-8 z-[100] w-full flex justify-center px-6">
      <nav className="relative bg-zinc-950/80 border border-zinc-900 backdrop-blur-md rounded-full px-8 py-3 flex items-center gap-12 group">
        <div className="varko-beam-overlay opacity-30 group-hover:opacity-100 transition-opacity"></div>
        <Image src="/Prancheta 6.png" alt="Logo" width={80} height={20} className="h-6 w-auto object-contain" />
        <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">
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
    <section id="home" className="h-screen flex flex-col items-center justify-center relative px-6 text-center">
      <div className={`absolute w-[400px] h-[400px] rounded-full blur-[120px] opacity-20 transition-colors duration-1000 ${isAdvanced ? 'bg-red-900' : 'bg-cyan-500'}`} />
      <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 z-10">EMREDE <span className={isAdvanced ? 'text-red-700' : 'text-[#12f2f2]'}>PRO</span></h1>
      <p className="text-zinc-500 max-w-lg text-lg font-light mb-12 z-10">Transmutando carreiras através de inteligência e dados.</p>
      
      <div onClick={() => setIsAdvanced(!isAdvanced)} className="w-64 h-16 bg-zinc-900/50 border border-zinc-800 rounded-full p-1 cursor-pointer relative flex items-center mb-10 z-10">
        <motion.div animate={{ x: isAdvanced ? 128 : 0 }} className={`w-32 h-14 rounded-full ${isAdvanced ? 'bg-red-800' : 'bg-[#12f2f2]'}`} />
        <div className="absolute inset-0 flex justify-around items-center font-bold text-[9px] uppercase tracking-widest">
          <span className={!isAdvanced ? 'text-black' : 'text-zinc-500'}>Emergente</span>
          <span className={isAdvanced ? 'text-white' : 'text-zinc-500'}>Exponencial</span>
        </div>
      </div>

      <motion.div whileHover={{ scale: 1.05 }} className="relative z-10 rounded-full p-[1px] overflow-hidden group">
        <div className="varko-beam-overlay opacity-50"></div>
        <Link href="/swot" className="px-12 py-5 bg-transparent border border-white/10 text-white rounded-full font-bold uppercase tracking-widest hover:bg-[#12f2f2] hover:text-black transition-all flex items-center gap-3">
          Iniciar SWOT <ArrowRight size={18} />
        </Link>
      </motion.div>
    </section>
  );
}

function Sobre() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <section id="sobre" ref={ref} className="py-40 px-6 max-w-5xl mx-auto">
      <motion.p style={{ opacity, y }} className="text-3xl md:text-5xl font-light leading-tight text-zinc-400">
        Trabalhamos lado a lado com artistas para <span className="text-white">potencializar sua música</span>. Ajudamos a construir uma <span className="text-[#12f2f2]">identidade forte</span> e transformar ideias em projetos de alto impacto.
      </motion.p>
    </section>
  );
}

function ConsultoriaHorizontal() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  
  const areas = ["Identidade de Marca", "Engenharia de Repertório", "Gestão de Escala", "Marketing Digital", "Produção Audiovisual", "Distribuição Digital", "Performance ao Vivo", "Inteligência de Dados", "Networking", "Maximização de Receitas"];

  return (
    <section id="consultoria" ref={targetRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-zinc-950">
        <motion.div style={{ x }} className="flex gap-10 px-[10vw]">
          {areas.map((area, i) => (
            <div key={i} className="min-w-[80vw] md:min-w-[40vw] aspect-video bg-zinc-900 border border-zinc-800 rounded-[40px] p-12 flex flex-col justify-between group">
              <span className="text-6xl font-black text-zinc-800 group-hover:text-[#12f2f2] transition-colors">{(i+1).toString().padStart(2, '0')}</span>
              <h3 className="text-4xl font-bold uppercase italic leading-none">{area}</h3>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServicosInertia() {
  const servicos = ["Ensaio fotográfico", "Cobertura de show", "Filmagem Aérea", "Gravação de clipe", "Assessoria de evento", "Direcionamento estratégico", "Mentorias", "Branding"];
  
  return (
    <section id="servicos" className="py-40 px-6 max-w-7xl mx-auto flex flex-col gap-20">
      {servicos.map((s, i) => (
        <InertiaItem key={i} text={s} index={i} />
      ))}
    </section>
  );
}

function InertiaItem({ text, index }: any) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 0 : 100, index % 2 === 0 ? 0 : -100]);

  return (
    <motion.div ref={ref} style={{ y }} className="w-full bg-zinc-900 border border-zinc-800 p-12 rounded-[40px] flex justify-between items-center group hover:border-[#12f2f2] transition-colors">
      <h4 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">{text}</h4>
      <ArrowRight className="text-zinc-700 group-hover:text-[#12f2f2] transition-colors" size={40} />
    </motion.div>
  );
}

function HubMarquee() {
  const nomes = ["PICUS COMPANY", "GRÍBEL", "EMREDE HUB", "CULTURAL", "ACELERA"];
  return (
    <section id="hub" className="py-40 border-y border-zinc-900 overflow-hidden bg-zinc-950/50">
      <div className="flex whitespace-nowrap">
        <motion.div animate={{ x: [0, "-100%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="flex">
          {nomes.concat(nomes).map((n, i) => (
            <span key={i} className="px-20 text-2xl font-black text-zinc-700 tracking-[0.4em] hover:text-[#12f2f2] transition-colors uppercase cursor-default">{n}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ContatoMarquee() {
  return (
    <section id="contato" className="py-20 overflow-hidden border-b border-zinc-900">
      <div className="flex whitespace-nowrap">
        <motion.div animate={{ x: [0, "-100%"] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="flex">
          <h2 className="text-[12vw] font-black uppercase tracking-tighter leading-none px-10 text-transparent opacity-20 hover:opacity-100 hover:text-[#12f2f2] transition-all duration-700" style={{ WebkitTextStroke: "2px #3f3f46" }}>
            @EMREDEPRO • PROJETOS MUSICAIS • 228802-3803 •
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
