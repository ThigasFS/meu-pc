
import { IntencaoOrientacao } from '../data/types';
import { PCSimples } from './pc';
import type { PerguntaQuiz, ResultadoQuiz } from '../interfaces/quiz';

export interface Orientacao {
  id: string;
  intencao: IntencaoOrientacao | null;

  respostasQuiz: Record<string, string>;
  perguntasQuiz: PerguntaQuiz[];
  indicePerguntaQuiz: number;
  pontuacaoQuiz: number | null;
  resultadoQuiz: ResultadoQuiz | null;

  recomendacao: PCSimples | null;
  concluida: boolean;
}

export function criarOrientacao(id: string): Orientacao {
  return {
    id,
    intencao: null,

    respostasQuiz: {},
    perguntasQuiz: [],
    indicePerguntaQuiz: 0,
    pontuacaoQuiz: null,
    resultadoQuiz: null,

    recomendacao: null,
    concluida: false,
  };
}
