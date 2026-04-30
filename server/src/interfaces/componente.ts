export interface PrecoLoja {
    loja: string,
    preco: number,
    url: string
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

export interface ProcessadorJSON {
    name: string,
    core_count: number,
    core_clock: number,
    microarchitecture: string,
    tdp: number,
    graphics: string | null
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

export interface PlacaMaeJson {
    name: string,
    socket: string,
    form_factor: string,
    max_memory: number,
    memory_slots: number,
    color: string
}