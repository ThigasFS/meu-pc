import type { ConfiguracaoIntencao, IntencaoOrientacao } from './types';

export const titulosIntencoes: Record<IntencaoOrientacao, string> = {
  jogos: 'Jogos',
  trabalho: 'Trabalho',
  estudos: 'Estudos',
  'edicao-de-video': 'Edição de vídeo',
  casual: 'Uso cotidiano',
};

export const intencoes: Record<
  IntencaoOrientacao,
  ConfiguracaoIntencao
> = {
  jogos: {
    titulo: 'Montagem de Computador para Jogar',
    descricao:
      'Para jogos, é importante equilibrar o poder gráfico e o processamento, considerando os jogos e a resolução desejada.',
    componentePrincipal: 'placa-de-video',
    componenteSecundario: 'processador',
  },

  trabalho: {
    titulo: 'Montagem de Computador para Trabalho',
    descricao:
      'Para trabalho, a escolha depende dos programas utilizados, da complexidade das tarefas e da quantidade de atividades simultâneas.',
    componentePrincipal: 'processador',
    componenteSecundario: 'memoria-ram',
  },

  estudos: {
    titulo: 'Montagem de Computador para Estudos',
    descricao:
      'Para estudar, vale priorizar uma experiência fluida, com memória suficiente e armazenamento adequado para arquivos e programas.',
    componentePrincipal: 'memoria-ram',
    componenteSecundario: 'armazenamento',
  },

  'edicao-de-video': {
    titulo: 'Montagem de Computador para Edição de Vídeo',
    descricao:
      'A edição de vídeo pode exigir processamento, memória e aceleração gráfica, dependendo da resolução e dos programas utilizados.',
    componentePrincipal: 'processador',
    componenteSecundario: 'placa-de-video',
  },

  casual: {
    titulo: 'Montagem de Computador para Uso Casual',
    descricao:
      'Para navegação, vídeos e tarefas cotidianas, o objetivo é encontrar um conjunto equilibrado sem pagar por desempenho desnecessário.',
    componentePrincipal: 'processador',
    componenteSecundario: 'memoria-ram',
  },
};