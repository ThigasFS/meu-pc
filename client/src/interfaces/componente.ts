export interface PlacaMae {
    tipo: 'placamae',
    nome: 'Placa Mãe',
    id: number,
    marca: string,
    modelo: string,
    fabricante: string,
    socket: string,
    potencia: number,
    ddr: number,
    imagem: string,
    preco: number
}

export interface Processador {
    tipo: 'processador',
    nome: 'Processador',
    id: number,
    marca: string,
    modelo: string,
    fabricante: string,
    socket: string,
    velocidade: number,
    potencia: number,
    videoIntegrado: boolean,
    imagem: string,
    preco: number
}

export interface MemoriaRAM {
    tipo: 'memoriaram',
    nome: 'Memória RAM',
    id: number,
    marca: string,
    modelo: string,
    fabricante: string,
    memoria: number,
    quantidade: string,
    velocidade: number,
    potencia: number,
    ddr: number,
    cl: number,
    imagem: string,
    preco: number,
}

type tipoCabo = 'ATX (24 pinos)' | 'EPS (8 pinos)' | 'PCI-E (6+2 pinos)' | 'SATA (15 pinos)' | 'Molex (4 pinos)' | 'FDD  (4 pinos)' | 'EPS (4 pinos)' | 'PCI (12 pinos)' | 'PCI (16 pinos)'

export interface Cabo {
    tipo: tipoCabo,
    quantidade: number
}

export interface Fonte {
    tipo: 'fonte',
    nome: 'Fonte',
    id: number,
    marca: string,
    modelo: string,
    fabricante: string,
    potencia: number,
    certificacao: string,
    cabos: Cabo[],
    imagem: string,
    preco: number
}

export interface PlacaVideo {
    tipo: 'placavideo',
    nome: 'Placa de Vídeo',
    id: number,
    marca: string,
    modelo: string,
    fabricante: string,
    potencia: number,
    vram: number,
    imagem: string,
    preco: number,
    gddr: number
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
    preco: number
}

export interface Armazenamento{
    tipo: 'armazenamento',
    nome: 'Armazenamento',
    id: number,
    marca: string,
    modelo: string,
    fabricante: string,
    capacidade: number,
    potencia: number,
    unidade: 'GB' | 'TB',
    tipoArmazenamento: 'HD' | 'SSD',
    tipoConexao: 'SATA II' | 'SATA III' | 'SATA 3.5' | 'M2',
    velocidadeLeitura: number,
    velocidadeGravacao: number,
    imagem: string,
    preco: number
}

export type Componente = Armazenamento | PlacaMae | PlacaVideo | Processador | Gabinete | Fonte | MemoriaRAM