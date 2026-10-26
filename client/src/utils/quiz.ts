
import type {
  PerguntaQuiz,
  RespostaQuiz,
  ResultadoQuiz,
  PerguntaRespondidaQuiz,
} from '../interfaces/quiz';

import { perguntasQuiz } from '../data/perguntasQuiz';
import { IntencaoOrientacao } from '../data/types';

function embaralhar<T>(itens: T[]): T[] {
  const resultado = [...itens];

  for (let i = resultado.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [resultado[i], resultado[j]] = [
      resultado[j],
      resultado[i],
    ];
  }

  return resultado;
}

export function selecionarPerguntasQuiz(
  intencao: IntencaoOrientacao,
  quantidadeIntencao = 3,
  quantidadeConteudo = 2,
): PerguntaQuiz[] {
  const perguntasIntencao = perguntasQuiz.filter(
    (pergunta) =>
      pergunta.tipo === 'intencao' &&
      pergunta.intencoes?.includes(intencao),
  );

  const perguntasConteudo = perguntasQuiz.filter(
    (pergunta) => pergunta.tipo === 'conteudo',
  );

  if (perguntasIntencao.length < quantidadeIntencao) {
    throw new Error(
      `Não existem perguntas suficientes para a intenção "${intencao}".`,
    );
  }

  if (perguntasConteudo.length < quantidadeConteudo) {
    throw new Error(
      'Não existem perguntas de conteúdo suficientes.',
    );
  }

  const selecionadasIntencao = embaralhar(
    perguntasIntencao,
  ).slice(0, quantidadeIntencao);

  const selecionadasConteudo = embaralhar(
    perguntasConteudo,
  ).slice(0, quantidadeConteudo);

  return embaralhar([
    ...selecionadasIntencao,
    ...selecionadasConteudo,
  ]).map((pergunta) => ({
    ...pergunta,
    alternativas: embaralhar(pergunta.alternativas),
  }));
}

export function calcularResultadoQuiz(
  perguntas: PerguntaQuiz[],
  respostas: RespostaQuiz[],
): ResultadoQuiz {
  const perguntasRespondidas: PerguntaRespondidaQuiz[] =
    perguntas.map((pergunta) => {
      const resposta = respostas.find(
        (item) => item.perguntaId === pergunta.id,
      );

      if (!resposta) {
        throw new Error(
          `A pergunta ${pergunta.id} ainda não foi respondida.`,
        );
      }

      return {
        ...pergunta,
        alternativaSelecionadaId: resposta.alternativaId,
        acertou:
          resposta.alternativaId === pergunta.alternativaCorretaId,
      };
    });

  const totalAcertos = perguntasRespondidas.filter(
    (pergunta) => pergunta.acertou,
  ).length;

  const totalPerguntas = perguntasRespondidas.length;

  return {
    perguntas: perguntasRespondidas,
    totalPerguntas,
    totalAcertos,
    totalErros: totalPerguntas - totalAcertos,
    pontuacao:
      totalPerguntas === 0
        ? 0
        : Math.round((totalAcertos / totalPerguntas) * 100),
  };
}
