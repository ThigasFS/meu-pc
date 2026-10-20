import { IntencaoOrientacao } from "../data/types"
import { Armazenamento, Fonte, Gabinete, PlacaMae, PlacaVideo, Processador,MemoriaRAM, CategoriaPc } from "./componente"

interface PCComVideo {
    id: number,
    nome: string,
    placaMae: PlacaMae,
    processador: Processador,
    videoIntegrado: boolean,
    placaVideo?: PlacaVideo,
    armazenamento: Armazenamento,
    gabinete?: Gabinete,
    fonte: Fonte,
    memoriaRam: MemoriaRAM,
    valorTotal: number,
    categoria?: CategoriaPc
}

interface PCSemVideo{
    id: number,
    nome: string,
    placaMae: PlacaMae,
    processador: Processador,
    videoIntegrado: boolean,
    placaVideo: PlacaVideo,
    armazenamento: Armazenamento,
    gabinete?: Gabinete,
    fonte: Fonte,
    memoriaRam: MemoriaRAM,
    valorTotal: number,
    categoria?: CategoriaPc
}

type PC = PCComVideo | PCSemVideo
export default PC

export interface ComponenteSimples {
  id: number;
  nome: string;
  marca: string;
  imagem?: string;
  preco: number;
  descricao: string;
}

export interface ProcessadorSimples extends ComponenteSimples {
  velocidade?: number;
  videoIntegrado: boolean;
}

export interface PlacaMaeSimples extends ComponenteSimples {
  socket: string;
  formato: string;
  ddr: number;
}

export interface MemoriaRAMSimples extends ComponenteSimples {
  capacidade: number;
  modulos: number[];
  velocidade: number;
  ddr: number;
}

export interface ArmazenamentoSimples extends ComponenteSimples {
  capacidade: number;
  unidade: string;
  tipoArmazenamento: string;
}

export interface PlacaVideoSimples extends ComponenteSimples {
  memoria: number;
}

export interface FonteSimples extends ComponenteSimples {
  potencia: number;
  certificacao?: string;
}

export interface GabineteSimples extends ComponenteSimples {
  formato: string;
}

export type PerfilRecomendacao =
| 'custo-beneficio'
| 'desempenho';

export interface PCSimples {
id: number;
nome: string;
categoria: CategoriaPc;
intencao: IntencaoOrientacao;
perfil: PerfilRecomendacao;

descricao: string;
vantagens: string[];
limitacoes: string[];

videoIntegrado: boolean;

processador: ProcessadorSimples;
placaMae: PlacaMaeSimples;
memoriaRam: MemoriaRAMSimples;
armazenamento: ArmazenamentoSimples;
fonte: FonteSimples;

placaVideo?: PlacaVideoSimples;
gabinete?: GabineteSimples;

valorTotal: number;
}

export interface Benchmark {
  nome: string;
  score: number;
  unidade?: string;
  descricao?: string;
  fonte?: string;
}

export interface PCRecomendado extends PCSimples {
  benchmarks: Benchmark[];
}