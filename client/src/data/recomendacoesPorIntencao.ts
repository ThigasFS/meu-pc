import { CategoriaPc } from "../interfaces/componente";
import { PCRecomendado } from "../interfaces/pc";
import { IntencaoOrientacao } from "./types";

type ConfiguracaoPC = Omit<
  PCRecomendado,
  | 'processador'
  | 'placaMae'
  | 'memoriaRam'
  | 'armazenamento'
  | 'fonte'
  | 'placaVideo'
  | 'gabinete'
> & {
  processador: {
    nome: string;
    marca: string;
    preco: number;
    descricao: string;
    velocidade: number;
    videoIntegrado: boolean;
  };
  placaMae: {
    nome: string;
    marca: string;
    preco: number;
    descricao: string;
    socket: string;
    formato: string;
    ddr: number;
  };
  memoriaRam: {
    nome: string;
    marca: string;
    preco: number;
    descricao: string;
    capacidade: number;
    modulos: number[];
    velocidade: number;
    ddr: number;
  };
  armazenamento: {
    nome: string;
    marca: string;
    preco: number;
    descricao: string;
    capacidade: number;
    unidade: string;
    tipoArmazenamento: string;
  };
  fonte: {
    nome: string;
    marca: string;
    preco: number;
    descricao: string;
    potencia: number;
    certificacao?: string;
  };
  placaVideo?: {
    nome: string;
    marca: string;
    preco: number;
    descricao: string;
    memoria: number;
  };
  gabinete?: {
    nome: string;
    marca: string;
    preco: number;
    descricao: string;
    formato: string;
  };
};

function criarPC(config: ConfiguracaoPC): PCRecomendado {
  const {
    processador,
    placaMae,
    memoriaRam,
    armazenamento,
    fonte,
    placaVideo,
    gabinete,
    ...dados
  } = config;

  const componenteBase = (
    componente: {
      nome: string;
      marca: string;
      preco: number;
      descricao: string;
    },
    id: number,
  ) => ({
    id,
    ...componente,
  });

  return {
    ...dados,

    processador: {
      ...componenteBase(processador, dados.id * 10 + 1),
      velocidade: processador.velocidade,
      videoIntegrado: processador.videoIntegrado,
    },

    placaMae: {
      ...componenteBase(placaMae, dados.id * 10 + 2),
      socket: placaMae.socket,
      formato: placaMae.formato,
      ddr: placaMae.ddr,
    },

    memoriaRam: {
      ...componenteBase(memoriaRam, dados.id * 10 + 3),
      capacidade: memoriaRam.capacidade,
      modulos: memoriaRam.modulos,
      velocidade: memoriaRam.velocidade,
      ddr: memoriaRam.ddr,
    },

    armazenamento: {
      ...componenteBase(armazenamento, dados.id * 10 + 4),
      capacidade: armazenamento.capacidade,
      unidade: armazenamento.unidade,
      tipoArmazenamento: armazenamento.tipoArmazenamento,
    },

    fonte: {
      ...componenteBase(fonte, dados.id * 10 + 5),
      potencia: fonte.potencia,
      certificacao: fonte.certificacao,
    },

    ...(placaVideo && {
      placaVideo: {
        ...componenteBase(placaVideo, dados.id * 10 + 6),
        memoria: placaVideo.memoria,
      },
    }),

    ...(gabinete && {
      gabinete: {
        ...componenteBase(gabinete, dados.id * 10 + 7),
        formato: gabinete.formato,
      },
    }),
  };
}

const gabineteMAtx = {
  nome: 'Gabinete Micro-ATX com frontal ventilada',
  marca: 'Genérico',
  preco: 250,
  descricao: 'Gabinete compacto com espaço para ventilação.',
  formato: 'Micro-ATX',
};

const ssd1Tb = {
  nome: 'SSD NVMe 1 TB',
  marca: 'Genérico',
  preco: 400,
  descricao: 'Armazenamento rápido para sistema, programas e jogos.',
  capacidade: 1,
  unidade: 'TB',
  tipoArmazenamento: 'SSD NVMe',
};

const ssd500Gb = {
  nome: 'SSD NVMe 500 GB',
  marca: 'Genérico',
  preco: 260,
  descricao: 'Armazenamento rápido para sistema e programas.',
  capacidade: 500,
  unidade: 'GB',
  tipoArmazenamento: 'SSD NVMe',
};

const memoria16Gb = {
  nome: 'Memória DDR4 16 GB (2 × 8 GB)',
  marca: 'Genérico',
  preco: 300,
  descricao: 'Dois módulos para aproveitar o funcionamento em dual-channel.',
  capacidade: 16,
  modulos: [8, 8],
  velocidade: 3200,
  ddr: 4,
};

const memoria32Gb = {
  nome: 'Memória DDR4 32 GB (2 × 16 GB)',
  marca: 'Genérico',
  preco: 520,
  descricao: 'Capacidade maior para multitarefa e aplicações exigentes.',
  capacidade: 32,
  modulos: [16, 16],
  velocidade: 3200,
  ddr: 4,
};

const fonte550W = {
  nome: 'Fonte 550 W 80 Plus Bronze',
  marca: 'Genérico',
  preco: 300,
  descricao: 'Fonte dimensionada para configurações de consumo moderado.',
  potencia: 550,
  certificacao: '80 Plus Bronze',
};

const fonte650W = {
  nome: 'Fonte 650 W 80 Plus Bronze',
  marca: 'Genérico',
  preco: 380,
  descricao: 'Fonte para configurações com placa de vídeo dedicada.',
  potencia: 650,
  certificacao: '80 Plus Bronze',
};

const fonte750W = {
  nome: 'Fonte 750 W 80 Plus Gold',
  marca: 'Genérico',
  preco: 600,
  descricao: 'Fonte com maior margem de potência para uma configuração avançada.',
  potencia: 750,
  certificacao: '80 Plus Gold',
};

const ryzen5600 = {
  nome: 'Ryzen 5 5600',
  marca: 'AMD',
  preco: 650,
  descricao: 'Processador de seis núcleos, sem vídeo integrado.',
  velocidade: 4.4,
  videoIntegrado: false,
};

const ryzen5600g = {
  nome: 'Ryzen 5 5600G',
  marca: 'AMD',
  preco: 750,
  descricao: 'Processador com vídeo integrado, adequado para configurações sem GPU dedicada.',
  velocidade: 4.4,
  videoIntegrado: true,
};

const ryzen5700x = {
  nome: 'Ryzen 7 5700X',
  marca: 'AMD',
  preco: 950,
  descricao: 'Processador de oito núcleos para multitarefa e aplicações mais exigentes.',
  velocidade: 4.6,
  videoIntegrado: false,
};

const ryzen7600 = {
  nome: 'Ryzen 5 7600',
  marca: 'AMD',
  preco: 1200,
  descricao: 'Processador moderno de seis núcleos com vídeo integrado básico.',
  velocidade: 5.1,
  videoIntegrado: true,
};

const placaMaeAm4 = {
  nome: 'Placa-mãe A520M',
  marca: 'Genérico',
  preco: 400,
  descricao: 'Placa-mãe de entrada para processadores AM4.',
  socket: 'AM4',
  formato: 'Micro-ATX',
  ddr: 4,
};

const placaMaeAm4B550 = {
  nome: 'Placa-mãe B550M',
  marca: 'Genérico',
  preco: 600,
  descricao: 'Placa-mãe AM4 com recursos adicionais de expansão.',
  socket: 'AM4',
  formato: 'Micro-ATX',
  ddr: 4,
};

const placaMaeAm5 = {
  nome: 'Placa-mãe B650M',
  marca: 'Genérico',
  preco: 900,
  descricao: 'Placa-mãe AM5 com suporte a memória DDR5.',
  socket: 'AM5',
  formato: 'Micro-ATX',
  ddr: 5,
};

const rx6600 = {
  nome: 'Radeon RX 6600 8 GB',
  marca: 'AMD',
  preco: 1300,
  descricao: 'Placa de vídeo dedicada para jogos em Full HD.',
  memoria: 8,
};

const rx7600 = {
  nome: 'Radeon RX 7600 8 GB',
  marca: 'AMD',
  preco: 1800,
  descricao: 'Placa de vídeo dedicada para jogos em Full HD com desempenho elevado.',
  memoria: 8,
};

const rx7800xt = {
  nome: 'Radeon RX 7800 XT 16 GB',
  marca: 'AMD',
  preco: 3500,
  descricao: 'Placa de vídeo dedicada para jogos com qualidade gráfica elevada.',
  memoria: 16,
};

/**
 * Os scores abaixo são apenas ilustrativos.
 * Substitua-os por resultados de benchmarks documentados antes de
 * apresentar os números como resultados reais no TCC.
 */
const benchmarks = {
  jogosBasico: [
    {
      nome: 'Jogos competitivos',
      score: 55,
      descricao: 'Estimativa ilustrativa de adequação a jogos competitivos.',
    },
    {
      nome: 'Jogos com gráficos exigentes',
      score: 25,
      descricao: 'Estimativa ilustrativa de capacidade gráfica.',
    },
  ],
  jogosIntermediario: [
    {
      nome: 'Jogos competitivos',
      score: 78,
      descricao: 'Estimativa ilustrativa de adequação a jogos competitivos.',
    },
    {
      nome: 'Jogos com gráficos exigentes',
      score: 65,
      descricao: 'Estimativa ilustrativa de capacidade gráfica.',
    },
  ],
  jogosAvancado: [
    {
      nome: 'Jogos competitivos',
      score: 90,
      descricao: 'Estimativa ilustrativa de adequação a jogos competitivos.',
    },
    {
      nome: 'Jogos com gráficos exigentes',
      score: 92,
      descricao: 'Estimativa ilustrativa de capacidade gráfica.',
    },
  ],
  trabalhoBasico: [
    {
      nome: 'Multitarefa',
      score: 62,
      descricao: 'Estimativa ilustrativa de desempenho em tarefas simultâneas.',
    },
    {
      nome: 'Aplicações profissionais',
      score: 48,
      descricao: 'Estimativa ilustrativa para aplicações de produtividade.',
    },
  ],
  trabalhoAvancado: [
    {
      nome: 'Multitarefa',
      score: 88,
      descricao: 'Estimativa ilustrativa de desempenho em tarefas simultâneas.',
    },
    {
      nome: 'Aplicações profissionais',
      score: 82,
      descricao: 'Estimativa ilustrativa para aplicações de produtividade.',
    },
  ],
  estudos: [
    {
      nome: 'Aplicações de estudo',
      score: 75,
      descricao: 'Estimativa ilustrativa para navegador, documentos e aulas.',
    },
    {
      nome: 'Multitarefa',
      score: 68,
      descricao: 'Estimativa ilustrativa de uso simultâneo de aplicativos.',
    },
  ],
  videoBasico: [
    {
      nome: 'Edição de vídeo',
      score: 55,
      descricao: 'Estimativa ilustrativa de desempenho em edição.',
    },
    {
      nome: 'Renderização',
      score: 45,
      descricao: 'Estimativa ilustrativa de capacidade de renderização.',
    },
  ],
  videoAvancado: [
    {
      nome: 'Edição de vídeo',
      score: 86,
      descricao: 'Estimativa ilustrativa de desempenho em edição.',
    },
    {
      nome: 'Renderização',
      score: 90,
      descricao: 'Estimativa ilustrativa de capacidade de renderização.',
    },
  ],
  cotidiano: [
    {
      nome: 'Uso cotidiano',
      score: 78,
      descricao: 'Estimativa ilustrativa para navegação e tarefas comuns.',
    },
    {
      nome: 'Multitarefa',
      score: 62,
      descricao: 'Estimativa ilustrativa de uso simultâneo de aplicativos.',
    },
  ],
};

export const recomendacoesPorIntencao: Record<
  IntencaoOrientacao,
  PCRecomendado[]
> = {
  jogos: [
    criarPC({
      id: 1,
      nome: 'PC Gamer Full HD Econômico',
      categoria: 'Jogar' as CategoriaPc,
      intencao: 'jogos',
      perfil: 'custo-beneficio',
      descricao:
        'Uma configuração de entrada para quem quer começar a jogar em Full HD sem investir tanto.',
      vantagens: [
        'Placa de vídeo dedicada para jogos',
        'Bom ponto de partida para jogos competitivos',
        'Possibilidade de upgrades futuros',
      ],
      limitacoes: [
        'Pode exigir redução da qualidade gráfica em jogos pesados',
        '8 GB de VRAM podem limitar algumas configurações gráficas',
      ],
      videoIntegrado: false,
      processador: ryzen5600,
      placaMae: placaMaeAm4,
      memoriaRam: memoria16Gb,
      armazenamento: ssd500Gb,
      fonte: fonte550W,
      placaVideo: rx6600,
      gabinete: gabineteMAtx,
      valorTotal: 3900,
      benchmarks: benchmarks.jogosIntermediario,
    }),
    criarPC({
      id: 2,
      nome: 'PC Gamer de Alto Desempenho',
      categoria: 'Jogar' as CategoriaPc,
      intencao: 'jogos',
      perfil: 'desempenho',
      descricao:
        'Configuração voltada a jogos com maior qualidade gráfica e desempenho elevado.',
      vantagens: [
        'Placa de vídeo com 16 GB de VRAM',
        'Boa margem para jogos graficamente exigentes',
        'Processador adequado para jogos e multitarefa',
      ],
      limitacoes: [
        'Investimento inicial mais alto',
        'Consumo e dissipação de calor maiores',
      ],
      videoIntegrado: false,
      processador: ryzen5700x,
      placaMae: placaMaeAm4B550,
      memoriaRam: memoria32Gb,
      armazenamento: ssd1Tb,
      fonte: fonte750W,
      placaVideo: rx7800xt,
      gabinete: gabineteMAtx,
      valorTotal: 6700,
      benchmarks: benchmarks.jogosAvancado,
    }),
  ],

  trabalho: [
    criarPC({
      id: 3,
      nome: 'PC para Trabalho e Multitarefa',
      categoria: 'Profissional' as CategoriaPc,
      intencao: 'trabalho',
      perfil: 'custo-beneficio',
      descricao:
        'Uma opção equilibrada para documentos, navegação com várias abas, reuniões e ferramentas de escritório.',
      vantagens: [
        '16 GB de RAM para multitarefa cotidiana',
        'SSD para inicialização rápida',
        'Vídeo integrado para dispensar placa de vídeo dedicada',
      ],
      limitacoes: [
        'Não é voltado à renderização pesada',
        'O desempenho gráfico é limitado',
      ],
      videoIntegrado: true,
      processador: ryzen5600g,
      placaMae: placaMaeAm4,
      memoriaRam: memoria16Gb,
      armazenamento: ssd500Gb,
      fonte: fonte550W,
      gabinete: gabineteMAtx,
      valorTotal: 2660,
      benchmarks: benchmarks.trabalhoBasico,
    }),
    criarPC({
      id: 4,
      nome: 'PC para Trabalho Intensivo',
      categoria: 'Profissional' as CategoriaPc,
      intencao: 'trabalho',
      perfil: 'desempenho',
      descricao:
        'Uma configuração para aplicações profissionais que se beneficiam de mais núcleos e memória.',
      vantagens: [
        '32 GB de RAM para projetos maiores',
        'Processador de oito núcleos',
        'SSD de 1 TB para arquivos e programas',
      ],
      limitacoes: [
        'Não inclui placa de vídeo dedicada',
        'Pode não ser ideal para aplicações que dependem de GPU',
      ],
      videoIntegrado: false,
      processador: ryzen5700x,
      placaMae: placaMaeAm4B550,
      memoriaRam: memoria32Gb,
      armazenamento: ssd1Tb,
      fonte: fonte650W,
      gabinete: gabineteMAtx,
      valorTotal: 3420,
      benchmarks: benchmarks.trabalhoAvancado,
    }),
  ],

  estudos: [
    criarPC({
      id: 5,
      nome: 'PC para Estudos',
      categoria: 'Educação' as CategoriaPc,
      intencao: 'estudos',
      perfil: 'custo-beneficio',
      descricao:
        'Computador para aulas on-line, pesquisas, documentos, apresentações e programação introdutória.',
      vantagens: [
        'Custo inicial mais acessível',
        'Vídeo integrado',
        '16 GB de RAM para alternar entre aplicativos',
      ],
      limitacoes: [
        'Não é indicado para jogos pesados',
        'Armazenamento de 500 GB pode ser pouco para muitos arquivos',
      ],
      videoIntegrado: true,
      processador: ryzen5600g,
      placaMae: placaMaeAm4,
      memoriaRam: memoria16Gb,
      armazenamento: ssd500Gb,
      fonte: fonte550W,
      gabinete: gabineteMAtx,
      valorTotal: 2660,
      benchmarks: benchmarks.estudos,
    }),
    criarPC({
      id: 6,
      nome: 'PC para Estudos e Projetos',
      categoria: 'Educação' as CategoriaPc,
      intencao: 'estudos',
      perfil: 'desempenho',
      descricao:
        'Uma opção para estudantes que executam IDEs, máquinas virtuais leves e vários programas simultaneamente.',
      vantagens: [
        '32 GB de RAM para projetos maiores',
        'SSD de 1 TB',
        'Plataforma AM5 com caminho de atualização',
      ],
      limitacoes: [
        'Custo inicial mais alto',
        'Vídeo integrado não substitui uma GPU dedicada em tarefas gráficas pesadas',
      ],
      videoIntegrado: true,
      processador: ryzen7600,
      placaMae: placaMaeAm5,
      memoriaRam: {
        nome: 'Memória DDR5 32 GB (2 × 16 GB)',
        marca: 'Genérico',
        preco: 650,
        descricao: 'Dois módulos DDR5 para multitarefa e projetos maiores.',
        capacidade: 32,
        modulos: [16, 16],
        velocidade: 5600,
        ddr: 5,
      },
      armazenamento: ssd1Tb,
      fonte: fonte550W,
      gabinete: gabineteMAtx,
      valorTotal: 3900,
      benchmarks: [
        {
          nome: 'Aplicações de estudo',
          score: 88,
          descricao: 'Estimativa ilustrativa para ferramentas acadêmicas.',
        },
        {
          nome: 'Multitarefa',
          score: 85,
          descricao: 'Estimativa ilustrativa para execução simultânea de programas.',
        },
      ],
    }),
  ],

  'edicao-de-video': [
    criarPC({
      id: 7,
      nome: 'PC para Edição de Vídeo de Entrada',
      categoria: 'Profissional' as CategoriaPc,
      intencao: 'edicao-de-video',
      perfil: 'custo-beneficio',
      descricao:
        'Uma configuração de entrada para projetos menores e edição em resoluções moderadas.',
      vantagens: [
        'GPU dedicada para acelerar tarefas compatíveis',
        '16 GB de RAM para começar',
        'SSD para carregar projetos e aplicativos',
      ],
      limitacoes: [
        '16 GB de RAM podem limitar projetos mais complexos',
        '8 GB de VRAM podem ser insuficientes para alguns efeitos e projetos',
      ],
      videoIntegrado: false,
      processador: ryzen5600,
      placaMae: placaMaeAm4B550,
      memoriaRam: memoria16Gb,
      armazenamento: ssd1Tb,
      fonte: fonte650W,
      placaVideo: rx6600,
      gabinete: gabineteMAtx,
      valorTotal: 4300,
      benchmarks: benchmarks.videoBasico,
    }),
    criarPC({
      id: 8,
      nome: 'PC para Edição e Renderização',
      categoria: 'Profissional' as CategoriaPc,
      intencao: 'edicao-de-video',
      perfil: 'desempenho',
      descricao:
        'Uma configuração com mais memória e capacidade gráfica para projetos mais exigentes.',
      vantagens: [
        '32 GB de RAM',
        'GPU com 16 GB de VRAM',
        'SSD de 1 TB',
      ],
      limitacoes: [
        'Investimento inicial elevado',
        'O desempenho depende do programa, codec e uso de aceleração por GPU',
      ],
      videoIntegrado: false,
      processador: ryzen5700x,
      placaMae: placaMaeAm4B550,
      memoriaRam: memoria32Gb,
      armazenamento: ssd1Tb,
      fonte: fonte750W,
      placaVideo: rx7800xt,
      gabinete: gabineteMAtx,
      valorTotal: 6870,
      benchmarks: benchmarks.videoAvancado,
    }),
  ],

  casual: [
    criarPC({
      id: 9,
      nome: 'PC para Uso Cotidiano',
      categoria: 'Casual' as CategoriaPc,
      intencao: 'casual',
      perfil: 'custo-beneficio',
      descricao:
        'Uma configuração econômica para navegar na internet, assistir a vídeos, estudar e realizar tarefas simples.',
      vantagens: [
        'Não exige placa de vídeo dedicada',
        'SSD para inicialização e abertura de aplicativos rápidas',
        'Custo de aquisição mais baixo',
      ],
      limitacoes: [
        'Não é adequado para jogos graficamente exigentes',
        'Não é voltado à edição profissional de vídeo',
      ],
      videoIntegrado: true,
      processador: ryzen5600g,
      placaMae: placaMaeAm4,
      memoriaRam: memoria16Gb,
      armazenamento: ssd500Gb,
      fonte: fonte550W,
      gabinete: gabineteMAtx,
      valorTotal: 2660,
      benchmarks: benchmarks.cotidiano,
    }),
    criarPC({
      id: 10,
      nome: 'PC para Uso Cotidiano Avançado',
      categoria: 'Casual' as CategoriaPc,
      intencao: 'casual',
      perfil: 'desempenho',
      descricao:
        'Uma opção mais robusta para quem deseja maior capacidade de multitarefa e espaço para crescer.',
      vantagens: [
        '32 GB de RAM',
        'Plataforma AM5 mais recente',
        'SSD de 1 TB',
      ],
      limitacoes: [
        'Pode ser mais potente do que o necessário para tarefas básicas',
        'Não inclui placa de vídeo dedicada',
      ],
      videoIntegrado: true,
      processador: ryzen7600,
      placaMae: placaMaeAm5,
      memoriaRam: {
        nome: 'Memória DDR5 32 GB (2 × 16 GB)',
        marca: 'Genérico',
        preco: 650,
        descricao: 'Dois módulos DDR5 para multitarefa.',
        capacidade: 32,
        modulos: [16, 16],
        velocidade: 5600,
        ddr: 5,
      },
      armazenamento: ssd1Tb,
      fonte: fonte550W,
      gabinete: gabineteMAtx,
      valorTotal: 3900,
      benchmarks: [
        {
          nome: 'Uso cotidiano',
          score: 90,
          descricao: 'Estimativa ilustrativa para tarefas comuns.',
        },
        {
          nome: 'Multitarefa',
          score: 85,
          descricao: 'Estimativa ilustrativa para vários aplicativos abertos.',
        },
      ],
    }),
  ],
};