import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { VIPForm } from "./components/VIPForm";
import { ConciergeAI } from "./components/ConciergeAI";
import { VIPFormData } from "./types";
import { getCarRecommendation } from "./services/geminiService";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2 } from "lucide-react";

export default function App() {
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (data: VIPFormData) => {
    setIsSubmitting(true);
    
    try {
      // Send data to webhook
      const response = await fetch("https://n8n-n8n.ixzefo.easypanel.host/webhook/drive-dream-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: data.nome,
          whatsapp: data.whatsapp,
          marca_modelo: data.marcaModelo,
          ano: data.anoPreferido || "",
          momento: data.momento,
          blindagem: data.blindagem,
          investimento: data.orcamento || "",
          observacoes: data.observacoes || "",
        }),
      });

      if (!response.ok) {
        throw new Error("Falha ao enviar os dados.");
      }
      
      // Get AI recommendation (background)
      getCarRecommendation(`${data.marcaModelo} ${data.observacoes || ""}`).then(rec => {
        if (rec) setRecommendation(rec);
      });
      
      setIsSuccess(true);
    } catch (error) {
      console.error("Erro no envio:", error);
      alert("Houve um erro ao enviar sua solicitação. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative selection:bg-gold/30">
      {/* Cinematic Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-black" />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          className="absolute inset-0 scale-110"
        >
          {/* Subtle gradient overlays for depth */}
          <div className="absolute top-0 left-[-10%] w-[60%] h-[60%] rounded-full bg-gold/5 blur-[120px]" />
          <div className="absolute bottom-0 right-[-10%] w-[60%] h-[60%] rounded-full bg-gold/5 blur-[120px]" />
          
          {/* Fine structural lines */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(var(--color-gold-dim) 1px, transparent 1px), linear-gradient(90deg, var(--color-gold-dim) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
        </motion.div>
      </div>

      <main className="relative z-10 container mx-auto max-w-4xl px-6 py-20 pb-32">
        <Header />
        <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <VIPForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-16 text-center space-y-8"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] gold-gradient" />
                <div className="flex justify-center">
                  <div className="w-20 h-20 rounded-full border border-gold/30 flex items-center justify-center text-gold">
                    <CheckCircle2 size={40} strokeWidth={1} />
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl md:text-5xl font-serif font-bold text-gold tracking-tight leading-tight">Solicitação Recebida</h3>
                  <p className="text-white/50 font-montserrat font-light text-sm md:text-base max-w-sm mx-auto leading-relaxed">
                    Sua ficha foi enviada para nossa mesa de curadoria.
                    <span className="block mt-4 text-white/40">
                      Em breve, um de nossos especialistas entrará em contato via WhatsApp para prosseguir com seu atendimento exclusivo.
                    </span>
                  </p>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  onClick={() => { setIsSuccess(false); setRecommendation(null); }}
                  className="text-[11px] font-semibold tracking-[0.6em] uppercase text-gold hover:text-gold-light transition-all border-b border-transparent hover:border-gold-dim pb-1 mt-4"
                >
                  Novo Cadastro
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

        {/* Footer */}
        <footer className="mt-20 pt-10 border-t border-gold/10 text-center space-y-6">
          <div className="flex justify-center items-center gap-10 opacity-30 invert brightness-200 grayscale">
              <span className="text-[10px] tracking-[0.5em] font-serif uppercase">Rolls-Royce</span>
              <span className="text-[10px] tracking-[0.5em] font-serif uppercase">Bentley</span>
              <span className="text-[10px] tracking-[0.5em] font-serif uppercase">Porsche</span>
          </div>
          <p className="text-[9px] text-white/20 uppercase tracking-[0.3em] font-medium">
            Drive Dream Sales &copy; {new Date().getFullYear()} — Excelência em Curadoria Automotiva
          </p>
        </footer>
      </main>

      <AnimatePresence>
        {recommendation && (
          <ConciergeAI 
            recommendation={recommendation} 
            onClose={() => setRecommendation(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
