export type IntencaoOrientacao =
  | 'jogos'
  | 'trabalho'
  | 'estudos'
  | 'edicao-de-video'
  | 'casual';

export type IdComponente =
  | 'processador'
  | 'placa-de-video'
  | 'memoria-ram'
  | 'armazenamento';

export interface Scores {
  scoreCompetitivo: number;
  scoreGrafico: number;
  scoreMultitarefa: number;
  scoreProdutividade: number;
  scoreEficiencia: number;
}

export interface ProdutoRecomendado {
  id: string;
  nome: string;
  imagem: string;
  precoMedio: number;
  scores: Scores;
  scoreDesempenho: number;
  vantagens: string[];
  desvantagens: string[];
  perfil: 'custo-beneficio' | 'desempenho';
}

export interface DadosRecomendacao {
  intencao: IntencaoOrientacao;
  componente: IdComponente;
  titulo: string;
  descricao: string;
  recomendacoes: ProdutoRecomendado[];
}

export const recomendacoes: DadosRecomendacao[] = [
  {
    intencao: 'jogos',
    componente: 'processador',
    titulo: 'Processadores recomendados para jogos',
    descricao:
      'Compare o desempenho em jogos competitivos, jogos graficamente exigentes, multitarefa e produtividade para encontrar a opção mais adequada ao seu perfil.',

    recomendacoes: [
      {
        id: 'i5-13400f',
        nome: 'Intel Core i5-13400F',
        imagem: '/public/i513400f.png',
        precoMedio: 1100,

        scores: {
          scoreCompetitivo: 8,
          scoreGrafico: 7,
          scoreMultitarefa: 8,
          scoreProdutividade: 8,
          scoreEficiencia: 6,
        },

        scoreDesempenho: 78,

        vantagens: [
          'Bom desempenho em jogos e tarefas simultâneas.',
          'Possui núcleos de desempenho e núcleos de eficiência.',
          'Pode atender tanto a jogos quanto a aplicações de produtividade.',
        ],

        desvantagens: [
          'Não possui vídeo integrado; exige uma placa de vídeo dedicada para gerar imagem.',
          'O consumo e a temperatura dependem dos limites de potência e da refrigeração.',
          'O custo-benefício depende do preço encontrado e das alternativas disponíveis.',
        ],

        perfil: 'desempenho',
      },

      {
        id: 'i3-13100f',
        nome: 'Intel Core i3-13100F',
        imagem: '/public/i313100f.png',
        precoMedio: 650,

        scores: {
          scoreCompetitivo: 6,
          scoreGrafico: 5,
          scoreMultitarefa: 5,
          scoreProdutividade: 6,
          scoreEficiencia: 8,
        },

        scoreDesempenho: 58,

        vantagens: [
          'Pode atender a jogos competitivos com uma placa de vídeo adequada.',
          'Preço de entrada geralmente menor que o de modelos mais potentes.',
          'Pode ser suficiente para computadores voltados principalmente a jogos e tarefas cotidianas.',
        ],

        desvantagens: [
          'Menor capacidade de processamento em tarefas altamente paralelizadas.',
          'Pode limitar placas de vídeo mais potentes em determinados jogos.',
          'Também exige uma placa de vídeo dedicada por ser um modelo F.',
        ],

        perfil: 'custo-beneficio',
      },
    ],
  },
];