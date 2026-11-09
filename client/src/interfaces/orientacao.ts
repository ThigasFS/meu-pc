
import { IntencaoOrientacao } from '../data/types';
import { PCRecomendado } from './pc';

export interface CriteriosOrientacao {
  orcamento: number;
  orcamentoMinimo: number;
  perfil?: 'custo-beneficio' | 'desempenho' | 'hibrido';
  respostas?: Record<string, unknown>;
}

export interface Orientacao {
  id: string;
  intencao: IntencaoOrientacao | null;
  criterios: CriteriosOrientacao | null;
  recomendacoes: PCRecomendado[];
  concluida: boolean;
}

export function criarOrientacao(id: string): Orientacao {
  return {
    id,
    intencao: null,
    criterios: null,
    recomendacoes: [],
    concluida: false,
  };
}

