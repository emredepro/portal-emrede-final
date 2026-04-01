"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, List, Grid3X3 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const containerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  useEffect(() => {
    setMounted(true);
    
    // GSAP ScrollTrigger - O segredo do PIN (Trava)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", // Quanto tempo a tela fica travada
          pin: true,     // TRAVA A TELA
          scrub: 1,      // Animação vinculada ao dedo no scroll
        }
      });

      tl.fromTo(text1Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
        .to(text1Ref.current, { opacity: 0, y: -50, duration: 1, delay: 0.5 })
        .fromTo(text2Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
        .to(text2Ref.current, { opacity: 0, y: -50, duration: 1, delay: 0.5 });
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) return <div className="min-h-screen bg-[#0f1015]" />;

  return (
    <main className="bg-[#0f1015] text-white flex flex-col items-center relative font-sora select-none overflow-x-hidden">
      
      {/* MENU - FIBRA ÓTICA */}
      <header className="fixed top-6 z-[100] w-full max-w-5xl px-4">
        <nav className="relative bg-zinc-950/90 border border-zinc-800 rounded-full px-8 py-3 flex items-center justify-between shadow-2xl overflow-hidden group">
          <div className="absolute inset-0 rounded-full varko-beam-css opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          <Link href="/" className="relative z-10"><Image src="/Prancheta 6.png" alt="Emrede Pro" width={90} height={24} className="h-6 w-auto object-contain" /></Link>
          <ul className="hidden xl:flex gap-4 text-[10px] uppercase tracking-widest font-bold text-zinc-500">
             {["Home", "Sobre", "Consultoria", "Serviços", "Hub", "Contato"].map(i => <li key={i}><a href={`#${i.toLowerCase()}`} className="hover:text-white transition-colors">{i}</a></li>)}
          </ul>
        </nav>
      </header>

      {/* HERO - SEM ITÁLICO */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center relative w-full px-6">
        <div className={`absolute w-[600px] h-[600px] rounded-full blur-[140px] opacity-20 transition-colors duration-1000 ${isAdvanced ? 'bg-[#8e1e44]' : 'bg-[#12f2f2]'}`} />
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-6 uppercase">EMREDE <span className={isAdvanced ? "text-[#8e1e44]" : "text-[#12f2f2]"}>PRO</span></h1>
        <div onClick={() => setIsAdvanced(!isAdvanced)} className="w-80 h-20 bg-zinc-900 border border-zinc-800 rounded-full p-2 cursor-pointer relative flex items-center mb-12">
          <motion.div animate={{ x: isAdvanced ? 156 : 0 }} className={`absolute w-[150px] h-16 rounded-full ${isAdvanced ? 'bg-[#8e1e44]' : 'bg-[#12f2f2]'}`} />
          <div className="flex justify-around w-full z-10 font-bold text-[10px] uppercase tracking-widest text-zinc-500"><span>Emergente</span><span>Exponencial</span></div>
        </div>
        <div className="relative z-10 rounded-full p-[1px] overflow-hidden group shadow-2xl transition-transform hover:scale-105">
          <div className="absolute inset-0 rounded-full varko-beam-css opacity-70"></div>
          <Link href="/login" className="relative flex items-center gap-3 bg-[#0f1015] hover:bg-[#12f2f2] text-white hover:text-black px-12 py-5 rounded-full font-bold text-xl transition-all">Iniciar Análise SWOT <ArrowRight /></Link>
        </div>
      </section>

      {/* 2. SEÇÃO SOBRE - GSAP SCROLL TRIGGER (TRAVA E REVELA) */}
      <section ref={containerRef} id="sobre" className="w-full bg-[#0f1015] relative overflow-hidden">
        <div className="h-screen w-full flex items-center justify-center px-6 relative">
          <div ref={text1Ref} className="max-w-4xl absolute text-center opacity-0">
            <p className="text-xl md:text-[28px] font-light leading-relaxed text-zinc-400">Trabalhamos lado a lado com artistas para <span className="text-white font-medium">potencializar sua música</span> e sua presença no mercado. Com estratégias personalizadas, ajudamos a construir uma identidade forte.</p>
          </div>
          <div ref={text2Ref} className="max-w-4xl absolute text-center opacity-0">
            <p className="text-[20px] md:text-[24px] font-light leading-relaxed text-zinc-500">Seja você um cantor, produtor ou banda, oferecemos suporte completo, unindo criatividade, gestão e inovação para transformar ideias em projetos de alto impacto.</p>
          </div>
        </div>
      </section>

      {/* 3. SEÇÃO SERVIÇOS - APROXIMADA */}
      <section id="servicos" className="py-20 w-full max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center border-t border-zinc-900/30">
        <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-full p-1 mb-12 scale-90">
          <button onClick={() => setViewMode('list')} className={`px-4 py-2 rounded-full flex gap-2 items-center text-[9px] uppercase tracking-widest font-bold transition-all ${viewMode === 'list' ? 'bg-zinc-800 text-white' : 'text-zinc-500'}`}><List size={12}/> List</button>
          <button onClick={() => setViewMode('grid')} className={`px-4 py-2 rounded-full flex gap-2 items-center text-[9px] uppercase tracking-widest font-bold transition-all ${viewMode === 'grid' ? 'bg-white text-black' : 'text-zinc-500'}`}><Grid3X3 size={12}/> Grid</button>
        </div>
        <div className={`grid gap-10 w-full ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 max-w-[500px]'}`}>
          {[1, 2, 3].map((n) => (
            <div key={n} className="relative group rounded-[32px] overflow-hidden aspect-video shadow-2xl">
              <div className="absolute inset-0 rounded-[32px] varko-beam-css opacity-40 group-hover:opacity-100 transition-opacity z-20 pointer-events-none"></div>
              <Image src={`https://images.unsplash.com/photo-${n === 1 ? '1551288049-bebda4e38f71' : n === 2 ? '1598488035139-bdbb2231ce04' : '1521737711867-e3b97375f902'}?auto=format&fit=crop&q=80&w=800`} alt="Serviço" fill className="object-cover opacity-30 group-hover:opacity-50 transition-all duration-700" />
            </div>
          ))}
        </div>
      </section>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@100;300;400;600;800&display=swap');
        html { scroll-behavior: smooth; }
        body { font-family: 'Sora', sans-serif; background: #0f1015; margin: 0; }
        .varko-beam-css {
          position: absolute; inset: 0; border-radius: inherit; padding: 1.5px;
          background: linear-gradient(transparent, transparent) padding-box,
                      conic-gradient(from var(--angle), transparent 20%, #12f2f2 50%, transparent 80%) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude; animation: rotate-beam 4s linear infinite;
        }
        @property --angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
        @keyframes rotate-beam { from { --angle: 0deg; } to { --angle: 360deg; } }
      `}</style>
    </main>
  );
}
