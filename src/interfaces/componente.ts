export interface PlacaMae {
    tipo: 'placamae',
    marca: string,
    modelo: string,
    fabricante: string,
    socket: string,
    potencia: number,
    ddr: number,
    imagem: string,
    preco: string
}

export interface Processador {
    tipo: 'processador',
    marca: string,
    modelo: string,
    fabricante: string,
    socket: string,
    velocidade: number,
    potencia: number,
    videoIntegrado: boolean,
    imagem: string,
    preco: string
}

export interface MemoriaRAM {
    tipo: 'memoriaram',
    marca: string,
    modelo: string,
    fabricante: string,
    memoria: number,
    quantidade: string,
    velocidade: number,
    potencia: number,
    ddr: number,
    imagem: string,
    preco: string,
}

type tipoCabo = 'ATX (24 pinos)' | 'EPS (8 pinos)' | 'PCI-E (6+2 pinos)' | 'SATA (15 pinos)' | 'Molex (4 pinos)' | 'FDD  (4 pinos)' | 'EPS (4 pinos)'

export interface Cabo {
    tipo: tipoCabo,
    quantidade: number
}

export interface Fonte {
    tipo: 'fonte',
    marca: string,
    modelo: string,
    fabricante: string,
    potencia: number,
    certificacao: string,
    cabos: Cabo[],
    imagem: string,
    preco: string
}

export interface PlacaVideo {
    tipo: 'placavideo',
    marca: string,
    modelo: string,
    fabricante: string,
    potencia: number,
    vram: number,
    imagem: string,
    preco: string,
    gddr: number
}

export interface Gabinete {
    tipo: 'gabinete',
    marca: string,
    modelo: string,
    fabricante: string,
    qtdFans: number,
    cor: string,
    imagem: string,
    preco: string
}

export interface Armazenamento{
    tipo: 'armazenamento',
    marca: string,
    modelo: string,
    fabricante: string,
    capacidade: number,
    potencia: number,
    unidade: 'GB' | 'TB'
    tipoArmazenamento: 'HD' | 'SSD',
    tipoConexao: 'SATA II' | 'SATA III' | 'SATA 3.5' | 'M2',
    velocidadeLeitura: number,
    velocidadeGravacao: number,
    imagem: string,
    preco: string
}

export type Componente = Armazenamento | PlacaMae | PlacaVideo | Processador | Gabinete | Fonte | MemoriaRAM