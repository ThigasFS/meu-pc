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

export interface PlacaVideo {
    id: number,
    nome: string,
    marca: string,
    vram: number,
    tdp: number,
    imagem: string,
    preco: number,
    gddr: number,
    valores: PrecoLoja[]
}

export interface PlacaVideoJson {
    name: string,
    chipset: string,
    memory: number,
    length: number,
    core_clock: number,
    boost_clocl: number,
    color: string
}

export interface MemoriaRam {
    id: number,
    marca: string,
    nome: string,
    capacidade: number,
    modulos: number[],
    velocidade: number,
    ddr: number,
    cl: number,
    imagem: string,
    preco: number,
    valores: PrecoLoja[]
}

export interface MemoriaRamJson {
    name: string,
    speed: number[],
    modules: number[],
    color: string,
    first_word_latency: number,
    cas_latency: number
}

export interface Armazenamento {
    id: number,
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

export interface ArmazenamentoJson {
    name: string,
    capacity: number,
    type: string,
    cache: number,
    form_factor: string,
    interface: string,
}

export interface Fonte {
    id: number,
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

export interface FonteJson {
    name: string,
    type: "ATX" | "SFX",
    efficiency: string,
    wattage: number,
    modular: "Full" | "Semi" | "false",
}

export interface Gabinete {
    id: number,
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

export interface GabineteJson {
    name: string,
    type: string,
    color: string,
    side_panel: string,
    external_volume: number,
    internal_35_bays: number
}