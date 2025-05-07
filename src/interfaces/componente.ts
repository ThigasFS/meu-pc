export interface PlacaMae {
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
    marca: string,
    modelo: string,
    fabricante: string,
    memoria: number,
    velocidade: number,
    potencia: number,
    ddr: number,
}

export interface Fonte {
    marca: string,
    modelo: string,
    fabricante: string,
    potencia: number,
}

export interface PlacaVideo {
    marca: string,
    modelo: string,
    fabricante: string,
    potencia: number
}

export interface Gabinete {
    marca: string,
    modelo: string,
    fabricante: string,
}

export interface Armazenamento{
    marca: string,
    modelo: string,
    fabricante: string,
    capacidade: number,
    unidade: 'GB' | 'TB'
    tipoArmazenamento: 'HD' | 'SSD',
    tipoConexao: 'SATA' | 'M2',
    velocidade: number,
}