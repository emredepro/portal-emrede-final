"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, List, Grid3X3 } from "lucide-react";

export default function HomePage() {
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const headerY = useTransform(scrollY, [0, 80], [-20, 0]);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Sobre", href: "#sobre" },
    { name: "Consultoria & Mentoria", href: "#consultoria" },
    { name: "Serviços & Combos", href: "#servicos" },
    { name: "Hub", href: "#hub" },
    { name: "Contato", href: "#contato" },
  ];

  if (!mounted) return <div className="min-h-screen bg-[#0f1015]" />;

  return (
    <main className="min-h-screen bg-[#0f1015] text-white flex flex-col items-center relative overflow-x-hidden font-sora">
      
      {/* MENU */}
      <motion.header 
        style={{ opacity: headerOpacity, y: headerY }}
        className="fixed top-6 z-[100] w-full max-w-5xl px-4 pointer-events-auto"
      >
        <nav className="relative bg-zinc-950/90 border border-zinc-800 rounded-full px-8 py-3 flex items-center justify-between shadow-2xl overflow-hidden">
          <Link href="/" className="flex items-center relative z-10">
            <Image src="/Prancheta 6.png" alt="Emrede Pro" width={90} height={24} className="h-6 w-auto object-contain" priority />
          </Link>
          <ul className="hidden xl:flex gap-4 text-[10px] uppercase tracking-widest font-bold text-zinc-500">
            {navItems.map((item) => (
              <li key={item.name}><a href={item.href} className="hover:text-white transition-colors">{item.name}</a></li>
            ))}
          </ul>
        </nav>
      </motion.header>

      {/* 1. HERO SECTION */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center relative w-full max-w-5xl px-6">
        <motion.div 
          animate={{ backgroundColor: isAdvanced ? "#8e1e44" : "#12f2f2", opacity: 0.15 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none"
        />
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 uppercase italic">
          EMREDE <span className={isAdvanced ? "text-[#8e1e44]" : "text-[#12f2f2]"}>PRO</span>
        </h1>
        
        <div onClick={() => setIsAdvanced(!isAdvanced)} className="w-80 h-20 bg-zinc-900 border border-zinc-800 rounded-full p-2 cursor-pointer relative flex items-center mb-12">
          <motion.div animate={{ x: isAdvanced ? 156 : 0 }} className={`w-[150px] h-16 rounded-full ${isAdvanced ? 'bg-[#8e1e44]' : 'bg-[#12f2f2]'}`} />
          <div className="absolute inset-0 flex justify-around items-center font-bold text-[10px] uppercase tracking-widest text-zinc-500">
            <span className={!isAdvanced ? 'text-black' : ''}>Emergente</span>
            <span className={isAdvanced ? 'text-white' : ''}>Exponencial</span>
          </div>
        </div>

        <Link href="/login" className="flex items-center gap-3 bg-transparent hover:bg-[#12f2f2] text-white hover:text-black px-12 py-5 rounded-full font-bold text-xl border border-white/10 transition-all">
          Iniciar Análise SWOT <ArrowRight />
        </Link>
      </section>

      {/* 2. SEÇÃO SOBRE - SCROLL TRIGGER REAL (TEXT REVEAL) */}
      <SobreSection />

      <footer className="py-20 text-zinc-800 text-[10px] tracking-[0.5em] uppercase font-bold">© EMREDE PRO</footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@100;300;400;600;800&display=swap');
        html { scroll-behavior: smooth; }
        body { background: #0f1015; margin: 0; }
      `}</style>
    </main>
  );
}

function SobreSection() {
  const sectionRef = useRef(null);
  
  // Captura o progresso do scroll apenas nesta seção
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Transforma o scroll em opacidade e movimento para o efeito "Scroll Trigger"
  const opacity = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.1, 0.4], [100, 0]);
  const scale = useTransform(scrollYProgress, [0.1, 0.4], [0.8, 1]);

  return (
    <section id="sobre" ref={sectionRef} className="h-[150vh] flex flex-col items-center justify-start px-6 relative border-t border-zinc-900/50">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center max-w-4xl w-full">
        <motion.p 
          style={{ opacity, y, scale }}
          className="text-xl md:text-[28px] font-light leading-relaxed text-zinc-300 text-center"
        >
          Trabalhamos lado a lado com artistas para <span className="text-white font-medium">potencializar sua música</span> e sua presença no mercado. Com estratégias personalizadas, ajudamos a construir uma identidade forte, alcançar novos públicos e posicionar seu trabalho de forma profissional.
        </motion.p>
        
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 1]) }}
          className="mt-12 h-px w-20 bg-[#12f2f2]"
        />
        
        <motion.p 
          style={{ opacity: useTransform(scrollYProgress, [0.5, 0.7], [0, 1]) }}
          className="text-lg md:text-xl font-light leading-relaxed text-zinc-500 mt-12 text-center"
        >
          Seja você um cantor, produtor ou banda, oferecemos suporte completo, unindo criatividade, gestão e inovação para transformar ideias em projetos de alto impacto.
        </motion.p>
      </div>
    </section>
  );
}
