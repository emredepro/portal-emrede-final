"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";

export default function HomePage() {
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [year, setYear] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Controle de Scroll para o Menu
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const headerY = useTransform(scrollY, [0, 100], [-20, 0]);

  useEffect(() => {
    setMounted(true);
    setYear(new Date().getFullYear());
  }, []);

  const colors = {
    bg: "#0f1015",
    azulNeon: "#12f2f2",
    vinho: "#8e1e44", // Vinho oficial do guia
  };

  const navItems = [
    { name: "Home", href: "#" },
    { name: "Sobre", href: "#" },
    { name: "Consultoria & Mentoria", href: "#" },
    { name: "Serviços & Combos", href: "#" },
    { name: "Contato", href: "#" },
  ];

  if (!mounted) return <div className="min-h-screen bg-[#0f1015]" />;

  return (
    <main className="min-h-[200vh] bg-[#0f1015] text-white flex flex-col items-center px-6 relative overflow-hidden font-sora">
      
      {/* MENU INTELIGENTE (Surge no Scroll) */}
      <motion.header 
        style={{ opacity: headerOpacity, y: headerY }}
        className="fixed top-6 z-[100] w-full max-w-4xl px-4 pointer-events-auto"
      >
        <nav className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/50 rounded-full px-6 py-3 flex items-center justify-between shadow-2xl">
          <div className="text-sm font-bold tracking-tighter">
            EMREDE <span style={{ color: isAdvanced ? colors.vinho : colors.azulNeon }}>PRO</span>
          </div>
          
          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6 text-[10px] uppercase tracking-widest font-bold text-zinc-400">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="hover:text-white transition-colors">{item.name}</Link>
              </li>
            ))}
          </ul>

          <Link 
            href="/login" 
            className="hidden md:block text-[10px] uppercase font-bold bg-white text-black px-4 py-2 rounded-full hover:bg-zinc-200 transition-all"
          >
            Acessar
          </Link>

          {/* Mobile Trigger */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="w-5 h-5" />
          </button>
        </nav>
      </motion.header>

      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center relative w-full max-w-4xl">
        {/* Glow de Fundo dinâmico (OPACIDADE AUMENTADA PARA 20%) */}
        <motion.div 
          animate={{ 
            backgroundColor: isAdvanced ? colors.vinho : colors.azulNeon,
            opacity: 0.20 // Aumentado de 0.15 para 0.20
          }}
          transition={{ duration: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 select-none">
            EMREDE <span 
              style={{ color: isAdvanced ? colors.vinho : colors.azulNeon }} 
              className="transition-colors duration-700"
            >
              PRO
            </span>
          </h1>
          
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-16 font-light leading-relaxed">
            Inteligência tecnológica para <span className="text-white font-medium">transmutar</span> carreiras musicais através de dados e estratégia de elite.
          </p>
        </motion.div>

        {/* TOGGLE DE MATURIDADE */}
        <div className="flex flex-col items-center gap-10 mb-20">
          <div 
            onClick={() => setIsAdvanced(!isAdvanced)}
            className="w-80 h-20 bg-zinc-900/40 border border-zinc-800/50 rounded-full p-2 cursor-pointer relative flex items-center backdrop-blur-md"
          >
            <motion.div 
              animate={{ x: isAdvanced ? 156 : 0 }}
              transition={{ type: "spring", stiffness: 250, damping: 25 }}
              style={{ backgroundColor: isAdvanced ? colors.vinho : colors.azulNeon }}
              className="absolute w-[150px] h-16 rounded-full shadow-lg"
            />
            
            <div className="flex justify-around w-full z-10 font-bold text-[10px] uppercase tracking-[0.2em] transition-colors duration-500 select-none">
              <span className={!isAdvanced ? "text-black" : "text-zinc-500"}>Underground</span>
              <span className={isAdvanced ? "text-white" : "text-zinc-600"}>Estruturado</span>
            </div>
          </div>

          <div className="h-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={isAdvanced ? "advanced" : "underground"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-zinc-500 italic text-sm md:text-base font-light"
              >
                {isAdvanced 
                  ? "“Tenho estrutura e busco alcançar voos maiores.”" 
                  : "“Projeto independente em busca de escala e crescimento.”"}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link 
            href="/login" 
            className="group relative inline-flex items-center gap-4 bg-white text-black px-14 py-6 rounded-full font-bold text-xl transition-all hover:bg-[#f3dfd4]"
          >
            Iniciar Análise SWOT
            <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 text-zinc-800 text-[10px] tracking-[0.5em] uppercase font-bold w-full text-center relative z-10">
        © {year} EMREDE PRO / Transmutação Constante
      </footer>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-8 md:hidden font-sora"
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
        body { 
          font-family: 'Sora', sans-serif;
          background-color: #0f1015;
          margin: 0;
        }
      `}</style>
    </main>
  );
}
