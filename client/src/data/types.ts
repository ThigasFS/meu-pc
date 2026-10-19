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

export type CorDestaque =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary';

export const coresDestaque = {
  primary: 'warning.main',
  secondary: 'info.main',
  tertiary: 'success.main',
  quaternary: 'secondary.main',
} as const;

export interface ItemDestaque {
  id: string;
  titulo: string;
  descricao: string;
  cor: CorDestaque;
}

export interface ParteNome {
  texto: string;
  destaque?: string;
}

export interface ExemploComponente {
  nome: string;
  imagem: string;
  descricao: string;
  partesNome: ParteNome[];
  destaques: string[];
}

export interface ConteudoComponente {
  titulo: string;
  descricao: string;
  pontosImportantes: ItemDestaque[];
  exemplos: ExemploComponente[];
}

export interface ConfiguracaoIntencao {
  titulo: string;
  descricao: string;
  componentePrincipal: IdComponente;
  componenteSecundario: IdComponente;
}

export interface Licao {
  titulo: string;
  descricao: string;
  componentePrincipal: ConteudoComponente;
  componenteSecundario: ConteudoComponente;
}

export interface Benchmark {
  nome: string;
  categoria: string;
  score: number;
  unidade?: string;
  fonte: string;
}

export interface ProdutoHardware {
  id: string;
  nome: string;
  componente: IdComponente;
  precoMedio: number;
  benchmarks: Benchmark[];
  consumoMedioW?: number;
  especificacoes: Record<string, string | number>;
}

export interface ResultadoRecomendacao {
  produto: ProdutoHardware;
  scoreDesempenho: number;
  scoreCustoBeneficio: number;
  precoPorPonto: number;
  scoreEficienciaEnergetica?: number;
  justificativa: string[];
}