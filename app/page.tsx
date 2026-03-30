"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Menu, X, List, Grid3X3 } from "lucide-react";

export default function HomePage() {
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [year, setYear] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Sobre", href: "#sobre" },
    { name: "Consultoria & Mentoria", href: "#consultoria" },
    { name: "Serviços & Combos", href: "#servicos" },
    { name: "Hub", href: "#hub" },
    { name: "Contato", href: "#contato" },
  ];

  const servicos = [
    { id: "01", title: "Análise & Diagnóstico", desc: "Mapeamento estratégico de maturidade.", color: "#12f2f2", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
    { id: "02", title: "Marketing & Produção", desc: "Otimização de lançamentos e presença digital.", color: "#ff3b86", img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800" },
    { id: "03", title: "Oportunidades & Conexões", desc: "Rede de fomento e parcerias estratégicas.", color: "#f3dfd4", img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800" },
  ];

  if (!mounted) return <div className="min-h-screen bg-[#0f1015]" />;

  return (
    <main className="min-h-screen bg-[#0f1015] text-white flex flex-col items-center relative overflow-x-hidden font-sora select-none">
      
      {/* MENU LIMPO - SEM BLUR / SEM BOTÃO ACESSAR */}
      <motion.header 
        style={{ opacity: headerOpacity, y: headerY }}
        className="fixed top-6 z-[100] w-full max-w-6xl px-4 pointer-events-auto"
      >
        <nav className="bg-zinc-900 border border-zinc-800 rounded-full px-10 py-3 flex items-center justify-between shadow-2xl">
          <Link href="/" className="flex items-center">
            <Image src="/Prancheta 6.png" alt="Emrede Pro" width={160} height={52} className="h-13 w-auto object-contain" priority />
          </Link>
          
          <ul className="hidden xl:flex gap-1 text-[10px] uppercase tracking-widest font-bold text-zinc-400">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="px-4 py-2 rounded-full border border-transparent hover:border-zinc-700/50 hover:bg-zinc-800/30 hover:text-white transition-all duration-300 block italic">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <button className="xl:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="w-6 h-6 text-zinc-400" />
          </button>
        </nav>
      </motion.header>

      {/* HERO SECTION */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center relative w-full max-w-5xl px-6">
        <motion.div 
          animate={{ backgroundColor: isAdvanced ? colors.vinho : colors.azulNeon, opacity: 0.20 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none"
        />

        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-6xl md:text-9xl font-extrabold tracking-tighter mb-8 leading-[0.85]">
            EMREDE <span style={{ color: isAdvanced ? colors.vinho : colors.azulNeon }} className="transition-colors duration-700">PRO</span>
          </h1>
          
          <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mb-12 font-light">
            Tecnologia para <span className="text-white">transmutar</span> carreiras musicais através de dados e estratégia.
          </p>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link href="/login" className="group flex items-center gap-4 bg-white text-black px-16 py-7 rounded-full font-bold text-2xl transition-all">
              Iniciar Análise SWOT
              <ArrowRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* SWITCH MATURIDADE ABAIXO */}
        <div className="mt-24 flex flex-col items-center gap-8 relative z-10">
          <div onClick={() => setIsAdvanced(!isAdvanced)} className="w-80 h-20 bg-zinc-900 border border-zinc-800 rounded-full p-2 cursor-pointer relative flex items-center">
            <motion.div animate={{ x: isAdvanced ? 156 : 0 }} style={{ backgroundColor: isAdvanced ? colors.vinho : colors.azulNeon }} className="absolute w-[150px] h-16 rounded-full shadow-lg" />
            <div className="flex justify-around w-full z-10 font-bold text-[10px] uppercase tracking-widest italic">
              <span className={!isAdvanced ? "text-black" : "text-zinc-500"}>Underground</span>
              <span className={isAdvanced ? "text-white" : "text-zinc-600"}>Estruturado</span>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO SERVIÇOS - GRID / LIST */}
      <section id="servicos" className="py-32 w-full max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-20 gap-8">
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter uppercase italic">O que <span className="text-zinc-800">entregamos</span></h2>
          
          <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-full p-1.5">
            <button onClick={() => setViewMode('list')} className={`px-5 py-2.5 rounded-full flex gap-2 items-center text-[10px] uppercase tracking-widest font-bold transition-all ${viewMode === 'list' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-100'}`}><List size={14}/> List</button>
            <button onClick={() => setViewMode('grid')} className={`px-5 py-2.5 rounded-full flex gap-2 items-center text-[10px] uppercase tracking-widest font-bold transition-all ${viewMode === 'grid' ? 'bg-white text-black' : 'text-zinc-500 hover:text-zinc-100'}`}><Grid3X3 size={14}/> Grid</button>
          </div>
        </div>

        <div className={`grid gap-6 transition-all duration-500 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1'}`}>
          {servicos.map((s) => (
            <motion.div layout key={s.id} className={`bg-zinc-900/40 border border-zinc-800/50 rounded-[40px] overflow-hidden relative group transition-all ${viewMode === 'list' ? 'flex flex-row items-center p-8' : 'aspect-[4/5] p-10 flex flex-col justify-end'}`}>
              
              {/* Imagem de Fundo (Grid) ou Lateral (List) */}
              <div className={`${viewMode === 'grid' ? 'absolute inset-0 z-0' : 'w-48 h-32 rounded-2xl overflow-hidden relative ml-auto order-last border border-zinc-800'}`}>
                <Image src={s.img} alt={s.title} fill className={`object-cover ${viewMode === 'grid' ? 'opacity-20 group-hover:opacity-40 transition-opacity duration-700' : 'opacity-100'}`} />
              </div>

              {/* Número Sutil Superior Esquerdo */}
              <div style={{ color: s.color }} className="absolute top-10 left-10 font-mono text-[10px] tracking-[0.5em] font-bold opacity-60 z-10">
                {s.id} /
              </div>

              <div className="relative z-10 max-w-xs">
                <h3 className="text-3xl font-bold tracking-tight mb-3 uppercase leading-none">{s.title}</h3>
                <p className="text-zinc-500 text-sm font-light leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <footer id="contato" className="py-20 text-zinc-900 text-[10px] tracking-[0.6em] uppercase font-black text-center w-full">
        © {year} EMREDE PRO / TRANSMUTAÇÃO CONSTANTE
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@100;300;400;600;800&display=swap');
        html { scroll-behavior: smooth; }
        body { font-family: 'Sora', sans-serif; background: #0f1015; color: white; -webkit-font-smoothing: antialiased; }
        .h-13 { height: 3.25rem; }
      `}</style>
    </main>
  );
}
