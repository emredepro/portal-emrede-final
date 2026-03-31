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
    { id: "01", color: "#12f2f2", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
    { id: "02", color: "#ff3b86", img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800" },
    { id: "03", color: "#f3dfd4", img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800" },
  ];

  if (!mounted) return <div className="min-h-screen bg-[#0f1015]" />;

  return (
    <main className="min-h-screen bg-[#0f1015] text-white flex flex-col items-center relative overflow-x-hidden font-sora select-none">
      
      {/* MENU - EFEITO FIBRA ÓTICA VARKO */}
      <motion.header 
        style={{ opacity: headerOpacity, y: headerY }}
        className="fixed top-6 z-[100] w-full max-w-5xl px-4 pointer-events-auto"
      >
        <nav className="relative bg-zinc-950/80 backdrop-blur-sm rounded-full px-8 py-3 flex items-center justify-between shadow-2xl overflow-hidden varko-beam-container">
          {/* Luz de Fibra Ótica VARKO */}
          <div className="varko-beam"></div>
          
          <Link href="/" className="flex items-center relative z-10">
            <Image src="/Prancheta 6.png" alt="Emrede Pro" width={90} height={24} className="h-6 w-auto object-contain" priority />
          </Link>
          
          <ul className="hidden xl:flex gap-1 text-[10px] uppercase tracking-widest font-bold text-zinc-500 relative z-10">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="px-4 py-2 rounded-full hover:text-white transition-all duration-300 block">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <button className="xl:hidden relative z-10" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="w-6 h-6 text-zinc-400" />
          </button>
        </nav>
      </motion.header>

      {/* HERO SECTION - TÍTULO MENOR */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center relative w-full max-w-5xl px-6 pt-20">
        <motion.div 
          animate={{ backgroundColor: isAdvanced ? colors.vinho : colors.azulNeon, opacity: 0.15 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none"
        />

        <div className="relative z-10 flex flex-col items-center mb-16">
          {/* TÍTULO REDUZIDO (text-5xl md:text-6xl) */}
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-6 leading-tight select-none relative z-10">
            EMREDE <span style={{ color: isAdvanced ? colors.vinho : colors.azulNeon }} className="transition-colors duration-700">PRO</span>
          </h1>
          
          <p className="text-zinc-500 text-lg md:text-xl max-w-xl mb-12 font-light select-none relative z-10">
            Tecnologia para <span className="text-white">transmutar</span> carreiras musicais através de dados e estratégia.
          </p>
        </div>

        {/* SWITCH MATURIDADE */}
        <div className="flex flex-col items-center gap-8 relative z-10 mb-12">
          <div onClick={() => setIsAdvanced(!isAdvanced)} className="w-80 h-20 bg-zinc-900 border border-zinc-800 rounded-full p-2 cursor-pointer relative flex items-center">
            <motion.div animate={{ x: isAdvanced ? 156 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} style={{ backgroundColor: isAdvanced ? colors.vinho : colors.azulNeon }} className="absolute w-[150px] h-16 rounded-full shadow-lg" />
            <div className="flex justify-around w-full z-10 font-bold text-[10px] uppercase tracking-widest select-none">
              <span className={!isAdvanced ? "text-black" : "text-zinc-500"}>Underground</span>
              <span className={isAdvanced ? "text-white" : "text-zinc-600"}>Estruturado</span>
            </div>
          </div>
        </div>

        {/* BOTÃO ABAIXO DO SWITCH - EFEITO FIBRA ÓTICA VARKO */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative z-10 varko-beam-container rounded-full p-[1px] overflow-hidden group">
          {/* Luz de Fibra Ótica VARKO */}
          <div className="varko-beam opacity-70 group-hover:opacity-100"></div>
          <Link href="/login" className="relative flex items-center gap-3 bg-white text-black px-12 py-5 rounded-full font-bold text-xl transition-all select-none">
            Iniciar Análise SWOT
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>

      {/* SEÇÃO SERVIÇOS - PAISAGEM LADO A LADO */}
      <section id="servicos" className="py-32 w-full max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Switch de View Menor e Centralizado */}
        <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-full p-1 mb-24 scale-90">
          <button onClick={() => setViewMode('list')} className={`px-4 py-2 rounded-full flex gap-2 items-center text-[9px] uppercase tracking-widest font-bold transition-all ${viewMode === 'list' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-100'}`}><List size={12}/> List</button>
          <button onClick={() => setViewMode('grid')} className={`px-4 py-2 rounded-full flex gap-2 items-center text-[9px] uppercase tracking-widest font-bold transition-all ${viewMode === 'grid' ? 'bg-white text-black' : 'text-zinc-500 hover:text-zinc-100'}`}><Grid3X3 size={12}/> Grid</button>
        </div>

        {/* Layout Grid: 3 Colunas Lado a Lado | Layout List: Coluna Única Centralizada */}
        <div className={`grid gap-6 w-full transition-all duration-700 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 max-w-[500px]'}`}>
          {servicos.map((s) => (
            <motion.div 
              layout 
              key={s.id} 
              className="bg-zinc-900/40 border border-zinc-800/50 rounded-[28px] overflow-hidden relative group transition-all aspect-video p-10 flex flex-col justify-end shadow-2xl hover:border-zinc-700"
            >
              {/* Imagem de Fundo (Conteúdo do Bloco em Paisagem) */}
              <div className="absolute inset-0 z-0">
                <Image src={s.img} alt={`Serviço ${s.id}`} fill className="object-cover opacity-30 group-hover:opacity-50 transition-all duration-700 group-hover:scale-105" />
              </div>

              {/* Número Sutil Superior Esquerdo */}
              <div style={{ color: s.color }} className="absolute top-6 left-6 font-mono text-[9px] tracking-[0.6em] font-bold opacity-70 z-10">
                {s.id} /
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <footer id="contato" className="py-20 text-zinc-900 text-[10px] tracking-[0.6em] uppercase font-black text-center w-full relative z-10 mt-auto">
        © {year} EMREDE PRO / TRANSMUTAÇÃO CONSTANTE
      </footer>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-8 xl:hidden font-sora"
          >
            <button className="absolute top-10 right-10" onClick={() => setIsMenuOpen(false)}>
              <X className="w-8 h-8" />
            </button>
            <ul className="flex flex-col gap-8 text-2xl font-bold text-center">
              {navItems.map((item) => (
                <li key={item.name} onClick={() => setIsMenuOpen(false)}>
                  <Link href={item.href}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@100;300;400;600;800&display=swap');
        html { scroll-behavior: smooth; }
        body { font-family: 'Sora', sans-serif; background: #0f1015; color: white; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; margin: 0; }
        .h-13 { height: 3.25rem; }

        /* --- EFEITO FIBRA ÓTICA VARKO (Beam Effect) --- */
        .varko-beam-container {
          position: relative;
        }

        .varko-beam {
          position: absolute;
          inset: 0;
          border-radius: 9999px; /* Rounded-full */
          padding: 1px; /* Espessura da borda */
          background: conic-gradient(
            from 0deg at 50% 50%,
            transparent 0%,
            rgba(255, 255, 255, 0) 20%,
            rgba(255, 255, 255, 0.1) 40%,
            rgba(255, 255, 255, 0.6) 50%, /* Ponto de luz nítido */
            rgba(255, 255, 255, 0.1) 60%,
            rgba(255, 255, 255, 0) 80%,
            transparent 100%
          );
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask-composite: exclude;
          pointer-events: none;
          z-index: 1;
          animation: varko-beam-spin 6s linear infinite;
        }

        @keyframes varko-beam-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}
