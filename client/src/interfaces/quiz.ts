import { IntencaoOrientacao } from "../data/types";

export type TipoPerguntaQuiz = 'intencao' | 'conteudo';

export interface AlternativaQuiz {
  id: number;
  texto: string;
}

export interface ExplicacaoAlternativaQuiz {
  alternativaId: number;
  texto: string;
}

export interface PerguntaQuiz {
  id: number;
  tipo: TipoPerguntaQuiz;
  componente?: string;
  intencoes?: IntencaoOrientacao[];
  pergunta: string;
  alternativas: AlternativaQuiz[];
  alternativaCorretaId: number;
  explicacoes: ExplicacaoAlternativaQuiz[];
}

export interface RespostaQuiz {
  perguntaId: number;
  alternativaId: number;
}

export interface PerguntaRespondidaQuiz extends PerguntaQuiz {
  alternativaSelecionadaId: number;
  acertou: boolean;
}

export interface ResultadoQuiz {
  perguntas: PerguntaRespondidaQuiz[];
  totalPerguntas: number;
  totalAcertos: number;
  totalErros: number;
  pontuacao: number;
}

export interface EstadoQuiz {
  perguntas: PerguntaQuiz[];
  indiceAtual: number;
  respostas: RespostaQuiz[];
  resultado: ResultadoQuiz | null;
  concluido: boolean;
}