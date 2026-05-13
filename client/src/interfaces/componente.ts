export interface PrecoLoja {
    loja: string,
    preco: number,
    url: string
}

export interface PlacaMae {
    id: number,
    tipo: 'placamae',
    nome: string,
    marca: string,
    socket: string,
    chipset: string,
    formato: 'ATX' | 'MicroATX' | 'MiniATX';
    maxRam: number;
    ddr: number,
    imagem: string,
    preco: number,
    valores: PrecoLoja[]
}

export interface Processador {
    id: number,
    tipo: 'cpu',
    nome: string,
    marca: string,
    socket: string,
    velocidade: number,
    tdp: number,
    videoIntegrado: boolean,
    imagem: string,
    preco: number,
    valores?: PrecoLoja[],
}

export interface MemoriaRAM {
    id: number,
    tipo: 'memoriaram',
    marca: string,
    nome: string,
    capacidade: number,
    modulos: number[],
    velocidade: number,
    ddr: number,
    cl: number,
    imagem: string,
    preco: number,
    url: string,
    valores: PrecoLoja[]
}

export interface Fonte {
    id: number,
    tipo: 'fonte',
    marca: string,
    nome: string,
    potencia: number,
    certificacao: string,
    pcieConectores: number,
    sataConectores: number,
    epsConectores: number,
    modularidade: "Full" | "Semi" | "Não"
    formato: "ATX" | "SFX"
    imagem: string,
    preco: number,
    valores: PrecoLoja[]
}

export interface PlacaVideo {
    id: number,
    tipo: 'gpu',
    nome: string,
    marca: string,
    vram: number,
    tdp: number,
    imagem: string,
    preco: number,
    gddr: number,
    valores: PrecoLoja[]
}

export interface Gabinete {
    id: number,
    tipo: 'gabinete',
    nome: string,
    marca: string,
    qtdFans: number,
    cor: string,
    imagem: string,
    formato: 'Mini Tower' | 'Mid Tower' | 'Full Tower',
    suportePlacaMae: string,
    painelLateral: string,
    baiasHD: number,
    tamanho: "Compacto" | "Médio" | "Grande"
    preco: number,
    valores: PrecoLoja[]
}

export interface Armazenamento {
    id: number,
    tipo: 'armazenamento',
    marca: string,
    nome: string,
    capacidade: number,
    unidade: 'GB' | 'TB',
    tipoArmazenamento: 'HD' | 'SSD',
    interface: 'SATA' | 'NVME',
    formato: '2.5' | '3.5' | 'M2',
    velocidadeLeitura: number,
    velocidadeGravacao: number,
    imagem: string,
    preco: number,
    valores: PrecoLoja[]
}

export type Componente = Armazenamento | PlacaMae | PlacaVideo | Processador | Gabinete | Fonte | MemoriaRAM