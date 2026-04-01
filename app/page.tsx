"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const containerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  // useLayoutEffect é fundamental para o GSAP medir o layout antes do usuário ver a página
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    setMounted(true);

    let ctx = gsap.context(() => {
      // Criamos a Timeline que controla o PIN
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%", // Distância do scroll para os 2 textos
          pin: true,     // Trava a tela
          scrub: 1,      // Suavidade
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      // TEXTO 1: Entra, fica, sai
      tl.fromTo(text1Ref.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1, immediateRender: false }
      )
      .to(text1Ref.current, 
        { opacity: 0, y: -50, duration: 1, delay: 0.5 }
      )
      // TEXTO 2: Entra, fica, sai
      .fromTo(text2Ref.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1, immediateRender: false }
      )
      .to(text2Ref.current, 
        { opacity: 0, y: -50, duration: 1, delay: 0.5 });

    }, containerRef);

    // Refresh forçado para garantir que a Vercel entendeu a altura
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#0f1015]" />;

  return (
    <main className="bg-[#0f1015] text-white flex flex-col items-center relative font-sora select-none overflow-x-hidden">
      
      {/* HEADER FIXO COM FIBRA ÓTICA */}
      <header className="fixed top-6 z-[100] w-full max-w-5xl px-4">
        <nav className="relative bg-zinc-950/90 border border-zinc-800 rounded-full px-8 py-3 flex items-center justify-between shadow-2xl overflow-hidden group">
          <div className="absolute inset-0 rounded-full varko-beam-css opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          <Link href="/" className="relative z-10">
            <Image src="/Prancheta 6.png" alt="Emrede Pro" width={90} height={24} className="h-6 w-auto object-contain" priority />
          </Link>
          <ul className="hidden xl:flex gap-4 text-[10px] uppercase tracking-widest font-bold text-zinc-500 relative z-10">
            {["Home", "Sobre", "Consultoria", "Serviços", "Hub", "Contato"].map((i) => (
              <li key={i}><a href={`#${i.toLowerCase()}`} className="hover:text-white transition-colors">{i}</a></li>
            ))}
          </ul>
        </nav>
      </header>

      {/* 1. HERO - EMREDE PRO SEM ITÁLICO */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center relative w-full px-6 z-10">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-20 transition-colors duration-1000 ${isAdvanced ? 'bg-[#8e1e44]' : 'bg-[#12f2f2]'}`} />
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-6 uppercase">
          EMREDE <span className={isAdvanced ? "text-[#8e1e44]" : "text-[#12f2f2]"}>PRO</span>
        </h1>
        <div onClick={() => setIsAdvanced(!isAdvanced)} className="w-80 h-20 bg-zinc-900 border border-zinc-800 rounded-full p-2 cursor-pointer relative flex items-center mb-12">
          <motion.div animate={{ x: isAdvanced ? 156 : 0 }} className={`absolute w-[150px] h-16 rounded-full shadow-lg ${isAdvanced ? 'bg-[#8e1e44]' : 'bg-[#12f2f2]'}`} />
          <div className="flex justify-around w-full z-10 font-bold text-[10px] uppercase tracking-widest text-zinc-500">
            <span>Emergente</span><span>Exponencial</span>
          </div>
        </div>
        <Link href="/login" className="relative z-10 group bg-[#0f1015] hover:bg-[#12f2f2] text-white hover:text-black px-12 py-5 rounded-full font-bold text-xl border border-white/10 transition-all flex items-center gap-3">
          Iniciar Análise SWOT <ArrowRight />
        </Link>
      </section>

      {/* 2. SEÇÃO SOBRE - OS 2 TEXTOS DO SCROLL TRIGGER */}
      <section ref={containerRef} id="sobre" className="w-full bg-[#0f1015] relative z-20 border-t border-zinc-900/50">
        <div className="h-screen w-full flex items-center justify-center px-6 relative overflow-hidden">
          
          <div ref={text1Ref} className="max-w-4xl absolute text-center pointer-events-none opacity-0">
            <p className="text-xl md:text-[28px] font-light leading-relaxed text-zinc-400">
              Trabalhamos lado a lado com artistas para <span className="text-white font-medium">potencializar sua música</span> e sua presença no mercado.
            </p>
          </div>

          <div ref={text2Ref} className="max-w-4xl absolute text-center pointer-events-none opacity-0">
            <p className="text-[20px] md:text-[24px] font-light leading-relaxed text-zinc-500">
              Oferecemos suporte completo para transformar ideias em projetos de <span className="text-white font-medium">alto impacto</span> profissional.
            </p>
          </div>
          
        </div>
      </section>

      {/* 3. SERVIÇOS - ABAIXO DA ANIMAÇÃO */}
      <section id="servicos" className="py-40 w-full max-w-7xl mx-auto px-6 relative z-30 border-t border-zinc-900/30">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[1, 2, 3].map((n) => (
            <div key={n} className="relative group rounded-[32px] overflow-hidden aspect-video shadow-2xl border border-zinc-800">
              <div className="absolute inset-0 rounded-[32px] varko-beam-css opacity-40 group-hover:opacity-100 transition-opacity z-20 pointer-events-none"></div>
              <Image src={`https://images.unsplash.com/photo-${n === 1 ? '1551288049-bebda4e38f71' : n === 2 ? '1598488035139-bdbb2231ce04' : '1521737711867-e3b97375f902'}?auto=format&fit=crop&q=80&w=800`} alt="Serviço" fill className="object-cover opacity-40" />
            </div>
          ))}
        </div>
      </section>

      <footer className="py-20 text-zinc-900 text-[10px] tracking-[0.6em] uppercase font-black text-center w-full">© 2026 EMREDE PRO</footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@100;300;400;600;800&display=swap');
        html { scroll-behavior: smooth; }
        body { font-family: 'Sora', sans-serif; background: #0f1015; color: white; margin: 0; }
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
