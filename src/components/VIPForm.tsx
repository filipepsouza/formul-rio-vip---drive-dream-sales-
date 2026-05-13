import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { VIPFormData, PurchaseMoment, ArmoredPreference } from "../types";
import { ChevronRight, Shield, Zap, Search, Loader2 } from "lucide-react";
import { GlassButton } from "./ui/glass-button";
import { MagneticButton } from "./ui/magnetic-button";
import { BorderBeam } from "./ui/border-beam";

interface Props {
  onSubmit: (data: VIPFormData) => void;
  isSubmitting?: boolean;
}

export function VIPForm({ onSubmit, isSubmitting }: Props) {
  const [formData, setFormData] = useState<VIPFormData>({
    nome: "",
    whatsapp: "",
    marcaModelo: "",
    momento: "IMEDIATO",
    blindagem: "sim",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="glass-card p-10 md:p-14 overflow-hidden relative"
    >
      <BorderBeam duration={6} borderWidth={2} colorFrom="#C9A535" colorTo="#E4C66A" />
      
      {/* Decorative Gold Header Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] gold-gradient opacity-20" />
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-gold-dim/40" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-gold-dim/40" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-gold-dim/40" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold-dim/40" />

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Basic Info */}
        <div className="space-y-8">
          <SectionLabel label="Informações Pessoais" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Field label="Nome Completo">
              <input
                type="text"
                required
                className="luxury-input"
                placeholder="Ex: Alexander von Porsche"
                value={formData.nome}
                onChange={e => setFormData({ ...formData, nome: e.target.value })}
              />
            </Field>
            <Field label="WhatsApp / Contato">
              <input
                type="tel"
                required
                className="luxury-input"
                placeholder="(00) 00000-0000"
                value={formData.whatsapp}
                onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
              />
            </Field>
          </div>
        </div>

        {/* Vehicle Preferences */}
        <div className="space-y-8">
          <SectionLabel label="Preferências Automotivas" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Field label="Marca e Modelo Desejado">
              <input
                type="text"
                required
                className="luxury-input"
                placeholder="Ex: Bentley Continental GT"
                value={formData.marcaModelo}
                onChange={e => setFormData({ ...formData, marcaModelo: e.target.value })}
              />
            </Field>
            <Field label="Ano de Preferência (Opcional)">
              <input
                type="text"
                className="luxury-input"
                placeholder="Ex: 2023+"
                value={formData.anoPreferido}
                onChange={e => setFormData({ ...formData, anoPreferido: e.target.value })}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <Field label="Momento de Aquisição">
              <div className="flex border border-gold/20 p-1 bg-surface-soft rounded-2xl overflow-hidden">
                <OptionButton
                  active={formData.momento === "IMEDIATO"}
                  onClick={() => setFormData({ ...formData, momento: "IMEDIATO" })}
                  icon={<Zap size={14} />}
                  label="Imediato"
                />
                <OptionButton
                  active={formData.momento === "PESQUISA"}
                  onClick={() => setFormData({ ...formData, momento: "PESQUISA" })}
                  icon={<Search size={14} />}
                  label="Pesquisa"
                />
              </div>
            </Field>
            <Field label="Blindagem">
              <div className="flex border border-gold/20 p-1 bg-surface-soft rounded-2xl overflow-hidden">
                <OptionButton
                  active={formData.blindagem === "sim"}
                  onClick={() => setFormData({ ...formData, blindagem: "sim" })}
                  label="Sim"
                />
                <OptionButton
                  active={formData.blindagem === "não"}
                  onClick={() => setFormData({ ...formData, blindagem: "não" })}
                  label="Não"
                />
                <OptionButton
                  active={formData.blindagem === "indiferente"}
                  onClick={() => setFormData({ ...formData, blindagem: "indiferente" })}
                  label="Indiferente"
                />
              </div>
            </Field>
          </div>
        </div>

        {/* Investment & Details */}
        <div className="space-y-8">
          <SectionLabel label="Investimento & Observações" />
          <Field label="Faixa de Investimento Estimada">
            <select
              className="luxury-input appearance-none cursor-pointer"
              value={formData.orcamento}
              onChange={e => setFormData({ ...formData, orcamento: e.target.value })}
            >
              <option value="" className="bg-surface text-white/50">Selecione uma faixa...</option>
              <option value="250k-500k" className="bg-surface">R$ 250k — R$ 500k</option>
              <option value="500k-1M" className="bg-surface">R$ 500k — R$ 1M</option>
              <option value="1M-2M" className="bg-surface">R$ 1M — R$ 2M</option>
              <option value="acima-2M" className="bg-surface">Acima de R$ 2M</option>
            </select>
          </Field>
          <Field label="Desejos Específicos & Exigências">
            <textarea
              className="luxury-input min-h-[120px] resize-none py-4"
              placeholder="Descreva cor interna, pacotes de opcionais ou qualquer detalhe imprescindível..."
              value={formData.observacoes}
              onChange={e => setFormData({ ...formData, observacoes: e.target.value })}
            />
          </Field>
        </div>

        <div className="pt-6 flex justify-center">
          <MagneticButton distance={0.3}>
            <GlassButton
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:min-w-[380px]"
              contentClassName="flex items-center justify-center gap-4 py-6 md:py-10"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin text-bg" />
              ) : (
                <>
                  <span className="tracking-[0.3em] text-sm md:text-lg uppercase">Garantir Acesso à Lista VIP</span>
                  <Zap className="h-5 w-5 md:h-6 md:w-6 fill-current text-bg" />
                </>
              )}
            </GlassButton>
          </MagneticButton>
        </div>
      </form>
    </motion.div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <h3 className="text-[10px] font-bold tracking-[0.3em] text-gold-dim uppercase whitespace-nowrap">{label}</h3>
      <div className="h-[1px] w-full bg-gold/10" />
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="luxury-label">{label}</label>
      {children}
    </div>
  );
}

function OptionButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon?: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-[10px] font-bold tracking-widest uppercase transition-all duration-300 rounded-xl ${
        active ? "bg-gold text-bg" : "text-white/40 hover:text-white/80 hover:bg-white/5"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
