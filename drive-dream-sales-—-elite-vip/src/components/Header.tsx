import { motion } from "motion/react";
import { AnimatedText } from "./ui/animated-underline-text-one";

export function Header() {
  return (
    <header className="text-center mb-20 relative">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col items-center gap-8 mb-12"
      >
        <div className="relative group mb-2">
          <img 
            src="https://i.ibb.co/GfhD0FSQ/Chat-GPT-Image-12-de-mai-de-2026-21-30-46.png" 
            alt="Drive Dream Sales Logo" 
            className="h-32 w-auto object-contain filter drop-shadow-[0_0_15px_rgba(201,165,53,0.3)] transition-all duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="text-left border-l border-gold/30 pl-6">
          <h2 className="text-xs font-semibold tracking-[0.3em] text-gold uppercase">Drive Dream Sales</h2>
          <p className="text-[10px] font-light tracking-[0.2em] text-white/40 uppercase mt-1">Curadoria Automotiva de Elite</p>
        </div>
      </motion.div>

      <div className="flex items-center justify-center gap-4 mb-10">
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-gold-dim" />
        <div className="w-1.5 h-1.5 bg-gold rotate-45" />
        <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-gold-dim" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <p className="text-[10px] font-semibold tracking-[0.4em] text-gold uppercase mb-4 italic">Acesso Exclusivo</p>
        
        <AnimatedText 
          text={
            <>
              Formulário <span className="italic text-gold">Lista VIP</span>
            </>
          }
          className="mb-6"
          textClassName="text-5xl md:text-6xl font-serif font-bold leading-tight text-[#F5F0E8]"
          underlineClassName="text-gold mt-2"
        />

        <p className="max-w-md mx-auto text-sm font-light text-white/50 leading-relaxed tracking-wide">
          Seja o primeiro a conhecer automóveis raros e oportunidades <br /> fora de catálogo antes que cheguem ao mercado.
        </p>
      </motion.div>
    </header>
  );
}
