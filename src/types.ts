export type PurchaseMoment = 'IMEDIATO' | 'PESQUISA';
export type ArmoredPreference = 'sim' | 'não' | 'indiferente';

export interface VIPFormData {
  nome: string;
  whatsapp: string;
  marcaModelo: string;
  anoPreferido?: string;
  momento: PurchaseMoment;
  blindagem: ArmoredPreference;
  orcamento?: string;
  observacoes?: string;
}
