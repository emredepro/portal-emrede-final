"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      {/* Logo Emrede */}
      <div className="mb-8 w-24 h-24 bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-800">
        <span className="text-3xl font-bold text-zinc-400">E</span>
      </div>

      <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-6 tracking-tighter">
        EMREDE <span className="text-zinc-500">PRO</span>
      </h1>
      
      <p className="text-zinc-400 text-center max-w-md mb-10 text-lg leading-relaxed">
        A inteligência estratégica para transmutar sua carreira musical. 
        Acesse seu mapa de maturidade e inicie a jornada.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/login" 
          className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-zinc-200 transition-all text-center"
        >
          Iniciar Jornada
        </Link>
      </div>

      <footer className="mt-20 text-zinc-600 text-sm">
        © {year} Emrede Pro. Todos os direitos reservados.
      </footer>
    </div>
  );
}
