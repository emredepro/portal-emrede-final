"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  // Cores extraídas diretamente do seu GUIA-DE-MARCA
  const colors = {
    bg: "#0f1015",
    azulNeon: "#12f2f2",
    vinho: "#8e1e44",
    offWhite: "#f3dfd4",
  };

  return (
    <main className="min-h-screen bg-[#0f1015] text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Efeito de Ruído/Grain sutil no fundo */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Glow de Fundo dinâmico */}
      <motion.div 
        animate={{ 
          backgroundColor: isAdvanced ? colors.vinho : colors.azulNeon,
          opacity: isAdvanced ? 0.15 : 0.2 
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] transition-colors duration-1000"
      />

      <div className="relative z-10 max-w-4xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter mb-6 select-none">
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

        {/* O TOGGLE DE MATURIDADE */}
        <div className="flex flex-col items-center gap-10 mb-20">
          <div 
            onClick={() => setIsAdvanced(!isAdvanced)}
            className="w-80 h-20 bg-zinc-900/40 border border-zinc-800/50 rounded-full p-2 cursor-pointer relative flex items-center backdrop-blur-md"
          >
            {/* O Botão Deslizante */}
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

          {/* Feedback de Texto dinâmico */}
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

        {/* Call to Action */}
        <motion.div 
          whileHover={{ scale: 1.02 }} 
          whileTap={{ scale: 0.98 }}
        >
          <Link 
            href="/login" 
            className="group relative inline-flex items-center gap-4 bg-white text-black px-14 py-6 rounded-full font-bold text-xl transition-all hover:bg-[#f3dfd4]"
          >
            Iniciar Análise SWOT
            <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* Footer Branding */}
      <footer className="mt-32 text-zinc-800 text-[10px] tracking-[0.5em] uppercase font-bold">
        © {year} EMREDE PRO / Transmutação Constante
      </footer>

      {/* Importação da Sora via CSS */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@100;300;400;600;800&display=swap');
        body { 
          font-family: 'Sora', sans-serif;
          background-color: #0f1015;
        }
      `}</style>
    </main>
  );
}
