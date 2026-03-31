"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Menu, X, List, Grid3X3 } from "lucide-react";

export default function HomePage() {
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [year, setYear] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const headerY = useTransform(scrollY, [0, 80], [-20, 0]);

  useEffect(() => {
    setMounted(true);
    setYear(new Date().getFullYear());
  }, []);

  const colors = {
    bg: "#0f1015",
    azulNeon: "#12f2f2",
    vinho: "#8e1e44",
  };

  const servicos = [
    { id: "01", color: "#12f2f2", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
    { id: "02", color: "#ff3b86", img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800" },
    { id: "03", color: "#f3dfd4", img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800" },
  ];

  if (!mounted) return <div className="min-h-screen bg-[#0f1015]" />;

  return (
    <main className="min-h-screen bg-[#0f1015] text-white flex flex-col items-center relative overflow-x-hidden font-sora select-none selection:bg-zinc-700">
      
      {/* MENU - RESTAURADO COM FIBRA ÓTICA */}
      <motion.header 
        style={{ opacity: headerOpacity, y: headerY }}
        className="fixed top-6 z-[100] w-full max-w-5xl px-4 pointer-events-auto"
      >
        <nav className="relative bg-zinc-950/90 border border-zinc-800 rounded-full px-8 py-3 flex items-center justify-between shadow-2xl overflow-hidden group">
          <div className="absolute inset-0 rounded-full pointer-events-none varko-beam-overlay animation-beam-azul opacity-50 group-hover:opacity-100 transition-opacity"></div>
          
          <Link href="/" className="flex items-center relative z-10">
            <Image src="/Prancheta 6.png" alt="Emrede Pro" width={90} height={24} className="h-6 w-auto object-contain" priority />
          </Link>
          
          <ul className="hidden xl:flex gap-1 text-[10px] uppercase tracking-widest font-bold text-zinc-500 relative z-10">
            {["Home", "Sobre", "Consultoria", "Serviços", "Hub", "Contato"].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="px-4 py-2 rounded-full border border-transparent hover:border-zinc-700 hover:text-white transition-all duration-300 block">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </motion.header>

      {/* HERO SECTION - SEM ITÁLICO NO TÍTULO */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center relative w-full max-w-5xl px-6 pt-20">
        <motion.div 
          animate={{ backgroundColor: isAdvanced ? colors.vinho : colors.azulNeon, opacity: 0.15 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none"
        />

        <div className="relative z-10 flex flex-col items-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-6 leading-tight">
            EMREDE <span style={{ color: isAdvanced ? colors.vinho : colors.azulNeon }} className="transition-colors duration-700">PRO</span>
          </h1>
          <p className="text-zinc-500 text-lg md:text-xl max-w-xl mb-12 font-light leading-relaxed">
            Tecnologia para <span className="text-white">transmutar</span> carreiras musicais através de dados e estratégia.
          </p>
        </div>

        <div className="flex flex-col items-center gap-8 relative z-10 mb-12">
          <div onClick={() => setIsAdvanced(!isAdvanced)} className="w-80 h-20 bg-zinc-900 border border-zinc-800 rounded-full p-2 cursor-pointer relative flex items-center">
            <motion.div animate={{ x: isAdvanced ? 156 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} style={{ backgroundColor: isAdvanced ? colors.vinho : colors.azulNeon }} className="absolute w-[150px] h-16 rounded-full shadow-lg" />
            <div className="flex justify-around w-full z-10 font-bold text-[10px] uppercase tracking-widest text-zinc-500">
              <span className={!isAdvanced ? "text-black" : ""}>Emergente</span>
              <span className={isAdvanced ? "text-white" : ""}>Exponencial</span>
            </div>
          </div>
        </div>

        {/* BOTÃO SWOT - RESTAURADO COM FIBRA ÓTICA */}
        <motion.div whileHover={{ scale: 1.05 }} className="relative z-10 rounded-full p-[1px] overflow-hidden group">
          <div className="absolute inset-0 rounded-full pointer-events-none varko-beam-overlay animation-beam-azul opacity-60 group-hover:opacity-100 transition-opacity"></div>
          <Link href="/login" className="relative flex items-center gap-3 bg-transparent hover:bg-[#12f2f2] text-white hover:text-black px-12 py-5 rounded-full font-bold text-xl border border-white/10 transition-all duration-500">
            Iniciar Análise SWOT <ArrowRight className="w-6 h-6" />
          </Link>
        </motion.div>
      </section>

      {/* SEÇÃO SOBRE - SCROLL TRIGGER REAL */}
      <SobreSection />

      {/* SEÇÃO SERVIÇOS - RESTAURADO COM CAIXAS E FIBRA ÓTICA */}
      <section id="servicos" className="py-32 w-full max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-full p-1 mb-20 scale-90">
          <button onClick={() => setViewMode('list')} className={`px-4 py-2 rounded-full flex gap-2 items-center text-[9px] uppercase tracking-widest font-bold transition-all ${viewMode === 'list' ? 'bg-zinc-800 text-white' : 'text-zinc-500'}`}><List size={12}/> List</button>
          <button onClick={() => setViewMode('grid')} className={`px-4 py-2 rounded-full flex gap-2 items-center text-[9px] uppercase tracking-widest font-bold transition-all ${viewMode === 'grid' ? 'bg-white text-black' : 'text-zinc-500'}`}><Grid3X3 size={12}/> Grid</button>
        </div>

        <div className={`grid gap-10 w-full transition-all duration-700 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 max-w-[500px]'}`}>
          {servicos.map((s) => (
            <div key={s.id} className="relative group rounded-[32px] overflow-hidden aspect-video transition-all shadow-2xl">
              <div className="absolute inset-0 rounded-[32px] pointer-events-none varko-beam-overlay animation-beam-azul opacity-30 group-hover:opacity-90 transition-opacity z-20"></div>
              <div className="absolute inset-0 border border-zinc-800/50 rounded-[32px] z-10"></div>
              <Image src={s.img} alt={`Serviço ${s.id}`} fill className="object-cover opacity-30 group-hover:opacity-50 transition-all duration-700 group-hover:scale-105" />
              <div style={{ color: s.color }} className="absolute top-6 left-6 font-mono text-[9px] tracking-[0.6em] font-bold opacity-70 z-30">{s.id} /</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-20 text-zinc-900 text-[10px] tracking-[0.6em] uppercase font-black text-center w-full relative z-10">© {year} EMREDE PRO</footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@100;300;400;600;800&display=swap');
        html { scroll-behavior: smooth; }
        body { font-family: 'Sora', sans-serif; background: #0f1015; color: white; margin: 0; overflow-x: hidden; }
        
        .varko-beam-overlay {
          position: absolute; inset: 0; border-radius: inherit; padding: 1.5px;
          background: linear-gradient(transparent, transparent) padding-box,
                      conic-gradient(from var(--border-angle), transparent 20%, #12f2f2 50%, transparent 80%) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude; pointer-events: none; animation: border-angle 4s linear infinite;
        }
        .animation-beam-azul { --beam-color: #12f2f2; }
        @property --border-angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
        @keyframes border-angle { from { --border-angle: 0deg; } to { --border-angle: 360deg; } }
      `}</style>
    </main>
  );
}

function SobreSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0.1, 0.4, 0.7, 0.9], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.1, 0.4], [100, 0]);

  return (
    <section id="sobre" ref={sectionRef} className="h-[150vh] flex flex-col items-center relative border-t border-zinc-900/50">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center max-w-4xl px-6">
        <motion.p style={{ opacity, y }} className="text-xl md:text-[28px] font-light leading-relaxed text-zinc-400 text-center">
          Trabalhamos lado a lado com artistas para <span className="text-white font-medium">potencializar sua música</span> e sua presença no mercado. Com estratégias personalizadas, ajudamos a construir uma identidade forte, alcançar novos públicos e posicionar seu trabalho de forma profissional.
        </motion.p>
        <motion.p 
          style={{ opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 1]) }}
          className="text-[20px] md:text-[22px] font-light leading-relaxed text-zinc-500 mt-12 text-center"
        >
          Seja você um cantor, produtor ou banda, oferecemos suporte completo, unindo criatividade, gestão e inovação para transformar ideias em projetos de alto impacto.
        </motion.p>
      </div>
    </section>
  );
}
