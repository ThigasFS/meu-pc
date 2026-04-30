export interface PrecoLoja {
    loja: string,
    preco: number,
    url: string
}

export interface PlacaMae {
    id: number,
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
    tipo: 'memoriaram',
    nome: 'Memória RAM',
    id: number,
    marca: string,
    modelo: string,
    fabricante: string,
    capacidade: number,
    modulos: number,
    velocidade: number,
    ddr: number,
    cl: number,
    imagem: string,
    preco: number,
    url: string,
    loja: string
}

export interface Fonte {
    tipo: 'fonte',
    nome: 'Fonte',
    id: number,
    marca: string,
    modelo: string,
    potencia: number,
    fabricante: string,
    certificacao: string,
    pcieConectores: number,
    sataConectores: number,
    epsConectores: number,
    imagem: string,
    preco: number,
    url: string,
    loja: string
}

export interface PlacaVideo {
    tipo: 'placavideo',
    nome: 'Placa de Vídeo',
    id: number,
    marca: string,
    modelo: string,
    fabricante: string,
    vram: number,
    tdp: number,
    imagem: string,
    preco: number,
    gddr: number,
    url: string,
    loja: string
}

export interface Gabinete {
    tipo: 'gabinete',
    nome: 'Gabinete',
    id: number,
    marca: string,
    modelo: string,
    fabricante: string,
    qtdFans: number,
    cor: string,
    imagem: string,
    preco: number,
    url: string,
    loja: string
}

export interface Armazenamento{
    tipo: 'armazenamento',
    nome: 'Armazenamento',
    id: number,
    marca: string,
    modelo: string,
    fabricante: string,
    capacidade: number,
    unidade: 'GB' | 'TB',
    tipoArmazenamento: 'HD' | 'SSD',
    interface: 'SATA' | 'NVME',
    formato: '2.5' | '3.5' | 'M2',
    velocidadeLeitura: number,
    velocidadeGravacao: number,
    imagem: string,
    preco: number,
    url: string,
    loja: string
}

export type Componente = Armazenamento | PlacaMae | PlacaVideo | Processador | Gabinete | Fonte | MemoriaRAM