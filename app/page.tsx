"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  useLayoutEffect(() => {
    setMounted(true);
    
    // O segredo do código que você mandou: Contexto + Timeline Scrub
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%", 
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      // Texto 1: Entra de baixo e sai para cima (Alpha + Y)
      tl.fromTo(text1Ref.current, 
        { opacity: 0, y: 100 }, 
        { opacity: 1, y: 0, duration: 1 }
      )
      .to(text1Ref.current, 
        { opacity: 0, y: -100, duration: 1, delay: 0.5 }
      )
      // Texto 2: Faz a mesma coisa logo em seguida na timeline
      .fromTo(text2Ref.current, 
        { opacity: 0, y: 100 }, 
        { opacity: 1, y: 0, duration: 1 }
      )
      .to(text2Ref.current, 
        { opacity: 0, y: -100, duration: 1, delay: 0.5 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!mounted) return null;

  return (
    <main className="bg-[#0f1015] text-white font-sora overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="h-screen flex items-center justify-center">
        <h1 className="text-6xl font-black uppercase tracking-tighter">
          EMREDE <span className="text-[#12f2f2]">PRO</span>
        </h1>
      </section>

      {/* SEÇÃO SOBRE (A TRAVA IGUAL AO TEMPLATE) */}
      <section ref={containerRef} id="sobre" className="relative h-screen w-full bg-[#0f1015] flex items-center justify-center">
        <div className="relative w-full max-w-4xl px-6 h-[200px] flex items-center justify-center">
          
          <div ref={text1Ref} className="absolute text-center opacity-0 pointer-events-none">
            <p className="text-2xl md:text-4xl font-light leading-tight text-zinc-400">
              Trabalhamos lado a lado com artistas para <span className="text-white font-bold text-it">potencializar sua música</span>.
            </p>
          </div>

          <div ref={text2Ref} className="absolute text-center opacity-0 pointer-events-none">
            <p className="text-2xl md:text-4xl font-light leading-tight text-zinc-500">
              Transformamos ideias em projetos de <span className="text-white font-bold text-it text-[#12f2f2]">alto impacto</span>.
            </p>
          </div>

        </div>
      </section>

      {/* SEÇÃO SERVIÇOS (CONTEÚDO QUE VEM DEPOIS) */}
      <section id="servicos" className="min-h-screen py-20 bg-zinc-900/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10">
          {[1, 2, 3].map((n) => (
            <div key={n} className="aspect-video bg-zinc-800 rounded-3xl border border-white/10" />
          ))}
        </div>
      </section>

      <style jsx>{`
        .text-it { font-style: normal !important; }
      `}</style>
    </main>
  );
}
