import { IntencaoOrientacao } from '../data/types';
import PC, { PCSimples } from './pc';

export interface Orientacao {
  id: string;
  intencao: IntencaoOrientacao | null;
  respostasQuiz: Record<string, string>;
  pontuacaoQuiz: number | null;
  recomendacao: PCSimples | null;
  concluida: boolean;
}

export function criarOrientacao(id: string): Orientacao {
  return {
    id,
    intencao: null,
    respostasQuiz: {},
    pontuacaoQuiz: null,
    recomendacao: null,
    concluida: false,
  };
}
