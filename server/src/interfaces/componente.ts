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

export interface ProcessadorAPI {
    name: string,
    core_count: number,
    core_clock: number,
    microarchitecture: string,
    tdp: number,
    graphics: string | null
}