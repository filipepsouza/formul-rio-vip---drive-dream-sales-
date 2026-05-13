import { motion } from "motion/react";
import { Sparkles, X } from "lucide-react";

interface Props {
  recommendation: string | null;
  onClose: () => void;
}

export function ConciergeAI({ recommendation, onClose }: Props) {
  if (!recommendation) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-8 right-8 z-50 max-w-sm w-full"
    >
      <div className="glass-card p-6 border-gold shadow-[0_0_40px_rgba(201,165,53,0.15)] bg-[#0d0d0d]/95 backdrop-blur-xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
        
        <div className="flex items-center gap-3 mb-4 text-gold">
          <Sparkles size={18} />
          <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase">Concierge AI</h4>
        </div>

        <div className="text-sm font-light leading-[1.8] text-white/90 font-montserrat">
          {recommendation}
        </div>

        <div className="mt-4 pt-4 border-t border-gold/10 flex justify-between items-center text-[9px] uppercase tracking-widest text-white/30 font-bold">
          <span>Sugestão Personalizada</span>
          <span>DDS ELITE</span>
        </div>
      </div>
    </motion.div>
  );
}
